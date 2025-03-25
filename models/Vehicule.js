import db from '../config/db.js';
import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';

const Vehicule = {  
    // Ajouter un véhicule et générer un QR code
    addVehicule: async (id_utilisateur, immatriculation, marque, type_vehicule, qr_code_url, id_contrat) => {
      const query = `
        INSERT INTO vehicules (id_utilisateur, immatriculation, marque, type_vehicule, qr_code, id_contrat)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      return db.execute(query, [id_utilisateur, immatriculation, marque, type_vehicule, qr_code_url, id_contrat]);
    },

  // Récupérer tous les véhicules
  getAllVehicules: () => {
    const query = 'SELECT * FROM vehicules';
    return db.execute(query);
  },

  // Récupérer un véhicule par son ID
  getVehiculeById: (id) => {
    const query = 'SELECT * FROM vehicules WHERE id = ?';
    return db.execute(query, [id]);
  },
  
  // Récupérer un véhicule par client (utilisateur)
  getVehiculeByClient: (id_utilisateur) => {
    const query = 'SELECT * FROM vehicules WHERE id_utilisateur = ?';
    return db.execute(query, [id_utilisateur]);
  },

  // Récupérer un véhicule par contrat
  getVehiculeByContrat: (id_contrat) => {
    const query = 'SELECT * FROM vehicules WHERE id_contrat = ?';
    return db.execute(query, [id_contrat]);
  },


  // Mettre à jour un véhicule
  updateVehicule: (id, immatriculation, marque, type_vehicule) => {
    const query = `
      UPDATE vehicules
      SET immatriculation = ?, marque = ?, type_vehicule = ?
      WHERE id = ?
    `;
    return db.execute(query, [immatriculation, marque, type_vehicule, id]);
  },

  // Supprimer un véhicule
  deleteVehicule: (id) => {
    const query = 'DELETE FROM vehicules WHERE id = ?';
    return db.execute(query, [id]);
  }
};

// Fonction pour générer le QR code et le sauvegarder en fichier
const generateQRCode = (immatriculation) => {
  return new Promise((resolve, reject) => {
    const qrData = `http://localhost:3000/api/vehicules/scan/${immatriculation}`; // Lien du QR code

    // Définir l'emplacement du fichier QR code
    const qrFilePath = path.join('public', 'qrcodes', `${immatriculation}.png`);

    // Générer le QR code
    QRCode.toFile(qrFilePath, qrData, (err) => {
      if (err) {
        reject('Erreur lors de la génération du QR code');
      } else {
        resolve(`http://localhost:3000/qrcodes/${immatriculation}.png`); // URL accessible pour afficher le QR code
      }
    });
  });
};


export default Vehicule;
