import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Carbotrack',
      version: '1.0.0',
      description: 'API pour la gestion des réclamations Carbotrack',
      contact: {
        name: 'Support API',
        email: 'mahdibeyy@gmail.com',
      },
    },
    servers: [{ url: 'http://localhost:3000/api', description: 'Serveur local' }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'jwt',
          description: 'Authentification via cookie HTTP-only',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 14 },
            username: { type: 'string', example: 'Ahmed Zamma' },
            email: { type: 'string', example: 'mahdibeyy@gmail.com' },
            numero_telephone: { type: 'string', example: '56327237' },
            role: {
              type: 'string',
              enum: ['gerant', 'cogerant', 'client', 'caissier', 'pompiste'],
              example: 'gerant',
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive'],
              example: 'active',
            },
            photo: {
              type: 'string',
              example: '/images/nbg.png',
              nullable: true,
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'mahdibeyy@gmail.com',
            },
            password: {
              type: 'string',
              example: 'motdepasse123',
            },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['email', 'password', 'username', 'numero_telephone'],
          properties: {
            email: {
              type: 'string',
              example: 'nouveau@example.com',
            },
            password: {
              type: 'string',
              example: 'Motdepasse123!',
            },
            username: {
              type: 'string',
              example: 'Nouveau Utilisateur',
            },
            numero_telephone: {
              type: 'string',
              example: '98765432',
            },
            role: {
              type: 'string',
              enum: ['gerant', 'cogerant', 'client', 'caissier', 'pompiste'],
              example: 'client',
            },
          },
        },
        PasswordResetInput: {
          type: 'object',
          required: ['email'],
          properties: {
            email: {
              type: 'string',
              example: 'mahdibeyy@gmail.com',
            },
          },
        },
        NewPasswordInput: {
          type: 'object',
          required: ['token', 'newPassword'],
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            newPassword: {
              type: 'string',
              example: 'NouveauMotdepasse123!',
            },
          },
        },
        Pompe: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 34 },
            numero_pompe: { type: 'string', example: 'P020' },
            type_pompe: {
              type: 'string',
              enum: ['gasoil', 'multi-produits', 'sans plomb'],
              example: 'gasoil',
            },
            statut: {
              type: 'string',
              enum: ['active', 'reserve', 'maintenance', 'hors_service'],
              example: 'reserve',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2025-04-21T19:28:39Z',
            },
          },
        },
        PompeInput: {
          type: 'object',
          required: ['numero_pompe', 'type_pompe'],
          properties: {
            numero_pompe: {
              type: 'string',
              pattern: '^P[0-9]{3}$',
              example: 'P020',
              description: 'Doit commencer par P suivi de 3 chiffres',
            },
            type_pompe: {
              type: 'string',
              enum: ['gasoil', 'multi-produits', 'sans plomb'],
              example: 'gasoil',
            },
            statut: {
              type: 'string',
              enum: ['active', 'reserve', 'maintenance', 'hors_service'],
              example: 'reserve',
              default: 'reserve',
            },
          },
        },
        PompeUpdate: {
          type: 'object',
          properties: {
            numero_pompe: {
              type: 'string',
              pattern: '^P[0-9]{3}$',
              example: 'P020',
              description: 'Doit commencer par P suivi de 3 chiffres',
            },
            type_pompe: {
              type: 'string',
              enum: ['gasoil', 'multi-produits', 'sans plomb'],
              example: 'gasoil',
            },
            statut: {
              type: 'string',
              enum: ['active', 'reserve', 'maintenance', 'hors_service'],
              example: 'active',
            },
          },
        },
        PompeFilters: {
          type: 'object',
          properties: {
            type_pompe: {
              type: 'string',
              enum: ['gasoil', 'multi-produits', 'sans plomb'],
              example: 'gasoil',
              nullable: true,
            },
            statut: {
              type: 'string',
              enum: ['active', 'reserve', 'maintenance', 'hors_service'],
              example: 'active',
              nullable: true,
            },
            date_debut: {
              type: 'string',
              format: 'date',
              example: '2025-04-01',
              nullable: true,
            },
            date_fin: {
              type: 'string',
              format: 'date',
              example: '2025-04-30',
              nullable: true,
            },
          },
        },
        Pistolet: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 4 },
            pompe_id: { type: 'integer', example: 34 },
            numero_pistolet: { type: 'string', example: 'PIII1' },
            statut: {
              type: 'string',
              enum: ['disponible', 'indisponible', 'maintenance'],
              example: 'disponible',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2025-04-21T20:28:39Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-08T20:37:27Z',
            },
            nom_produit: { type: 'string', example: 'SP95' },
            prix_unitaire: { type: 'number', format: 'float', example: 2.5 },
            unite_mesure: { type: 'string', example: 'Litre', nullable: true },
            date_dernier_index: {
              type: 'string',
              format: 'date',
              example: '2025-05-08',
              nullable: true,
            },
            dernier_index: {
              type: 'number',
              format: 'float',
              example: 400.0,
              nullable: true,
            },
          },
        },
        PistoletInput: {
          type: 'object',
          required: ['pompe_id', 'numero_pistolet', 'nom_produit', 'prix_unitaire'],
          properties: {
            pompe_id: { type: 'integer', example: 34 },
            numero_pistolet: { type: 'string', example: 'PIII1' },
            nom_produit: { type: 'string', example: 'SP95' },
            prix_unitaire: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 2.5,
            },
            unite_mesure: {
              type: 'string',
              example: 'Litre',
              nullable: true,
            },
            statut: {
              type: 'string',
              enum: ['disponible', 'indisponible', 'maintenance'],
              example: 'disponible',
              default: 'disponible',
            },
          },
        },
        PistoletUpdate: {
          type: 'object',
          properties: {
            numero_pistolet: { type: 'string', example: 'PIII1' },
            nom_produit: { type: 'string', example: 'SP95' },
            prix_unitaire: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 2.5,
            },
            unite_mesure: { type: 'string', example: 'Litre' },
            date_dernier_index: {
              type: 'string',
              format: 'date',
              example: '2025-05-08',
            },
            dernier_index: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 400.0,
            },
          },
        },
        StatutUpdate: {
          type: 'object',
          required: ['statut'],
          properties: {
            statut: {
              type: 'string',
              enum: ['disponible', 'indisponible', 'maintenance'],
              example: 'maintenance',
            },
          },
        },

        Affectation: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 4074 },
            pompiste_id: { type: 'integer', example: 20 },
            poste_id: { type: 'integer', example: 3 },
            pompe_id: { type: 'integer', example: 35 },
            date: { type: 'string', format: 'date', example: '2025-05-01' },
          },
        },
        AffectationInput: {
          type: 'object',
          required: ['pompiste_id', 'poste_id', 'pompe_id', 'date'],
          properties: {
            pompiste_id: { type: 'integer', example: 20 },
            poste_id: { type: 'integer', example: 3 },
            pompe_id: { type: 'integer', example: 35 },
            date: { type: 'string', format: 'date', example: '2025-05-01' },
          },
        },
        AffectationUpdate: {
          type: 'object',
          properties: {
            pompiste_id: { type: 'integer', example: 20 },
            poste_id: { type: 'integer', example: 3 },
            pompe_id: { type: 'integer', example: 35 },
          },
        },
        MonthYearInput: {
          type: 'object',
          required: ['mois', 'annee'],
          properties: {
            mois: { type: 'integer', minimum: 1, maximum: 12, example: 5 },
            annee: { type: 'integer', example: 2025 },
          },
        },
        ReleveInput: {
          type: 'object',
          required: ['pistolet_id', 'index_fermeture'],
          properties: {
            pistolet_id: { type: 'integer', example: 4 },
            index_fermeture: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 200.0,
            },
            commentaire: {
              type: 'string',
              example: 'Relevé automatique système',
              nullable: true,
            },
          },
        },
        ReleveManuelInput: {
          type: 'object',
          required: ['pistolet_id', 'index_ouverture', 'index_fermeture'],
          properties: {
            pistolet_id: { type: 'integer', example: 4 },
            index_ouverture: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 0.0,
            },
            index_fermeture: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 200.0,
            },
            date_heure_saisie: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-15T08:00:00Z',
              nullable: true,
            },
            commentaire: {
              type: 'string',
              example: 'Correction index oublié',
              nullable: true,
            },
          },
        },
        RapportJournalier: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              format: 'date',
              example: '2025-05-15',
            },
            total_ventes: {
              type: 'number',
              format: 'float',
              example: 1250.5,
            },
            details_pistolets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  pistolet_id: { type: 'integer', example: 4 },
                  numero_pistolet: { type: 'string', example: 'PIII1' },
                  volume: { type: 'number', format: 'float', example: 200.0 },
                  montant: { type: 'number', format: 'float', example: 500.0 },
                },
              },
            },
          },
        },
        RapportManuelInput: {
          type: 'object',
          required: ['date', 'pistolet_id', 'volume', 'montant'],
          properties: {
            date: {
              type: 'string',
              format: 'date',
              example: '2025-05-15',
            },
            pistolet_id: { type: 'integer', example: 4 },
            volume: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 150.0,
            },
            montant: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 375.0,
            },
            commentaire: {
              type: 'string',
              example: 'Vente exceptionnelle',
              nullable: true,
            },
          },
        },
        RevenuJournalier: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              format: 'date',
              example: '2025-05-15',
            },
            total: {
              type: 'number',
              format: 'float',
              example: 3250.75,
            },
            nombre_transactions: { type: 'integer', example: 42 },
          },
        },

        Credit: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 2 },
            id_utilisateur: { type: 'integer', example: 13 },
            type_credit: {
              type: 'string',
              enum: ['organisationnelle', 'individuelle'],
              example: 'organisationnelle',
            },
            solde_credit: { type: 'number', format: 'float', example: 500.0 },
            date_debut: { type: 'string', format: 'date', example: '2025-04-10' },
            duree_credit: { type: 'integer', example: 30 },
            credit_utilise: {
              type: 'number',
              format: 'float',
              example: 500.0,
              nullable: true,
            },
            etat: {
              type: 'string',
              enum: ['actif', 'expiré', 'remboursé', 'suspendu'],
              example: 'remboursé',
            },
            montant_restant: {
              type: 'number',
              format: 'float',
              example: 0.0,
              nullable: true,
            },
            date_dernier_paiement: {
              type: 'string',
              format: 'date-time',
              example: '2025-04-16T19:06:03Z',
              nullable: true,
            },
          },
        },
        CreditInput: {
          type: 'object',
          required: ['id_utilisateur', 'type_credit', 'solde_credit', 'duree_credit'],
          properties: {
            id_utilisateur: { type: 'integer', example: 13 },
            type_credit: {
              type: 'string',
              enum: ['organisationnelle', 'individuelle'],
              example: 'organisationnelle',
            },
            solde_credit: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 500.0,
            },
            duree_credit: {
              type: 'integer',
              minimum: 1,
              example: 30,
            },
          },
        },
        CreditRenouvellement: {
          type: 'object',
          required: ['id_credit', 'montant_ajout'],
          properties: {
            id_credit: { type: 'integer', example: 2 },
            montant_ajout: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 200.0,
            },
            prolongation_jours: {
              type: 'integer',
              minimum: 0,
              example: 30,
              nullable: true,
            },
          },
        },

        // ==================== SCHÉMAS VÉHICULES ====================
        Vehicule: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 8 },
            immatriculation: { type: 'string', example: '22TU2002' },
            marque: { type: 'string', example: 'Mercedes' },
            type_vehicule: {
              type: 'string',
              enum: ['voiture', 'camion', 'moto', 'bus'],
              example: 'camion',
            },
            qr_code: {
              type: 'string',
              example: 'http://localhost:3000/qrcodes/22TU2002.png',
              nullable: true,
            },
            id_credit: {
              type: 'integer',
              example: 2,
              nullable: true,
            },
          },
        },
        VehiculeInput: {
          type: 'object',
          required: ['immatriculation', 'marque', 'type_vehicule'],
          properties: {
            immatriculation: { type: 'string', example: '22TU2002' },
            marque: { type: 'string', example: 'Mercedes' },
            type_vehicule: {
              type: 'string',
              enum: ['voiture', 'camion', 'moto', 'bus'],
              example: 'camion',
            },
            id_credit: {
              type: 'integer',
              example: 2,
              nullable: true,
            },
          },
        },

        // ==================== SCHÉMAS TRANSACTIONS ====================
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 75 },
            id_vehicule: { type: 'integer', example: 28 },
            quantite: { type: 'number', format: 'float', example: 0.1 },
            montant: { type: 'number', format: 'float', example: 1.0 },
            date_transaction: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-13T19:36:22Z',
            },
            id_credit: {
              type: 'integer',
              example: 17,
              nullable: true,
            },
            preuve: {
              type: 'string',
              example: 'http://localhost:3000/transactions/transaction_174...',
              nullable: true,
            },
            id_pompiste: {
              type: 'integer',
              example: 25,
              nullable: true,
            },
          },
        },
        TransactionInput: {
          type: 'object',
          required: ['id_vehicule', 'quantite', 'montant'],
          properties: {
            id_vehicule: { type: 'integer', example: 28 },
            quantite: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 0.1,
            },
            montant: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 1.0,
            },
            id_credit: {
              type: 'integer',
              example: 17,
              nullable: true,
            },
            preuve: {
              type: 'string',
              format: 'binary',
              description: 'Image de preuve (JPG/PNG)',
              nullable: true,
            },
          },
        },

        // ==================== SCHÉMAS PAIEMENTS ====================
        Paiement: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 20 },
            reference_paiement: { type: 'string', example: 'PAY-888513-183' },
            id_credit: { type: 'integer', example: 18 },
            montant_paye: { type: 'number', format: 'float', example: 100.0 },
            montant_restant: { type: 'number', format: 'float', example: 100.0 },
            date_paiement: {
              type: 'string',
              format: 'date-time',
              example: '2025-05-16T02:28:08Z',
            },
            mode_paiement: {
              type: 'string',
              enum: ['especes', 'carte', 'virement', 'mobile'],
              example: 'especes',
            },
            description: {
              type: 'string',
              example: 'Paiement partiel',
              nullable: true,
            },
            id_caissier: {
              type: 'integer',
              example: 27,
              nullable: true,
            },
          },
        },
        PaiementInput: {
          type: 'object',
          required: ['id_credit', 'montant_paye', 'mode_paiement'],
          properties: {
            id_credit: { type: 'integer', example: 18 },
            montant_paye: {
              type: 'number',
              format: 'float',
              minimum: 0,
              example: 100.0,
            },
            mode_paiement: {
              type: 'string',
              enum: ['especes', 'carte', 'virement', 'mobile'],
              example: 'especes',
            },
            description: {
              type: 'string',
              example: 'Paiement partiel',
              nullable: true,
            },
          },
        },
        Reclamation: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            id_client: { type: 'integer', example: 5 },
            objet: { type: 'string', example: 'Problème de livraison' },
            raison: {
              type: 'string',
              enum: ['produit', 'service', 'livraison', 'facturation', 'autre'],
              example: 'livraison',
            },
            description: {
              type: 'string',
              example: "La livraison n'est pas arrivée à la date promise",
            },
            statut: {
              type: 'string',
              enum: ['nouveau', 'en_cours', 'resolu', 'fermer'],
              example: 'nouveau',
            },
            date_creation: { type: 'string', format: 'date-time' },
          },
        },
        ReclamationInput: {
          type: 'object',
          required: ['id_client', 'objet', 'raison', 'description'],
          properties: {
            id_client: { type: 'integer', example: 5 },
            objet: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              example: 'Problème de livraison',
            },
            raison: {
              type: 'string',
              enum: ['produit', 'service', 'livraison', 'facturation', 'autre'],
              example: 'livraison',
            },
            description: {
              type: 'string',
              minLength: 1,
              maxLength: 1000,
              example: "La livraison n'est pas arrivée à la date promise",
            },
          },
        },
        StatutUpdate: {
          type: 'object',
          required: ['statut'],
          properties: {
            statut: {
              type: 'string',
              enum: ['nouveau', 'en_cours', 'resolu', 'fermer'],
              example: 'en_cours',
            },
          },
        },
      },
      Produit: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 2 },
          code_barre: { type: 'string', example: '1234567890123' },
          nom: { type: 'string', example: 'Produit Exemple' },
          description: {
            type: 'string',
            example: 'Ceci est un produit exemple pour illustrer une insertion',
            nullable: true,
          },
          categorie_id: { type: 'integer', example: 1 },
          prix_achat: { type: 'number', format: 'float', example: 10.5 },
          prix_vente: { type: 'number', format: 'float', example: 15.0 },
          quantite_stock: { type: 'integer', example: 98 },
          seuil_alerte: { type: 'integer', example: 10 },
          image_url: {
            type: 'string',
            example: 'http://localhost:3000/images/produit_exemple.jpg',
            nullable: true,
          },
          date_creation: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-15T20:47:40Z',
          },
          date_modification: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-15T21:51:41Z',
            nullable: true,
          },
        },
      },
      ProduitInput: {
        type: 'object',
        required: ['code_barre', 'nom', 'prix_achat', 'prix_vente', 'quantite_stock'],
        properties: {
          code_barre: { type: 'string', example: '1234567890123' },
          nom: { type: 'string', example: 'Produit Exemple' },
          description: {
            type: 'string',
            example: 'Description du produit',
            nullable: true,
          },
          categorie_id: { type: 'integer', example: 1 },
          prix_achat: {
            type: 'number',
            format: 'float',
            minimum: 0,
            example: 10.5,
          },
          prix_vente: {
            type: 'number',
            format: 'float',
            minimum: 0,
            example: 15.0,
          },
          quantite_stock: {
            type: 'integer',
            minimum: 0,
            example: 100,
          },
          seuil_alerte: {
            type: 'integer',
            minimum: 0,
            example: 10,
            nullable: true,
          },
          image: {
            type: 'string',
            format: 'binary',
            description: 'Image du produit (JPG/PNG)',
            nullable: true,
          },
        },
      },

      // ==================== SCHÉMAS CATÉGORIES ====================
      Categorie: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nom: { type: 'string', example: 'Boissons' },
          description: {
            type: 'string',
            example: 'Toutes les boissons',
            nullable: true,
          },
        },
      },
      CategorieInput: {
        type: 'object',
        required: ['nom'],
        properties: {
          nom: { type: 'string', example: 'Boissons' },
          description: {
            type: 'string',
            example: 'Toutes les boissons',
            nullable: true,
          },
        },
      },

      // ==================== SCHÉMAS MOUVEMENTS STOCK ====================
      MouvementStock: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          produit_id: { type: 'integer', example: 2 },
          type_mouvement: {
            type: 'string',
            enum: ['entree', 'sortie', 'ajustement'],
            example: 'entree',
          },
          quantite: { type: 'integer', example: 10 },
          date_mouvement: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-15T20:47:40Z',
          },
          raison: {
            type: 'string',
            example: 'Réapprovisionnement',
            nullable: true,
          },
          utilisateur_id: { type: 'integer', example: 27 },
        },
      },
      MouvementStockInput: {
        type: 'object',
        required: ['produit_id', 'type_mouvement', 'quantite'],
        properties: {
          produit_id: { type: 'integer', example: 2 },
          type_mouvement: {
            type: 'string',
            enum: ['entree', 'sortie', 'ajustement'],
            example: 'entree',
          },
          quantite: {
            type: 'integer',
            minimum: 1,
            example: 10,
          },
          raison: {
            type: 'string',
            example: 'Réapprovisionnement',
            nullable: true,
          },
        },
      },

      // ==================== SCHÉMAS VENTES ====================
      Vente: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          date_vente: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-15T21:51:41Z',
          },
          montant_total: { type: 'number', format: 'float', example: 20.0 },
          montant_paye: { type: 'number', format: 'float', example: 50.0 },
          monnaie_rendue: { type: 'number', format: 'float', example: 30.0 },
          mode_paiement: {
            type: 'string',
            enum: ['ESPECES', 'CARTE', 'VIREMENT', 'CHEQUE'],
            example: 'ESPECES',
          },
          id_caissier: {
            type: 'integer',
            example: 27,
            nullable: true,
          },
        },
      },
      VenteInput: {
        type: 'object',
        required: ['montant_total', 'montant_paye', 'mode_paiement', 'lignes'],
        properties: {
          montant_total: {
            type: 'number',
            format: 'float',
            minimum: 0,
            example: 20.0,
          },
          montant_paye: {
            type: 'number',
            format: 'float',
            minimum: 0,
            example: 50.0,
          },
          mode_paiement: {
            type: 'string',
            enum: ['ESPECES', 'CARTE', 'VIREMENT', 'CHEQUE'],
            example: 'ESPECES',
          },
          lignes: {
            type: 'array',
            items: {
              type: 'object',
              required: ['produit_id', 'quantite'],
              properties: {
                produit_id: { type: 'integer', example: 2 },
                quantite: {
                  type: 'integer',
                  minimum: 1,
                  example: 2,
                },
              },
            },
          },
        },
      },
      LigneVente: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          vente_id: { type: 'integer', example: 2 },
          produit_id: { type: 'integer', example: 4 },
          quantite: { type: 'integer', example: 3 },
          prix_unitaire: { type: 'number', format: 'float', example: 2.0 },
          produit_nom: { type: 'string', example: 'Gaufrettes' },
          code_barre: { type: 'string', example: '5449000000995' },
        },
      },

      // ==================== SCHÉMAS STATISTIQUES ====================
      StatsStock: {
        type: 'object',
        properties: {
          total_produits: { type: 'integer', example: 25 },
          total_categories: { type: 'integer', example: 5 },
          produits_en_rupture: { type: 'integer', example: 3 },
          produits_bientot_rupture: { type: 'integer', example: 5 },
          valeur_stock: { type: 'number', format: 'float', example: 1250.75 },
        },
      },
      StatsVentes: {
        type: 'object',
        properties: {
          total_ventes: { type: 'integer', example: 42 },
          chiffre_affaires: { type: 'number', format: 'float', example: 1250.75 },
          moyenne_par_vente: { type: 'number', format: 'float', example: 29.78 },
          produits_plus_vendus: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                produit_id: { type: 'integer', example: 4 },
                nom: { type: 'string', example: 'Gaufrettes' },
                quantite_vendue: { type: 'integer', example: 25 },
              },
            },
          },
        },
      },
    },
    paths: {
      '/login': {
        post: {
          tags: ['Authentification'],
          summary: 'Connexion utilisateur',
          description: 'Endpoint pour obtenir un token JWT',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'user@example.com' },
                    password: { type: 'string', example: 'motdepasse' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Authentification réussie',
              headers: {
                'Set-Cookie': {
                  schema: { type: 'string' },
                  description: 'Cookie JWT HTTP-only',
                },
              },
            },
            401: { description: 'Identifiants invalides' },
          },
        },
      },
      '/register': {
        post: {
          tags: ['Authentification'],
          summary: 'Inscription utilisateur',
          description:
            'Endpoint pour créer un nouveau compte utilisateur (réservé aux administrateurs)',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Utilisateur créé avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    errors: [
                      {
                        msg: 'Email invalide',
                        param: 'email',
                        location: 'body',
                      },
                    ],
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            409: {
              description: 'Email déjà utilisé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Cet email est déjà utilisé',
                  },
                },
              },
            },
          },
        },
      },

      '/request-password-reset': {
        post: {
          tags: ['Authentification'],
          summary: 'Demande de réinitialisation de mot de passe',
          description: 'Envoie un email avec un lien de réinitialisation',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PasswordResetInput',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Email envoyé avec succès',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    message: 'Email de réinitialisation envoyé',
                  },
                },
              },
            },
            404: {
              description: 'Email non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Aucun utilisateur avec cet email',
                  },
                },
              },
            },
          },
        },
      },

      '/reset-password': {
        put: {
          tags: ['Authentification'],
          summary: 'Réinitialisation du mot de passe',
          description: 'Endpoint pour définir un nouveau mot de passe après demande',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NewPasswordInput',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Mot de passe mis à jour',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    message: 'Mot de passe mis à jour avec succès',
                  },
                },
              },
            },
            400: {
              description: 'Token invalide ou expiré',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Lien de réinitialisation invalide ou expiré',
                  },
                },
              },
            },
          },
        },
      },

      '/profile': {
        get: {
          tags: ['Utilisateurs'],
          summary: 'Profil utilisateur',
          description: "Récupère les informations de l'utilisateur connecté",
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Profil utilisateur',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            401: {
              description: 'Non authentifié',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Session expirée. Veuillez vous reconnecter.',
                  },
                },
              },
            },
          },
        },
      },

      '/logout': {
        post: {
          tags: ['Authentification'],
          summary: 'Déconnexion',
          description: 'Invalide le cookie de session',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Déconnexion réussie',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    message: 'Déconnexion réussie',
                  },
                },
              },
            },
          },
        },
      },

      '/users': {
        get: {
          tags: ['Utilisateurs'],
          summary: 'Liste des utilisateurs',
          description: 'Récupère tous les utilisateurs (réservé aux administrateurs)',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des utilisateurs',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            403: { description: 'Permissions insuffisantes' },
          },
        },
      },
      '/pompe/pompes': {
        post: {
          tags: ['Pompes'],
          summary: 'Ajouter une nouvelle pompe',
          description: 'Endpoint pour ajouter une nouvelle pompe (réservé aux administrateurs)',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PompeInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Pompe créée avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Pompe',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le numéro de pompe doit commencer par P suivi de 3 chiffres',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            409: {
              description: 'Numéro de pompe déjà utilisé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Ce numéro de pompe est déjà utilisé',
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ['Pompes'],
          summary: 'Lister toutes les pompes',
          description: 'Endpoint pour récupérer toutes les pompes',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des pompes',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Pompe',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/pompe/pompes/{id}': {
        get: {
          tags: ['Pompes'],
          summary: 'Récupérer une pompe par ID',
          description: "Endpoint pour obtenir les détails d'une pompe spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la pompe',
            },
          ],
          responses: {
            200: {
              description: 'Détails de la pompe',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Pompe',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Pompe non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Pompe introuvable',
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ['Pompes'],
          summary: 'Mettre à jour une pompe',
          description:
            "Endpoint pour modifier les informations d'une pompe (réservé aux administrateurs)",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la pompe',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PompeUpdate',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Pompe mise à jour',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Pompe',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Données de mise à jour invalides',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Pompe non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Pompe introuvable',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Pompes'],
          summary: 'Supprimer une pompe',
          description: 'Endpoint pour supprimer une pompe (réservé aux administrateurs)',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la pompe',
            },
          ],
          responses: {
            200: {
              description: 'Pompe supprimée',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    message: 'Pompe supprimée avec succès',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            403: {
              description: 'Pompe utilisée dans des affectations',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Impossible de supprimer - pompe utilisée dans des affectations',
                  },
                },
              },
            },
            404: {
              description: 'Pompe non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Pompe introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/pompe/pompes/filtrées': {
        get: {
          tags: ['Pompes'],
          summary: 'Filtrer les pompes',
          description: 'Endpoint pour récupérer les pompes avec filtres',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'query',
              name: 'type_pompe',
              schema: {
                type: 'string',
                enum: ['gasoil', 'multi-produits', 'sans plomb'],
              },
              description: 'Filtrer par type de pompe',
            },
            {
              in: 'query',
              name: 'statut',
              schema: {
                type: 'string',
                enum: ['active', 'reserve', 'maintenance', 'hors_service'],
              },
              description: 'Filtrer par statut',
            },
            {
              in: 'query',
              name: 'date_debut',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Filtrer par date de création (début)',
            },
            {
              in: 'query',
              name: 'date_fin',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Filtrer par date de création (fin)',
            },
          ],
          responses: {
            200: {
              description: 'Liste des pompes filtrées',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Pompe',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Paramètres de filtre invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'La date de fin doit être après la date de début',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },
      '/pistolet/add': {
        post: {
          tags: ['Pistolets'],
          summary: 'Ajouter un nouveau pistolet',
          description: 'Endpoint pour ajouter un nouveau pistolet (réservé aux administrateurs)',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PistoletInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Pistolet créé avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Pistolet',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le prix unitaire doit être un nombre positif',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Pompe non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "La pompe spécifiée n'existe pas",
                  },
                },
              },
            },
            409: {
              description: 'Numéro de pistolet déjà utilisé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Ce numéro de pistolet est déjà utilisé pour cette pompe',
                  },
                },
              },
            },
          },
        },
      },

      '/pistolet': {
        get: {
          tags: ['Pistolets'],
          summary: 'Lister tous les pistolets',
          description: 'Endpoint pour récupérer tous les pistolets',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des pistolets',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Pistolet',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/pistolet/pompe/{pompe_id}': {
        get: {
          tags: ['Pistolets'],
          summary: 'Récupérer les pistolets par pompe',
          description: "Endpoint pour obtenir les pistolets d'une pompe spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'pompe_id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la pompe',
            },
          ],
          responses: {
            200: {
              description: 'Liste des pistolets de la pompe',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Pistolet',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Pompe non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Pompe introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/pistolet/update-statut': {
        put: {
          tags: ['Pistolets'],
          summary: 'Mettre à jour le statut de plusieurs pistolets',
          description:
            'Endpoint pour modifier le statut de plusieurs pistolets en une seule requête',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['pistolet_ids', 'statut'],
                  properties: {
                    pistolet_ids: {
                      type: 'array',
                      items: { type: 'integer' },
                      example: [4, 5, 6],
                      minItems: 1,
                    },
                    statut: {
                      $ref: '#/components/schemas/StatutUpdate/properties/statut',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Statuts mis à jour',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    message: 'Statuts mis à jour avec succès',
                    count: 3,
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'La liste des pistolets ne peut pas être vide',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/pistolet/{id}/statut': {
        put: {
          tags: ['Pistolets'],
          summary: "Mettre à jour le statut d'un pistolet",
          description: "Endpoint pour modifier le statut d'un pistolet spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du pistolet',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/StatutUpdate',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Statut mis à jour',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Pistolet',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Statut invalide',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Pistolet non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Pistolet introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/affectations/add-automatic': {
        post: {
          tags: ['Affectations'],
          summary: 'Générer les affectations automatiques',
          description:
            'Endpoint pour générer automatiquement les affectations équitables (réservé aux gérants)',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    date_debut: {
                      type: 'string',
                      format: 'date',
                      example: '2025-05-01',
                    },
                    date_fin: {
                      type: 'string',
                      format: 'date',
                      example: '2025-05-31',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Affectations générées avec succès',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Affectation',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Plage de dates invalide',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'La date de fin doit être après la date de début',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/affectations/month/{mois}/year/{annee}': {
        get: {
          tags: ['Affectations'],
          summary: 'Récupérer les affectations par mois/année',
          description: "Endpoint pour obtenir toutes les affectations d'un mois donné",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'mois',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
                maximum: 12,
              },
              description: 'Mois (1-12)',
            },
            {
              in: 'path',
              name: 'annee',
              required: true,
              schema: { type: 'integer' },
              description: 'Année (ex: 2025)',
            },
          ],
          responses: {
            200: {
              description: 'Liste des affectations',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Affectation',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Paramètres invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le mois doit être entre 1 et 12',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/affectations/update/{id}': {
        put: {
          tags: ['Affectations'],
          summary: 'Mettre à jour une affectation',
          description: 'Endpoint pour modifier une affectation existante (réservé aux gérants)',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: "ID de l'affectation",
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AffectationUpdate',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Affectation mise à jour',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Affectation',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Données de mise à jour invalides',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Affectation non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Affectation introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/affectations/regenerate': {
        post: {
          tags: ['Affectations'],
          summary: 'Régénérer les affectations',
          description:
            'Endpoint pour régénérer les affectations pour une période (réservé aux gérants)',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    date_debut: {
                      type: 'string',
                      format: 'date',
                      example: '2025-05-01',
                    },
                    date_fin: {
                      type: 'string',
                      format: 'date',
                      example: '2025-05-31',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Affectations régénérées',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Affectation',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Plage de dates invalide',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'La date de fin doit être après la date de début',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/affectations/date/{date}': {
        get: {
          tags: ['Affectations'],
          summary: 'Récupérer les affectations par date',
          description: "Endpoint pour obtenir les affectations d'une date spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'date',
              required: true,
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date au format YYYY-MM-DD',
            },
          ],
          responses: {
            200: {
              description: 'Liste des affectations',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Affectation',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Date invalide',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Format de date invalide (utiliser YYYY-MM-DD)',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/affectations/current/{pompiste_id}': {
        get: {
          tags: ['Affectations'],
          summary: "Affectation actuelle d'un pompiste",
          description: "Endpoint pour obtenir l'affectation en cours d'un pompiste",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'pompiste_id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du pompiste',
            },
          ],
          responses: {
            200: {
              description: 'Affectation actuelle',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Affectation',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Aucune affectation trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "Aucune affectation trouvée pour ce pompiste aujourd'hui",
                  },
                },
              },
            },
          },
        },
      },

      '/affectations/pistolets/{affectation_id}': {
        get: {
          tags: ['Affectations'],
          summary: 'Pistolets disponibles pour une affectation',
          description: 'Endpoint pour obtenir les pistolets disponibles pour une affectation',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'affectation_id',
              required: true,
              schema: { type: 'integer' },
              description: "ID de l'affectation",
            },
          ],
          responses: {
            200: {
              description: 'Liste des pistolets disponibles',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 1 },
                        numero: { type: 'string', example: 'Pistolet 1' },
                        pompe_id: { type: 'integer', example: 35 },
                      },
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Affectation non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Affectation introuvable',
                  },
                },
              },
            },
          },
        },
      },
      '/pistolet/releves': {
        post: {
          tags: ['Revenus des Pistolets'],
          summary: 'Enregistrer un relevé automatique',
          description: 'Endpoint pour enregistrer un relevé de fin de poste (système automatique)',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ReleveInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Relevé enregistré avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RelevePoste',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "L'index de fermeture doit être supérieur au dernier index enregistré",
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Pistolet non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Pistolet introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/pistolet/releves/manuel': {
        post: {
          tags: ['Revenus des Pistolets'],
          summary: 'Ajouter un relevé manuel',
          description: 'Endpoint pour ajouter un relevé manuel (corrections ou oublis)',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ReleveManuelInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Relevé manuel enregistré',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RelevePoste',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "L'index de fermeture doit être supérieur à l'index d'ouverture",
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            403: {
              description: 'Action non autorisée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "Vous n'avez pas les droits pour ajouter un relevé manuel",
                  },
                },
              },
            },
          },
        },
      },

      '/pistolet/{pistolet_id}/historique': {
        get: {
          tags: ['Revenus des Pistolets'],
          summary: 'Historique des relevés par pistolet',
          description: "Endpoint pour obtenir l'historique des relevés d'un pistolet spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'pistolet_id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du pistolet',
            },
            {
              in: 'query',
              name: 'date_debut',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date de début (YYYY-MM-DD)',
            },
            {
              in: 'query',
              name: 'date_fin',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date de fin (YYYY-MM-DD)',
            },
          ],
          responses: {
            200: {
              description: 'Historique des relevés',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/RelevePoste',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Pistolet non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Pistolet introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/pistolet/historique': {
        get: {
          tags: ['Revenus des Pistolets'],
          summary: 'Historique complet des relevés',
          description: "Endpoint pour obtenir l'historique des relevés de tous les pistolets",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'query',
              name: 'date',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Filtrer par date spécifique (YYYY-MM-DD)',
            },
            {
              in: 'query',
              name: 'mois',
              schema: {
                type: 'integer',
                minimum: 1,
                maximum: 12,
              },
              description: 'Filtrer par mois (1-12)',
            },
            {
              in: 'query',
              name: 'annee',
              schema: { type: 'integer' },
              description: 'Filtrer par année',
            },
          ],
          responses: {
            200: {
              description: 'Historique complet',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/RelevePoste',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      // -------------------- Rapports et revenus --------------------
      '/pistolet/rapports/generer': {
        post: {
          tags: ['Revenus des Pistolets'],
          summary: 'Générer un rapport journalier',
          description: 'Endpoint pour générer le rapport des ventes journalières',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['date'],
                  properties: {
                    date: {
                      type: 'string',
                      format: 'date',
                      example: '2025-05-15',
                    },
                    include_details: {
                      type: 'boolean',
                      default: false,
                      example: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Rapport généré',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RapportJournalier',
                  },
                },
              },
            },
            400: {
              description: 'Date invalide',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'La date ne peut pas être dans le futur',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/pistolet/rapports/manuel': {
        post: {
          tags: ['Revenus des Pistolets'],
          summary: 'Ajouter un rapport manuel',
          description: 'Endpoint pour ajouter un rapport manuel (pour corrections)',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RapportManuelInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Rapport manuel enregistré',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RapportJournalier',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le montant doit être positif',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            403: {
              description: 'Action non autorisée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Droits insuffisants pour ajouter un rapport manuel',
                  },
                },
              },
            },
          },
        },
      },

      '/pistolet/revenus-journaliers': {
        get: {
          tags: ['Revenus des Pistolets'],
          summary: 'Obtenir les revenus journaliers',
          description: 'Endpoint pour récupérer les revenus par jour sur une période',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'query',
              name: 'date_debut',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date de début (YYYY-MM-DD)',
            },
            {
              in: 'query',
              name: 'date_fin',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date de fin (YYYY-MM-DD)',
            },
            {
              in: 'query',
              name: 'group_by',
              schema: {
                type: 'string',
                enum: ['day', 'week', 'month'],
                default: 'day',
              },
              description: 'Regroupement des résultats',
            },
          ],
          responses: {
            200: {
              description: 'Liste des revenus journaliers',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/RevenuJournalier',
                    },
                  },
                },
              },
            },
            400: {
              description: 'Paramètres invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'La date de fin doit être après la date de début',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },
      '/credit/credits/add': {
        post: {
          tags: ['Crédits'],
          summary: 'Créer un nouveau crédit',
          description: 'Endpoint pour créer un nouveau crédit pour un utilisateur',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreditInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Crédit créé avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Credit',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le solde du crédit doit être positif',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/credit/credits/all': {
        get: {
          tags: ['Crédits'],
          summary: 'Lister tous les crédits',
          description: 'Endpoint pour récupérer tous les crédits',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des crédits',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Credit',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/credit/credits/{id_credit}': {
        get: {
          tags: ['Crédits'],
          summary: 'Obtenir un crédit par ID',
          description: "Endpoint pour récupérer les détails d'un crédit spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id_credit',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du crédit',
            },
          ],
          responses: {
            200: {
              description: 'Détails du crédit',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Credit',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Crédit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Crédit introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/credits/update': {
        put: {
          tags: ['Crédits'],
          summary: 'Mettre à jour un crédit',
          description: "Endpoint pour modifier les informations d'un crédit",
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id_credit: { type: 'integer', example: 2 },
                    type_credit: {
                      type: 'string',
                      enum: ['organisationnelle', 'individuelle'],
                      example: 'organisationnelle',
                    },
                    solde_credit: {
                      type: 'number',
                      format: 'float',
                      minimum: 0,
                      example: 500.0,
                    },
                    duree_credit: {
                      type: 'integer',
                      minimum: 1,
                      example: 30,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Crédit mis à jour',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Credit',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "La durée du crédit doit être d'au moins 1 jour",
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Crédit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Crédit introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/credits/state': {
        put: {
          tags: ['Crédits'],
          summary: "Modifier l'état d'un crédit",
          description: "Endpoint pour changer l'état d'un crédit (actif/expiré/etc.)",
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id_credit', 'etat'],
                  properties: {
                    id_credit: { type: 'integer', example: 2 },
                    etat: {
                      type: 'string',
                      enum: ['actif', 'expiré', 'remboursé', 'suspendu'],
                      example: 'remboursé',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'État du crédit mis à jour',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Credit',
                  },
                },
              },
            },
            400: {
              description: 'Action invalide',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Impossible de réactiver un crédit expiré',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/credit/credits/renew': {
        post: {
          tags: ['Crédits'],
          summary: 'Renouveler un crédit',
          description: 'Endpoint pour ajouter du solde ou prolonger un crédit existant',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreditRenouvellement',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Crédit renouvelé avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Credit',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le montant à ajouter doit être positif',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Crédit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Crédit introuvable',
                  },
                },
              },
            },
          },
        },
      },

      // ==================== ROUTES PAIEMENTS ====================
      '/credit/paiments/create': {
        post: {
          tags: ['Paiements'],
          summary: 'Enregistrer un paiement',
          description: 'Endpoint pour enregistrer un paiement pour un crédit',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaiementInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Paiement enregistré',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Paiement',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le montant payé doit être positif',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Crédit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Crédit introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/paiments/all': {
        get: {
          tags: ['Paiements'],
          summary: 'Lister tous les paiements',
          description: 'Endpoint pour récupérer tous les paiements',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des paiements',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Paiement',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/credit/paiments/credit/{id_credit}': {
        get: {
          tags: ['Paiements'],
          summary: 'Paiements par crédit',
          description: "Endpoint pour récupérer les paiements d'un crédit spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id_credit',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du crédit',
            },
          ],
          responses: {
            200: {
              description: 'Liste des paiements du crédit',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Paiement',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Crédit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Crédit introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/paiments/utilisateur/{id_utilisateur}': {
        get: {
          tags: ['Paiements'],
          summary: 'Paiements par utilisateur',
          description: "Endpoint pour récupérer les paiements d'un utilisateur",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id_utilisateur',
              required: true,
              schema: { type: 'integer' },
              description: "ID de l'utilisateur",
            },
          ],
          responses: {
            200: {
              description: "Liste des paiements de l'utilisateur",
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Paiement',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Utilisateur non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Utilisateur introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/paiments/reference/{reference}': {
        get: {
          tags: ['Paiements'],
          summary: 'Paiement par référence',
          description: 'Endpoint pour récupérer un paiement par sa référence',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'reference',
              required: true,
              schema: { type: 'string' },
              description: 'Référence du paiement',
            },
          ],
          responses: {
            200: {
              description: 'Détails du paiement',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Paiement',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Paiement non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Paiement introuvable',
                  },
                },
              },
            },
          },
        },
      },

      // ==================== ROUTES VÉHICULES ====================
      '/credit/vehicules/add': {
        post: {
          tags: ['Véhicules'],
          summary: 'Ajouter un véhicule',
          description: 'Endpoint pour enregistrer un nouveau véhicule',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/VehiculeInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Véhicule créé avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Vehicule',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "L'immatriculation est déjà utilisée",
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/credit/vehicules/{id}': {
        get: {
          tags: ['Véhicules'],
          summary: 'Obtenir un véhicule par ID',
          description: "Endpoint pour récupérer les détails d'un véhicule",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du véhicule',
            },
          ],
          responses: {
            200: {
              description: 'Détails du véhicule',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Vehicule',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Véhicule non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Véhicule introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/vehicules': {
        get: {
          tags: ['Véhicules'],
          summary: 'Lister tous les véhicules',
          description: 'Endpoint pour récupérer tous les véhicules',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des véhicules',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Vehicule',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/credit/vehicules/immatriculation/{immatriculation}': {
        get: {
          tags: ['Véhicules'],
          summary: 'Obtenir un véhicule par immatriculation',
          description: "Endpoint pour récupérer un véhicule par son numéro d'immatriculation",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'immatriculation',
              required: true,
              schema: { type: 'string' },
              description: "Numéro d'immatriculation",
            },
          ],
          responses: {
            200: {
              description: 'Détails du véhicule',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Vehicule',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Véhicule non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Véhicule introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/vehicules/update': {
        put: {
          tags: ['Véhicules'],
          summary: 'Mettre à jour un véhicule',
          description: "Endpoint pour modifier les informations d'un véhicule",
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 8 },
                    immatriculation: { type: 'string', example: '22TU2002' },
                    marque: { type: 'string', example: 'Mercedes' },
                    type_vehicule: {
                      type: 'string',
                      enum: ['voiture', 'camion', 'moto', 'bus'],
                      example: 'camion',
                    },
                    id_credit: {
                      type: 'integer',
                      example: 2,
                      nullable: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Véhicule mis à jour',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Vehicule',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "L'immatriculation est déjà utilisée",
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Véhicule non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Véhicule introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/vehicules/client/{username}': {
        get: {
          tags: ['Véhicules'],
          summary: 'Véhicules par client',
          description: "Endpoint pour récupérer les véhicules d'un client",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'username',
              required: true,
              schema: { type: 'string' },
              description: "Nom d'utilisateur du client",
            },
          ],
          responses: {
            200: {
              description: 'Liste des véhicules du client',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Vehicule',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Client non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Client introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/vehicules/credit/{id_credit}': {
        get: {
          tags: ['Véhicules'],
          summary: 'Véhicules par crédit',
          description: 'Endpoint pour récupérer les véhicules associés à un crédit',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id_credit',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du crédit',
            },
          ],
          responses: {
            200: {
              description: 'Liste des véhicules du crédit',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Vehicule',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Crédit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Crédit introuvable',
                  },
                },
              },
            },
          },
        },
      },

      // ==================== ROUTES TRANSACTIONS ====================
      '/credit/transactions/create': {
        post: {
          tags: ['Transactions'],
          summary: 'Créer une transaction',
          description: 'Endpoint pour enregistrer une nouvelle transaction avec preuve photo',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  $ref: '#/components/schemas/TransactionInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Transaction créée avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Transaction',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'La quantité doit être positive',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Véhicule non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Véhicule introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/credit/transactions/all': {
        get: {
          tags: ['Transactions'],
          summary: 'Lister toutes les transactions',
          description: 'Endpoint pour récupérer toutes les transactions',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des transactions',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Transaction',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/credit/transactions/utilisateur/{id_utilisateur}': {
        get: {
          tags: ['Transactions'],
          summary: 'Transactions par utilisateur',
          description: "Endpoint pour récupérer les transactions d'un utilisateur",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id_utilisateur',
              required: true,
              schema: { type: 'integer' },
              description: "ID de l'utilisateur",
            },
          ],
          responses: {
            200: {
              description: "Liste des transactions de l'utilisateur",
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Transaction',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Utilisateur non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Utilisateur introuvable',
                  },
                },
              },
            },
          },
        },
      },
      '/Reclamation/add': {
        post: {
          tags: ['Réclamations'],
          summary: 'Créer une nouvelle réclamation',
          description: 'Endpoint pour créer une nouvelle réclamation',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ReclamationInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Réclamation créée avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Reclamation',
                  },
                },
              },
            },
            400: { description: 'Données invalides' },
            401: { description: 'Non autorisé' },
            500: { description: 'Erreur serveur' },
          },
        },
      },
      '/Reclamation/client/{id_client}': {
        get: {
          tags: ['Réclamations'],
          summary: "Obtenir les réclamations d'un client",
          description: "Endpoint pour récupérer toutes les réclamations d'un client spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id_client',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du client',
            },
          ],
          responses: {
            200: {
              description: 'Liste des réclamations du client',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Reclamation',
                    },
                  },
                },
              },
            },
            400: { description: 'ID client invalide' },
            401: { description: 'Non autorisé' },
            404: { description: 'Client non trouvé' },
            500: { description: 'Erreur serveur' },
          },
        },
      },
      '/Reclamation/{id}': {
        get: {
          tags: ['Réclamations'],
          summary: "Obtenir les détails d'une réclamation",
          description: "Endpoint pour récupérer les détails d'une réclamation spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la réclamation',
            },
          ],
          responses: {
            200: {
              description: 'Détails de la réclamation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Reclamation',
                  },
                },
              },
            },
            400: { description: 'ID réclamation invalide' },
            401: { description: 'Non autorisé' },
            404: { description: 'Réclamation non trouvée' },
            500: { description: 'Erreur serveur' },
          },
        },
      },
      '/Reclamation/{id}/statut': {
        put: {
          tags: ['Réclamations'],
          summary: "Mettre à jour le statut d'une réclamation",
          description: "Endpoint pour modifier le statut d'une réclamation",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la réclamation',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/StatutUpdate',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Statut mis à jour avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Reclamation',
                  },
                },
              },
            },
            400: { description: 'Données invalides' },
            401: { description: 'Non autorisé' },
            404: { description: 'Réclamation non trouvée' },
            500: { description: 'Erreur serveur' },
          },
        },
      },
      '/Reclamation': {
        get: {
          tags: ['Réclamations'],
          summary: 'Lister toutes les réclamations',
          description: 'Endpoint pour récupérer toutes les réclamations',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste de toutes les réclamations',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Reclamation',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            500: { description: 'Erreur serveur' },
          },
        },
      },
      // ==================== ROUTES PRODUITS ====================
      '/stock/produits': {
        post: {
          tags: ['Produits'],
          summary: 'Créer un nouveau produit',
          description: 'Endpoint pour ajouter un nouveau produit au stock',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  $ref: '#/components/schemas/ProduitInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Produit créé avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Produit',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le code barre est déjà utilisé',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
        get: {
          tags: ['Produits'],
          summary: 'Lister tous les produits',
          description: 'Endpoint pour récupérer tous les produits',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des produits',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Produit',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/stock/produits/{id}': {
        put: {
          tags: ['Produits'],
          summary: 'Mettre à jour un produit',
          description: "Endpoint pour modifier les informations d'un produit",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du produit',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  $ref: '#/components/schemas/ProduitInput',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Produit mis à jour',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Produit',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "Le prix de vente doit être supérieur au prix d'achat",
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Produit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Produit introuvable',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Produits'],
          summary: 'Supprimer un produit',
          description: 'Endpoint pour supprimer un produit du stock',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du produit',
            },
          ],
          responses: {
            200: {
              description: 'Produit supprimé',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    message: 'Produit supprimé avec succès',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            403: {
              description: 'Action non autorisée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Impossible de supprimer un produit avec des ventes associées',
                  },
                },
              },
            },
            404: {
              description: 'Produit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Produit introuvable',
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ['Produits'],
          summary: 'Obtenir un produit par ID',
          description: "Endpoint pour récupérer les détails d'un produit spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du produit',
            },
          ],
          responses: {
            200: {
              description: 'Détails du produit',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Produit',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Produit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Produit introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/stock/produits/low-stock': {
        get: {
          tags: ['Produits'],
          summary: 'Produits en faible stock',
          description:
            "Endpoint pour récupérer les produits dont le stock est inférieur au seuil d'alerte",
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des produits en faible stock',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Produit',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      // ==================== ROUTES CATÉGORIES ====================
      '/stock/categories': {
        post: {
          tags: ['Catégories'],
          summary: 'Créer une nouvelle catégorie',
          description: 'Endpoint pour ajouter une nouvelle catégorie de produits',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CategorieInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Catégorie créée avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Categorie',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le nom de catégorie est déjà utilisé',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
        get: {
          tags: ['Catégories'],
          summary: 'Lister toutes les catégories',
          description: 'Endpoint pour récupérer toutes les catégories',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Liste des catégories',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Categorie',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/stock/categories/{id}': {
        put: {
          tags: ['Catégories'],
          summary: 'Mettre à jour une catégorie',
          description: "Endpoint pour modifier les informations d'une catégorie",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la catégorie',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CategorieInput',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Catégorie mise à jour',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Categorie',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le nom de catégorie est déjà utilisé',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Catégorie non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Catégorie introuvable',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Catégories'],
          summary: 'Supprimer une catégorie',
          description: 'Endpoint pour supprimer une catégorie',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la catégorie',
            },
          ],
          responses: {
            200: {
              description: 'Catégorie supprimée',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    message: 'Catégorie supprimée avec succès',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            403: {
              description: 'Action non autorisée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Impossible de supprimer une catégorie avec des produits associés',
                  },
                },
              },
            },
            404: {
              description: 'Catégorie non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Catégorie introuvable',
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ['Catégories'],
          summary: 'Obtenir une catégorie par ID',
          description: "Endpoint pour récupérer les détails d'une catégorie spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la catégorie',
            },
          ],
          responses: {
            200: {
              description: 'Détails de la catégorie',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Categorie',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Catégorie non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Catégorie introuvable',
                  },
                },
              },
            },
          },
        },
      },

      // ==================== ROUTES MOUVEMENTS STOCK ====================
      '/stock/mouvements': {
        post: {
          tags: ['Mouvements Stock'],
          summary: 'Enregistrer un mouvement de stock',
          description: 'Endpoint pour enregistrer une entrée, sortie ou ajustement de stock',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MouvementStockInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Mouvement enregistré',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/MouvementStock',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'La quantité doit être positive',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Produit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Produit introuvable',
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ['Mouvements Stock'],
          summary: 'Historique des mouvements',
          description: 'Endpoint pour récupérer les mouvements de stock par date',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'query',
              name: 'date_debut',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date de début (YYYY-MM-DD)',
            },
            {
              in: 'query',
              name: 'date_fin',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date de fin (YYYY-MM-DD)',
            },
          ],
          responses: {
            200: {
              description: 'Liste des mouvements',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/MouvementStock',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/stock/mouvements/produit/{produitId}': {
        get: {
          tags: ['Mouvements Stock'],
          summary: 'Mouvements par produit',
          description: "Endpoint pour récupérer l'historique des mouvements d'un produit",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'produitId',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du produit',
            },
          ],
          responses: {
            200: {
              description: 'Historique des mouvements du produit',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/MouvementStock',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Produit non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Produit introuvable',
                  },
                },
              },
            },
          },
        },
      },

      // ==================== ROUTES VENTES ====================
      '/stock/ventes': {
        post: {
          tags: ['Ventes'],
          summary: 'Enregistrer une vente',
          description: 'Endpoint pour enregistrer une nouvelle vente',
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/VenteInput',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Vente enregistrée',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Vente',
                  },
                },
              },
            },
            400: {
              description: 'Données invalides',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Le montant payé doit couvrir le montant total',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
        get: {
          tags: ['Ventes'],
          summary: 'Historique des ventes',
          description: 'Endpoint pour récupérer les ventes par date',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'query',
              name: 'date_debut',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date de début (YYYY-MM-DD)',
            },
            {
              in: 'query',
              name: 'date_fin',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Date de fin (YYYY-MM-DD)',
            },
          ],
          responses: {
            200: {
              description: 'Liste des ventes',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Vente',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/stock/ventes/{id}': {
        get: {
          tags: ['Ventes'],
          summary: 'Obtenir une vente par ID',
          description: "Endpoint pour récupérer les détails d'une vente spécifique",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la vente',
            },
          ],
          responses: {
            200: {
              description: 'Détails de la vente',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Vente',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Vente non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Vente introuvable',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Ventes'],
          summary: 'Annuler une vente',
          description: 'Endpoint pour annuler une vente existante',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la vente',
            },
          ],
          responses: {
            200: {
              description: 'Vente annulée',
              content: {
                'application/json': {
                  example: {
                    success: true,
                    message: 'Vente annulée avec succès',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            403: {
              description: 'Action non autorisée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: "Impossible d'annuler une vente de plus de 24h",
                  },
                },
              },
            },
            404: {
              description: 'Vente non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Vente introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/stock/ventes/caissier/{caissierId}': {
        get: {
          tags: ['Ventes'],
          summary: 'Ventes par caissier',
          description: 'Endpoint pour récupérer les ventes effectuées par un caissier',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'caissierId',
              required: true,
              schema: { type: 'integer' },
              description: 'ID du caissier',
            },
            {
              in: 'query',
              name: 'date',
              schema: {
                type: 'string',
                format: 'date',
              },
              description: 'Filtrer par date spécifique (YYYY-MM-DD)',
            },
          ],
          responses: {
            200: {
              description: 'Liste des ventes du caissier',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Vente',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Caissier non trouvé',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Caissier introuvable',
                  },
                },
              },
            },
          },
        },
      },

      '/stock/ventes/{id}/lignes': {
        get: {
          tags: ['Ventes'],
          summary: 'Lignes de vente',
          description: "Endpoint pour récupérer les lignes détaillées d'une vente",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID de la vente',
            },
          ],
          responses: {
            200: {
              description: 'Liste des lignes de vente',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/LigneVente',
                    },
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
            404: {
              description: 'Vente non trouvée',
              content: {
                'application/json': {
                  example: {
                    success: false,
                    message: 'Vente introuvable',
                  },
                },
              },
            },
          },
        },
      },

      // ==================== ROUTES STATISTIQUES ====================
      '/stock/stats/stock': {
        get: {
          tags: ['Statistiques'],
          summary: 'Statistiques de stock',
          description: 'Endpoint pour récupérer les statistiques globales du stock',
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: 'Statistiques du stock',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/StatsStock',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },

      '/stock/stats/ventes': {
        get: {
          tags: ['Statistiques'],
          summary: 'Statistiques de ventes',
          description: 'Endpoint pour récupérer les statistiques des ventes',
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              in: 'query',
              name: 'periode',
              schema: {
                type: 'string',
                enum: ['jour', 'semaine', 'mois', 'annee'],
                default: 'mois',
              },
              description: "Période d'analyse",
            },
          ],
          responses: {
            200: {
              description: 'Statistiques des ventes',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/StatsVentes',
                  },
                },
              },
            },
            401: { description: 'Non autorisé' },
          },
        },
      },
    },
  },
  apis: [], // On utilise la documentation manuelle dans ce fichier
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
