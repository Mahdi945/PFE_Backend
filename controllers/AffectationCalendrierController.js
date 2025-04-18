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
    const { pompiste_id, poste_id, pompe_id, calendrier_id } = req.body;

    if (!id) {
      return res.status(400).send({ message: 'L\'ID est requis.' });
    }

    // Vérifier si au moins un champ est fourni
    if (!pompiste_id && !poste_id && !pompe_id && !calendrier_id) {
      return res.status(400).send({ message: 'Au moins un champ doit être fourni.' });
    }

    // Vérifications de cohérence
    if (poste_id && calendrier_id && pompiste_id) {
      const dejaAffecte = await AffectationCalendrier.checkPompisteAffectation(
        pompiste_id, 
        calendrier_id, 
        poste_id
      );
      
      if (dejaAffecte) {
        return res.status(400).send({ 
          message: 'Ce pompiste est déjà affecté à ce poste pour ce créneau.' 
        });
      }
    }

    if (pompe_id && calendrier_id && poste_id) {
      const pompeOccupee = await AffectationCalendrier.checkPompeOccupied(
        pompe_id, 
        calendrier_id, 
        poste_id
      );
      
      if (pompeOccupee) {
        return res.status(400).send({ 
          message: 'Cette pompe est déjà occupée pour ce créneau.' 
        });
      }
    }

    // Préparer les mises à jour
    const updates = { 
      pompiste_id, 
      poste_id, 
      pompe_id, 
      calendrier_id 
    };

    // Filtrer les champs non définis
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    await AffectationCalendrier.updateAffectation(id, updates);
    res.status(200).send({ message: 'Affectation mise à jour avec succès.' });
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

export default {
  addAffectationManuelle,
  addAffectationAutomatiqueEquitable,
  getAffectationsByJour,
  getAffectationsByMonthYear,
  updateAffectation,
  getCalendrierByDate,
  regenerateAffectations
};
