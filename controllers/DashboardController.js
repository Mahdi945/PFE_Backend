// controllers/DashboardController.js
import Credit from '../models/Credit.js';
import User from '../models/User.js';
import Paiments from '../models/Paiments.js';
import Pompe from '../models/Pompe.js';
import Pistolet from '../models/Pistolet.js';
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
        data: formattedData,
        currency: 'TND' // Ajout de la devise par défaut
      });
    } catch (error) {
      console.error('Dashboard Error:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des données du dashboard'
      });
    }
  }
// controllers/DashboardController.js
static async getGerantDashboard(req, res) {
  try {
    const filter = req.query.filter || { type: 'month' };
    const currentDate = new Date();
    
    // Set default values if not provided
    if (filter.type === 'month' && !filter.month) {
      filter.month = currentDate.getMonth() + 1;
    }
    if ((filter.type === 'month' || filter.type === 'year') && !filter.year) {
      filter.year = currentDate.getFullYear();
    }

    const [
      userStats,
      creditStats,
      pompeStats,
      dailyRevenues,
      transactionStats,
      dailyTransactionStats
    ] = await Promise.all([
      User.getUserStats(filter),
      Credit.getGlobalCreditStats(filter),
      Pompe.getPompeStats(),
      Pistolet.getDailyRevenues(filter),
      Transaction.getTransactionStatsByPeriod(filter),
      Transaction.getDailyTransactionStats(filter)
    ]);

    res.json({
      success: true,
      data: {
        userStats: userStats[0][0] || {},
        creditStats: creditStats[0][0] || {},
        pompeStats: pompeStats[0] || [],
        dailyRevenues: dailyRevenues || [],
        transactionStats: transactionStats[0] || [],
        dailyTransactionStats: dailyTransactionStats[0] || []
      },
      filter: filter
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des données du dashboard'
    });
  }

  }} 
export default DashboardController;