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
    const { mois, annee } = req.body;
    if (!mois || !annee) {
      return res.status(400).send({ message: 'Mois et année sont requis.' });
    }
    

    await AffectationCalendrier.addAffectationAutomatiqueEquitable(mois, annee);
    res.status(201).send({ message: 'Affectation automatique équitable ajoutée avec succès.' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de l\'ajout de l\'affectation automatique équitable.', error: error.message });
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


const updateAffectation = async (req, res) => {
  try {
    const { id } = req.params;
    const { pompiste, numero_pompe, poste, calendrier_id } = req.body;

    if (!id) {
      return res.status(400).send({ message: 'L\'ID est requis.' });
    }

    // Préparer les données à mettre à jour
    const updates = { pompiste, numero_pompe, poste, calendrier_id };

    // Vérifiez qu'au moins un champ est fourni
    const hasValidField = Object.values(updates).some((value) => value !== undefined);
    if (!hasValidField) {
      return res.status(400).send({ message: 'Au moins un champ doit être fourni pour la mise à jour.' });
    }

    console.log('Données reçues pour mise à jour :', updates);

    // Appeler le modèle pour effectuer la mise à jour
    await AffectationCalendrier.updateAffectation(id, updates);

    res.status(200).send({ message: 'Affectation mise à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'affectation :', error);
    res.status(500).send({ message: 'Erreur lors de la mise à jour de l\'affectation.', error });
  }
};



// Récupérer un enregistrement calendrier par date
const getCalendrierByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const calendrier = await AffectationCalendrier.getCalendrierByDate(date);
    if (!calendrier) {
      return res.status(404).send({ message: 'Date non trouvée dans le calendrier.' });
    }
    res.status(200).send(calendrier);
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération du calendrier.', error });
  }
};

export default {
  addAffectationManuelle,
  addAffectationAutomatiqueEquitable,
  getAffectationsByJour,
  getAffectationsByMonthYear,
  updateAffectation,
  getCalendrierByDate
};
