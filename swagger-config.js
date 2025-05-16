import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Carbotrack',
      version: '1.0.0',
      description: 'Documentation complète avec authentification par cookies HTTP-only',
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
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            username: { type: 'string', example: "Ahmed Zamma" },
            email: { type: 'string', format: 'email', example: "mahdibeyy@gmail.com" },
            numero_telephone: { type: 'string', example: "56327237" },
            role: { 
              type: 'string', 
              enum: ['gerant', 'Cogerant', 'client', 'caissier', 'pompiste'],
              example: 'gerant'
            },
            status: { type: 'string', example: 'active' },
            photo: { type: 'string', example: '/images/profile.jpg' },
            temps_de_creation: { type: 'string', format: 'date-time' }
          }
        },
        UserInput: {
          type: 'object',
          required: ['username', 'password', 'role'],
          properties: {
            username: { type: 'string', minLength: 3, maxLength: 50 },
            email: { type: 'string', format: 'email' },
            numero_telephone: { type: 'string' },
            password: { type: 'string', minLength: 8 },
            role: { 
              type: 'string',
              enum: ['gerant', 'Cogerant', 'client', 'caissier', 'pompiste']
            }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
          }
        }
      }
    }
  },
  apis: [`${__dirname}/routes/*.js`]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;