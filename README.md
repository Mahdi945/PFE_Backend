# CarboTrack - Plateforme de Gestion de Station-Service

## Table des Matières

1. [Présentation](#présentation)
2. [Fonctionnalités](#fonctionnalités)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Démarrage](#démarrage)
7. [Documentation](#documentation)
8. [Auteurs](#auteurs)
9. [Licence](#licence)

## Présentation

Solution web complète pour la gestion des stations-service développée avec :

- Frontend Angular :
  [https://github.com/Mahdi945/PFE_Frontend](https://github.com/Mahdi945/PFE_Frontend)
- Backend Node.js/Express :
  [https://github.com/Mahdi945/PFE_Backend](https://github.com/Mahdi945/PFE_Backend)

## Fonctionnalités

- 🔐 Système d'authentification sécurisé
- 👥 Gestion des rôles (5 niveaux d'accès)
- ⛽ Suivi des pompes et index
- 💳 Gestion des crédits clients
- 📦 Inventaire et gestion de stock
- 🧾 Point de vente intégré
- 📊 Tableaux de bord analytiques

## Technologies

**Frontend** :

- Angular 18
- TypeScript 5.3
- Bootstrap 5.3
- Chart.js 4.4
- RxJS 7.8

**Backend** :

- Node.js 18
- Express 4.18
- MySQL 8.0
- JWT
- Bcrypt

## Installation

```bash
# Cloner les dépôts
git clone https://github.com/Mahdi945/PFE_Frontend.git
git clone https://github.com/Mahdi945/PFE_Backend.git

# Installer les dépendances
cd PFE_Frontend && npm install
cd ../PFE_Backend && npm install
```

## Configuration

### Backend (`.env`)

```ini
DB_HOST=localhost
DB_USER=root
DB_PASS=votre_mdp
DB_NAME=carbotrack
JWT_SECRET=votre_cle_secrete
PORT=3000
```

### Frontend (`environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  authKey: 'carbotrack_auth',
};
```

## Démarrage

```bash
# Démarrer le backend
cd PFE_Backend
npm run dev

# Démarrer le frontend
cd ../PFE_Frontend
ng serve
```

Accès à l'application : [http://localhost:4200](http://localhost:4200)

## Documentation

Documentation interactive disponible après connexion :

- 📘 Guide utilisateur complet
- 🛡️ Tableaux des permissions
- 🔁 Procédures étape par étape
- ❓ FAQ technique

## Auteurs

**Mahdi Bey**

- GitHub : [Mahdi945](https://github.com/Mahdi945)
- Email : mahdibeyy@gmail.com

**Yassine Zaghdoudi**

- GitHub : [YassineZaghdoudi](https://github.com/YassineZaghdoudi9)
- Email : yassinezaghdoudi9@gmail.com

## Licence

Projet sous licence **MIT** – Voir le fichier `LICENSE`.

---

<div align="center">
  🛠️ Projet de Fin d'Études – ISET 2024 | Développé pour MSPRO 🛢️
</div>
