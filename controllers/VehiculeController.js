import db from '../config/db.js';
import Vehicule from '../models/Vehicule.js';
import QRCode from 'qrcode';
import fs from 'fs-extra';
import path from 'path';

// Ajouter un véhicule
const create = async (req, res) => {
  try {
    const { id_credit, immatriculation, marque, type_vehicule } = req.body;

    if (!id_credit || !immatriculation || !marque || !type_vehicule) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis',
      });
    }

    // Vérifier que le crédit existe et est actif
    const [credit] = await db.execute('SELECT id, etat FROM details_credits WHERE id = ?', [
      id_credit,
    ]);

    if (!credit.length) {
      return res.status(404).json({
        success: false,
        message: 'Crédit introuvable',
      });
    }

    if (credit[0].etat !== 'actif') {
      return res.status(400).json({
        success: false,
        message: 'Seuls les crédits actifs peuvent avoir des véhicules associés',
      });
    }

    // Générer le QR code
    const qrCodeUrl = await Vehicule.generateQRCode(
      immatriculation,
      marque,
      type_vehicule,
      id_credit,
    );

    // Ajouter le véhicule dans la base de données
    const result = await Vehicule.addVehicule(
      immatriculation,
      marque,
      type_vehicule,
      qrCodeUrl,
      id_credit,
    );

    // Récupérer les infos complètes du véhicule créé
    const newVehicule = await Vehicule.getVehiculeById(result.insertId);

    res.status(201).json({
      success: true,
      message: 'Véhicule enregistré avec succès',
      data: newVehicule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur serveur',
    });
  }
};

// Récupérer tous les véhicules
const getAllVehicules = async (req, res) => {
  try {
    const vehicules = await Vehicule.getAllVehicules();
    res.json({
      success: true,
      data: vehicules, // Envoyer directement le tableau de véhicules
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// Récupérer un véhicule par ID
const getVehicule = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicule = await Vehicule.getVehiculeById(id);

    if (!vehicule) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule introuvable',
      });
    }

    res.json({
      success: true,
      data: vehicule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
    });
  }
};

// Récupérer les véhicules d'un utilisateur par son username
const getVehiculesByClient = async (req, res) => {
  try {
    const { username } = req.params;

    // Récupérer l'ID utilisateur
    const [user] = await db.execute('SELECT id FROM utilisateurs WHERE username = ?', [username]);

    if (!user.length) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
      });
    }

    const vehicules = await Vehicule.getVehiculesByUserId(user[0].id);

    if (!vehicules.length) {
      return res.status(404).json({
        success: false,
        message: 'Aucun véhicule trouvé pour cet utilisateur',
      });
    }

    res.json({
      success: true,
      data: vehicules,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
    });
  }
};

// Récupérer les véhicules par crédit
const getVehiculesByCredit = async (req, res) => {
  try {
    const { id_credit } = req.params;
    const vehicules = await Vehicule.getVehiculeByCredit(id_credit);

    if (!vehicules.length) {
      return res.status(404).json({
        success: false,
        message: 'Aucun véhicule trouvé pour ce crédit',
      });
    }

    res.json({
      success: true,
      data: vehicules,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
    });
  }
};

// Récupérer un véhicule par immatriculation
const getVehiculeByImmatriculation = async (req, res) => {
  try {
    const { immatriculation } = req.params;
    const vehicule = await Vehicule.getVehiculeByImmatriculation(immatriculation);

    if (!vehicule) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule introuvable',
      });
    }

    res.json({
      success: true,
      data: vehicule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
    });
  }
};

// Mettre à jour seulement l'ID du crédit d'un véhicule
const updateVehicule = async (req, res) => {
  try {
    const { id, id_credit } = req.body;

    if (!id || !id_credit) {
      return res.status(400).json({
        success: false,
        message: 'ID véhicule et ID crédit sont requis',
      });
    }

    // Vérifier que le nouveau crédit est actif
    const [credit] = await db.execute('SELECT etat FROM details_credits WHERE id = ?', [id_credit]);
    
    if (!credit.length) {
      return res.status(404).json({
        success: false,
        message: 'Crédit introuvable',
      });
    }

    if (credit[0].etat !== 'actif') {
      return res.status(400).json({
        success: false,
        message: 'Seuls les crédits actifs peuvent être associés à un véhicule',
      });
    }

    const result = await Vehicule.updateVehicule(id, id_credit);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule introuvable',
      });
    }

    // Récupérer les infos mises à jour
    const updatedVehicule = await Vehicule.getVehiculeById(id);

    res.json({
      success: true,
      message: 'Crédit du véhicule mis à jour avec succès',
      data: updatedVehicule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur serveur',
    });
  }
};


// Supprimer un véhicule
const deleteVehicule = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Vehicule.deleteVehicule(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule introuvable',
      });
    }

    res.json({
      success: true,
      message: 'Véhicule supprimé avec succès',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
    });
  }
};

export default {
  create,
  getAllVehicules,
  getVehicule,
  getVehiculesByClient,
  getVehiculesByCredit,
  getVehiculeByImmatriculation,
  updateVehicule,
  deleteVehicule,
};
