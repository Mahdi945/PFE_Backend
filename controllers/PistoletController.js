import Pistolet from '../models/Pistolet.js';
import Pompe from '../models/Pompe.js';
const addPistolet = async (req, res) => {
  try {
    const { numero_pompe, numero_pistolet, index_ouverture } = req.body;
    
    if (!numero_pistolet || !numero_pompe) {
      return res.status(400).send({ message: 'Le numéro de pistolet et le numéro de pompe sont obligatoires' });
    }

    // Trouver la pompe par son numéro pour obtenir son ID
    const pompe = await Pompe.findByNumero(numero_pompe);
    if (!pompe) {
      return res.status(404).send({ message: 'Pompe non trouvée' });
    }

    const pistoletId = await Pistolet.addPistolet(
      pompe.id, // On utilise l'ID de la pompe trouvée
      numero_pistolet, 
      index_ouverture || 0,
      'disponible' // Statut par défaut
    );
    
    res.status(201).send({ 
      message: 'Pistolet ajouté avec succès', 
      pistoletId 
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).send({ message: 'Ce numéro de pistolet existe déjà pour cette pompe' });
    }
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

// Récupérer tous les pistolets
const getAllPistolets = async (req, res) => {
  try {
    const pistolets = await Pistolet.getAllPistolets();
    res.status(200).send(pistolets);
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération de tous les pistolets', error });
  }}
// Mettre à jour le statut d'un pistolet
const updateStatutPistolet = async (req, res) => {
  try {
    const { id, statut } = req.body;
    if (!['disponible', 'indisponible'].includes(statut)) {
      return res.status(400).send({ message: 'Statut invalide' });
    }
    const result = await Pistolet.updateStatutPistolet(id, statut);
    if (result) {
      res.status(200).send({ message: 'Statut mis à jour avec succès.' });
    } else {
      res.status(404).send({ message: 'Pistolet non trouvé.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la mise à jour du statut', error });
  }
};


// Export des fonctions
export default {
  addPistolet,
  updateIndexOuverture,
  updateIndexFermeture,
  getPistoletsByPompeId,
  getAllPistolets,
  updateStatutPistolet,
};