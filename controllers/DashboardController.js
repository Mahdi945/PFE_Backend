// controllers/DashboardController.js
import Credit from '../models/Credit.js';
import User from '../models/User.js';
import Paiments from '../models/paiments.js';
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
  static async getGerantDashboard(req, res) {
    try {
      const filter = req.query.filter || { type: 'month' };
      
      // Définir les valeurs par défaut
      if (filter.type === 'month') {
        filter.month = filter.month || new Date().getMonth() + 1;
        filter.year = filter.year || new Date().getFullYear();
      } else if (filter.type === 'year') {
        filter.year = filter.year || new Date().getFullYear();
      }
  
      const [
        userStats,
        creditStats,
        recentTransactions,
        pompeStats,
        allTransactions,
        creditsWithVehicules,
        dailyRevenues,
        paymentStats
      ] = await Promise.all([
        User.getUserStats(filter),
        Credit.getGlobalCreditStats(filter),
        Transaction.getRecentTransactionsAll(),
        Pompe.getPompeStats(),
        Transaction.getAllTransactions(),
        Credit.getCreditsWithVehicules(),
        Pistolet.getDailyRevenues(filter),
        Paiments.getPaymentStats(filter)
      ]);
  
      res.json({ 
        success: true,
        data: {
          userStats: userStats[0][0] || {}, // Prendre le premier élément des résultats
          creditStats: creditStats[0][0] || {},
          pompeStats: pompeStats[0] || [],
          dailyRevenues: dailyRevenues || [],
          allTransactions: allTransactions[0] || [],
          creditsWithVehicules: creditsWithVehicules[0] || [],
          paymentStats: paymentStats || []
        },
        filter: filter
      });
    } catch (error) {
      console.error('Dashboard Gerant Error:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des données du dashboard gérant'
      });
    }
  }}

export default DashboardController;