import bcrypt from 'bcryptjs';  // Remplacer bcrypt par bcryptjs
import User from '../models/User.js';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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

// Fonction pour enregistrer un nouvel utilisateur et envoyer un email
const registerUser = async (req, res) => {
  const { username, email, numeroTelephone, password, role } = req.body;

  // Vérification des champs obligatoires
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Nom d\'utilisateur, mot de passe et rôle sont obligatoires.' });
  }

  try {
    // Vérifier si le nom d'utilisateur existe déjà
    const [existingUserByUsername] = await User.findByUsername(username);
    if (existingUserByUsername && existingUserByUsername.length > 0) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà pris.' });
    }

    // Vérifier si l'email existe déjà
    const [existingUserByEmail] = await User.findByEmail(email);
    if (existingUserByEmail && existingUserByEmail.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Vérifier si le numéro de téléphone existe déjà
    if (numeroTelephone) {
      const [existingUserByPhoneNumber] = await User.findByPhoneNumber(numeroTelephone);
      if (existingUserByPhoneNumber && existingUserByPhoneNumber.length > 0) {
        return res.status(400).json({ message: 'Ce numéro de téléphone est déjà utilisé.' });
      }
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajouter l'utilisateur à la base de données
    await User.addUser(username, email || null, numeroTelephone || null, hashedPassword, role);

    // Envoi de l'email contenant les informations de l'utilisateur
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bienvenue sur notre plateforme',
      html: `
        <p>Bonjour ${username},</p>
        <p>Bienvenue sur notre plateforme ! Voici vos informations de connexion :</p>
        <p><strong>Nom d'utilisateur :</strong> ${username}</p>
        <p><strong>Mot de passe :</strong> ${password}</p>
        <p>Nous vous recommandons de changer votre mot de passe après votre première connexion pour plus de sécurité.</p>
        <p>Cordialement,</p>
        <p>L'équipe de support</p>
      `,
    };

    // Envoi de l'email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
      }
      console.log('Email envoyé:', info.response);
    });

    res.status(201).json({ message: 'Utilisateur ajouté avec succès et email envoyé.' });
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

const updateUser = async (req, res) => {
    const { id } = req.params;  // Récupérer l'ID depuis l'URL
    const { username, email, numeroTelephone, role } = req.body;  // Récupérer les données du corps de la requête
  
    try {
      // Vérifier si l'utilisateur avec cet ID existe
      const [existingUser] = await User.findById(id);  // Rechercher l'utilisateur par ID
      if (!existingUser || existingUser.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      // Préparer les données à mettre à jour
      const updateData = {};
  
      // Ajouter seulement les champs non undefined
      if (username !== undefined) updateData.username = username;
      if (email !== undefined) updateData.email = email;
      if (numeroTelephone !== undefined) updateData.numeroTelephone = numeroTelephone;
      if (role !== undefined) updateData.role = role;  // Mise à jour du rôle
  
      // Si aucun champ n'est fourni, renvoyer une erreur
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
      }
  
      // Mise à jour des informations de l'utilisateur
      await User.updateUser(id, updateData);
  
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
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
    console.error('Erreur lors de la recherche de l\'utilisateur:', err);
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
    console.error('Erreur lors de la recherche de l\'utilisateur:', err);
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
    console.error('Erreur lors de la suppression de l\'utilisateur:', err);
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
      const result = await User.findByEmail(email); // Une fonction que vous devrez peut-être implémenter pour chercher par email
      if (!result || result.length === 0 || result[0].length === 0) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect." });
      }
      user = result[0][0];
    }

    // Vérifier le statut de l'utilisateur (si l'utilisateur est inactif)
    if (user.status === 'inactive') {
      return res.status(403).json({ message: "Votre compte est désactivé. Contactez l'administration." });
    }

    // Comparer le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Nom d'utilisateur, email ou mot de passe incorrect." });
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
      maxAge: 3600000 // 1 heure
    });

    res.status(200).json({ message: "Connexion réussie." });
  } catch (err) {
    console.error("Erreur lors de la connexion:", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


// Fonction de déconnexion
const logoutUser = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: false, // Désactivé pour HTTP (en production, passe à true pour HTTPS)
    sameSite: 'Strict'
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
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user[0].email,
      subject: 'Votre compte a été désactivé',
      html: `<p>Bonjour ${user[0].username},</p>
             <p>Votre compte a été désactivé pour la raison suivante : ${reason}</p>
             <p>Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur.</p>`
    };
    transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Compte désactivé avec succès.' });
  } catch (err) {
    console.error('Erreur lors de la désactivation de l\'utilisateur:', err);
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
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user[0].email,
      subject: 'Votre compte a été réactivé',
      html: `<p>Bonjour ${user[0].username},</p>
             <p>Votre compte a été réactivé. Vous pouvez maintenant vous connecter.</p>`
    };
    transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Compte réactivé avec succès.' });
  } catch (err) {
    console.error('Erreur lors de la réactivation de l\'utilisateur:', err);
    res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

  
  // Accès aux données utilisateur protégées
  const getUserProfile = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
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
      const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  
      // Construire le lien de réinitialisation
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
      // Contenu HTML de l'email avec un bouton stylé
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Réinitialisation de votre mot de passe</h2>
          <p>Bonjour,</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour procéder :</p>
          <a href="${resetLink}" style="
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
          ">Réinitialiser le mot de passe</a>
          <p style="margin-top: 20px;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
          <p>Merci,</p>
          <p>L'équipe de support</p>
        </div>
      `;
  
      // Options de l'email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        html: htmlContent, // Utilisation du contenu HTML
      };
  
      // Envoyer l'email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erreur d\'envoi de l\'email:', error);
          return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
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
  
    try {
      // L'utilisateur est déjà authentifié par Passport, ses données sont disponibles dans req.user
      const email = req.user.email;
  
      // Vérifier que l'utilisateur existe
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
      res.status(500).json({ message: 'Erreur du serveur.' });
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
      const user = await User.findById(userId);  // Recherche par ID au lieu de l'email
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      // Hacher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe dans la base de données
      await User.updatePasswordById(userId, hashedPassword);  // Mise à jour par ID
  
      res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (error) {
      console.error('Erreur de mise à jour du mot de passe:', error);
      res.status(400).json({ message: 'Erreur lors de la mise à jour du mot de passe.' });
    }
  };
  
  
  
export default { registerUser, loginUser,logoutUser,deactivateUser,reactivateUser,getUserProfile,requestPasswordReset, updateUser, updatePassword ,updatePasswordConnected, getUserByEmail, getUserByUsername, getUserByRole, deleteUser, getAllUsers };

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
  