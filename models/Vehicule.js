import db from '../config/db.js';
import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';

const Vehicule = {  
    // Vérifier si un crédit individuel a déjà un véhicule
    checkCreditVehiculeLimit: async (id_credit) => {
        try {
            // Récupérer le type de crédit depuis details_credits
            const [creditRows] = await db.execute(
                'SELECT type_credit FROM details_credits WHERE id = ?', 
                [id_credit]
            );
            
            if (creditRows.length === 0) {
                throw new Error('Crédit non trouvé dans details_credits');
            }
            
            const creditType = creditRows[0].type_credit;
            
            // Si c'est un crédit individuel, vérifier s'il a déjà un véhicule
            if (creditType.toLowerCase() === 'individuelle') {
                const [vehiculeRows] = await db.execute(
                    'SELECT COUNT(*) AS count FROM vehicules WHERE id_credit = ?', 
                    [id_credit]
                );
                
                if (vehiculeRows[0].count > 0) {
                    throw new Error('Un crédit de type individuelle ne peut avoir qu\'un seul véhicule associé');
                }
            }
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la vérification du crédit:', error);
            throw error;
        }
    },

    // Ajouter un véhicule avec vérification préalable
    addVehicule: async (immatriculation, marque, type_vehicule, qr_code_url, id_credit) => {
        try {
            // Vérification avant l'ajout
            await Vehicule.checkCreditVehiculeLimit(id_credit);
            
            // Vérifier que le crédit est actif
            const [creditStatus] = await db.execute(
                'SELECT etat FROM details_credits WHERE id = ?',
                [id_credit]
            );
            
            if (creditStatus[0].etat !== 'actif') {
                throw new Error('Seuls les crédits actifs peuvent avoir des véhicules associés');
            }
            
            // Tout est OK, ajouter le véhicule
            const query = `
                INSERT INTO vehicules (immatriculation, marque, type_vehicule, qr_code, id_credit)
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, 
                [immatriculation, marque, type_vehicule, qr_code_url, id_credit]);
            
            return result;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du véhicule:', error);
            throw error;
        }
    },


    getAllVehicules: async () => {
        const query = `
            SELECT 
                v.*,
                u.id as id_utilisateur,
                u.username,
                u.email,
                dc.etat as credit_etat
            FROM vehicules v
            JOIN details_credits dc ON v.id_credit = dc.id
            JOIN utilisateurs u ON dc.id_utilisateur = u.id
        `;
        const [rows] = await db.execute(query);
        console.log('Véhicules récupérés de la base de données:', rows); // Ajouté pour débogage
        return rows;
    },


    // Récupérer un véhicule spécifique par son ID avec les infos utilisateur
    getVehiculeById: async (id) => {
        const query = `
            SELECT 
                v.*,
                u.id as id_utilisateur,
                u.username,
                u.email
            FROM vehicules v
            JOIN details_credits dc ON v.id_credit = dc.id
            JOIN utilisateurs u ON dc.id_utilisateur = u.id
            WHERE v.id = ?
        `;
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },

    // Récupérer un véhicule par son immatriculation avec les infos utilisateur
    getVehiculeByImmatriculation: async (immatriculation) => {
        const query = `
            SELECT 
                v.*,
                u.id as id_utilisateur,
                u.username,
                u.email
            FROM vehicules v
            JOIN details_credits dc ON v.id_credit = dc.id
            JOIN utilisateurs u ON dc.id_utilisateur = u.id
            WHERE v.immatriculation = ?
        `;
        const [rows] = await db.execute(query, [immatriculation]);
        return rows[0];
    },

    // Récupérer tous les véhicules d'un utilisateur par son ID
    getVehiculesByUserId: async (id_utilisateur) => {
        const query = `
            SELECT 
                v.*,
                u.username,
                u.email
                
            FROM vehicules v
            JOIN details_credits dc ON v.id_credit = dc.id
            JOIN utilisateurs u ON dc.id_utilisateur = u.id
            WHERE dc.id_utilisateur = ?
        `;
        const [rows] = await db.execute(query, [id_utilisateur]);
        return rows;
    },

    // Récupérer les véhicules d'un crédit spécifique avec les infos utilisateur
    getVehiculeByCredit: async (id_credit) => {
        const query = `
            SELECT 
                v.*,
                u.id as id_utilisateur,
                u.username,
                u.email
            FROM vehicules v
            JOIN details_credits dc ON v.id_credit = dc.id
            JOIN utilisateurs u ON dc.id_utilisateur = u.id
            WHERE v.id_credit = ?
        `;
        const [rows] = await db.execute(query, [id_credit]);
        return rows;
    },

    // Mettre à jour un véhicule
    updateVehicule: async (id, immatriculation, marque, type_vehicule) => {
        const query = `
            UPDATE vehicules
            SET immatriculation = ?, marque = ?, type_vehicule = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [immatriculation, marque, type_vehicule, id]);
        return result;
    },

    // Supprimer un véhicule
    deleteVehicule: async (id) => {
        const query = 'DELETE FROM vehicules WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    },

    // Générer un QR code pour un véhicule
    generateQRCode: async (immatriculation, marque, type_vehicule, id_credit) => {
        try {
            const qrData = `Immatriculation: ${immatriculation}\nMarque: ${marque}\nType: ${type_vehicule}\nCreditID: ${id_credit}`;
            const qrImagePath = path.join('public', 'qrcodes', `${immatriculation}.png`);
            
            // Créer le dossier s'il n'existe pas
            await fs.promises.mkdir(path.dirname(qrImagePath), { recursive: true });
            
            // Générer le QR code
            await QRCode.toFile(qrImagePath, qrData);
            
            return `${process.env.BASE_URL}/qrcodes/${immatriculation}.png`;
        } catch (error) {
            console.error('Erreur lors de la génération du QR code:', error);
            throw error;
        }
    }
};

export default Vehicule;