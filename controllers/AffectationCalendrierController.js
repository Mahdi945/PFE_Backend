import AffectationCalendrier from '../models/AffectationCalendrier.js';

// Ajouter une affectation manuelle
const addAffectationManuelle = async (req, res) => {
  try {
    const { pompiste_id, poste_id, pompe_id, calendrier_id } = req.body;
    await AffectationCalendrier.addAffectationManuelle(pompiste_id, poste_id, pompe_id, calendrier_id);
    res.status(201).send({ message: 'Affectation manuelle ajoutée avec succès.' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de l\'ajout de l\'affectation manuelle.', error });
  }
};

// Ajouter une affectation automatique équitable
const addAffectationAutomatiqueEquitable = async (req, res) => {
  try {
    const { mois, annee, pompistes, postes, pompes } = req.body;
    await AffectationCalendrier.addAffectationAutomatiqueEquitable(mois, annee, pompistes, postes, pompes);
    res.status(201).send({ message: 'Affectation automatique équitable ajoutée avec succès.' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de l\'ajout de l\'affectation automatique équitable.', error });
  }
};

// Récupérer les affectations d'un jour spécifique
const getAffectationsByJour = async (req, res) => {
  try {
    const { calendrier_id } = req.params;
    const affectations = await AffectationCalendrier.getAffectationsByJour(calendrier_id);
    res.status(200).send(affectations);
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération des affectations.', error });
  }
};

// Récupérer les affectations d'un mois et année
const getAffectationsByMonthYear = async (req, res) => {
  try {
    const { mois, annee } = req.params;
    const affectations = await AffectationCalendrier.getAffectationsByMonthYear(mois, annee);
    res.status(200).send(affectations);
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération des affectations.', error });
  }
};

// Export des fonctions
export default {
  addAffectationManuelle,
  addAffectationAutomatiqueEquitable,
  getAffectationsByJour,
  getAffectationsByMonthYear,
};