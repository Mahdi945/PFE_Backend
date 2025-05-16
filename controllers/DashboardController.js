// controllers/DashboardController.js
import Credit from '../models/Credit.js';
import User from '../models/User.js';
import Paiments from '../models/Paiments.js';
import Pompe from '../models/Pompe.js';
import Pistolet from '../models/Pistolet.js';
import Transaction from '../models/Transaction.js';
import Vehicule from '../models/Vehicule.js';
import db from '../config/db.js';

class DashboardController {
static async getClientDashboard(req, res) {
    try {
        const { id_utilisateur } = req.params;
        
        if (!id_utilisateur || isNaN(id_utilisateur)) {
            return res.status(400).json({
                success: false,
                message: 'ID utilisateur invalide'
            });
        }

        console.log(`[DEBUG] Fetching dashboard data for user ${id_utilisateur}`);
        
        // Fonction helper pour normaliser les réponses
        const safeQuery = async (queryFunc, defaultValue) => {
            try {
                const result = await queryFunc(id_utilisateur);
                return result && result[0] ? result[0] : defaultValue;
            } catch (err) {
                console.error(`[ERROR] Query failed: ${queryFunc.name}`, err);
                return defaultValue;
            }
        };

        // Exécution des requêtes avec gestion d'erreur individuelle
        const [
            creditStats,
            paymentStats,
            recentTransactions,
            recentPayments,
            vehicules,
            credits
        ] = await Promise.all([
            safeQuery(Credit.getCreditStats, [{}]),
            safeQuery(Paiments.getPaymentStats, [{}]),
            safeQuery(Transaction.getRecentTransactions, []),
            safeQuery(Paiments.getRecentPayments, []),
            safeQuery(Vehicule.getVehiculesByUserId, []),
            safeQuery(Credit.getCreditsByUser, [])
        ]);

        // Préparation des données avec des valeurs par défaut
        const formattedData = {
            creditStats: creditStats[0] || {
                credits_actifs: 0,
                credits_expires: 0,
                credits_annules: 0,
                credits_rembourses: 0,
                solde_restant: 0,
                total_solde: 0
            },
            paymentStats: {
  total_paye: paymentStats.total_paye || 0,
  nombre_paiements: paymentStats.nombre_paiements || 0,
  details: paymentStats.rows || []
},
            recentTransactions: recentTransactions || [],
            recentPayments: recentPayments || [],
            vehicules: vehicules || [],
            credits: credits || []
        };

        console.log('[DEBUG] Dashboard data prepared successfully');
        
        res.json({ 
            success: true,
            data: formattedData,
            currency: 'TND'
        });

    } catch (error) {
        console.error('[ERROR] Dashboard Controller Error:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        
        // Réponse avec structure complète même en cas d'erreur
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des données du dashboard',
            data: {
                creditStats: {
                    credits_actifs: 0,
                    credits_expires: 0,
                    credits_annules: 0,
                    credits_rembourses: 0,
                    solde_restant: 0,
                    total_solde: 0
                },
                paymentStats: { total_paye: 0 },
                recentTransactions: [],
                recentPayments: [],
                vehicules: [],
                credits: []
            }
        });
    }
}
static async getGerantDashboard(req, res) {
  try {
    const filter = req.query.filter || { type: 'year' };
    const currentDate = new Date();
    
    if (filter.type === 'month' && !filter.month) {
      filter.month = currentDate.getMonth() + 1;
    }
    if ((filter.type === 'month' || filter.type === 'year') && !filter.year) {
      filter.year = currentDate.getFullYear();
    }

    console.log('Filter:', filter);

    const [
      userStats,
      creditStats,
      creditsWithVehicules,
      pompeStats,
      dailyRevenues,
      transactionStats,
      dailyTransactionStats,
      transactions,
      paymentStats,
      paymentsByDate // Récupérer directement les paiements par date
    ] = await Promise.all([
      User.getUserStats(filter),
      Credit.getGlobalCreditStats(filter),
      Credit.getCreditsWithVehicules(),
      Pompe.getPompeStats(),
      Pistolet.getDailyRevenues(filter),
      Transaction.getTransactionStatsByPeriod(filter),
      Transaction.getDailyTransactionStats(filter),
      Transaction.getAllTransactions(),
      Paiments.getPaymentStats(filter),
      Paiments.getPaymentsByDate(filter) // Ajout direct ici
    ]);

    // Calculer les totaux à partir des paiements par date
    const total_payments = paymentsByDate.reduce((sum, item) => sum + (item.nombre_paiements || 0), 0);
    const total_amount = paymentsByDate.reduce((sum, item) => sum + parseFloat(item.total_paye || 0), 0);

    res.json({
      success: true,
      data: {
        userStats: userStats[0][0] || {},
        creditStats: creditStats[0][0] || {},
        creditsWithVehicules: creditsWithVehicules[0] || [],
        pompeStats: pompeStats[0] || [],
        dailyRevenues: dailyRevenues || [],
        transactionStats: transactionStats[0] || [],
        dailyTransactionStats: dailyTransactionStats[0] || [],
        allTransactions: transactions[0] || [],
        paymentStats: {
          total_payments,
          total_amount,
          payments_by_type: paymentStats.rows || [],
          payments_by_date: paymentsByDate
        }
      },
      filter: filter
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des données du dashboard',
      error: error.message
    });
  }
}
  static async getCaissierDashboard(req, res) {
    try {
      const { id_caissier } = req.params;
      const filters = req.query || {};
  
      const [userCheck] = await db.execute(
        'SELECT role FROM utilisateurs WHERE id = ?',
        [id_caissier]
      );
  
      if (!userCheck.length || userCheck[0].role !== 'caissier') {
        return res.status(403).json({
          success: false,
          message: 'Seuls les caissiers peuvent accéder à ce dashboard'
        });
      }
  
      const [payments, stats] = await Promise.all([
        Paiments.getByCaissier(id_caissier, filters),
        Paiments.getCaissierStats(id_caissier, filters)
      ]);
  
      res.json({
        success: true,
        data: {
          payments,
          stats,
          caissier_id: id_caissier
        }
      });
    } catch (error) {
      console.error('Dashboard Caissier Error:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des données du dashboard caissier'
      });
    }
  }
}

export default DashboardController;