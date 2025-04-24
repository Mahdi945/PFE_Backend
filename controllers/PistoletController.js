import Pistolet from '../models/Pistolet.js';
import Pompe from '../models/Pompe.js';
import Affectation from '../models/AffectationCalendrier.js';
import db from '../config/db.js';

const PistoletController = {
  // [EXISTANT] Ajouter un pistolet (mis à jour avec les nouveaux champs)
  addPistolet: async (req, res) => {
    try {
      const { numero_pompe, numero_pistolet, nom_produit, prix_unitaire } = req.body;
      
      if (!numero_pistolet || !numero_pompe || !nom_produit || !prix_unitaire) {
        return res.status(400).send({ 
          message: 'Tous les champs sont obligatoires (numéro pompe, numéro pistolet, nom produit, prix unitaire)' 
        });
      }

      const pompe = await Pompe.findByNumero(numero_pompe);
      if (!pompe) {
        return res.status(404).send({ message: 'Pompe non trouvée' });
      }

      const pistoletId = await Pistolet.addPistolet(
        pompe.id,
        numero_pistolet,
        nom_produit,
        prix_unitaire
      );
      
      res.status(201).send({ 
        message: 'Pistolet ajouté avec succès', 
        pistoletId 
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({ message: 'Ce numéro de pistolet existe déjà pour cette pompe' });
      }
      res.status(500).send({ 
        message: 'Erreur lors de l\'ajout du pistolet',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },
  enregistrerReleve: async (req, res) => {
    try {
      const { affectation_id, pistolet_id, index_ouverture, index_fermeture } = req.body;
      
      // Validation simplifiée
      if (!affectation_id || !pistolet_id || isNaN(index_ouverture) || isNaN(index_fermeture)) {
        return res.status(400).send({ 
          message: 'Tous les champs sont obligatoires et doivent être valides' 
        });
      }
  
      if (parseFloat(index_fermeture) < parseFloat(index_ouverture)) {
        return res.status(400).send({ 
          message: 'L\'index de fermeture doit être supérieur ou égal à l\'index d\'ouverture' 
        });
      }
  
      const releveId = await Pistolet.createRelevePoste(
        affectation_id,
        pistolet_id,
        index_ouverture,
        index_fermeture
      );
  
      res.status(201).send({ 
        message: 'Relevé enregistré avec succès à ' + new Date().toLocaleString(),
        releveId
      });
    } catch (error) {
      const statusCode = error.code ? 400 : 500;
      res.status(statusCode).send({ 
        message: error.message,
        code: error.code,
        timestamp: new Date().toISOString()
      });
    }
  },
  genererRapportJournalier: async (req, res) => {
    try {
      const { date } = req.body;
      
      // Validation de la date
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ 
          success: false,
          message: 'Format de date invalide. Utilisez YYYY-MM-DD'
        });
      }
  
      // Vérifier qu'il existe des relevés pour cette date
      const [releves] = await db.query(
        'SELECT COUNT(*) as count FROM releves_postes WHERE DATE(date_heure_saisie) = ? AND statut = "saisie"',
        [date]
      );
  
      if (releves[0].count === 0) {
        return res.status(404).json({ 
          success: false,
          message: `Aucun relevé valide trouvé pour la date ${date}`
        });
      }
  
      const rowsInserted = await Pistolet.generateRapportJournalier(date);
  
      if (rowsInserted === 0) {
        return res.status(404).json({ 
          success: false,
          message: `Aucun rapport généré pour ${date} (pas de données valides)`
        });
      }
  
      res.json({ 
        success: true,
        message: `Rapport généré pour ${date} (${rowsInserted} pistolets)`,
        date_rapport: date
      });
  
    } catch (error) {
      console.error('Erreur génération rapport:', error);
      res.status(500).json({ 
        success: false,
        message: 'Erreur serveur lors de la génération'
      });
    }
  },
    // Nouvelle méthode pour obtenir les revenus (version simplifiée)
getRevenusJournaliers: async (req, res) => {
  try {
    const { date_debut, date_fin, pistolet_id } = req.query;
    
    // Validation des dates
    if (!date_debut || !date_fin || 
        !/^\d{4}-\d{2}-\d{2}$/.test(date_debut) || 
        !/^\d{4}-\d{2}-\d{2}$/.test(date_fin)) {
      return res.status(400).json({ 
        success: false,
        message: 'Les paramètres date_debut et date_fin (format YYYY-MM-DD) sont obligatoires' 
      });
    }

    // Vérifier que date_debut <= date_fin
    if (new Date(date_debut) > new Date(date_fin)) {
      return res.status(400).json({
        success: false,
        message: 'date_debut doit être antérieure ou égale à date_fin'
      });
    }

    const revenus = await Pistolet.getRevenusJournaliers(
      date_debut, 
      date_fin,
      pistolet_id || null
    );
    
    if (revenus.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Aucun relevé trouvé pour la période spécifiée'
      });
    }
    
    res.status(200).json({
      success: true,
      data: revenus,
      period: `${date_debut} à ${date_fin}`
    });
  } catch (error) {
    console.error('Erreur récupération revenus:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération des revenus',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
},
updateStatut : async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    // Validation
    if (!id || !statut) {
      return res.status(400).json({
        success: false,
        message: 'ID du relevé et nouveau statut sont requis'
      });
    }

    const result = await Releve.updateStatutReleve(id, statut);
    
    res.json({
      success: true,
      message: result.message
    });

  } catch (error) {
    console.error('Erreur contrôleur updateStatut:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la mise à jour du statut'
    });
  }
},
  // [EXISTANT] Mettre à jour l'index d'ouverture (déprécié - à conserver pour compatibilité)
  updateIndexOuverture: async (req, res) => {
    try {
      const { id, index_ouverture } = req.body;
      const result = await Pistolet.updateIndexOuverture(id, index_ouverture);
      if (result) {
        res.status(200).send({ message: 'Index d\'ouverture mis à jour avec succès.' });
      } else {
        res.status(404).send({ message: 'Pistolet non trouvé.' });
      }
    } catch (error) {
      res.status(500).send({ 
        message: 'Erreur lors de la mise à jour de l\'index d\'ouverture',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  // [EXISTANT] Mettre à jour l'index de fermeture (déprécié)
  updateIndexFermeture: async (req, res) => {
    try {
      const { id, index_fermeture } = req.body;
      const result = await Pistolet.updateIndexFermeture(id, index_fermeture);
      if (result) {
        res.status(200).send({ message: 'Index de fermeture mis à jour avec succès.' });
      } else {
        res.status(404).send({ message: 'Pistolet non trouvé.' });
      }
    } catch (error) {
      res.status(500).send({ 
        message: 'Erreur lors de la mise à jour de l\'index de fermeture',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  // [EXISTANT] Récupérer les pistolets d'une pompe
  getPistoletsByPompeId: async (req, res) => {
    try {
      const { pompe_id } = req.params;
      const pistolets = await Pistolet.getPistoletsByPompeId(pompe_id);
      res.status(200).send(pistolets);
    } catch (error) {
      res.status(500).send({ 
        message: 'Erreur lors de la récupération des pistolets',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  // [EXISTANT] Mettre à jour le statut d'un pistolet
  updateStatutPistolet: async (req, res) => {
    try {
      const { id, statut } = req.body;
      if (!['disponible', 'indisponible', 'maintenance'].includes(statut)) {
        return res.status(400).send({ message: 'Statut invalide' });
      }
      const result = await Pistolet.updateStatutPistolet(id, statut);
      if (result) {
        res.status(200).send({ message: 'Statut mis à jour avec succès.' });
      } else {
        res.status(404).send({ message: 'Pistolet non trouvé.' });
      }
    } catch (error) {
      res.status(500).send({ 
        message: 'Erreur lors de la mise à jour du statut',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  // [EXISTANT] Récupérer tous les pistolets
  getAllPistolets: async (req, res) => {
    try {
      const pistolets = await Pistolet.getAllPistolets();
      res.status(200).send(pistolets);
    } catch (error) {
      res.status(500).send({ 
        message: 'Erreur lors de la récupération des pistolets',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  // [NOUVEAU] Récupérer l'historique des relevés
  getHistoriqueReleves: async (req, res) => {
    try {
      const { pistolet_id } = req.params;
      const { date_debut, date_fin } = req.query;
      
      if (!date_debut || !date_fin) {
        return res.status(400).send({ 
          message: 'Les paramètres date_debut et date_fin sont obligatoires' 
        });
      }

      const historique = await Pistolet.getHistoriqueReleves(
        pistolet_id, 
        date_debut, 
        date_fin
      );
      
      res.status(200).send(historique);
    } catch (error) {
      res.status(500).send({ 
        message: 'Erreur lors de la récupération de l\'historique',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }
};

export default PistoletController;