import Pompe from '../models/Pompe.js';

// Ajouter une nouvelle pompe
const addPompe = async (req, res) => {
  try {
    const { numero_pompe, type_pompe, statut } = req.body;
    await Pompe.addPompe(numero_pompe, type_pompe, statut);
    res.status(201).send({ message: 'Pompe ajoutée avec succès.' });
  } catch (error) {
    res.status(400).send({ message: 'Numero pompe deja utlisé.', error });
  }
};
// Récupérer les pompes filtrées
const getPompesByFilters = async (req, res) => {
  try {
    const { numero_pompe, statut, type_pompe } = req.query;
    const [pompes] = await Pompe.getPompesByFilters(numero_pompe, statut, type_pompe);
    res.status(200).send(pompes);
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération des pompes filtrées.', error });
  }
};

// Récupérer toutes les pompes
const getAllPompes = async (req, res) => {
  try {
    const [pompes] = await Pompe.getAllPompes();
    res.status(200).send(pompes);
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération des pompes.', error });
  }
};

// Récupérer une pompe par ID
const getPompeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [pompe] = await Pompe.getPompeById(id);
    if (pompe && pompe.length > 0) {
      res.status(200).send(pompe[0]);
    } else {
      res.status(404).send({ message: 'Pompe non trouvée.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération de la pompe.', error });
  }
};

const updatePompe = async (req, res) => {
  try {
    const { id } = req.params;
    const pompeData = req.body;

    if (Object.keys(pompeData).length === 0) {
      return res.status(400).send({ message: 'Aucun champ à mettre à jour.' });
    }

    await Pompe.updatePompe(parseInt(id), pompeData);
    res.status(200).send({ message: 'Pompe mise à jour avec succès.' });
  } catch (error) {
    console.error('Erreur updatePompe:', error); // 👈 log utile
    res
      .status(500)
      .send({ message: 'Erreur lors de la mise à jour de la pompe.', error: error.message });
  }
};

// Supprimer une pompe
const deletePompe = async (req, res) => {
  try {
    const { id } = req.params;
    await Pompe.deletePompe(id);
    res.status(200).send({ message: 'Pompe supprimée avec succès.' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la suppression de la pompe.', error });
  }
};

// Export des fonctions
export default {
  addPompe,
  getAllPompes,
  getPompeById,
  updatePompe,
  deletePompe,
  getPompesByFilters,
};
