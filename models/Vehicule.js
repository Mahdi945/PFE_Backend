import db from '../config/db.js'; // Connexion à la base de données
import QRCode from 'qrcode'; // Bibliothèque pour générer des QR codes
import path from 'path'; // Module Node.js pour gérer les chemins de fichiers
import fs from 'fs'; // Module pour manipuler les fichiers

// Définition de l'objet Vehicule qui regroupe les opérations CRUD
const Vehicule = {  
    // Ajouter un véhicule et générer un QR code
    addVehicule: async (id_utilisateur, immatriculation, marque, type_vehicule, qr_code_url, id_contrat) => {
        const query = `
            INSERT INTO vehicules (id_utilisateur, immatriculation, marque, type_vehicule, qr_code, id_contrat)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        return db.execute(query, [id_utilisateur, immatriculation, marque, type_vehicule, qr_code_url, id_contrat]);
    },

    // Récupérer tous les véhicules de la base de données
    getAllVehicules: () => {
        const query = 'SELECT * FROM vehicules';
        return db.execute(query);
    },

    // Récupérer un véhicule spécifique par son ID
    getVehiculeById: (id) => {
        const query = 'SELECT * FROM vehicules WHERE id = ?';
        return db.execute(query, [id]);
    },
    
    // Récupérer les véhicules appartenant à un utilisateur spécifique
    getVehiculeByClient: (id_utilisateur) => {
        const query = 'SELECT * FROM vehicules WHERE id_utilisateur = ?';
        return db.execute(query, [id_utilisateur]);
    },

    // Récupérer les véhicules liés à un contrat spécifique
    getVehiculeByContrat: (id_contrat) => {
        const query = 'SELECT * FROM vehicules WHERE id_contrat = ?';
        return db.execute(query, [id_contrat]);
    },

    // Mettre à jour les informations d'un véhicule
    updateVehicule: (id, immatriculation, marque, type_vehicule) => {
        const query = `
            UPDATE vehicules
            SET immatriculation = ?, marque = ?, type_vehicule = ?
            WHERE id = ?
        `;
        return db.execute(query, [immatriculation, marque, type_vehicule, id]);
    },

    // Supprimer un véhicule de la base de données
    deleteVehicule: (id) => {
        const query = 'DELETE FROM vehicules WHERE id = ?';
        return db.execute(query, [id]);
    }
};

// Exportation de l'objet Vehicule pour être utilisé dans d'autres fichiers
export default Vehicule;
