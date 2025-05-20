import db from '../config/db.js';

class Reclamation {
  static async create(reclamationData) {
    const { id_client, objet, raison, description } = reclamationData;
    const [result] = await db.query(
      'INSERT INTO reclamations (id_client, objet, raison, description, reference) VALUES (?, ?, ?, ?, ?)',
      [
        id_client,
        objet,
        raison,
        description,
        `REC-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, '0')}`,
      ],
    );
    return result.insertId;
  }

  static async findByClient(id_client) {
    const [rows] = await db.query(
      'SELECT r.*, u.username, u.email FROM reclamations r JOIN utilisateurs u ON r.id_client = u.id WHERE r.id_client = ? ORDER BY date_creation DESC',
      [id_client],
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT r.*, u.username, u.email FROM reclamations r JOIN utilisateurs u ON r.id_client = u.id WHERE r.id = ?',
      [id],
    );
    return rows[0];
  }

  static async updateStatut(id, statut) {
    await db.query('UPDATE reclamations SET statut = ? WHERE id = ?', [statut, id]);
    return this.findById(id);
  }

  static async getAll() {
    const [rows] = await db.query(
      'SELECT r.*, u.username, u.email FROM reclamations r JOIN utilisateurs u ON r.id_client = u.id ORDER BY r.date_creation DESC',
    );
    return rows;
  }

  static async getByReference(reference) {
    const [rows] = await db.query(
      'SELECT r.*, u.username, u.email FROM reclamations r JOIN utilisateurs u ON r.id_client = u.id WHERE r.reference = ?',
      [reference],
    );
    return rows[0];
  }
}

export default Reclamation;
