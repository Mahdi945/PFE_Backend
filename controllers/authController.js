import bcrypt from 'bcryptjs';  // Remplacer bcrypt par bcryptjs
import User from '../models/User.js';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

// Charge les variables d'environnement du fichier .env dans process.env
dotenv.config();

// Fonction pour enregistrer un nouvel utilisateur
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

    res.status(201).json({ message: 'Utilisateur ajouté avec succès.' });
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

// Connexion utilisateur
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis.' });
    }
  
    try {
      const [user] = await User.findByUsername(username);
      if (!user || user.length === 0) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
      }
  
      const token = jwt.sign(
        { id: user[0].id, username: user[0].username, role: user[0].role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      res.status(200).json({ message: 'Connexion réussie.', token });
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };
  
  // Accès aux données utilisateur protégées
  const getUserProfile = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
  };
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
  
 
  

export default { registerUser, loginUser,getUserProfile, updateUser, updatePassword , getUserByEmail, getUserByUsername, getUserByRole, deleteUser, getAllUsers };
