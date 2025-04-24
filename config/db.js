// Importation du package mysql2 pour se connecter à la base de données MySQL
import mysql from 'mysql2';

// Importation du package dotenv pour charger les variables d'environnement depuis un fichier .env
import dotenv from 'dotenv';

// Charge les variables d'environnement du fichier .env dans process.env
dotenv.config();

// Crée un pool de connexions MySQL pour gérer l'accès à la base de données
const pool = mysql.createPool({
    
  // Hôte de la base de données (URL ou IP), récupéré depuis les variables d'environnement
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  multipleStatements: true // Ajoutez cette ligne
});

// Exporte la pool de connexions avec des promesses pour pouvoir l'utiliser avec async/await dans d'autres parties du code
export default pool.promise();
