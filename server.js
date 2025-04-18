import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRouter from './routes/authRoute.js';
import PermissionRouter from './routes/PermissionRoute.js';
import pompeRouter from './routes/PompeRoute.js';
import pistoletRouter from './routes/PistoletRoute.js';
import creditRouter from './routes/GestionCreditRoute.js';
import AffectationCalendrierRouter from './routes/AffectationCalendrierRoute.js';
import passport from './config/passport.js'; // Importer Passport correctement
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import cron from 'node-cron'; // Importer node-cron
import Credit from './models/Credit.js'; // Importer le modèle Credit

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON et les données de formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ajouter cette ligne pour parser les données du formulaire

// Configuration CORS pour accepter les cookies
app.use(cors({
  origin: 'http://localhost:4200', // Votre front-end Angular
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true // Permet d'envoyer des cookies
}));

app.use(cookieParser());

// Initialiser Passport
app.use(passport.initialize());

// Configurer les routes d'authentification
app.use('/api', authRouter);
app.use('/api', PermissionRouter);
app.use('/api/pompe', pompeRouter);
app.use('/api/pistolet', pistoletRouter);
app.use('/api/affectations', AffectationCalendrierRouter);
app.use('/api/credit', creditRouter);

// Servir les images depuis le dossier public/images
const __dirname = path.resolve(); // Récupère le chemin absolu du projet
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/qrcodes', express.static(path.join(__dirname, 'public/qrcodes')));

// Vérifier la connexion à la base de données
(async () => {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('✅ Connexion à la base de données station_service réussie');
  } catch (err) {
    console.error('❌ Erreur de connexion à la base de données :', err);
    process.exit(1);
  }
})();

// Planifier un cron job pour mettre à jour les crédits expirés
cron.schedule('0 0 * * *', async () => { // Exécution tous les jours à minuit
  try {
    console.log('🔄 Mise à jour des crédits expirés...');
    await Credit.updateExpiredCredits();
    console.log('✅ Mise à jour des crédits expirés terminée.');
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour des crédits expirés :', err);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

export default app;