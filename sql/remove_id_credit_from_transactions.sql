-- Script SQL pour supprimer la colonne id_credit de la table transactions
-- La logique sera de déterminer id_credit à partir de id_vehicule

-- 1. Supprimer la colonne id_credit de la table transactions
ALTER TABLE transactions DROP COLUMN id_credit;

-- La table transactions ne contiendra plus que :
-- - id (clé primaire)
-- - id_vehicule 
-- - quantite
-- - montant
-- - date_transaction
-- - preuve
-- - id_pompiste

-- Pour récupérer l'id_credit, on utilisera des jointures :
-- SELECT t.*, v.id_credit 
-- FROM transactions t 
-- JOIN vehicules v ON t.id_vehicule = v.id
-- WHERE v.id_credit IS NOT NULL;
