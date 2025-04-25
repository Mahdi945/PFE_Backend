import Paiments from '../models/paiments.js';
import db from '../config/db.js';

const createPayment = async (req, res) => {
    try {
        const { id_credit, montant_paye, mode_paiement, description } = req.body;

        // 1. Validation des données de base
        if (!id_credit || !montant_paye || !mode_paiement) {
            return res.status(400).json({ 
                success: false,
                error: 'Données incomplètes (id_credit, montant_paye et mode_paiement requis)' 
            });
        }

        // 2. Conversion et validation du montant
        const montant = parseFloat(montant_paye);
        if (isNaN(montant) || montant <= 0) {
            return res.status(400).json({ 
                success: false,
                error: 'Montant invalide (doit être un nombre positif)' 
            });
        }

        // 3. Récupération du crédit et vérification
        const [creditRows] = await db.execute(
            `SELECT id, id_utilisateur, solde_credit, etat 
             FROM details_credits 
             WHERE id = ?`,
            [id_credit]
        );

        if (!creditRows || creditRows.length === 0) {
            return res.status(404).json({ 
                success: false,
                error: 'Crédit non trouvé' 
            });
        }

        const credit = creditRows[0];
        const id_utilisateur = credit.id_utilisateur;

        // 4. Vérification que le crédit est payable
        if (credit.etat !== 'actif') {
            return res.status(400).json({ 
                success: false,
                error: `Le crédit n'est plus payable (état actuel: ${credit.etat})` 
            });
        }

        // 5. Création du paiement
        const result = await Paiments.create(
            id_credit,
            id_utilisateur, // Récupéré depuis le crédit
            montant,
            mode_paiement,
            description
        );

        // 6. Réponse succès
        return res.status(201).json({
            success: true,
            message: 'Paiement enregistré avec succès',
            data: {
                paymentId: result.id,
                reference: result.reference,
                montant_paye: montant,
                montant_restant: result.montant_restant,
                etat_credit: result.etat,
                id_utilisateur: id_utilisateur
            }
        });

    } catch (err) {
        console.error('Erreur création paiement:', err);

        // Gestion des erreurs métier
        let status = 500;
        let errorMessage = 'Erreur lors de la création du paiement';

        if (err.message.includes('non trouvé')) {
            status = 404;
            errorMessage = err.message;
        } else if (err.message.includes('dépasse') || 
                   err.message.includes('doit être positif')) {
            status = 400;
            errorMessage = err.message;
        }

        return res.status(status).json({
            success: false,
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Paiments.getAll();
        
        res.json({
            success: true,
            data: payments // Envoyer directement le tableau
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const getPaymentsByCredit = async (req, res) => {
  try {
    const payments = await Paiments.getByCredit(req.params.id_credit);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Paiments.getByUser(req.params.id_utilisateur);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

const getPaymentByReference = async (req, res) => {
  try {
    const payment = await Paiments.getByReference(req.params.reference);
    if (!payment) {
      return res.status(404).json({ 
        success: false,
        error: 'Paiement non trouvé' 
      });
    }
    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};
const getPaymentStats = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [stats] = await Paiments.getPaymentStats(id_utilisateur);
    res.json({ success: true, data: stats[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getRecentPayments = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const payments = await Paiments.getRecentPayments(id_utilisateur);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
export default {
  createPayment,
  getAllPayments,
  getPaymentsByCredit,
  getPaymentsByUser,
  getPaymentByReference,
  getPaymentStats,
  getRecentPayments
};