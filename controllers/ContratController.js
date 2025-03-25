import Contrat from '../models/Contrat.js';


  const createContrat = async (req, res) => {
    try {
      const { id_utilisateur, type_contrat, solde_credit, date_debut, duree_contrat } = req.body;
      const [result] = await Contrat.addContrat(id_utilisateur, type_contrat, solde_credit, date_debut, duree_contrat);
      res.status(201).json({ message: 'Contrat créé avec succès', contratId: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getAllContrats =  async (req, res) => {
    try {
      const [contrats] = await Contrat.getAllContrats();
      res.json(contrats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

  }

export default {createContrat,getAllContrats};
