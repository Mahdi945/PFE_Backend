import db from '../config/db.js'; // Connexion à la base de données
import QRCode from 'qrcode'; // Bibliothèque pour générer des QR codes
import path from 'path'; // Module Node.js pour gérer les chemins de fichiers
import fs from 'fs'; // Module pour manipuler les fichiers

const Vehicule = {  
    // Ajouter un véhicule et générer un QR code
    addVehicule: async (id_utilisateur, immatriculation, marque, type_vehicule, qr_code_url, id_credit) => {
        const query = `
            INSERT INTO vehicules (id_utilisateur, immatriculation, marque, type_vehicule, qr_code, id_credit)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        return db.execute(query, [id_utilisateur, immatriculation, marque, type_vehicule, qr_code_url, id_credit]);
    },

    // Récupérer tous les véhicules avec le nom d’utilisateur
    getAllVehicules: () => {
        const query = `
            SELECT v.*, u.username
            FROM vehicules v
            JOIN utilisateurs u ON v.id_utilisateur = u.id
        `;
        return db.execute(query);
    },

    // Récupérer un véhicule spécifique par son ID avec le nom d’utilisateur
    getVehiculeById: (id) => {
        const query = `
            SELECT v.*, u.username
            FROM vehicules v
            JOIN utilisateurs u ON v.id_utilisateur = u.id
            WHERE v.id = ?
        `;
        return db.execute(query, [id]);
    },
    
// Récupérer les véhicules d'un utilisateur par son username
getVehiculeByClientUsername: (username) => {
    const query = `
        SELECT v.*, u.username
        FROM vehicules v
        JOIN utilisateurs u ON v.id_utilisateur = u.id
        WHERE u.username = ?  -- Utilisation du username
    `;
    return db.execute(query, [username]);
},


    // Récupérer les véhicules d’un crédit spécifique avec le nom d’utilisateur
    getVehiculeByCredit: (id_credit) => {
        const query = `
            SELECT v.*, u.username
            FROM vehicules v
            JOIN utilisateurs u ON v.id_utilisateur = u.id
            WHERE v.id_credit = ?
        `;
        return db.execute(query, [id_credit]);
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

export default Vehicule;
