import Pistolet from '../models/Pistolet.js';

// Ajouter un pistolet
const addPistolet = async (req, res) => {
  try {
    const { pompe_id, numero_pistolet } = req.body;
    const pistoletId = await Pistolet.addPistolet(pompe_id, numero_pistolet);
    res.status(201).send({ message: 'Pistolet ajouté avec succès', pistoletId });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de l\'ajout du pistolet', error });
  }
};

// Mettre à jour l'index d'ouverture d'un pistolet
const updateIndexOuverture = async (req, res) => {
  try {
    const { id, index_ouverture } = req.body;
    const result = await Pistolet.updateIndexOuverture(id, index_ouverture);
    if (result) {
      res.status(200).send({ message: 'Index d\'ouverture mis à jour avec succès.' });
    } else {
      res.status(404).send({ message: 'Pistolet non trouvé.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la mise à jour de l\'index d\'ouverture', error });
  }
};

// Mettre à jour l'index de fermeture d'un pistolet
const updateIndexFermeture = async (req, res) => {
  try {
    const { id, index_fermeture } = req.body;
    const result = await Pistolet.updateIndexFermeture(id, index_fermeture);
    if (result) {
      res.status(200).send({ message: 'Index de fermeture mis à jour avec succès.' });
    } else {
      res.status(404).send({ message: 'Pistolet non trouvé.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la mise à jour de l\'index de fermeture', error });
  }
};

// Récupérer tous les pistolets d'une pompe
const getPistoletsByPompeId = async (req, res) => {
  try {
    const { pompe_id } = req.params;
    const pistolets = await Pistolet.getPistoletsByPompeId(pompe_id);
    res.status(200).send(pistolets);
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération des pistolets.', error });
  }
};

// Export des fonctions
export default {
  addPistolet,
  updateIndexOuverture,
  updateIndexFermeture,
  getPistoletsByPompeId,
};