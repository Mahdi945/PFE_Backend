import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRouter from './routes/authRoute.js';
import passport from './config/passport.js'; // Importer Passport correctement
import cors from 'cors';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Activer CORS
app.use(cors());

// Initialiser Passport
app.use(passport.initialize());

// Configurer les routes d'authentification
app.use('/api', authRouter);

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

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

export default app;