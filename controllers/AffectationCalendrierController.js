import AffectationCalendrier from '../models/AffectationCalendrier.js';

const addAffectationManuelle = async (req, res) => {
  try {
    const { pompiste_id, poste_id, pompe_id, date } = req.body;
    await AffectationCalendrier.addAffectationManuelle(pompiste_id, poste_id, pompe_id, date);
    res.status(201).send({ message: 'Affectation manuelle ajoutée avec succès.' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erreur lors de l\'ajout de l\'affectation manuelle.' });
  }
};

const addAffectationAutomatiqueEquitable = async (req, res) => {
  try {
    const { mois, annee } = req.body;
    if (!mois || !annee) {
      return res.status(400).send({ message: 'Mois et année sont requis.' });
    }
    
    await AffectationCalendrier.addAffectationAutomatiqueEquitable(mois, annee);
    res.status(201).send({ message: 'Affectation automatique équitable ajoutée avec succès.' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erreur lors de l\'ajout de l\'affectation automatique équitable.' });
  }
};

const getAffectationsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const affectations = await AffectationCalendrier.getAffectationsByDate(date);
    res.status(200).send(affectations);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erreur lors de la récupération des affectations.' });
  }
};

const getAffectationsByMonthYear = async (req, res) => {
  try {
    const { mois, annee } = req.params;
    const affectations = await AffectationCalendrier.getAffectationsByMonthYear(mois, annee);
    res.status(200).send(affectations);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erreur lors de la récupération des affectations.' });
  }
};

const regenerateAffectations = async (req, res) => {
  try {
    const { mois, annee } = req.body;
    
    if (!mois || !annee) {
      return res.status(400).send({ message: 'Mois et année sont requis.' });
    }

    await AffectationCalendrier.addAffectationAutomatiqueEquitable(mois, annee, true);
    
    res.status(201).send({ message: 'Affectations régénérées avec succès.' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erreur lors de la régénération des affectations.' });
  }
};

const updateAffectation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).send({ message: 'L\'ID est requis.' });
    }

    if (!updates.pompiste && !updates.poste && !updates.numero_pompe && !updates.date) {
      return res.status(400).send({ message: 'Au moins un champ doit être fourni.' });
    }

    const result = await AffectationCalendrier.updateAffectation(id, updates);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erreur lors de la mise à jour.' });
  }
};

const getCurrentAffectation = async (req, res) => {
  try {
    const { pompiste_id } = req.params;
    const affectation = await AffectationCalendrier.getCurrentAffectation(pompiste_id);
    
    if (!affectation) {
      return res.status(404).json({
        success: false,
        message: 'Aucune affectation trouvée pour ce pompiste à ce créneau horaire'
      });
    }

    res.status(200).json({
      success: true,
      data: affectation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

const getAvailablePistolets = async (req, res) => {
  try {
    const { affectation_id } = req.params;
    const pistolets = await AffectationCalendrier.getAvailablePistoletsByAffectation(affectation_id);
    
    res.status(200).json({
      success: true,
      data: pistolets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

export default {
  addAffectationManuelle,
  addAffectationAutomatiqueEquitable,
  getAffectationsByDate,
  getAffectationsByMonthYear,
  updateAffectation,
  regenerateAffectations,
  getCurrentAffectation,
  getAvailablePistolets
};