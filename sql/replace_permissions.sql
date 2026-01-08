-- Script pour remplacer la table permissions sur le VPS
-- Généré le 2026-01-08

-- Désactiver les vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 0;

-- Vider la table permissions existante
TRUNCATE TABLE `permissions`;

-- Réinsérer toutes les données de la table permissions locale
INSERT INTO `permissions` (`id`, `role`, `element_name`, `parent_element`, `is_visible`) VALUES
(6, 'gerant', 'Utilisateurs', NULL, 1),
(7, 'cogerant', 'Utilisateurs', NULL, 1),
(11, 'gerant', 'Affecter pompistes', NULL, 1),
(12, 'cogerant', 'Affecter pompistes', NULL, 1),
(16, 'gerant', 'Crédits', NULL, 1),
(17, 'cogerant', 'Crédits', NULL, 1),
(21, 'gerant', 'Pompes', NULL, 1),
(22, 'cogerant', 'Pompes', NULL, 1),
(26, 'gerant', 'Stock', NULL, 1),
(27, 'cogerant', 'Stock', NULL, 1),
(36, 'gerant', 'Saisie vente credit', NULL, 0),
(37, 'cogerant', 'Saisie vente credit', NULL, 0),
(38, 'caissier', 'Saisie vente credit', NULL, 0),
(39, 'pompiste', 'Saisie vente credit', NULL, 1),
(41, 'gerant', 'Saisie Index fermeture', 'Pompes', 0),
(42, 'cogerant', 'Saisie Index fermeture', NULL, 0),
(43, 'caissier', 'Saisie Index fermeture', NULL, 0),
(44, 'pompiste', 'Saisie Index fermeture', NULL, 1),
(69, 'gerant', 'Créer compte', 'Utilisateurs', 1),
(70, 'cogerant', 'Créer compte', 'Utilisateurs', 0),
(74, 'gerant', 'Liste utilisateurs', 'Utilisateurs', 1),
(75, 'cogerant', 'Liste utilisateurs', 'Utilisateurs', 0),
(79, 'gerant', 'Enregistrer crédit', 'Crédits', 1),
(80, 'cogerant', 'Enregistrer crédit', 'Crédits', 1),
(84, 'gerant', 'Enregistrer Véhicules', 'Crédits', 1),
(85, 'cogerant', 'Enregistrer Véhicules', 'Crédits', 1),
(89, 'gerant', 'Historique des Paiements', 'Crédits', 1),
(90, 'cogerant', 'Historique des Paiements', 'Crédits', 0),
(94, 'gerant', 'Historique des Transactions', 'Crédits', 1),
(95, 'cogerant', 'Historique des Transactions', 'Crédits', 0),
(99, 'gerant', 'Enregistrer pompe', 'Pompes', 1),
(100, 'cogerant', 'Enregistrer pompe', 'Pompes', 1),
(104, 'gerant', 'Liste pompes', 'Pompes', 1),
(105, 'cogerant', 'Liste pompes', 'Pompes', 1),
(109, 'caissier', 'Saisie Paiements', NULL, 1),
(110, 'cogerant', 'Saisie Paiements', 'Crédits', 1),
(111, 'gerant', 'Saisie Paiements', 'Crédits', 0),
(112, 'gerant', 'Visualiser Revenues', NULL, 1),
(113, 'cogerant', 'Visualiser Revenues', NULL, 1),
(114, 'gerant', 'Dashboard', NULL, 1),
(115, 'cogerant', 'Dashboard', NULL, 1),
(116, 'caissier', 'Dashboard', NULL, 1),
(117, 'pompiste', 'Dashboard', NULL, 1),
(118, 'client', 'Dashboard', NULL, 1),
(119, 'gerant', 'Gérer le Stock', 'Stock', 1),
(120, 'cogerant', 'Gérer le Stock', 'Stock', 1),
(121, 'client', 'Réclamer', NULL, 1),
(122, 'pompiste', 'Réclamer', NULL, 0),
(123, 'caissier', 'Réclamer', NULL, 0),
(124, 'gerant', 'Réclamer', NULL, 0),
(125, 'cogerant', 'Réclamer', NULL, 0),
(126, 'cogerant', 'Traiter les réclamations', NULL, 1),
(127, 'gerant', 'Traiter les réclamations', NULL, 1),
(128, 'gerant', 'Point de vente', 'Stock', 0),
(129, 'cogerant', 'Point de vente', 'Stock', 0),
(130, 'pompiste', 'Point de vente', NULL, 0),
(131, 'caissier ', 'Point de vente', NULL, 1);

-- Réactiver les vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 1;

-- Afficher le résultat
SELECT COUNT(*) AS 'Nombre de permissions insérées' FROM permissions;
SELECT DISTINCT role FROM permissions ORDER BY role;
