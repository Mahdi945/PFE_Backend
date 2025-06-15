import Credit from '../models/Credit.js';
import db from '../config/db.js';

/**
 * Crée un nouveau crédit pour un client
 * Vérifie l'utilisateur et ajoute le crédit avec les paramètres spécifiés
 */
const createCredit = async (req, res) => {
  try {
    const { utilisateur, type_credit, solde_credit, date_debut, duree_credit } = req.body;

    if (!utilisateur || !type_credit || !solde_credit || !date_debut || !duree_credit) {
      return res.status(400).json({ error: 'Toutes les informations sont requises' });
    }

    const query = 'SELECT id, role FROM utilisateurs WHERE username = ? AND role = "client"';
    const [user] = await db.execute(query, [utilisateur]);

    if (user.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    const id_utilisateur = user[0].id;

    const [result] = await Credit.addCredit(
      id_utilisateur,
      type_credit,
      solde_credit,
      date_debut,
      duree_credit
    );
    res.status(201).json({ message: 'Crédit créé avec succès', creditId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère tous les crédits du système
 * Retourne la liste complète avec détails utilisateurs
 */
const getAllCredits = async (req, res) => {
  try {
    const [credits] = await Credit.getAllCredits();
    res.json(credits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère un crédit spécifique par son ID
 * Retourne les détails complets du crédit ou erreur 404
 */
const getCreditById = async (req, res) => {
  try {
    const { id_credit } = req.params;
    const [credit] = await Credit.getCreditById(id_credit);

    if (credit.length === 0) {
      return res.status(404).json({ message: 'Crédit introuvable' });
    }

    res.json(credit[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Met à jour le solde d'un crédit existant
 * Vérifie les limites du crédit avant d'effectuer la mise à jour
 */
const updateCredit = async (req, res) => {
  try {
    const { id_credit, montant } = req.body;

    const [credit] = await Credit.getCreditById(id_credit);

    if (credit.length === 0) {
      return res.status(404).json({ message: 'Crédit introuvable' });
    }

    await Credit.updateCredit(id_credit, montant);
    res.status(200).json({ message: 'Crédit mis à jour avec succès' });
  } catch (err) {
    if (err.message === 'Le montant dépasse le solde restant du crédit') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

/**
 * Met à jour l'état d'un crédit (actif, expiré, annulé, etc.)
 * Valide l'état fourni avant d'effectuer la mise à jour
 */
const updateCreditState = async (req, res) => {
  try {
    const { id_credit, etat } = req.body;

    const validStates = ['actif', 'expiré', 'annulé', 'remboursé', 'en attente'];
    if (!validStates.includes(etat)) {
      return res.status(400).json({ error: 'État invalide.' });
    }

    const [result] = await Credit.updateCreditState(id_credit, etat);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Crédit non trouvé.' });
    }

    res.status(200).json({ message: 'État du crédit mis à jour avec succès.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/**
 * Renouvelle un crédit existant
 * Crée un nouveau crédit basé sur un crédit précédent avec de nouveaux paramètres
 */
const renewCredit = async (req, res) => {
  try {
    const { id_credit, solde_credit, date_debut, duree_credit } = req.body;

    // Vérifier que le crédit existe et est remboursé
    const [credit] = await Credit.getCreditById(id_credit);
    if (credit.length === 0) {
      return res.status(404).json({ error: 'Crédit introuvable' });
    }

    // Créer un nouveau crédit
    const [result] = await Credit.renewCredit(id_credit, solde_credit, duree_credit, date_debut);

    res.status(201).json({
      message: 'Crédit renouvelé avec succès',
      newCreditId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/**
 * Met à jour automatiquement les crédits expirés
 * Fonction utilitaire pour traiter les crédits dont la date d'expiration est dépassée
 */
const updateExpiredCredits = async (req, res) => {
  try {
    await Credit.updateExpiredCredits();
    res.status(200).json({ message: 'Les crédits expirés ont été mis à jour.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/**
 * Récupère tous les crédits associés à un utilisateur
 * Retourne l'historique complet des crédits pour un client spécifique
 */
const getCreditsByUser = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [credits] = await Credit.getCreditsByUser(id_utilisateur);
    res.json({ success: true, data: credits });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Récupère les statistiques de crédit d'un utilisateur
 * Retourne les données agrégées sur l'utilisation du crédit par un client
 */
const getCreditStats = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const [stats] = await Credit.getCreditStats(id_utilisateur);
    res.json({ success: true, data: stats[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default {
  createCredit,
  renewCredit,
  getAllCredits,
  getCreditById,
  updateCredit,
  updateCreditState,
  updateExpiredCredits,
  getCreditStats,
  getCreditsByUser,
};
