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
// Régénérer les affectations
const regenerateAffectations = async (req, res) => {
  try {
    const { mois, annee } = req.body;
    
    if (!mois || !annee) {
      return res.status(400).send({ message: 'Mois et année sont requis.' });
    }

    // Appeler la même méthode mais avec regenerate=true
    await AffectationCalendrier.addAffectationAutomatiqueEquitable(mois, annee, true);
    
    res.status(201).send({ 
      message: 'Affectations régénérées avec succès.' 
    });
  } catch (error) {
    res.status(500).send({ 
      message: error.message || 'Erreur lors de la régénération des affectations.',
      error: error.message 
    });
  }
};
// Mise à jour d'affectation avec vérifications
const updateAffectation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).send({ message: 'L\'ID est requis.' });
    }

    // Vérifier si au moins un champ est fourni
    if (!updates.pompiste && !updates.poste && !updates.numero_pompe && !updates.calendrier_id) {
      return res.status(400).send({ message: 'Au moins un champ doit être fourni.' });
    }

    // Effectuer la mise à jour avec vérifications des contraintes
    const result = await AffectationCalendrier.updateAffectation(id, updates);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ 
      message: error.message || 'Erreur lors de la mise à jour.',
      error: error.message 
    });
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
const getCurrentAffectation = async (req, res) => {
  try {
    const { pompiste_id } = req.params;
    console.log(`Requête reçue pour pompiste ID: ${pompiste_id}`);
    
    const affectation = await AffectationCalendrier.getCurrentAffectation(pompiste_id);
    
    if (!affectation) {
      console.log(`Aucune affectation trouvée pour pompiste ${pompiste_id}`);
      return res.status(404).json({
        success: false,
        message: 'Aucune affectation trouvée pour ce pompiste à ce créneau horaire',
        error: 'AFFECTATION_NOT_FOUND',
        details: {
          pompiste_id,
          current_time: new Date().toISOString()
        }
      });
    }

    res.status(200).json({
      success: true,
      data: affectation
    });
  } catch (error) {
    console.error('Erreur dans getCurrentAffectation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: 'SERVER_ERROR',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Obtenir les pistolets disponibles pour une affectation
const getAvailablePistolets = async (req, res) => {
  try {
    const { affectation_id } = req.params;
    const pistolets = await AffectationCalendrier.getAvailablePistoletsByAffectation(affectation_id);
    
    res.status(200).json({
      success: true,
      data: pistolets
    });
  } catch (error) {
    console.error('Erreur dans getAvailablePistolets:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: 'SERVER_ERROR'
    });
  }
};

export default {
  addAffectationManuelle,
  addAffectationAutomatiqueEquitable,
  getAffectationsByJour,
  getAffectationsByMonthYear,
  updateAffectation,
  getCalendrierByDate,
  regenerateAffectations,
  getCurrentAffectation,
  getAvailablePistolets

};
