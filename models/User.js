import db from '../config/db.js';

const User = {
  // Recherche un utilisateur par ID
    findById: (id) => {
    const query = 'SELECT id,username,email,numero_telephone,role,photo FROM utilisateurs WHERE id = ?';
    return db.execute(query, [id]);
  },
  // Recherche un utilisateur par email
  findByEmail: (email) => {
    const query = 'SELECT id,username,email,numero_telephone,password,role FROM utilisateurs WHERE email = ?';
    return db.execute(query, [email || null]);
  },

  // Recherche un utilisateur par nom d'utilisateur
  findByUsername: (username) => {
    const query = 'SELECT id,username,email,numero_telephone,password,role,status FROM utilisateurs WHERE username = ?';
    return db.execute(query, [username]);
  },

  // Recherche un utilisateur par numéro de téléphone
  findByPhoneNumber: (numeroTelephone) => {
    const query = 'SELECT id,username,email,numero_telephone,role FROM utilisateurs WHERE numero_telephone = ?';
    return db.execute(query, [numeroTelephone || null]);
  },

  // Recherche un utilisateur par rôle
  findByRole: (role) => {
    const query = 'SELECT id,username,email,numero_telephone,role FROM utilisateurs WHERE role = ?';
    return db.execute(query, [role]);
  },

  // Recherche tous les utilisateurs, triés par un champ donné (par exemple, username)
  findAllSorted: (sortBy = 'id') => {
    const query = `SELECT * FROM utilisateurs ORDER BY ${sortBy}`;
    return db.execute(query);
  },
// Méthode pour récupérer tous les utilisateurs sauf ceux avec le rôle 'gerant'
findAll: () => {
  const query = "SELECT id, username, email, numero_telephone, role, status,photo FROM utilisateurs WHERE role != 'gerant'";
  return db.execute(query);
}
,
  
  findOne: (criteria) => {
    let query = 'SELECT id, username, email, numero_telephone, role, photo FROM utilisateurs WHERE ';
    const values = [];
  
    // Ajouter la condition pour la recherche par email, username ou numéro de téléphone
    if (criteria.email) {
      query += 'email = ?';
      values.push(criteria.email);
    } else if (criteria.username) {
      query += 'username = ?';
      values.push(criteria.username);
    } else if (criteria.numeroTelephone) {
      query += 'numero_telephone = ?';
      values.push(criteria.numeroTelephone);
    } else {
      return Promise.reject(new Error('Aucun critère valide fourni pour la recherche.'));
    }
  
    return db.execute(query, values);
  }
,  
  // Ajoute un nouvel utilisateur dans la base de données
  addUser: (username, email, numeroTelephone, password, role) => {
    const query = ` 
      INSERT INTO utilisateurs 
      (username, email, numero_telephone, password, role, temps_de_creation) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    return db.execute(query, [username, email || null, numeroTelephone || null, password, role]);
  },

// Méthode pour mettre à jour un utilisateur par ID
updateUser: (id, updateData) => {
    const { username, email, numeroTelephone, role,status } = updateData;
  
    let query = 'UPDATE utilisateurs SET ';
    const values = [];
  
    // Construire la requête dynamique en fonction des champs fournis
    if (username !== undefined) {
      query += 'username = ?, ';
      values.push(username);
    }
    if (email !== undefined) {
      query += 'email = ?, ';
      values.push(email);
    }
    if (numeroTelephone !== undefined) {
      query += 'numero_telephone = ?, ';
      values.push(numeroTelephone);
    }
    if (role !== undefined) {
      query += 'role = ?, ';
      values.push(role);
    }
    if (status) {
      query += 'status = ?, ';
      values.push(status);
    }
  
    // Retirer la dernière virgule et espace
    query = query.slice(0, -2);
  
    // Ajouter la condition pour spécifier quel utilisateur mettre à jour
    query += ' WHERE id = ?';
    values.push(id);
  
    // Exécuter la requête
    return db.execute(query, values);
  }
,  
  
  // Supprime un utilisateur par son ID
  deleteUser: (id) => {
    const query = 'DELETE FROM utilisateurs WHERE id = ?';
    return db.execute(query, [id]);
  },
  updatePasswordByEmail: (email, newPassword) => {
    const query = 'UPDATE utilisateurs SET password = ? WHERE email = ?';
    return db.execute(query, [newPassword, email]);
  },
  updatePasswordById: (id, newPassword) => {
    const query = 'UPDATE utilisateurs SET password = ? WHERE id = ?';
    return db.execute(query, [newPassword, id]);
  },
  // Met à jour la photo d'un utilisateur par ID
updateUserPhoto: (userId, photoPath) => {
  const query = 'UPDATE utilisateurs SET photo = ? WHERE id = ?';
  return db.execute(query, [photoPath, userId]);
},

  

  // Affecte un rôle à un utilisateur existant
  /*assignRoleToUser: (id, role) => {
    const query = 'UPDATE utilisateurs SET role = ? WHERE id = ?';
    return db.execute(query, [role, id]);
  },*/
   };

export default User;
