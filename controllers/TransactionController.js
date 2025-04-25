import Transaction from '../models/Transaction.js';
import Credit from '../models/Credit.js';

  const createTransaction = async (req, res) => {
    try {
      const { id_vehicule, id_utilisateur, quantite, montant, id_credit } = req.body;

      // Vérifier d'abord si le crédit existe et a suffisamment de solde
      const [credit] = await Credit.getCreditById(id_credit);
      if (!credit) {
        return res.status(404).json({ error: 'Crédit non trouvé' });
      }

      // Calculer le nouveau solde en tenant compte du crédit déjà utilisé
      const creditUtilise = credit.credit_utilise || 0;
      const nouveauSolde = credit.solde_credit - creditUtilise - montant;
      
      if (nouveauSolde < 0) {
        return res.status(400).json({ 
          error: 'Solde insuffisant', 
          solde_disponible: credit.solde_credit - creditUtilise
        });
      }

      // Ajouter la transaction
      await Transaction.addTransaction(id_vehicule, id_utilisateur, quantite, montant, id_credit);
      
      // Mettre à jour le crédit utilisé et l'état si nécessaire
      await Transaction.updateCredit(id_credit, montant);

      res.status(201).json({ 
        message: 'Transaction enregistrée avec succès',
        nouveau_solde: nouveauSolde
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const getAllTransactions = async (req, res) => {
    try {
      const [transactions] = await Transaction.getAllTransactions();
      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const getTransactionsByUser = async (req, res) => {
    try {
      const { id_utilisateur } = req.params;
      const [transactions] = await Transaction.getTransactionsByUser(id_utilisateur);
      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const getTransactionStats = async (req, res) => {
    try {
      const { id_utilisateur } = req.params;
      const [stats] = await Transaction.getTransactionStats(id_utilisateur);
      res.json({ success: true, data: stats[0] });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
  const getRecentTransactions = async (req, res) => {
    try {
      const { id_utilisateur } = req.params;
      const transactions = await Transaction.getRecentTransactions(id_utilisateur);
      res.json({ success: true, data: transactions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
// Export des fonctions
export default {
  createTransaction,
  getAllTransactions,
  getTransactionsByUser,
  getTransactionStats,
  getRecentTransactions
};
