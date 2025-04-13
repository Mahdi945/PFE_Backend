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
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Récupérer l'ID utilisateur à partir de l'ID crédit
    const [creditDetails] = await db.execute('SELECT id_utilisateur FROM details_credits WHERE id = ?', [id_credit]);
    if (!creditDetails || creditDetails.length === 0) {
      return res.status(404).json({ message: 'Crédit introuvable' });
    }
    const id_utilisateur = creditDetails[0].id_utilisateur;

    // Générer le QR code
    const qrData = `Immatriculation: ${immatriculation}\nMarque: ${marque}\nType: ${type_vehicule}`;
    const qrImagePath = path.join('public', 'qrcodes', `${immatriculation}.png`);

    await fs.ensureDir(path.dirname(qrImagePath));

    await QRCode.toFile(qrImagePath, qrData);
    const qrCodeUrl = `http://localhost:3000/qrcodes/${immatriculation}.png`;

    // Ajouter le véhicule dans la base de données
    const [result] = await Vehicule.addVehicule(id_utilisateur, immatriculation, marque, type_vehicule, qrCodeUrl, id_credit);

    res.status(201).json({
      message: 'Véhicule enregistré avec succès',
      vehicule: {
        id_utilisateur,
        immatriculation,
        marque,
        type_vehicule,
        qr_code: qrCodeUrl,
        id_credit
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getAllVehicules = async (req, res) => {
  try {
    const [vehicules] = await Vehicule.getAllVehicules();
    res.json(vehicules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Récupérer un véhicule par ID
const getVehicule = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicule = await Vehicule.getVehiculeById(id);

    if (vehicule.length === 0) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }

    res.json(vehicule[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer les véhicules d'un utilisateur par son username
const getVehiculesByClient = async (req, res) => {
  try {
    const { username } = req.params;
    const [user] = await db.execute("SELECT id FROM utilisateurs WHERE username = ?", [username]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const id_utilisateur = user[0].id;
    const vehicules = await Vehicule.getVehiculeByClientUsername(username);

    if (vehicules.length === 0) {
      return res.status(404).json({ message: 'Aucun véhicule trouvé pour cet utilisateur' });
    }

    res.json(vehicules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer les véhicules par crédit
const getVehiculesByCredit = async (req, res) => {
  try {
    const { id_credit } = req.params;
    const vehicules = await Vehicule.getVehiculeByCredit(id_credit);

    if (vehicules.length === 0) {
      return res.status(404).json({ message: 'Aucun véhicule trouvé pour ce crédit' });
    }

    res.json(vehicules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const getVehiculeByImmatriculation = async (req, res) => {
  try {
    const { immatriculation } = req.params; // Récupérer l'immatriculation depuis les paramètres de la requête
    const vehicule = await Vehicule.getImmatriculation(immatriculation);

    if (vehicule.length === 0) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }

    res.json(vehicule[0]); // Retourner le premier véhicule trouvé
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour un véhicule
const updateVehicule = async (req, res) => {
  try {
    const { id, immatriculation, marque, type_vehicule } = req.body;

    if (!id || !immatriculation || !marque || !type_vehicule) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const result = await Vehicule.updateVehicule(id, immatriculation, marque, type_vehicule);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }

    res.status(200).json({ message: 'Véhicule mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un véhicule
const deleteVehicule = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Vehicule.deleteVehicule(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }

    res.status(200).json({ message: 'Véhicule supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export default { create, getAllVehicules,getVehiculeByImmatriculation, getVehicule, getVehiculesByClient, getVehiculesByCredit, updateVehicule, deleteVehicule };
