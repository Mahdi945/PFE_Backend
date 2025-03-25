import Transaction from '../models/Transaction.js';
import Contrat from '../models/Contrat.js';

// Créer une transaction
const createTransaction = async (req, res) => {
  try {
    const { id_vehicule, id_utilisateur, quantite, montant, id_contrat } = req.body;
    await Transaction.addTransaction(id_vehicule, id_utilisateur, quantite, montant, id_contrat);

    // Mettre à jour le solde du contrat
    await Contrat.updateCredit(id_contrat, montant);

    res.status(201).json({ message: 'Transaction enregistrée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export des fonctions
export default {
  createTransaction,
};