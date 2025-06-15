import Pistolet from '../models/Pistolet.js';
import Pompe from '../models/Pompe.js';
import Affectation from '../models/AffectationCalendrier.js';
import db from '../config/db.js';

const PistoletController = {
  /**
   * Ajoute un nouveau pistolet à une pompe existante
   * Crée un pistolet avec numéro, produit et prix unitaire
   */
  addPistolet: async (req, res) => {
    try {
      const { numero_pompe, numero_pistolet, nom_produit, prix_unitaire } = req.body;

      if (!numero_pistolet || !numero_pompe || !nom_produit || !prix_unitaire) {
        return res.status(400).send({
          message:
            'Tous les champs sont obligatoires (numéro pompe, numéro pistolet, nom produit, prix unitaire)',
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
        pistoletId,
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res
          .status(400)
          .send({ message: 'Ce numéro de pistolet existe déjà pour cette pompe' });
      }
      res.status(500).send({
        message: "Erreur lors de l'ajout du pistolet",
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  },
  /**
   * Enregistre un nouveau relevé de pistolet
   * Valide les index d'ouverture et fermeture avant l'enregistrement
   */
  enregistrerReleve: async (req, res) => {
    try {
      const { affectation_id, pistolet_id, index_ouverture, index_fermeture } = req.body;

      if (!affectation_id || !pistolet_id || isNaN(index_ouverture) || isNaN(index_fermeture)) {
        return res.status(400).send({
          message: 'Tous les champs sont obligatoires',
        });
      }

      if (parseFloat(index_fermeture) < parseFloat(index_ouverture)) {
        return res.status(400).send({
          message: 'Index de fermeture invalide',
        });
      }

      const releveId = await Pistolet.createRelevePoste(
        affectation_id,
        pistolet_id,
        index_ouverture,
        index_fermeture
      );

      res.status(201).send({
        message: 'Relevé enregistré avec succès',
        releveId,
      });
    } catch (error) {
      const statusCode = error.code ? 400 : 500;
      res.status(statusCode).send({
        message: error.message,
        code: error.code,
      });
    }
  },

  /**
   * Ajoute un relevé manuel avec date/heure spécifiée
   * Permet l'ajout rétroactif de relevés manqués
   */
  ajouterReleveManuel: async (req, res) => {
    try {
      const { affectation_id, pistolet_id, index_ouverture, index_fermeture, date_heure } =
        req.body;

      if (
        !affectation_id ||
        !pistolet_id ||
        isNaN(index_ouverture) ||
        isNaN(index_fermeture) ||
        !date_heure
      ) {
        return res.status(400).send({
          message: 'Tous les champs sont obligatoires',
        });
      }

      if (parseFloat(index_fermeture) < parseFloat(index_ouverture)) {
        return res.status(400).send({
          message: 'Index de fermeture invalide',
        });
      }

      const releveId = await Pistolet.addReleveManuel(
        affectation_id,
        pistolet_id,
        index_ouverture,
        index_fermeture,
        date_heure
      );

      res.status(201).send({
        message: 'Relevé manuel enregistré avec succès',
        releveId,
      });
    } catch (error) {
      console.error('Erreur ajout manuel:', error);
      res.status(500).send({
        message: error.message || "Erreur lors de l'ajout manuel",
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  },

  /**
   * Génère automatiquement un rapport journalier pour une date donnée
   * Calcule les totaux de quantité et montant pour tous les pistolets
   */
  genererRapportJournalier: async (req, res) => {
    try {
      const { date } = req.body;

      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({
          success: false,
          message: 'Format de date invalide. Utilisez YYYY-MM-DD',
        });
      }

      const rowsInserted = await Pistolet.generateRapportJournalier(date);

      res.json({
        success: true,
        message: `Rapport généré pour ${date} (${rowsInserted} pistolets)`,
        date_rapport: date,
      });
    } catch (error) {
      console.error('Erreur génération rapport:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur serveur lors de la génération',
      });
    }
  },
  /**
   * Ajoute manuellement un rapport journalier pour un pistolet
   * Permet la saisie directe des totaux sans calcul automatique
   */
  ajouterRapportManuel: async (req, res) => {
    try {
      const { date_rapport, pistolet_id, total_quantite, total_montant } = req.body;

      // Validation des données
      if (!date_rapport || !pistolet_id || isNaN(total_quantite) || isNaN(total_montant)) {
        return res.status(400).json({
          success: false,
          message: 'Tous les champs sont obligatoires et doivent être valides',
        });
      }

      // Vérifier le format de la date
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date_rapport)) {
        return res.status(400).json({
          success: false,
          message: 'Format de date invalide. Utilisez YYYY-MM-DD',
        });
      }

      // Vérifier que le pistolet existe
      const [pistolet] = await db.query('SELECT id FROM pistolets WHERE id = ?', [pistolet_id]);
      if (pistolet.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Pistolet non trouvé',
        });
      }

      // Ajouter le rapport manuel
      const rapportId = await Pistolet.addRapportJournalierManuel(
        date_rapport,
        pistolet_id,
        total_quantite,
        total_montant
      );

      res.status(201).json({
        success: true,
        message: 'Rapport journalier ajouté manuellement avec succès',
        rapportId,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout manuel du rapport:", error);
      const statusCode = error.message.includes('existe déjà') ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || "Erreur lors de l'ajout du rapport",
      });
    }
  },
  /**
   * Récupère les revenus journaliers pour une période donnée
   * Filtre optionnellement par pistolet spécifique
   */
  getRevenusJournaliers: async (req, res) => {
    try {
      const { date_debut, date_fin, pistolet_id } = req.query;

      if (
        !date_debut ||
        !date_fin ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date_debut) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date_fin)
      ) {
        return res.status(400).json({
          success: false,
          message: 'Dates invalides. Utilisez YYYY-MM-DD',
        });
      }

      const revenus = await Pistolet.getRevenusJournaliers(
        date_debut,
        date_fin,
        pistolet_id || null
      );

      res.status(200).json({
        success: true,
        data: revenus,
        period: `${date_debut} à ${date_fin}`,
      });
    } catch (error) {
      console.error('Erreur récupération revenus:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des revenus',
      });
    }
  },
  /**
   * Met à jour le statut d'un relevé (validé, rejeté, etc.)
   * Permet la validation ou correction des relevés existants
   */
  updateStatut: async (req, res) => {
    try {
      const { id } = req.params;
      const { statut } = req.body;

      // Validation
      if (!id || !statut) {
        return res.status(400).json({
          success: false,
          message: 'ID du relevé et nouveau statut sont requis',
        });
      }

      const result = await Pistolet.updateStatutReleve(id, statut);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error('Erreur contrôleur updateStatut:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Erreur lors de la mise à jour du statut',
      });
    }
  },
  /**
   * Met à jour l'index d'ouverture d'un pistolet (méthode dépréciée)
   * Conservée pour compatibilité avec l'ancien système
   */
  updateIndexOuverture: async (req, res) => {
    try {
      const { id, index_ouverture } = req.body;
      const result = await Pistolet.updateIndexOuverture(id, index_ouverture);
      if (result) {
        res.status(200).send({ message: "Index d'ouverture mis à jour avec succès." });
      } else {
        res.status(404).send({ message: 'Pistolet non trouvé.' });
      }
    } catch (error) {
      res.status(500).send({
        message: "Erreur lors de la mise à jour de l'index d'ouverture",
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  },

  /**
   * Met à jour l'index de fermeture d'un pistolet (méthode dépréciée)
   * Conservée pour compatibilité avec l'ancien système
   */
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
        message: "Erreur lors de la mise à jour de l'index de fermeture",
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  },

  /**
   * Récupère tous les pistolets associés à une pompe spécifique
   * Retourne la liste complète avec leurs informations
   */
  getPistoletsByPompeId: async (req, res) => {
    try {
      const { pompe_id } = req.params;
      const pistolets = await Pistolet.getPistoletsByPompeId(pompe_id);
      res.status(200).send(pistolets);
    } catch (error) {
      res.status(500).send({
        message: 'Erreur lors de la récupération des pistolets',
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  },

  /**
   * Met à jour le statut opérationnel d'un pistolet
   * Gère les états: disponible, indisponible, maintenance
   */
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
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  },

  /**
   * Récupère la liste complète de tous les pistolets
   * Inclut toutes les informations des pistolets du système
   */
  getAllPistolets: async (req, res) => {
    try {
      const pistolets = await Pistolet.getAllPistolets();
      res.status(200).send(pistolets);
    } catch (error) {
      res.status(500).send({
        message: 'Erreur lors de la récupération des pistolets',
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  },

  /**
   * Récupère l'historique des relevés pour un pistolet ou tous les pistolets
   * Filtre par période et optionnellement par pistolet spécifique
   */
  getHistoriqueReleves: async (req, res) => {
    try {
      const { pistolet_id } = req.params;
      const { date_debut, date_fin } = req.query;

      // Validation 1: Les dates sont toujours obligatoires
      if (!date_debut || !date_fin) {
        return res.status(400).send({
          message: 'Les paramètres date_debut et date_fin sont obligatoires',
        });
      }

      // Si pistolet_id est fourni, on filtre par pistolet + dates
      // Sinon, on filtre seulement par dates
      const historique = await Pistolet.getHistoriqueReleves(
        pistolet_id, // peut être undefined
        date_debut,
        date_fin
      );

      res.status(200).send(historique);
    } catch (error) {
      res.status(500).send({
        message: "Erreur lors de la récupération de l'historique",
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      });
    }
  },
};

export default PistoletController;
