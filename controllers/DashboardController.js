// controllers/DashboardController.js
import Credit from '../models/Credit.js';
import Paiments from '../models/paiments.js';
import Transaction from '../models/Transaction.js';
import Vehicule from '../models/Vehicule.js';

class DashboardController {
  static async getClientDashboard(req, res) {
    try {
      const { id_utilisateur } = req.params;

      // Récupération en parallèle des données
      const [
        creditStats,
        paymentStats,
        recentTransactions,
        recentPayments,
        vehicules,
        credits
      ] = await Promise.all([
        Credit.getCreditStats(id_utilisateur),
        Paiments.getPaymentStats(id_utilisateur),
        Transaction.getRecentTransactions(id_utilisateur),
        Paiments.getRecentPayments(id_utilisateur),
        Vehicule.getVehiculesByUserId(id_utilisateur),
        Credit.getCreditsByUser(id_utilisateur)
      ]);

      // Formattage des résultats
      const formattedData = {
        creditStats: creditStats[0][0] || {},
        paymentStats: paymentStats[0][0] || {},
        recentTransactions: recentTransactions[0] || [],
        recentPayments: recentPayments[0] || [],
        vehicules: vehicules[0] || [],
        credits: credits[0] || []
      };

      res.json({ 
        success: true,
        data: formattedData
      });
    } catch (error) {
      console.error('Dashboard Error:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des données du dashboard'
      });
    }
  }
}

export default DashboardController;