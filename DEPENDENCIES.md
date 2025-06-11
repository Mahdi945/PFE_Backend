# 📦 Documentation des Dépendances - Station Service Backend

## 🏗️ Architecture du Projet
API REST avec WebSocket, authentification JWT, base de données MySQL pour la gestion complète d'une station-service.

---

## 🔧 Dépendances de Production

### **Framework et Serveur Web**
- **`express`** (^4.21.2) - Framework web Node.js principal pour créer l'API REST
  - 🎯 **Usage**: Configuration du serveur HTTP, middleware, routes API
  - 📝 **Config**: Port 3000, middleware JSON, URL encoding, static files
  - 🔧 **Avantages**: Performance, flexibilité, large écosystème
  
- **`body-parser`** (^2.2.0) - Middleware pour parser les données POST (intégré dans Express moderne)
  - 📊 **Formats supportés**: JSON, URL-encoded, raw, text
  - ⚡ **Performance**: Limite de taille configurable (50mb pour les uploads)
  
- **`cookie-parser`** (^1.4.7) - Middleware pour gérer les cookies HTTP
  - 🍪 **Usage**: Stockage sécurisé des tokens JWT dans les cookies httpOnly
  - 🔒 **Sécurité**: Protection contre XSS, expiration automatique
  
- **`cors`** (^2.8.5) - Cross-Origin Resource Sharing - autorise les requêtes depuis le frontend Angular
  - 🌐 **Origines**: http://localhost:4200 (dev), domaine production
  - 📋 **Méthodes**: GET, POST, PUT, DELETE, OPTIONS
  - 🔑 **Headers**: Authorization, Content-Type, credentials: true

### **Communication Temps Réel**
- **`socket.io`** (^4.8.1) - WebSocket pour messagerie instantanée et notifications en temps réel
  - 💬 **Fonctionnalités**: Chat privé/groupe, notifications push, compteurs temps réel
  - 🔄 **Events**: message-sent, notification-received, user-connected, typing-indicator
  - ⚡ **Performance**: Reconnexion automatique, fallback polling si WebSocket indisponible
  - 🎯 **Salles**: Rooms par conversation, broadcast sélectif

### **Base de Données**
- **`mysql2`** (^3.13.0) - Driver MySQL avec support Promise et prepared statements pour la sécurité
  - 🗄️ **Tables principales**: utilisateurs, transactions, vehicles, credits, messages, stocks
  - 🔒 **Sécurité**: Prepared statements contre injection SQL, connexions poolées
  - ⚡ **Performance**: Connection pooling (10 connexions max), requêtes asynchrones
  - 📊 **Transactions**: Support des transactions ACID pour opérations critiques

### **Authentification et Sécurité**
- **`passport`** (^0.7.0) - Middleware d'authentification flexible et modulaire
  - 🎫 **Stratégies**: JWT pour API, session pour OAuth (futur)
  - 🔐 **Config**: Extraction token depuis cookies, validation automatique
  
- **`passport-jwt`** (^4.0.1) - Stratégie Passport pour l'authentification JWT
  - 📍 **Extraction**: Cookies httpOnly (sécurisé), headers Authorization (mobile)
  - ⏰ **Expiration**: 24h pour access token, 7j pour refresh token
  
- **`jsonwebtoken`** (^9.0.2) - Génération et vérification des tokens JWT
  - 🔑 **Payload**: user_id, role, permissions, exp, iat
  - 🛡️ **Secret**: Variable d'environnement JWT_SECRET (256 bits minimum)
  
- **`express-jwt`** (^8.5.1) - Middleware Express pour protéger les routes avec JWT
  - 🚫 **Routes publiques**: /login, /register, /reset-password
  - ✅ **Routes protégées**: Toutes les API CRUD, WebSocket auth
  
- **`bcrypt`** (^5.1.1) - Hachage sécurisé des mots de passe (version native)
  - 🔢 **Salt rounds**: 12 (compromis sécurité/performance)
  - ⚡ **Performance**: Version C++ compilée, plus rapide que bcryptjs
  
- **`bcryptjs`** (^3.0.2) - Alternative pure JavaScript pour le hachage (backup)
  - 🔄 **Fallback**: Utilisé si bcrypt natif non disponible
  - 🌐 **Compatibilité**: Fonctionne sur tous environnements Node.js

### **Validation et Traitement de Données**
- **`express-validator`** (^7.2.1) - Validation et sanitization des données d'entrée

### **Gestion des Fichiers**
- **`multer`** (^1.4.5-lts.2) - Upload de fichiers (photos utilisateurs, documents transactions)
- **`fs`** (^0.0.1-security) - Système de fichiers Node.js (module natif)
- **`fs-extra`** (^11.3.0) - Fonctions étendues pour la gestion de fichiers
- **`path`** (^0.12.7) - Manipulation des chemins de fichiers
- **`sharp`** (^0.33.5) - Traitement d'images (redimensionnement, optimisation)

### **Tâches Planifiées**
- **`node-cron`** (^3.0.3) - Planificateur de tâches (vérifications crédits, alertes stock)
  - ⏰ **5 CRON jobs actifs**:
    * `0 3 * * *` - Désactivation comptes crédits expirés (3h du matin)
    * `0 0 * * *` - Vérification quotidienne crédits (minuit)
    * `0 * * * *` - Notifications paiements en attente (chaque heure)
    * `0 * * * *` - Alertes stock bas + commandes auto (chaque heure)
    * `0 9 * * 1` - Résumés hebdomadaires (lundi 9h)
  - 🔄 **Gestion erreurs**: Try-catch, logs détaillés, notifications admin
  - 📊 **Monitoring**: Statistiques d'exécution, temps de traitement

### **Notifications et Email**
- **`nodemailer`** (^6.10.0) - Envoi d'emails automatiques (notifications, alertes)

### **Cache et Performance**
- **`memory-cache`** (^0.2.0) - Cache en mémoire pour optimiser les performances

### **Génération de Codes QR**
- **`qrcode`** (^1.5.4) - Génération de QR codes pour les véhicules clients

### **Configuration et Environnement**
- **`dotenv`** (^16.4.7) - Chargement des variables d'environnement (.env)
- **`url`** (^0.11.4) - Utilitaires pour manipulation d'URLs

### **Requêtes HTTP Externes**
- **`axios`** (^1.9.0) - Client HTTP pour appels API externes

### **Documentation API**
- **`swagger-jsdoc`** (^6.2.8) - Génération automatique de documentation Swagger
- **`swagger-ui-express`** (^5.0.1) - Interface web Swagger pour tester l'API

### **Intégration ERP**
- **`odoo-xmlrpc`** (^1.0.8) - Connecteur pour intégration avec Odoo ERP
- **`xmlrpc`** (^1.3.2) - Client XML-RPC générique

### **Visualisation de Données**
- **`chart.js`** (^4.4.8) - Bibliothèque de graphiques pour tableaux de bord

---

## 🧪 Dépendances de Développement

### **Compilation et Transpilation**
- **`@babel/core`** (^7.26.10) - Compilateur JavaScript moderne
- **`@babel/plugin-transform-modules-commonjs`** (^7.27.1) - Plugin Babel pour modules CommonJS
- **`@babel/preset-env`** (^7.27.2) - Preset Babel pour compatibilité navigateurs
- **`@babel/register`** (^7.25.9) - Hook Babel pour require()
- **`babel-jest`** (^29.7.0) - Intégration Babel avec Jest

### **Tests**
- **`jest`** (^29.7.0) - Framework de tests JavaScript
- **`mocha`** (^11.5.0) - Framework de tests alternatif
- **`chai`** (^5.2.0) - Bibliothèque d'assertions pour tests
- **`chai-http`** (^5.1.2) - Extension Chai pour tester les APIs HTTP
- **`sinon`** (^20.0.0) - Bibliothèque de mocks et stubs
- **`supertest`** (^7.0.0) - Tests d'intégration HTTP

### **Outils de Développement**
- **`prettier`** (^3.5.3) - Formateur de code automatique
- **`cross-env`** (^7.0.3) - Variables d'environnement cross-platform

---

## 🚀 Scripts Disponibles

```bash
npm start          # Démarre le serveur en production
npm test           # Lance tous les tests
npm run test:watch # Lance les tests en mode watch
npm run format     # Formate le code avec Prettier
npm run format:check # Vérifie le formatage du code
```

---

## 📂 Utilisation dans le Projet

### **API REST**
- Gestion des utilisateurs (clients, agents, gérant)
- Système de crédits et paiements
- Gestion des pompes et pistolets
- Stocks et réapprovisionnement automatique

### **WebSocket**
- Messagerie instantanée entre utilisateurs
- Notifications en temps réel
- Mise à jour des compteurs non lus

### **Tâches Automatisées**
- Vérification quotidienne des crédits expirés
- Alertes de stock bas
- Génération de commandes automatiques
- Résumés hebdomadaires

### **Sécurité**
- Authentification JWT
- Hachage des mots de passe
- Validation des données d'entrée
- Protection CORS
