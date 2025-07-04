import bcrypt from 'bcryptjs'; // Remplacer bcrypt par bcryptjs
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Charge les variables d'environnement du fichier .env dans process.env
dotenv.config();

// Configurer le transporteur nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fonction pour générer un template email avec le logo
const generateEmailTemplate = (title, content, actionLink = null, actionText = null) => {
  return `
    <div style="font-family: 'Poppins', 'Segoe UI', sans-serif; max-width: 650px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);">
      <!-- Header orange vif avec logo très grand -->
      <div style="padding: 50px 20px; text-align: center; background: linear-gradient(135deg, #FF7F33 0%, #FF5E1A 100%);">
        <img src="cid:logo" alt="Carbotrack Logo" style="height: 50px; width: auto; max-width: 100%;"/>
      </div>
      
      <!-- Contenu principal -->
      <div style="padding: 50px 40px; color: #333333; line-height: 1.6; background: #ffffff;">
        <h1 style="color: #2c3e50; margin: 0 0 30px 0; font-size: 30px; font-weight: 600; text-align: center; letter-spacing: -0.5px;">
          ${title}
        </h1>
        
        <div style="font-size: 16px; color: #555555;">
          ${content}
        </div>
        
        ${
          actionLink && actionText
            ? `
          <div style="text-align: center; margin: 50px 0 40px;">
            <a href="${actionLink}" style="
              display: inline-block;
              padding: 18px 40px;
              font-size: 17px;
              color: #ffffff;
              background: linear-gradient(135deg, #FF7F33 0%, #FF5E1A 100%);
              text-decoration: none;
              border-radius: 10px;
              font-weight: 600;
              transition: all 0.2s ease;
              box-shadow: 0 4px 15px rgba(255, 126, 51, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(255, 126, 51, 0.4)';" 
            onmouseout="this.style.transform='none';this.style.boxShadow='0 4px 15px rgba(255, 126, 51, 0.3)';">
              ${actionText}
            </a>
          </div>
        `
            : ''
        }
      </div>
      
      <!-- Footer léger -->
      <div style="padding: 24px; text-align: center; font-size: 14px; color: #95a5a6; background: #f9f9f9;">
        <p style="margin: 0;">
          © ${new Date().getFullYear()} Carbotrack. Tous droits réservés.
        </p>
        <p style="margin: 8px 0 0;">
          <a href="${process.env.FRONTEND_URL}" style="color: #7f8c8d; text-decoration: none; font-weight: 500;">Accéder à la plateforme</a>
        </p>
      </div>
    </div>
  `;
};

const updateUserPhoto = async (req, res) => {
  console.log('Début de la mise à jour de la photo de profil');

  // Vérifiez si l'utilisateur et le fichier existent
  const userId = req.params.id;
  console.log('ID utilisateur:', userId); // ID de l'utilisateur dans la route
  console.log("Chemin de l'image téléchargée:", req.file ? req.file.filename : 'Aucun fichier');

  if (!req.file) {
    console.log('Aucun fichier trouvé dans la requête');
    return res.status(400).json({ message: 'Aucun fichier envoyé' });
  }

  // Récupérer le chemin de l'image
  const photoPath = `/images/${req.file.filename}`;
  console.log(`Chemin de l'image téléchargée: ${photoPath}`);

  try {
    // Mettre à jour la photo dans la base de données
    console.log('Tentative de mise à jour de la photo dans la base de données...');
    await User.updateUserPhoto(userId, photoPath); // Méthode à implémenter dans le modèle User

    console.log('Photo mise à jour avec succès');
    res.status(200).json({ message: 'Photo mise à jour avec succès', photo: photoPath });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la photo:', error);
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour enregistrer un nouvel utilisateur et envoyer un email
const registerUser = async (req, res) => {
  const { username, email, numero_telephone, password, role } = req.body;

  // Vérification des champs obligatoires
  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur, mot de passe et rôle sont obligatoires." });
  }

  try {
    // Vérifier si le nom d'utilisateur existe déjà
    const [existingUserByUsername] = await User.findByUsername(username);
    if (existingUserByUsername && existingUserByUsername.length > 0) {
      return res.status(400).json({ message: "Ce nom d'utilisateur est déjà pris." });
    }

    // Vérifier si l'email existe déjà
    const [existingUserByEmail] = await User.findByEmail(email);
    if (existingUserByEmail && existingUserByEmail.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Vérifier si le numéro de téléphone existe déjà
    if (numero_telephone) {
      const [existingUserByPhoneNumber] = await User.findByPhoneNumber(numero_telephone);
      if (existingUserByPhoneNumber && existingUserByPhoneNumber.length > 0) {
        return res.status(400).json({ message: 'Ce numéro de téléphone est déjà utilisé.' });
      }
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajouter l'utilisateur à la base de données
    await User.addUser(username, email || null, numero_telephone || null, hashedPassword, role);

    const emailContent = `
      <div style="margin-bottom: 40px; text-align: center;">
        <p style="font-size: 18px; color: #FF7F33; margin-bottom: 30px;">
          Votre compte a été créé avec succès !
        </p>
        
        <div style="background: #FFF8F5; border: 1px solid #FFE8DE; padding: 25px; border-radius: 10px; text-align: left; max-width: 500px; margin: 0 auto;">
          <p style="font-weight: 600; margin-bottom: 20px; color: #2c3e50; font-size: 17px;">Vos identifiants de connexion :</p>
          
          <div style="display: flex; margin-bottom: 15px; align-items: center;">
            <div style="width: 150px; color: #7f8c8d; font-size: 15px;">Nom d'utilisateur</div>
            <div style="font-weight: 600; color: #2c3e50; background: #f5f5f5; padding: 8px 12px; border-radius: 6px; flex-grow: 1;">${username}</div>
          </div>
          
          <div style="display: flex; margin-bottom: 5px; align-items: center;">
            <div style="width: 150px; color: #7f8c8d; font-size: 15px;">Mot de passe</div>
            <div style="font-weight: 600; color: #2c3e50; background: #f5f5f5; padding: 8px 12px; border-radius: 6px; flex-grow: 1;">${password}</div>
          </div>
        </div>
      </div>
      
      <div style="background: #F9F9F9; padding: 20px; border-radius: 8px; margin: 40px 0 30px 0;">
        <p style="margin: 0; color: #666; font-size: 15px; text-align: center;">
          <span style="color: #FF7F33; font-weight: 500;">Important :</span> Changez votre mot de passe temporaire dès votre première connexion.
        </p>
      </div>
    `;

    // Envoi de l'email contenant les informations de l'utilisateur
    const mailOptions = {
      from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Bienvenue sur Carbotrack',
      html: generateEmailTemplate('Bienvenue sur Carbotrack', emailContent),
      attachments: [
        {
          filename: 'logobg.png',
          path: path.join(process.cwd(), 'public', 'logobg.png'),
          cid: 'logo',
        },
      ],
    };

    // Envoi de l'email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        return res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
      }
      console.log('Email envoyé:', info.response);
    });

    res.status(201).json({ message: 'Utilisateur ajouté avec succès et email envoyé.' });
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis l'URL
  const { username, email, numero_telephone, role } = req.body; // Récupérer les données du corps de la requête

  try {
    // Vérifier si l'utilisateur avec cet ID existe
    const [existingUser] = await User.findById(id); // Rechercher l'utilisateur par ID
    if (!existingUser || existingUser.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Préparer les données à mettre à jour
    const updateData = {};

    // Ajouter seulement les champs non undefined
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (numero_telephone !== undefined) updateData.numero_telephone = numero_telephone;
    if (role !== undefined) updateData.role = role; // Mise à jour du rôle

    // Si aucun champ n'est fourni, renvoyer une erreur
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
    }

    // Mise à jour des informations de l'utilisateur
    await User.updateUser(id, updateData);

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Fonction pour rechercher un utilisateur par email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const [user] = await User.findByEmail(email);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json(user[0]);
  } catch (err) {
    console.error("Erreur lors de la recherche de l'utilisateur:", err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Fonction pour rechercher un utilisateur par nom d'utilisateur
const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const [user] = await User.findByUsername(username);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json(user[0]);
  } catch (err) {
    console.error("Erreur lors de la recherche de l'utilisateur:", err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Fonction pour rechercher un utilisateur par rôle
const getUserByRole = async (req, res) => {
  const { role } = req.params;

  try {
    const [users] = await User.findByRole(role);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec ce rôle.' });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error('Erreur lors de la recherche des utilisateurs:', err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await User.findById(id);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Supprimer l'utilisateur
    await User.deleteUser(id);

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur:", err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Fonction pour lister tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const [users] = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs:', err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Vérifier si un nom d'utilisateur ou un email est fourni, ainsi qu'un mot de passe
  if ((!username && !email) || !password) {
    return res.status(400).json({ message: "Nom d'utilisateur ou email et mot de passe requis." });
  }

  try {
    let user;

    // Si un nom d'utilisateur est fourni, chercher par nom d'utilisateur, sinon chercher par email
    if (username) {
      const result = await User.findByUsername(username);
      if (!result || result.length === 0 || result[0].length === 0) {
        return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
      }
      user = result[0][0];
    } else if (email) {
      const result = await User.findByEmail(email);
      if (!result || result.length === 0 || result[0].length === 0) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
      }
      user = result[0][0];
    }

    // Vérifier le statut de l'utilisateur (si l'utilisateur est inactif)
    if (user.status === 'inactive') {
      return res
        .status(403)
        .json({ message: "Votre compte est désactivé. Contactez l'administration." });
    }

    // Comparer le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Nom d'utilisateur, email ou mot de passe incorrect." });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Définir le cookie HTTP-only
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // Désactiver pour HTTP, activer pour HTTPS en production
      sameSite: 'Strict',
      maxAge: 18000000, 
    });

    res.status(200).json({
      message: 'Connexion réussie.',
      user: { username: user.username, role: user.role, photo: user.photo },
    });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Fonction de déconnexion
const logoutUser = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: false, // Désactivé pour HTTP (en production, passe à true pour HTTPS)
    sameSite: 'Strict',
  });
  return res.status(200).json({ message: 'Déconnexion réussie' });
};

const deactivateUser = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const [user] = await User.findById(id);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    await User.updateUser(id, { status: 'inactive' });

    // Contenu de l'email de désactivation
    const emailContent = `
      <p>Bonjour ${user[0].username},</p>
      <p>Votre compte Carbotrack a été désactivé pour la raison suivante :</p>
      <p><em>${reason}</em></p>
      <p>Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre équipe de support.</p>
    `;

    const mailOptions = {
      from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
      to: user[0].email,
      subject: 'Votre compte a été désactivé',
      html: generateEmailTemplate('Compte désactivé', emailContent),
      attachments: [
        {
          filename: 'logobg.png',
          path: path.join(process.cwd(), 'public', 'logobg.png'),
          cid: 'logo',
        },
      ],
    };

    transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Compte désactivé avec succès.' });
  } catch (err) {
    console.error("Erreur lors de la désactivation de l'utilisateur:", err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

const reactivateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await User.findById(id);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    await User.updateUser(id, { status: 'active' });

    // Contenu de l'email de réactivation
    const emailContent = `
      <p>Bonjour ${user[0].username},</p>
      <p>Votre compte Carbotrack a été réactivé avec succès.</p>
      <p>Vous pouvez maintenant vous connecter à votre compte en utilisant vos identifiants habituels.</p>
      <p>Si vous rencontrez des problèmes, n'hésitez pas à contacter notre équipe de support.</p>
    `;

    const mailOptions = {
      from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
      to: user[0].email,
      subject: 'Votre compte a été réactivé',
      html: generateEmailTemplate('Compte réactivé', emailContent),
      attachments: [
        {
          filename: 'logobg.png',
          path: path.join(process.cwd(), 'public', 'logobg.png'),
          cid: 'logo',
        },
      ],
    };

    transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Compte réactivé avec succès.' });
  } catch (err) {
    console.error("Erreur lors de la réactivation de l'utilisateur:", err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Accès aux données utilisateur protégées
const getUserProfile = async (req, res) => {
  const user = req.user;

  // Vérification si la photo est présente
  if (user.photo) {
    // Ajouter l'URL complète de l'image de profil
    user.photoUrl = `http://localhost:3000${user.photo}`;
  }

  res.status(200).json(user); // Envoyer l'utilisateur avec l'URL de la photo
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID depuis l'URL
    const { username, email, numeroTelephone } = req.body;

    // Vérifier si l'utilisateur existe
    const [userResult] = await User.findById(id);
    if (userResult.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le username, l'email ou le numéro de téléphone existent déjà
    if (username) {
      const [existingUsername] = await User.findByUsername(username);
      if (existingUsername.length > 0 && existingUsername[0].id !== parseInt(id)) {
        return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
      }
    }

    if (email) {
      const [existingEmail] = await User.findByEmail(email);
      if (existingEmail.length > 0 && existingEmail[0].id !== parseInt(id)) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }
    }

    if (numeroTelephone) {
      const [existingPhone] = await User.findByPhoneNumber(numeroTelephone);
      if (existingPhone.length > 0 && existingPhone[0].id !== parseInt(id)) {
        return res.status(400).json({ message: 'Numéro de téléphone déjà utilisé' });
      }
    }

    // Mettre à jour l'utilisateur
    await User.updateUser(id, { username, email, numeroTelephone });

    res.json({ message: 'Profil mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const [user] = await User.findByEmail(email);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Générer un token JWT pour la réinitialisation du mot de passe
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '30m' });

    // Construire le lien de réinitialisation
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Contenu de l'email de réinitialisation
    const emailContent = `
      <p>Bonjour,</p>
      <p>Vous avez demandé à réinitialiser votre mot de passe Carbotrack.</p>
      <p>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
      <p><small>Ce lien expirera dans 30 minutes.</small></p>
    `;

    // Options de l'email
    const mailOptions = {
      from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Réinitialisation de votre mot de passe Carbotrack',
      html: generateEmailTemplate(
        'Réinitialisation de mot de passe',
        emailContent,
        resetLink,
        'Réinitialiser le mot de passe'
      ),
      attachments: [
        {
          filename: 'logobg.png',
          path: path.join(process.cwd(), 'public', 'logobg.png'),
          cid: 'logo',
        },
      ],
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur d'envoi de l'email:", error);
        return res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
      }
      res.status(200).json({ message: 'Lien de réinitialisation envoyé avec succès.' });
    });
  } catch (err) {
    console.error('Erreur lors de la demande de réinitialisation du mot de passe:', err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.query; // Récupérer le token depuis l'URL

  try {
    if (!token) {
      return res.status(400).json({ message: 'Token manquant.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }

    const email = decoded.email;

    const [user] = await User.findByEmail(email);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (
      !newPassword ||
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/\d/.test(newPassword) ||
      !/[\W_]/.test(newPassword)
    ) {
      return res.status(400).json({
        message:
          'Mot de passe non valide. Il doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await User.updatePasswordByEmail(email, hashedPassword);

    if (!updated) {
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe.' });
    }

    // Envoyer un email de confirmation
    const emailContent = `
      <p>Bonjour ${user[0].username},</p>
      <p>Votre mot de passe Carbotrack a été mis à jour avec succès.</p>
      <p>Si vous n'avez pas effectué cette action, veuillez contacter immédiatement notre équipe de support.</p>
    `;

    const mailOptions = {
      from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Confirmation de changement de mot de passe',
      html: generateEmailTemplate('Mot de passe mis à jour', emailContent),
      attachments: [
        {
          filename: 'logobg.png',
          path: path.join(process.cwd(), 'public', 'logobg.png'),
          cid: 'logo',
        },
      ],
    };

    transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur de mise à jour du mot de passe:', error);
    res.status(500).json({ message: 'Erreur du serveur. Veuillez réessayer plus tard.' });
  }
};

// Fonction pour mettre à jour le mot de passe
const updatePasswordConnected = async (req, res) => {
  const { newPassword } = req.body;

  try {
    // Extraire le token du cookie HTTP-only
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Pas de token, accès non autorisé' });
    }

    // Vérifier la validité du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Utiliser l'ID de l'utilisateur décodé plutôt que l'email
    const userId = decoded.id;

    // Vérifier que l'utilisateur existe dans la base de données
    const [user] = await User.findById(userId);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification de la force du mot de passe
    if (
      !newPassword ||
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/\d/.test(newPassword) ||
      !/[\W_]/.test(newPassword)
    ) {
      return res.status(400).json({
        message:
          'Mot de passe non valide. Il doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.',
      });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe dans la base de données
    await User.updatePasswordById(userId, hashedPassword);

    // Envoyer un email de confirmation
    const emailContent = `
      <p>Bonjour ${user[0].username},</p>
      <p>Le mot de passe de votre compte Carbotrack a été modifié avec succès.</p>
      <p>Si vous n'avez pas effectué cette action, veuillez contacter immédiatement notre équipe de support.</p>
    `;

    const mailOptions = {
      from: `"Carbotrack" <${process.env.EMAIL_USER}>`,
      to: user[0].email,
      subject: 'Confirmation de changement de mot de passe',
      html: generateEmailTemplate('Mot de passe mis à jour', emailContent),
      attachments: [
        {
          filename: 'logobg.png',
          path: path.join(process.cwd(), 'public', 'logobg.png'),
          cid: 'logo',
        },
      ],
    };

    transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur de mise à jour du mot de passe:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour du mot de passe.' });
  }
};

export default {
  updateUserPhoto,
  updateUserProfile,
  registerUser,
  loginUser,
  logoutUser,
  deactivateUser,
  reactivateUser,
  getUserProfile,
  requestPasswordReset,
  updateUser,
  updatePassword,
  updatePasswordConnected,
  getUserByEmail,
  getUserByUsername,
  getUserByRole,
  deleteUser,
  getAllUsers,
};
/*
// Fonction pour mettre à jour le mot de passe d'un utilisateur en vérifiant l'email
    const updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    // Vérification des champs obligatoires
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email et nouveau mot de passe requis.' });
    }
  
    try {
      // Vérifier si l'utilisateur avec cet email existe
      const [user] = await User.findByEmail(email);
      if (!user || user.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      // Hacher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe de l'utilisateur
      await User.updatePasswordByEmail(email, hashedPassword);
  
      res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (err) {
      console.error('Erreur lors de la mise à jour du mot de passe:', err);
      res.status(500).json({ message: 'Erreur du serveur.' });
    }
  };
  
  //  Envoi de l'OTP à l'email
  const sendOTP = async (req, res) => {
    const { email } = req.body;
  
    const [user] = await User.findByEmail(email);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  
    const otp = generateOTP();
    otpStorage.set(email, otp);
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Code de vérification OTP',
      text: `Votre code OTP est : ${otp}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur d envoi d email:', error);
        return res.status(500).json({ message: 'Erreur d envoi de l OTP.' });
      }
      res.status(200).json({ message: 'OTP envoyé avec succès.' });
    });
  };
  // verification de l otp
  const verifyOTP = (req, res) => {
    const { otp } = req.body;
  
    // Assurez-vous que l'OTP est transmis sans l'email
    const storedOTP = otpStorage.get(req.user.email); // Récupérer l'OTP en fonction de l'email de l'utilisateur (décodé depuis le token)
  
    if (!storedOTP || storedOTP !== otp) {
      return res.status(400).json({ message: 'OTP invalide ou expiré.' });
    }
  
    // Générer un token temporaire pour la réinitialisation du mot de passe
    const token = jwt.sign({ email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '10m' });
  
    // Supprimer l'OTP après validation
    otpStorage.delete(req.user.email);
  
    res.status(200).json({ token, message: 'OTP vérifié avec succès.' });
  };
  
  const updatePassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      // Décoder le token pour obtenir l'email de l'utilisateur
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;
  
      // Vérifier que l'email existe bien
      const [user] = await User.findByEmail(email);
      if (!user || user.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      // Hacher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe dans la base de données
      await User.updatePasswordByEmail(email, hashedPassword);
  
      res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (error) {
      console.error('Erreur de mise à jour du mot de passe:', error);
      res.status(400).json({ message: 'Lien expiré ou invalide.' });
    }
  };*/
