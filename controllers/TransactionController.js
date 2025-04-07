import Transaction from '../models/Transaction.js';
import Credit from '../models/Credit.js';

// Créer une transaction
const createTransaction = async (req, res) => {
  try {
    const { id_vehicule, id_utilisateur, quantite, montant, id_credit } = req.body;

    // Ajouter une transaction
    await Transaction.addTransaction(id_vehicule, id_utilisateur, quantite, montant, id_credit);

    // Mettre à jour le solde du crédit
    await Credit.updateCredit(id_credit, montant);

    res.status(201).json({ message: 'Transaction enregistrée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export des fonctions
export default {
  createTransaction,
};
