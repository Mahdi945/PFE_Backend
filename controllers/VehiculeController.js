import QRCode from 'qrcode';
import fs from 'fs-extra';
import path from 'path';
import Vehicule from '../models/Vehicule.js';
import Credit from '../models/Credit.js';

const create = async (req, res) => {
  try {
    const { id_utilisateur, immatriculation, marque, type_vehicule, id_credit } = req.body;

    if (!id_utilisateur || !immatriculation || !marque || !type_vehicule || !id_credit) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // 1️⃣ Vérifier si le crédit existe
    const [credit] = await Credit.getCreditById(id_credit);
    if (!credit || credit.length === 0) {
      return res.status(400).json({ message: 'Le crédit spécifié n\'existe pas' });
    }

    // 2️⃣ Ajouter uniquement les informations demandées
    const creditDetails = `
      Solde crédit: ${credit[0].solde_credit}DT
      Crédit utilisé: ${credit[0].credit_utilise}DT
    `;

    const vehicleDetails = `
      Marque: ${marque}
      Type: ${type_vehicule}
    `;

    const qrData = `
      ${vehicleDetails}
      ${creditDetails}
    `;

    const qrImagePath = path.join('public', 'qrcodes', `${immatriculation}.png`);

    // S'assurer que le dossier public/qrcodes existe
    await fs.ensureDir(path.dirname(qrImagePath));

    // Générer le QR code en tant qu'image
    await QRCode.toFile(qrImagePath, qrData);

    // 3️⃣ Convertir le chemin en URL accessible
    const qrCodeUrl = `http://localhost:3000/qrcodes/${immatriculation}.png`;

    // 4️⃣ Enregistrer le véhicule avec le lien QR dans la BDD
    const [result] = await Vehicule.addVehicule(id_utilisateur, immatriculation, marque, type_vehicule, qrCodeUrl, id_credit);

    // 5️⃣ Réponse avec succès et URL du QR code généré
    res.status(201).json({ message: 'Véhicule enregistré avec succès', qrCodeUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer un véhicule avec son QR code
const getVehicule = async (req, res) => {
  try {
    const { id } = req.params;
    const [vehicule] = await Vehicule.getVehiculeById(id);

    if (!vehicule.length) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }

    res.json(vehicule[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer les véhicules par client
const getVehiculesByClient = async (req, res) => {
  try {
    const { id_utilisateur } = req.params; // Récupérer l'id_utilisateur depuis les paramètres de l'URL
    const [vehicules] = await Vehicule.getVehiculeByClient(id_utilisateur);

    if (vehicules.length === 0) {
      return res.status(404).json({ message: 'Aucun véhicule trouvé pour ce client' });
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
    const { id_credit } = req.params; // Récupérer l'id_credit depuis les paramètres de l'URL
    const [vehicules] = await Vehicule.getVehiculeByCredit(id_credit);

    if (vehicules.length === 0) {
      return res.status(404).json({ message: 'Aucun véhicule trouvé pour ce crédit' });
    }

    res.json(vehicules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export default { create, getVehicule, getVehiculesByClient, getVehiculesByCredit };
