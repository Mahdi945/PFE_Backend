import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Carbotrack',
      version: '1.0.0',
      description: 'API pour la gestion des réclamations Carbotrack',
      contact: {
        name: "Support API",
        email: "mahdibeyy@gmail.com"
      }
    },
    servers: [
      { url: 'http://localhost:3000/api', description: 'Serveur local' },
      { url: 'https://api.carbotrack.com', description: 'Production' }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'jwt',
          description: 'Authentification via cookie HTTP-only'
        }
      },
      schemas: {
        Reclamation: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            id_client: { type: 'integer', example: 5 },
            objet: { type: 'string', example: "Problème de livraison" },
            raison: { 
              type: 'string',
              enum: ['produit', 'service', 'livraison', 'facturation', 'autre'],
              example: 'livraison'
            },
            description: { 
              type: 'string', 
              example: "La livraison n'est pas arrivée à la date promise" 
            },
            statut: {
              type: 'string',
              enum: ['nouveau', 'en_cours', 'resolu', 'fermer'],
              example: 'nouveau'
            },
            date_creation: { type: 'string', format: 'date-time' }
          }
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
              example: "Problème de livraison"
            },
            raison: { 
              type: 'string',
              enum: ['produit', 'service', 'livraison', 'facturation', 'autre'],
              example: 'livraison'
            },
            description: { 
              type: 'string',
              minLength: 1,
              maxLength: 1000,
              example: "La livraison n'est pas arrivée à la date promise"
            }
          }
        },
        StatutUpdate: {
          type: 'object',
          required: ['statut'],
          properties: {
            statut: {
              type: 'string',
              enum: ['nouveau', 'en_cours', 'resolu', 'fermer'],
              example: 'en_cours'
            }
          }
        }
      }
    },
    paths: {
      '/reclamations/add': {
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
                  $ref: '#/components/schemas/ReclamationInput'
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Réclamation créée avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Reclamation'
                  }
                }
              }
            },
            400: { description: 'Données invalides' },
            401: { description: 'Non autorisé' },
            500: { description: 'Erreur serveur' }
          }
        }
      },
      '/reclamations/client/{id_client}': {
        get: {
          tags: ['Réclamations'],
          summary: 'Obtenir les réclamations d\'un client',
          description: 'Endpoint pour récupérer toutes les réclamations d\'un client spécifique',
          security: [{ cookieAuth: [] }],
          parameters: [{
            in: 'path',
            name: 'id_client',
            required: true,
            schema: { type: 'integer' },
            description: 'ID du client'
          }],
          responses: {
            200: {
              description: 'Liste des réclamations du client',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Reclamation'
                    }
                  }
                }
              }
            },
            400: { description: 'ID client invalide' },
            401: { description: 'Non autorisé' },
            404: { description: 'Client non trouvé' },
            500: { description: 'Erreur serveur' }
          }
        }
      },
      '/reclamations/{id}': {
        get: {
          tags: ['Réclamations'],
          summary: 'Obtenir les détails d\'une réclamation',
          description: 'Endpoint pour récupérer les détails d\'une réclamation spécifique',
          security: [{ cookieAuth: [] }],
          parameters: [{
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            description: 'ID de la réclamation'
          }],
          responses: {
            200: {
              description: 'Détails de la réclamation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Reclamation'
                  }
                }
              }
            },
            400: { description: 'ID réclamation invalide' },
            401: { description: 'Non autorisé' },
            404: { description: 'Réclamation non trouvée' },
            500: { description: 'Erreur serveur' }
          }
        }
      },
      '/reclamations/{id}/statut': {
        put: {
          tags: ['Réclamations'],
          summary: 'Mettre à jour le statut d\'une réclamation',
          description: 'Endpoint pour modifier le statut d\'une réclamation',
          security: [{ cookieAuth: [] }],
          parameters: [{
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            description: 'ID de la réclamation'
          }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/StatutUpdate'
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Statut mis à jour avec succès',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Reclamation'
                  }
                }
              }
            },
            400: { description: 'Données invalides' },
            401: { description: 'Non autorisé' },
            404: { description: 'Réclamation non trouvée' },
            500: { description: 'Erreur serveur' }
          }
        }
      },
      '/reclamations': {
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
                      $ref: '#/components/schemas/Reclamation'
                    }
                  }
                }
              }
            },
            401: { description: 'Non autorisé' },
            500: { description: 'Erreur serveur' }
          }
        }
      }
    }
  },
  apis: [] // On utilise la documentation manuelle dans ce fichier
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;