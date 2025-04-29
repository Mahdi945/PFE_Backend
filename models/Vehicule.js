import db from '../config/db.js'; // Connexion à la base de données
import QRCode from 'qrcode'; // Bibliothèque pour générer des QR codes
import path from 'path'; // Module Node.js pour gérer les chemins de fichiers
import fs from 'fs'; // Module pour manipuler les fichiers

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
    addVehicule: async (id_utilisateur, immatriculation, marque, type_vehicule, qr_code_url, id_credit) => {
        try {
            // Vérification avant l'ajout
            await Vehicule.checkCreditVehiculeLimit(id_credit);
            
            // Vérifier aussi que l'utilisateur est bien propriétaire du crédit
            const [creditOwnership] = await db.execute(
                'SELECT id FROM details_credits WHERE id = ? AND id_utilisateur = ?',
                [id_credit, id_utilisateur]
            );
            
            if (creditOwnership.length === 0) {
                throw new Error('Le crédit spécifié ne appartient pas à cet utilisateur');
            }
            
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
                INSERT INTO vehicules (id_utilisateur, immatriculation, marque, type_vehicule, qr_code, id_credit)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const result = await db.execute(query, 
                [id_utilisateur, immatriculation, marque, type_vehicule, qr_code_url, id_credit]);
            
            return result;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du véhicule:', error);
            throw error;
        }
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
      // Récupérer un véhicule par son immatriculation avec le nom d'utilisateur
      getVehiculeByImmatriculation: (immatriculation) => {
        const query = `
            SELECT v.*, u.username
            FROM vehicules v
            JOIN utilisateurs u ON v.id_utilisateur = u.id
            WHERE v.immatriculation = ?
        `;
        return db.execute(query, [immatriculation]);
    },

    
/**
 * Récupère tous les véhicules d'un utilisateur par son ID
 * @param {number} id_utilisateur - L'ID de l'utilisateur
 * @returns {Promise<Array>} Liste des véhicules de l'utilisateur
 */
 getVehiculesByUserId:(id_utilisateur) => {
    const query = `
        SELECT 
           *
        FROM vehicules v
        JOIN utilisateurs u ON v.id_utilisateur = u.id
        WHERE v.id_utilisateur = ?  -- Filtre direct par ID utilisateur
        
    `;
    
    try {
        return db.execute(query, [id_utilisateur]);
    } catch (error) {
        console.error('Erreur lors de la récupération des véhicules:', error);
        throw new Error('Erreur de base de données');
    }
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
