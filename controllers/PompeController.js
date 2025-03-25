import Pompe from '../models/Pompe.js';

// Ajouter une nouvelle pompe
const addPompe = async (req, res) => {
  try {
    const { numero_pompe, type_pompe, statut } = req.body;
    await Pompe.addPompe(numero_pompe, type_pompe, statut);
    res.status(201).send({ message: 'Pompe ajoutée avec succès.' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de l\'ajout de la pompe.', error });
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
    if (pompe) {
      res.status(200).send(pompe);
    } else {
      res.status(404).send({ message: 'Pompe non trouvée.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération de la pompe.', error });
  }
};

// Mettre à jour une pompe
const updatePompe = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero_pompe, type_pompe, statut } = req.body;
    await Pompe.updatePompe(id, numero_pompe, type_pompe, statut);
    res.status(200).send({ message: 'Pompe mise à jour avec succès.' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la mise à jour de la pompe.', error });
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
};