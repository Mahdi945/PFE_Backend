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
  static async getGerantDashboard(req, res) {
    try {
      const filter = req.query.filter || { type: 'month' };
      
      // Récupérer l'année et le mois actuels
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
  
      // Appliquer les valeurs par défaut si non spécifiées
      if (filter.type === 'month' && !filter.month) filter.month = currentMonth;
      if ((filter.type === 'month' || filter.type === 'year') && !filter.year) filter.year = currentYear;
  
      const [
        userStats,
        creditStats,
        recentTransactions,
        pompeStats,
        allTransactions,
        creditsWithVehicules,
        dailyRevenues,
        paymentStats,
        transactionTrends
      ] = await Promise.all([
        User.getUserStats(filter),
        Credit.getGlobalCreditStats(filter),
        Transaction.getRecentTransactionsAll(),
        Pompe.getPompeStats(),
        Transaction.getAllTransactions(),
        Credit.getCreditsWithVehicules(),
        Pistolet.getDailyRevenues(filter),
        Paiments.getPaymentStats(filter),
        Transaction.getTransactionStatsByPeriod(filter) // Utiliser le même filtre
      ]);
  
      // Formater les données de tendance
      const formattedTrends = transactionTrends[0].map((stat, index, array) => {
        const progressionMois = stat.progression_mois || 0;
        const progressionAnnee = stat.progression_annee || 0;
        
        const prevMonth = index > 0 ? array[index - 1].total_montant : 0;
        const prevYear = index >= 12 ? array[index - 12].total_montant : 0;
        
        return {
          ...stat,
          progression_mois_pct: prevMonth !== 0 ? (progressionMois / prevMonth * 100).toFixed(2) : 'N/A',
          progression_annee_pct: prevYear !== 0 ? (progressionAnnee / prevYear * 100).toFixed(2) : 'N/A'
        };
      });
  
      res.json({ 
        success: true,
        data: {
          userStats: userStats[0][0] || {},
          creditStats: creditStats[0][0] || {},
          pompeStats: pompeStats[0] || [],
          dailyRevenues: dailyRevenues || [],
          allTransactions: allTransactions[0] || [],
          creditsWithVehicules: creditsWithVehicules[0] || [],
          paymentStats: paymentStats[0] || [],
          transactionTrends: formattedTrends
        },
        filter: filter
      });
    } catch (error) {
      console.error('Dashboard Gerant Error:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des données du dashboard'
      });
    }
  }} 
export default DashboardController;