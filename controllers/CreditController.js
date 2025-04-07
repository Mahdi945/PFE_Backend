import Credit from '../models/Credit.js';

const createCredit = async (req, res) => {
  try {
    const { id_utilisateur, type_credit, solde_credit, date_debut, duree_credit } = req.body;
    const [result] = await Credit.addCredit(id_utilisateur, type_credit, solde_credit, date_debut, duree_credit);
    res.status(201).json({ message: 'Crédit créé avec succès', creditId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCredits = async (req, res) => {
  try {
    const [credits] = await Credit.getAllCredits();
    res.json(credits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un crédit par ID
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

// Mettre à jour le solde du crédit
const updateCredit = async (req, res) => {
  try {
    const { id_credit, montant } = req.body;

    // Vérifier si le crédit existe
    const [credit] = await Credit.getCreditById(id_credit);

    if (credit.length === 0) {
      return res.status(404).json({ message: 'Crédit introuvable' });
    }

    // Mettre à jour le crédit
    await Credit.updateCredit(id_credit, montant);
    res.status(200).json({ message: 'Crédit mis à jour avec succès' });
  } catch (err) {
    // Si l'erreur est liée au solde insuffisant, on la gère spécifiquement
    if (err.message === 'Le montant dépasse le solde restant du crédit') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

export default { createCredit, getAllCredits, getCreditById, updateCredit };
