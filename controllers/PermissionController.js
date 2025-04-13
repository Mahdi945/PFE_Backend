import Permission from '../models/Permission.js';

// Récupérer toutes les permissions
const getPermissions = async (req, res) => {
    try {
      const results = await Permission.getAll();
      if (!results) {
        return res.status(404).json({ error: 'Aucune permission trouvée.' });
      }
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: `Erreur lors de la récupération des permissions: ${err.message}` });
    }
  };
  const getPermissionsParRole = async (req, res) => {
    try {
      const { role } = req.params;
  
      if (!role) {
        return res.status(400).json({ error: 'Le rôle est requis.' });
      }
  
      Permission.getByRole(role, (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Erreur de récupération des permissions.' });
        }
        if (!results || results.length === 0) {
          return res.status(404).json({ message: 'Aucune permission trouvée pour ce rôle.' });
        }
        res.json(results);
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Mettre à jour une permission
const updatePermission = async (req, res) => {
  try {
    const { role, element_name, is_visible } = req.body;

    if (!role || !element_name || is_visible === undefined) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    await Permission.update(role, element_name, is_visible);
    res.json({ message: 'Permission mise à jour avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getPermissions, updatePermission,getPermissionsParRole };