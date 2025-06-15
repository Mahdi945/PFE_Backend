-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 15 juin 2025 à 22:05
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `station_service`
--

-- --------------------------------------------------------

--
-- Structure de la table `affectations`
--

CREATE TABLE `affectations` (
  `id` int(11) NOT NULL,
  `pompiste_id` int(11) NOT NULL,
  `poste_id` int(11) NOT NULL,
  `pompe_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `affectations`
--

INSERT INTO `affectations` (`id`, `pompiste_id`, `poste_id`, `pompe_id`, `date`) VALUES
(12604, 15, 1, 35, '2025-06-01'),
(12605, 16, 1, 40, '2025-06-01'),
(12606, 20, 1, 42, '2025-06-01'),
(12607, 21, 2, 35, '2025-06-01'),
(12608, 22, 2, 40, '2025-06-01'),
(12609, 23, 2, 42, '2025-06-01'),
(12610, 24, 3, 35, '2025-06-01'),
(12611, 25, 3, 40, '2025-06-01'),
(12612, 26, 3, 42, '2025-06-01'),
(12613, 15, 1, 35, '2025-06-02'),
(12614, 16, 1, 40, '2025-06-02'),
(12615, 20, 1, 42, '2025-06-02'),
(12616, 21, 2, 35, '2025-06-02'),
(12617, 22, 2, 40, '2025-06-02'),
(12618, 23, 2, 42, '2025-06-02'),
(12619, 24, 3, 35, '2025-06-02'),
(12620, 25, 3, 40, '2025-06-02'),
(12621, 26, 3, 42, '2025-06-02'),
(12622, 15, 1, 35, '2025-06-03'),
(12623, 16, 1, 40, '2025-06-03'),
(12624, 20, 1, 42, '2025-06-03'),
(12625, 21, 2, 35, '2025-06-03'),
(12626, 22, 2, 40, '2025-06-03'),
(12627, 23, 2, 42, '2025-06-03'),
(12628, 24, 3, 35, '2025-06-03'),
(12629, 25, 3, 40, '2025-06-03'),
(12630, 26, 3, 42, '2025-06-03'),
(12631, 15, 1, 35, '2025-06-04'),
(12632, 16, 1, 40, '2025-06-04'),
(12633, 20, 1, 42, '2025-06-04'),
(12634, 21, 2, 35, '2025-06-04'),
(12635, 22, 2, 40, '2025-06-04'),
(12636, 23, 2, 42, '2025-06-04'),
(12637, 24, 3, 35, '2025-06-04'),
(12638, 25, 3, 40, '2025-06-04'),
(12639, 26, 3, 42, '2025-06-04'),
(12640, 15, 1, 35, '2025-06-05'),
(12641, 16, 1, 40, '2025-06-05'),
(12642, 20, 1, 42, '2025-06-05'),
(12643, 21, 2, 35, '2025-06-05'),
(12644, 22, 2, 40, '2025-06-05'),
(12645, 23, 2, 42, '2025-06-05'),
(12646, 24, 3, 35, '2025-06-05'),
(12647, 25, 3, 40, '2025-06-05'),
(12648, 26, 3, 42, '2025-06-05'),
(12649, 15, 1, 35, '2025-06-06'),
(12650, 16, 1, 40, '2025-06-06'),
(12651, 20, 1, 42, '2025-06-06'),
(12652, 21, 2, 35, '2025-06-06'),
(12653, 22, 2, 40, '2025-06-06'),
(12654, 23, 2, 42, '2025-06-06'),
(12655, 24, 3, 35, '2025-06-06'),
(12656, 25, 3, 40, '2025-06-06'),
(12657, 26, 3, 42, '2025-06-06'),
(12658, 15, 1, 35, '2025-06-07'),
(12659, 16, 1, 40, '2025-06-07'),
(12660, 20, 1, 42, '2025-06-07'),
(12661, 21, 2, 35, '2025-06-07'),
(12662, 22, 2, 40, '2025-06-07'),
(12663, 23, 2, 42, '2025-06-07'),
(12664, 24, 3, 35, '2025-06-07'),
(12665, 25, 3, 40, '2025-06-07'),
(12666, 26, 3, 42, '2025-06-07'),
(12667, 15, 1, 35, '2025-06-08'),
(12668, 16, 1, 40, '2025-06-08'),
(12669, 20, 1, 42, '2025-06-08'),
(12670, 21, 2, 35, '2025-06-08'),
(12671, 22, 2, 40, '2025-06-08'),
(12672, 23, 2, 42, '2025-06-08'),
(12673, 24, 3, 35, '2025-06-08'),
(12674, 25, 3, 40, '2025-06-08'),
(12675, 26, 3, 42, '2025-06-08'),
(12676, 15, 1, 35, '2025-06-09'),
(12677, 16, 1, 40, '2025-06-09'),
(12678, 20, 1, 42, '2025-06-09'),
(12679, 21, 2, 35, '2025-06-09'),
(12680, 22, 2, 40, '2025-06-09'),
(12681, 23, 2, 42, '2025-06-09'),
(12682, 24, 3, 35, '2025-06-09'),
(12683, 25, 3, 40, '2025-06-09'),
(12684, 26, 3, 42, '2025-06-09'),
(12685, 15, 1, 35, '2025-06-10'),
(12686, 16, 1, 40, '2025-06-10'),
(12687, 20, 1, 42, '2025-06-10'),
(12688, 21, 2, 35, '2025-06-10'),
(12689, 22, 2, 40, '2025-06-10'),
(12690, 23, 2, 42, '2025-06-10'),
(12691, 24, 3, 35, '2025-06-10'),
(12692, 25, 3, 40, '2025-06-10'),
(12693, 26, 3, 42, '2025-06-10'),
(12694, 15, 1, 35, '2025-06-11'),
(12695, 16, 1, 40, '2025-06-11'),
(12696, 20, 1, 42, '2025-06-11'),
(12697, 21, 2, 35, '2025-06-11'),
(12698, 22, 2, 40, '2025-06-11'),
(12699, 23, 2, 42, '2025-06-11'),
(12700, 24, 3, 35, '2025-06-11'),
(12701, 25, 3, 40, '2025-06-11'),
(12702, 26, 3, 42, '2025-06-11'),
(12703, 15, 1, 35, '2025-06-12'),
(12704, 16, 1, 40, '2025-06-12'),
(12705, 20, 1, 42, '2025-06-12'),
(12706, 21, 2, 35, '2025-06-12'),
(12707, 22, 2, 40, '2025-06-12'),
(12708, 23, 2, 42, '2025-06-12'),
(12709, 24, 3, 35, '2025-06-12'),
(12710, 25, 3, 40, '2025-06-12'),
(12711, 26, 3, 42, '2025-06-12'),
(12712, 15, 1, 35, '2025-06-13'),
(12713, 16, 1, 40, '2025-06-13'),
(12714, 20, 1, 42, '2025-06-13'),
(12715, 21, 2, 35, '2025-06-13'),
(12716, 22, 2, 40, '2025-06-13'),
(12717, 23, 2, 42, '2025-06-13'),
(12718, 24, 3, 35, '2025-06-13'),
(12719, 25, 3, 40, '2025-06-13'),
(12720, 26, 3, 42, '2025-06-13'),
(12721, 15, 1, 35, '2025-06-14'),
(12722, 16, 1, 40, '2025-06-14'),
(12723, 20, 1, 42, '2025-06-14'),
(12724, 21, 2, 35, '2025-06-14'),
(12725, 22, 2, 40, '2025-06-14'),
(12726, 23, 2, 42, '2025-06-14'),
(12727, 24, 3, 35, '2025-06-14'),
(12728, 25, 3, 40, '2025-06-14'),
(12729, 26, 3, 42, '2025-06-14'),
(12730, 15, 1, 35, '2025-06-15'),
(12731, 16, 1, 40, '2025-06-15'),
(12732, 20, 1, 42, '2025-06-15'),
(12733, 21, 2, 35, '2025-06-15'),
(12734, 22, 2, 40, '2025-06-15'),
(12735, 23, 2, 42, '2025-06-15'),
(12736, 24, 3, 35, '2025-06-15'),
(12737, 25, 3, 40, '2025-06-15'),
(12738, 26, 3, 42, '2025-06-15'),
(12739, 15, 1, 35, '2025-06-16'),
(12740, 16, 1, 40, '2025-06-16'),
(12741, 20, 1, 42, '2025-06-16'),
(12742, 21, 2, 35, '2025-06-16'),
(12743, 22, 2, 40, '2025-06-16'),
(12744, 23, 2, 42, '2025-06-16'),
(12745, 24, 3, 35, '2025-06-16'),
(12746, 25, 3, 40, '2025-06-16'),
(12747, 26, 3, 42, '2025-06-16'),
(12748, 15, 1, 35, '2025-06-17'),
(12749, 16, 1, 40, '2025-06-17'),
(12750, 20, 1, 42, '2025-06-17'),
(12751, 21, 2, 35, '2025-06-17'),
(12752, 22, 2, 40, '2025-06-17'),
(12753, 23, 2, 42, '2025-06-17'),
(12754, 24, 3, 35, '2025-06-17'),
(12755, 25, 3, 40, '2025-06-17'),
(12756, 26, 3, 42, '2025-06-17'),
(12757, 15, 1, 35, '2025-06-18'),
(12758, 16, 1, 40, '2025-06-18'),
(12759, 20, 1, 42, '2025-06-18'),
(12760, 21, 2, 35, '2025-06-18'),
(12761, 22, 2, 40, '2025-06-18'),
(12762, 23, 2, 42, '2025-06-18'),
(12763, 24, 3, 35, '2025-06-18'),
(12764, 25, 3, 40, '2025-06-18'),
(12765, 26, 3, 42, '2025-06-18'),
(12766, 15, 1, 35, '2025-06-19'),
(12767, 16, 1, 40, '2025-06-19'),
(12768, 20, 1, 42, '2025-06-19'),
(12769, 21, 2, 35, '2025-06-19'),
(12770, 22, 2, 40, '2025-06-19'),
(12771, 23, 2, 42, '2025-06-19'),
(12772, 24, 3, 35, '2025-06-19'),
(12773, 25, 3, 40, '2025-06-19'),
(12774, 26, 3, 42, '2025-06-19'),
(12775, 15, 1, 35, '2025-06-20'),
(12776, 16, 1, 40, '2025-06-20'),
(12777, 20, 1, 42, '2025-06-20'),
(12778, 21, 2, 35, '2025-06-20'),
(12779, 22, 2, 40, '2025-06-20'),
(12780, 23, 2, 42, '2025-06-20'),
(12781, 24, 3, 35, '2025-06-20'),
(12782, 25, 3, 40, '2025-06-20'),
(12783, 26, 3, 42, '2025-06-20'),
(12784, 15, 1, 35, '2025-06-21'),
(12785, 16, 1, 40, '2025-06-21'),
(12786, 20, 1, 42, '2025-06-21'),
(12787, 21, 2, 35, '2025-06-21'),
(12788, 22, 2, 40, '2025-06-21'),
(12789, 23, 2, 42, '2025-06-21'),
(12790, 24, 3, 35, '2025-06-21'),
(12791, 25, 3, 40, '2025-06-21'),
(12792, 26, 3, 42, '2025-06-21'),
(12793, 15, 1, 35, '2025-06-22'),
(12794, 16, 1, 40, '2025-06-22'),
(12795, 20, 1, 42, '2025-06-22'),
(12796, 21, 2, 35, '2025-06-22'),
(12797, 22, 2, 40, '2025-06-22'),
(12798, 23, 2, 42, '2025-06-22'),
(12799, 24, 3, 35, '2025-06-22'),
(12800, 25, 3, 40, '2025-06-22'),
(12801, 26, 3, 42, '2025-06-22'),
(12802, 15, 1, 35, '2025-06-23'),
(12803, 16, 1, 40, '2025-06-23'),
(12804, 20, 1, 42, '2025-06-23'),
(12805, 21, 2, 35, '2025-06-23'),
(12806, 22, 2, 40, '2025-06-23'),
(12807, 23, 2, 42, '2025-06-23'),
(12808, 24, 3, 35, '2025-06-23'),
(12809, 25, 3, 40, '2025-06-23'),
(12810, 26, 3, 42, '2025-06-23'),
(12811, 15, 1, 35, '2025-06-24'),
(12812, 16, 1, 40, '2025-06-24'),
(12813, 20, 1, 42, '2025-06-24'),
(12814, 21, 2, 35, '2025-06-24'),
(12815, 22, 2, 40, '2025-06-24'),
(12816, 23, 2, 42, '2025-06-24'),
(12817, 24, 3, 35, '2025-06-24'),
(12818, 25, 3, 40, '2025-06-24'),
(12819, 26, 3, 42, '2025-06-24'),
(12820, 15, 1, 35, '2025-06-25'),
(12821, 16, 1, 40, '2025-06-25'),
(12822, 20, 1, 42, '2025-06-25'),
(12823, 21, 2, 35, '2025-06-25'),
(12824, 22, 2, 40, '2025-06-25'),
(12825, 23, 2, 42, '2025-06-25'),
(12826, 24, 3, 35, '2025-06-25'),
(12827, 25, 3, 40, '2025-06-25'),
(12828, 26, 3, 42, '2025-06-25'),
(12829, 15, 1, 35, '2025-06-26'),
(12830, 16, 1, 40, '2025-06-26'),
(12831, 20, 1, 42, '2025-06-26'),
(12832, 21, 2, 35, '2025-06-26'),
(12833, 22, 2, 40, '2025-06-26'),
(12834, 23, 2, 42, '2025-06-26'),
(12835, 24, 3, 35, '2025-06-26'),
(12836, 25, 3, 40, '2025-06-26'),
(12837, 26, 3, 42, '2025-06-26'),
(12838, 15, 1, 35, '2025-06-27'),
(12839, 16, 1, 40, '2025-06-27'),
(12840, 20, 1, 42, '2025-06-27'),
(12841, 21, 2, 35, '2025-06-27'),
(12842, 22, 2, 40, '2025-06-27'),
(12843, 23, 2, 42, '2025-06-27'),
(12844, 24, 3, 35, '2025-06-27'),
(12845, 25, 3, 40, '2025-06-27'),
(12846, 26, 3, 42, '2025-06-27'),
(12847, 15, 1, 35, '2025-06-28'),
(12848, 16, 1, 40, '2025-06-28'),
(12849, 20, 1, 42, '2025-06-28'),
(12850, 21, 2, 35, '2025-06-28'),
(12851, 22, 2, 40, '2025-06-28'),
(12852, 23, 2, 42, '2025-06-28'),
(12853, 24, 3, 35, '2025-06-28'),
(12854, 25, 3, 40, '2025-06-28'),
(12855, 26, 3, 42, '2025-06-28'),
(12856, 15, 1, 35, '2025-06-29'),
(12857, 16, 1, 40, '2025-06-29'),
(12858, 20, 1, 42, '2025-06-29'),
(12859, 21, 2, 35, '2025-06-29'),
(12860, 22, 2, 40, '2025-06-29'),
(12861, 23, 2, 42, '2025-06-29'),
(12862, 24, 3, 35, '2025-06-29'),
(12863, 25, 3, 40, '2025-06-29'),
(12864, 26, 3, 42, '2025-06-29'),
(12865, 15, 1, 35, '2025-06-30'),
(12866, 16, 1, 40, '2025-06-30'),
(12867, 20, 1, 42, '2025-06-30'),
(12868, 21, 2, 35, '2025-06-30'),
(12869, 22, 2, 40, '2025-06-30'),
(12870, 23, 2, 42, '2025-06-30'),
(12871, 24, 3, 35, '2025-06-30'),
(12872, 25, 3, 40, '2025-06-30'),
(12873, 26, 3, 42, '2025-06-30');

--
-- Déclencheurs `affectations`
--
DELIMITER $$
CREATE TRIGGER `before_affectations_insert` BEFORE INSERT ON `affectations` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    -- Récupérer le rôle de l'utilisateur
    SELECT role INTO user_role 
    FROM utilisateurs 
    WHERE id = NEW.pompiste_id;
    
    -- Vérifier si le rôle est différent de 'pompiste'
    IF user_role != 'pompiste' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Seuls les utilisateurs avec le rôle "pompiste" peuvent être affectés';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_affectations_update` BEFORE UPDATE ON `affectations` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    -- Récupérer le rôle de l'utilisateur
    SELECT role INTO user_role 
    FROM utilisateurs 
    WHERE id = NEW.pompiste_id;
    
    -- Vérifier si le rôle est différent de 'pompiste'
    IF user_role != 'pompiste' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Seuls les utilisateurs avec le rôle "pompiste" peuvent être affectés';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `description`, `parent_id`, `date_creation`) VALUES
(36, 'Lubrifiants', 'Huiles et graisses pour véhicules', NULL, '2025-06-15 19:36:31'),
(37, 'Produits Alimentaires', 'Snacks et boissons', NULL, '2025-06-15 19:36:31'),
(38, 'Lavages Extérieurs', 'Produits pour la carrosserie et vitres', 38, '2025-06-15 19:41:04'),
(39, 'Nettoyage Intérieur', 'Produits pour sièges et tableaux de bord', 38, '2025-06-15 19:41:04'),
(40, 'Parfums d\'Ambiance', 'Désodorisants pour voiture', 38, '2025-06-15 19:41:04'),
(41, 'Accessoires Lavage', 'Chiffons, éponges, brosses', 38, '2025-06-15 19:41:04'),
(42, 'Additifs Carburant', 'Additifs pour moteur essence/diesel', 36, '2025-06-15 19:41:04'),
(43, 'Liquide Refroidissement', 'Antigel et liquides de refroidissement', 36, '2025-06-15 19:41:04'),
(44, 'Eaux Minérales', 'Eaux plates et gazeuses (Safia, Aïn Garci...)', 37, '2025-06-15 19:41:04'),
(45, 'Sodas', 'Boissons gazeuses (Coca, Fanta, Sprite)', 37, '2025-06-15 19:41:04'),
(46, 'Jus de Fruits', 'Jus en bouteille (Jafaden, Vitalait)', 37, '2025-06-15 19:41:04'),
(47, 'Boissons Énergisantes', 'Energy drinks (Bull, Power Up)', 37, '2025-06-15 19:41:04'),
(48, 'Chocolats', 'Barres chocolatées (Twix, Snickers, Kinder)', 37, '2025-06-15 19:41:04'),
(49, 'Chips', 'Chips et snacks salés (Lay\'s, Bimo, Doritos)', 37, '2025-06-15 19:41:04'),
(50, 'Biscuits', 'Biscuits sucrés (Gauffrettes, Makrouds)', 37, '2025-06-15 19:41:04'),
(51, 'Yaourts', 'Yaourts et laitages (Vitalait, Delice, Délice)', 37, '2025-06-15 19:41:04'),
(52, 'Sandwichs Frais', 'Sandwichs préparés (Thon, Omelette)', 37, '2025-06-15 19:41:04');

-- --------------------------------------------------------

--
-- Structure de la table `commandes_achat`
--

CREATE TABLE `commandes_achat` (
  `id` int(11) NOT NULL,
  `fournisseur_id` int(11) NOT NULL,
  `date_commande` datetime DEFAULT current_timestamp(),
  `montant_total` decimal(10,2) DEFAULT NULL,
  `statut` enum('brouillon','validée','reçue','annulée') DEFAULT 'brouillon',
  `agent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes_achat`
--

INSERT INTO `commandes_achat` (`id`, `fournisseur_id`, `date_commande`, `montant_total`, `statut`, `agent_id`) VALUES
(8, 8, '2025-06-15 20:55:23', 151.20, 'reçue', 14),
(9, 1, '2025-06-15 20:58:31', 88.00, 'reçue', 14),
(10, 14, '2025-06-15 20:59:49', 367.00, 'validée', 14),
(11, 9, '2025-06-15 21:00:03', 25.00, 'reçue', 14),
(12, 12, '2025-06-15 21:00:46', 771.50, 'brouillon', 14);

-- --------------------------------------------------------

--
-- Structure de la table `details_credits`
--

CREATE TABLE `details_credits` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  `type_credit` enum('individuelle','organisationnelle') NOT NULL,
  `solde_credit` decimal(10,2) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `duree_credit` int(11) DEFAULT NULL,
  `credit_utilise` decimal(10,2) DEFAULT NULL,
  `etat` enum('actif','expiré','annulé','remboursé') DEFAULT 'actif',
  `montant_restant` decimal(10,2) DEFAULT NULL,
  `date_dernier_paiement` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `details_credits`
--

INSERT INTO `details_credits` (`id`, `id_utilisateur`, `type_credit`, `solde_credit`, `date_debut`, `duree_credit`, `credit_utilise`, `etat`, `montant_restant`, `date_dernier_paiement`) VALUES
(2, 13, 'organisationnelle', 500.00, '2025-04-10', 30, 500.00, 'remboursé', 0.00, '2025-04-16 19:06:03'),
(3, 10, 'organisationnelle', 500.00, '2025-04-10', 30, 500.00, 'expiré', 0.00, '2025-04-18 03:43:13'),
(4, 13, 'individuelle', 300.00, '2025-04-10', 1, NULL, 'expiré', NULL, NULL),
(5, 9, 'individuelle', 300.00, '2025-04-25', 30, 120.00, 'remboursé', 0.00, '2025-04-21 18:17:28'),
(6, 10, 'individuelle', 500.00, '2025-04-24', 30, NULL, 'remboursé', 0.00, '2025-04-21 18:25:07'),
(7, 13, 'individuelle', 1000.00, '2025-04-29', 1, 750.00, 'expiré', 100.00, '2025-04-29 05:40:13'),
(8, 9, 'individuelle', 500.00, '2025-04-30', 2, 500.00, 'expiré', 500.00, '2025-04-30 14:07:06'),
(9, 10, 'individuelle', 500.00, '2025-05-02', 30, NULL, 'actif', 500.00, NULL),
(10, 9, 'individuelle', 200.00, '2025-05-02', 30, NULL, 'actif', 200.00, NULL),
(11, 9, 'individuelle', 300.00, '2025-05-29', 30, 300.00, 'expiré', 300.00, '2025-05-02 22:29:05'),
(12, 9, 'individuelle', 300.00, '2025-05-02', 30, NULL, 'actif', 300.00, NULL),
(13, 10, 'individuelle', 500.00, '2025-05-02', 30, NULL, 'remboursé', 0.00, '2025-05-02 19:30:18'),
(14, 10, 'individuelle', 500.00, '2025-05-02', 30, NULL, 'actif', 500.00, NULL),
(15, 9, 'organisationnelle', 400.00, '2025-05-02', 30, NULL, 'actif', 400.00, NULL),
(16, 10, 'individuelle', 500.00, '2025-05-02', 30, 500.00, 'expiré', 500.00, '2025-05-02 23:20:01'),
(17, 10, 'organisationnelle', 500.00, '2025-05-02', 30, 498.00, 'actif', 100.00, '2025-05-13 20:25:47'),
(18, 13, 'individuelle', 200.00, '2025-05-16', 30, NULL, 'remboursé', 0.00, '2025-05-29 05:04:47'),
(19, 10, 'individuelle', 500.00, '2025-05-19', 30, 410.00, 'actif', 500.00, '2025-05-24 22:38:55'),
(20, 13, 'individuelle', 599.00, '2025-05-31', 29, 599.00, 'expiré', 300.00, '2025-06-08 10:07:20'),
(21, 9, 'individuelle', 300.00, '2025-06-07', 30, NULL, 'actif', 300.00, NULL),
(22, 9, 'individuelle', 300.00, '2025-06-07', 30, NULL, 'actif', 300.00, NULL),
(23, 13, 'organisationnelle', 500.00, '2025-06-07', 30, 199.00, 'actif', 500.00, '2025-06-15 14:09:35'),
(24, 9, 'individuelle', 300.00, '2025-06-07', 30, NULL, 'actif', 300.00, NULL),
(25, 9, 'individuelle', 300.00, '2025-06-07', 30, NULL, 'actif', 300.00, NULL),
(26, 28, 'individuelle', 599.00, '2025-06-07', 3, NULL, 'actif', 599.00, NULL),
(27, 9, 'individuelle', 300.00, '2025-06-07', 30, NULL, 'actif', 300.00, NULL),
(28, 9, 'individuelle', 300.00, '2025-06-07', 30, NULL, 'actif', 300.00, NULL),
(29, 9, 'individuelle', 300.00, '2025-06-07', 30, NULL, 'actif', 300.00, NULL),
(30, 13, 'organisationnelle', 500.00, '2025-06-07', 30, NULL, 'actif', 500.00, NULL),
(31, 28, 'individuelle', 255.00, '2025-06-07', 25, NULL, 'actif', 255.00, NULL),
(32, 28, 'individuelle', 1999.00, '2025-06-15', 29, NULL, 'actif', 602.00, '2025-06-15 18:50:02');

--
-- Déclencheurs `details_credits`
--
DELIMITER $$
CREATE TRIGGER `before_details_credits_insert` BEFORE INSERT ON `details_credits` FOR EACH ROW BEGIN
    IF NEW.montant_restant IS NULL THEN
        SET NEW.montant_restant = NEW.solde_credit;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_details_credits_insert_update` BEFORE INSERT ON `details_credits` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    -- Récupérer le rôle de l'utilisateur
    SELECT role INTO user_role 
    FROM utilisateurs 
    WHERE id = NEW.id_utilisateur;
    
    -- Vérifier si le rôle est différent de 'client'
    IF user_role != 'client' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Seuls les utilisateurs avec le rôle "client" peuvent avoir des crédits';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_details_credits_update` BEFORE UPDATE ON `details_credits` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    -- Récupérer le rôle de l'utilisateur
    SELECT role INTO user_role 
    FROM utilisateurs 
    WHERE id = NEW.id_utilisateur;
    
    -- Vérifier si le rôle est différent de 'client'
    IF user_role != 'client' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Seuls les utilisateurs avec le rôle "client" peuvent avoir des crédits';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_credit_state` BEFORE UPDATE ON `details_credits` FOR EACH ROW BEGIN
    -- Vérifier si le montant_restant est mis à jour à 0
    IF NEW.montant_restant = 0 AND (OLD.montant_restant IS NULL OR OLD.montant_restant != 0) THEN
        SET NEW.etat = 'remboursé';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_credit_state_after` AFTER UPDATE ON `details_credits` FOR EACH ROW BEGIN
    -- Vérifier si le montant_restant est maintenant 0 et l'état n'est pas déjà remboursé
    IF NEW.montant_restant = 0 AND NEW.etat != 'remboursé' THEN
        UPDATE details_credits 
        SET etat = 'remboursé' 
        WHERE id = NEW.id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseurs`
--

CREATE TABLE `fournisseurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `adresse` text DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fournisseurs`
--

INSERT INTO `fournisseurs` (`id`, `nom`, `contact`, `telephone`, `email`, `adresse`, `date_creation`) VALUES
(1, 'Delice', 'Contact Delice', '123456789', 'contact22@delice.com', 'Adresse Delice', '2025-05-29 00:01:46'),
(3, 'TOM', 'Ahmed Ben salme', '56327280', 'ahmedbensalem@gmail.com', '14 rue sokrat\nbir el bey', '2025-05-30 01:01:15'),
(6, 'Saïda', 'Service Commercial Saïda', '71333444', 'commercial@saida.tn', 'Zone Industrielle, Ben Arous', '2025-06-15 19:05:27'),
(7, 'Délice Danone', 'M. Riadh Ferchichi', '71888999', 'attessia@delice.tn', 'Route de Tunis, Sousse', '2025-06-15 19:05:27'),
(8, 'Coca Cola', 'Mme Sonia Trabelsi', '98777666', 'contact@cocacola.tn', 'Av. Hédi Nouira, Tunis', '2025-06-15 19:05:27'),
(9, 'Layz', 'M. Fares Slimane', '36334455', 'ventes@Layzc.tn', 'Zone Industrielle, Sfax', '2025-06-15 19:05:27'),
(10, 'SIPAT (Biscuits GEPACO)', 'Service Achats', '71222333', 'sipat@gepaco.tn', 'Route de Gabès, Gabès', '2025-06-15 19:05:27'),
(11, 'Mobil Oil Tunisie', 'M. Adnene Labidi', '20334455', 'contact@mobil.tn', 'Av. Farhat Hached, Tunis', '2025-06-15 19:08:00'),
(12, 'Castrol Tunisie', 'Mme Ines Boukadida', '55667788', 'castrol@castrol.tn', 'Zone Industrielle, Mégrine', '2025-06-15 19:08:00'),
(13, 'Eurolub Tunisie', 'M. Omar Khemiri', '22445566', 'eurolub@eurolub.com', 'Route de l’Aéroport, Enfidha', '2025-06-15 19:08:00'),
(14, 'AutoPro', 'Service Technique', '98765432', 'autopro@autopro.tn', 'Pôle Technologique, Sousse', '2025-06-15 19:08:00'),
(15, 'Tunisian Car Wash', 'M. Tarek Ben Yedder', '71234567', 'tcw@carwash.tn', 'Av. Taïeb Mhiri, Sfax', '2025-06-15 19:08:00');

-- --------------------------------------------------------

--
-- Structure de la table `ligne_commande`
--

CREATE TABLE `ligne_commande` (
  `id` int(11) NOT NULL,
  `commande_id` int(11) NOT NULL,
  `produit_id` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ligne_commande`
--

INSERT INTO `ligne_commande` (`id`, `commande_id`, `produit_id`, `quantite`, `prix_unitaire`) VALUES
(25, 8, 5, 39, 1.80),
(26, 8, 22, 45, 1.80),
(27, 9, 14, 49, 1.00),
(28, 9, 26, 39, 1.00),
(29, 10, 27, 11, 18.00),
(30, 10, 20, 13, 13.00),
(31, 11, 21, 10, 2.50),
(32, 12, 2, 15, 10.50),
(33, 12, 16, 12, 29.00),
(34, 12, 29, 14, 19.00);

-- --------------------------------------------------------

--
-- Structure de la table `ligne_vente`
--

CREATE TABLE `ligne_vente` (
  `id` int(11) NOT NULL,
  `vente_id` int(11) NOT NULL,
  `produit_id` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ligne_vente`
--

INSERT INTO `ligne_vente` (`id`, `vente_id`, `produit_id`, `quantite`, `prix_unitaire`, `created_at`) VALUES
(11, 9, 19, 2, 1.80, '2025-06-15 19:50:45'),
(12, 9, 21, 3, 2.68, '2025-06-15 19:50:45'),
(13, 9, 5, 1, 2.00, '2025-06-15 19:50:45'),
(14, 9, 26, 3, 1.50, '2025-06-15 19:50:45'),
(15, 10, 26, 3, 1.50, '2025-06-15 19:51:04'),
(16, 11, 19, 2, 1.80, '2025-06-15 19:51:32'),
(17, 11, 21, 2, 2.68, '2025-06-15 19:51:32'),
(18, 12, 19, 1, 1.80, '2025-06-15 19:52:07'),
(19, 12, 26, 1, 1.50, '2025-06-15 19:52:07'),
(20, 13, 5, 4, 2.00, '2025-06-15 19:52:39');

--
-- Déclencheurs `ligne_vente`
--
DELIMITER $$
CREATE TRIGGER `after_ligne_vente_insert` AFTER INSERT ON `ligne_vente` FOR EACH ROW BEGIN
    -- Diminuer le stock du produit vendu
    UPDATE produits 
    SET quantite_stock = quantite_stock - NEW.quantite,
        date_modification = NOW()
    WHERE id = NEW.produit_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_ligne_vente_insert` BEFORE INSERT ON `ligne_vente` FOR EACH ROW BEGIN
    DECLARE stock_actuel INT;
    
    -- Récupérer le stock actuel
    SELECT quantite_stock INTO stock_actuel 
    FROM produits 
    WHERE id = NEW.produit_id;
    
    -- Vérifier si le stock serait négatif après la vente
    IF (stock_actuel - NEW.quantite) < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Stock insuffisant pour ce produit';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `is_read`, `created_at`) VALUES
(13, 14, 15, 'HI', 1, '2025-05-25 12:30:37'),
(14, 25, 14, 'hallo', 1, '2025-05-25 13:18:01'),
(15, 14, 25, 'hello', 1, '2025-05-25 13:20:18'),
(16, 25, 14, 'how are you', 1, '2025-05-25 13:20:39'),
(17, 25, 14, 'hh', 1, '2025-05-25 13:21:42'),
(18, 14, 25, 'hh', 1, '2025-05-26 17:03:41'),
(19, 25, 14, 'ss', 1, '2025-06-01 15:55:14'),
(20, 14, 25, 'ss', 1, '2025-06-01 15:55:25'),
(21, 14, 25, 'aa', 1, '2025-06-01 15:55:36'),
(22, 14, 25, 'a', 1, '2025-06-01 16:00:08'),
(23, 14, 25, 'a', 1, '2025-06-01 16:00:12'),
(24, 25, 14, 'z', 1, '2025-06-01 16:00:15'),
(25, 14, 25, 'a', 1, '2025-06-01 16:04:09'),
(26, 14, 25, 'a', 1, '2025-06-01 16:05:03'),
(27, 14, 25, 'hyt', 1, '2025-06-01 16:11:00'),
(28, 25, 14, 'A', 1, '2025-06-01 16:11:14'),
(29, 14, 25, 'A', 1, '2025-06-01 16:11:38'),
(30, 14, 25, 'HH', 1, '2025-06-01 16:11:41'),
(31, 14, 25, 'QQ', 1, '2025-06-01 16:11:44'),
(32, 14, 25, 'QQ', 1, '2025-06-01 16:11:45'),
(33, 14, 25, 'AA', 1, '2025-06-01 16:11:48'),
(34, 14, 25, 'T', 1, '2025-06-01 16:11:51'),
(35, 14, 25, 'a', 1, '2025-06-01 16:19:49'),
(36, 14, 25, 'yy', 1, '2025-06-01 16:19:52'),
(37, 25, 14, 'a', 1, '2025-06-01 16:19:55'),
(38, 14, 25, 'qyq', 1, '2025-06-01 16:20:14'),
(39, 14, 25, 'q', 1, '2025-06-01 16:20:28'),
(40, 25, 14, 'qq', 1, '2025-06-01 16:20:36'),
(41, 14, 25, 'hd', 1, '2025-06-01 16:38:24'),
(42, 15, 14, 'HELLO', 1, '2025-06-04 09:38:49'),
(43, 23, 14, 'l', 1, '2025-06-04 16:46:43'),
(44, 14, 23, 'k', 1, '2025-06-04 16:47:05'),
(45, 23, 14, 'waa', 1, '2025-06-04 17:01:22'),
(46, 14, 23, 'b', 0, '2025-06-12 16:35:46'),
(47, 25, 14, 'salee', 1, '2025-06-15 13:07:56'),
(48, 14, 25, 'hi', 0, '2025-06-15 13:08:19');

-- --------------------------------------------------------

--
-- Structure de la table `mouvements_stock`
--

CREATE TABLE `mouvements_stock` (
  `id` int(11) NOT NULL,
  `produit_id` int(11) NOT NULL,
  `type` enum('ENTREE','SORTIE','AJUSTEMENT') NOT NULL,
  `quantite` int(11) NOT NULL,
  `date_mouvement` datetime DEFAULT current_timestamp(),
  `agent_id` int(11) DEFAULT NULL,
  `raison` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mouvements_stock`
--

INSERT INTO `mouvements_stock` (`id`, `produit_id`, `type`, `quantite`, `date_mouvement`, `agent_id`, `raison`) VALUES
(44, 26, 'AJUSTEMENT', 4, '2025-06-15 20:42:41', 14, 'Inventaire - Écart: -4 dans le produit Blendy'),
(45, 26, 'SORTIE', 5, '2025-06-15 20:47:11', 14, 'Je l\'ai mangé'),
(46, 19, 'SORTIE', 2, '2025-06-15 20:50:45', 27, 'Vente #9'),
(47, 21, 'SORTIE', 3, '2025-06-15 20:50:45', 27, 'Vente #9'),
(48, 5, 'SORTIE', 1, '2025-06-15 20:50:45', 27, 'Vente #9'),
(49, 26, 'SORTIE', 3, '2025-06-15 20:50:45', 27, 'Vente #9'),
(50, 26, 'SORTIE', 3, '2025-06-15 20:51:04', 27, 'Vente #10'),
(51, 19, 'SORTIE', 2, '2025-06-15 20:51:32', 27, 'Vente #11'),
(52, 21, 'SORTIE', 2, '2025-06-15 20:51:32', 27, 'Vente #11'),
(53, 19, 'SORTIE', 1, '2025-06-15 20:52:07', 27, 'Vente #12'),
(54, 26, 'SORTIE', 1, '2025-06-15 20:52:07', 27, 'Vente #12'),
(55, 5, 'SORTIE', 4, '2025-06-15 20:52:39', 27, 'Vente #13'),
(56, 5, 'ENTREE', 39, '2025-06-15 20:56:58', 14, 'Réception commande #8'),
(57, 22, 'ENTREE', 45, '2025-06-15 20:56:58', 14, 'Réception commande #8'),
(58, 14, 'ENTREE', 49, '2025-06-15 20:58:46', 14, 'Réception commande #9'),
(59, 26, 'ENTREE', 39, '2025-06-15 20:58:46', 14, 'Réception commande #9'),
(60, 21, 'ENTREE', 10, '2025-06-15 21:01:54', 14, 'Réception commande #11');

--
-- Déclencheurs `mouvements_stock`
--
DELIMITER $$
CREATE TRIGGER `after_mouvement_delete` AFTER DELETE ON `mouvements_stock` FOR EACH ROW BEGIN
    -- Annuler l'effet du mouvement supprimé
    IF OLD.type = 'ENTREE' THEN
        UPDATE produits 
        SET quantite_stock = quantite_stock - OLD.quantite,
            date_modification = NOW()
        WHERE id = OLD.produit_id;
    ELSEIF OLD.type = 'SORTIE' THEN
        UPDATE produits 
        SET quantite_stock = quantite_stock + OLD.quantite,
            date_modification = NOW()
        WHERE id = OLD.produit_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_mouvement_insert` AFTER INSERT ON `mouvements_stock` FOR EACH ROW BEGIN
    -- Mise à jour du stock selon le type de mouvement
    IF NEW.type = 'ENTREE' THEN
        UPDATE produits 
        SET quantite_stock = quantite_stock + NEW.quantite,
            date_modification = NOW()
        WHERE id = NEW.produit_id;
    ELSEIF NEW.type = 'SORTIE' THEN
        UPDATE produits 
        SET quantite_stock = quantite_stock - NEW.quantite,
            date_modification = NOW()
        WHERE id = NEW.produit_id;
    ELSEIF NEW.type = 'AJUSTEMENT' THEN
        UPDATE produits 
        SET quantite_stock = NEW.quantite,
            date_modification = NOW()
        WHERE id = NEW.produit_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_mouvement_update` AFTER UPDATE ON `mouvements_stock` FOR EACH ROW BEGIN
    -- Si le type ou la quantité a changé, mettre à jour le stock
    IF (NEW.type != OLD.type OR NEW.quantite != OLD.quantite) THEN
        -- D'abord annuler l'effet de l'ancien mouvement
        IF OLD.type = 'ENTREE' THEN
            UPDATE produits 
            SET quantite_stock = quantite_stock - OLD.quantite,
                date_modification = NOW()
            WHERE id = OLD.produit_id;
        ELSEIF OLD.type = 'SORTIE' THEN
            UPDATE produits 
            SET quantite_stock = quantite_stock + OLD.quantite,
                date_modification = NOW()
            WHERE id = OLD.produit_id;
        END IF;
        
        -- Puis appliquer le nouveau mouvement
        IF NEW.type = 'ENTREE' THEN
            UPDATE produits 
            SET quantite_stock = quantite_stock + NEW.quantite,
                date_modification = NOW()
            WHERE id = NEW.produit_id;
        ELSEIF NEW.type = 'SORTIE' THEN
            UPDATE produits 
            SET quantite_stock = quantite_stock - NEW.quantite,
                date_modification = NOW()
            WHERE id = NEW.produit_id;
        ELSEIF NEW.type = 'AJUSTEMENT' THEN
            UPDATE produits 
            SET quantite_stock = NEW.quantite,
                date_modification = NOW()
            WHERE id = NEW.produit_id;
        END IF;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_mouvement_insert` BEFORE INSERT ON `mouvements_stock` FOR EACH ROW BEGIN
    DECLARE current_stock DECIMAL(10,2);
    
    -- Récupérer le stock actuel du produit
    SELECT quantite_stock INTO current_stock FROM produits WHERE id = NEW.produit_id;
    
    -- Vérifier si c'est une sortie et si le stock serait négatif après l'opération
    IF NEW.type = 'SORTIE' AND (current_stock - NEW.quantite) < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Stock insuffisant pour cette sortie';
    END IF;
    
    -- Vérifier si c'est un ajustement qui rendrait le stock négatif
    IF NEW.type = 'AJUSTEMENT' AND NEW.quantite < 0 AND (current_stock + NEW.quantite) < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ajustement impossible : stock deviendrait négatif';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_mouvement_update` BEFORE UPDATE ON `mouvements_stock` FOR EACH ROW BEGIN
    DECLARE current_stock DECIMAL(10,2);
    
    -- Si le type ou la quantité change, vérifier la nouvelle valeur
    IF (NEW.type != OLD.type OR NEW.quantite != OLD.quantite) THEN
        -- Récupérer le stock actuel du produit
        SELECT quantite_stock INTO current_stock FROM produits WHERE id = NEW.produit_id;
        
        -- Annuler l'effet de l'ancien mouvement
        IF OLD.type = 'ENTREE' THEN
            SET current_stock = current_stock - OLD.quantite;
        ELSEIF OLD.type = 'SORTIE' THEN
            SET current_stock = current_stock + OLD.quantite;
        END IF;
        
        -- Appliquer le nouveau mouvement et vérifier
        IF NEW.type = 'SORTIE' AND (current_stock - NEW.quantite) < 0 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Modification impossible : stock insuffisant';
        ELSEIF NEW.type = 'AJUSTEMENT' AND NEW.quantite < 0 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Ajustement impossible : valeur négative';
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `entity_type` enum('paiement','transaction','credit','vehicule','utilisateur','reclamation','stock') NOT NULL,
  `entity_id` int(11) NOT NULL,
  `type` enum('paiement_reussi','remboursement','transaction_reussie','expiration','expiration_proche','systeme','autre','reclamation_created','reclamation_closed','reclamation_updated','reclamation_resolved','alerte_stock','réapprovisionnement') NOT NULL,
  `message` varchar(255) NOT NULL,
  `vue` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `id_utilisateur`, `entity_type`, `entity_id`, `type`, `message`, `vue`, `created_at`) VALUES
(1, 13, 'credit', 7, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 800 DT', 1, '2025-04-29 00:54:51'),
(2, 13, 'credit', 7, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 700 DT', 1, '2025-04-29 04:10:55'),
(3, 13, 'credit', 7, 'paiement_reussi', 'Paiement de 10 DT enregistré. Reste: 690 DT', 1, '2025-04-29 04:16:55'),
(4, 13, 'credit', 7, 'paiement_reussi', 'Paiement de 30 DT enregistré. Reste: 660 DT', 1, '2025-04-29 04:40:13'),
(5, 13, 'credit', 7, 'expiration', 'Votre crédit #7 a expiré', 1, '2025-05-01 23:00:00'),
(6, 10, 'credit', 13, 'remboursement', 'Crédit #13 complètement remboursé (500 DT)', 0, '2025-05-02 18:30:18'),
(7, 10, 'credit', 13, 'remboursement', 'Votre crédit #13 a été complètement remboursé', 0, '2025-05-02 19:00:00'),
(8, 10, 'credit', 17, 'paiement_reussi', 'Paiement de 200 DT enregistré. Reste: 300 DT', 0, '2025-05-04 10:39:51'),
(9, 10, 'credit', 17, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 200 DT', 0, '2025-05-13 18:58:49'),
(10, 10, 'credit', 17, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 100 DT', 0, '2025-05-13 19:25:47'),
(11, 13, 'credit', 18, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 100 DT', 1, '2025-05-16 01:28:08'),
(12, 13, 'reclamation', 7, '', 'Votre réclamation #REC-712859-866 a été marquée comme résolue', 1, '2025-05-16 16:50:12'),
(13, 13, 'reclamation', 5, '', 'Le statut de votre réclamation #REC-069248-224 a été mis à jour: en_cours', 1, '2025-05-16 16:51:28'),
(14, 13, 'reclamation', 7, '', 'Votre réclamation #REC-712859-866 a été fermée', 1, '2025-05-16 17:06:52'),
(15, 13, 'reclamation', 5, 'reclamation_resolved', 'Votre réclamation #REC-069248-224 a été marquée comme résolue', 1, '2025-05-16 17:13:33'),
(19, 13, 'reclamation', 4, 'reclamation_updated', 'Le statut de votre réclamation #REC-553193-986 a été mis à jour: en_cours', 1, '2025-05-17 20:27:23'),
(20, 13, 'reclamation', 8, 'reclamation_created', 'Votre réclamation #REC-634834-416 a été créée avec succès', 0, '2025-05-18 14:30:34'),
(21, 13, 'reclamation', 4, 'reclamation_resolved', 'Votre réclamation #REC-553193-986 a été marquée comme résolue', 0, '2025-05-18 14:32:34'),
(22, 10, 'credit', 9, 'expiration_proche', 'Votre crédit #9 expire dans 7 jours', 0, '2025-05-24 23:00:01'),
(23, 9, 'credit', 10, 'expiration_proche', 'Votre crédit #10 expire dans 7 jours', 0, '2025-05-24 23:00:05'),
(24, 9, 'credit', 12, 'expiration_proche', 'Votre crédit #12 expire dans 7 jours', 0, '2025-05-24 23:00:07'),
(25, 10, 'credit', 14, 'expiration_proche', 'Votre crédit #14 expire dans 7 jours', 0, '2025-05-24 23:00:09'),
(26, 9, 'credit', 15, 'expiration_proche', 'Votre crédit #15 expire dans 7 jours', 0, '2025-05-24 23:00:11'),
(27, 10, 'credit', 17, 'expiration_proche', 'Votre crédit #17 expire dans 7 jours', 0, '2025-05-24 23:00:13'),
(28, 13, 'reclamation', 9, 'reclamation_created', 'Votre réclamation #REC-676056-383 a été créée avec succès', 0, '2025-05-26 15:51:16'),
(29, 10, 'credit', 9, 'expiration_proche', 'Votre crédit #9 expire dans 5 jours', 0, '2025-05-26 23:00:00'),
(30, 9, 'credit', 10, 'expiration_proche', 'Votre crédit #10 expire dans 5 jours', 0, '2025-05-26 23:00:02'),
(31, 9, 'credit', 12, 'expiration_proche', 'Votre crédit #12 expire dans 5 jours', 0, '2025-05-26 23:00:03'),
(32, 10, 'credit', 14, 'expiration_proche', 'Votre crédit #14 expire dans 5 jours', 0, '2025-05-26 23:00:05'),
(33, 9, 'credit', 15, 'expiration_proche', 'Votre crédit #15 expire dans 5 jours', 0, '2025-05-26 23:00:07'),
(34, 10, 'credit', 17, 'expiration_proche', 'Votre crédit #17 expire dans 5 jours', 0, '2025-05-26 23:00:08'),
(35, 10, 'credit', 9, 'expiration_proche', 'Votre crédit #9 expire dans 4 jours', 0, '2025-05-27 23:00:00'),
(36, 9, 'credit', 10, 'expiration_proche', 'Votre crédit #10 expire dans 4 jours', 0, '2025-05-27 23:00:03'),
(37, 9, 'credit', 12, 'expiration_proche', 'Votre crédit #12 expire dans 4 jours', 0, '2025-05-27 23:00:05'),
(38, 10, 'credit', 14, 'expiration_proche', 'Votre crédit #14 expire dans 4 jours', 0, '2025-05-27 23:00:06'),
(39, 9, 'credit', 15, 'expiration_proche', 'Votre crédit #15 expire dans 4 jours', 0, '2025-05-27 23:00:08'),
(40, 10, 'credit', 17, 'expiration_proche', 'Votre crédit #17 expire dans 4 jours', 0, '2025-05-27 23:00:09'),
(41, 10, 'credit', 9, 'expiration_proche', 'Votre crédit #9 expire dans 3 jours', 0, '2025-05-28 23:00:00'),
(42, 9, 'credit', 10, 'expiration_proche', 'Votre crédit #10 expire dans 3 jours', 0, '2025-05-28 23:00:02'),
(43, 9, 'credit', 12, 'expiration_proche', 'Votre crédit #12 expire dans 3 jours', 0, '2025-05-28 23:00:03'),
(44, 10, 'credit', 14, 'expiration_proche', 'Votre crédit #14 expire dans 3 jours', 0, '2025-05-28 23:00:04'),
(45, 9, 'credit', 15, 'expiration_proche', 'Votre crédit #15 expire dans 3 jours', 0, '2025-05-28 23:00:05'),
(46, 10, 'credit', 17, 'expiration_proche', 'Votre crédit #17 expire dans 3 jours', 0, '2025-05-28 23:00:07'),
(47, 13, 'credit', 18, 'remboursement', 'Crédit #18 complètement remboursé (100 DT)', 0, '2025-05-29 04:04:47'),
(48, 13, 'credit', 18, 'remboursement', 'Votre crédit #18 a été complètement remboursé', 0, '2025-05-29 05:00:00'),
(49, 14, 'stock', 20, 'alerte_stock', 'Produit \"Yaoughrt\" (Produits Alimentaires) sous le seuil: 5 restants (seuil: 8)', 1, '2025-05-29 20:01:01'),
(50, 14, 'stock', 4, 'réapprovisionnement', 'Commande automatique #4 créée pour Delice. 1 produit(s) commandé(s).', 1, '2025-05-29 20:01:05'),
(51, 13, 'credit', 20, 'paiement_reussi', 'Paiement de 299 DT enregistré. Reste: 300 DT', 0, '2025-05-31 10:50:03'),
(52, 13, 'reclamation', 9, 'reclamation_updated', 'Le statut de votre réclamation #REC-676056-383 a été mis à jour: en_cours', 0, '2025-06-06 16:36:08'),
(53, 13, 'reclamation', 9, 'reclamation_resolved', 'Votre réclamation #REC-676056-383 a été marquée comme résolue', 0, '2025-06-07 08:55:55'),
(54, 13, 'reclamation', 10, 'reclamation_created', 'Votre réclamation #REC-782665-558 a été créée avec succès', 1, '2025-06-08 18:03:02'),
(55, 14, '', 13, '', 'Le compte client Mahdi Bey (ID: 13) a été désactivé automatiquement pour 3 crédits expirés', 0, '2025-06-10 02:00:01'),
(56, 28, 'credit', 32, 'paiement_reussi', 'Paiement de 999 DT enregistré. Reste: 1000 DT', 0, '2025-06-15 15:48:19'),
(57, 28, 'credit', 32, 'paiement_reussi', 'Paiement de 199 DT enregistré. Reste: 801 DT', 0, '2025-06-15 16:05:54'),
(58, 28, 'credit', 32, 'paiement_reussi', 'Paiement de 199 DT enregistré. Reste: 602 DT', 0, '2025-06-15 17:50:02'),
(59, 14, 'stock', 21, 'alerte_stock', 'Produit \"Chips Sel\" (Chips) sous le seuil: 2 restants (seuil: 5)', 0, '2025-06-15 20:00:01'),
(60, 14, 'stock', 11, 'réapprovisionnement', 'Commande automatique #11 créée pour Layz. 1 produit(s) commandé(s).', 0, '2025-06-15 20:00:03');

-- --------------------------------------------------------

--
-- Structure de la table `paiements_credits`
--

CREATE TABLE `paiements_credits` (
  `id` int(11) NOT NULL,
  `reference_paiement` varchar(50) DEFAULT NULL,
  `id_credit` int(11) NOT NULL,
  `montant_paye` decimal(10,2) NOT NULL,
  `montant_restant` decimal(10,2) DEFAULT NULL,
  `date_paiement` datetime DEFAULT current_timestamp(),
  `mode_paiement` enum('especes','carte','virement','cheque') NOT NULL,
  `description` text DEFAULT NULL,
  `id_caissier` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `paiements_credits`
--

INSERT INTO `paiements_credits` (`id`, `reference_paiement`, `id_credit`, `montant_paye`, `montant_restant`, `date_paiement`, `mode_paiement`, `description`, `id_caissier`) VALUES
(1, 'PAY-713926-205', 2, 50.00, 450.00, '2025-04-16 18:48:33', 'especes', 'hyt', NULL),
(2, 'PAY-763060-263', 2, 50.00, 400.00, '2025-04-16 19:06:03', 'especes', 'aa', NULL),
(3, 'PAY-678268-410', 3, 20.00, 480.00, '2025-04-16 19:21:18', 'especes', 'uu', NULL),
(4, 'PAY-011405-645', 5, 20.00, 220.00, '2025-04-21 18:03:31', 'especes', 'ZZ', NULL),
(5, 'PAY-082920-520', 5, 20.00, 200.00, '2025-04-21 18:04:42', 'carte', 'a', NULL),
(6, 'PAY-137335-971', 5, 20.00, 180.00, '2025-04-21 18:05:37', 'especes', 'Z', NULL),
(8, 'PAY-808660-435', 5, 50.00, 130.00, '2025-04-21 18:16:48', 'especes', 'zz', NULL),
(9, 'PAY-848827-537', 5, 20.00, 110.00, '2025-04-21 18:17:28', 'especes', 'S', NULL),
(10, 'PAY-307091-330', 6, 500.00, 0.00, '2025-04-21 18:25:07', 'virement', 'J', NULL),
(11, 'PAY-492094-669', 7, 100.00, 900.00, '2025-04-29 01:44:52', 'especes', 'Il a payé a la station', NULL),
(12, 'PAY-091324-877', 7, 100.00, 800.00, '2025-04-29 01:54:51', 'especes', 'z', NULL),
(13, 'PAY-855100-120', 7, 100.00, 700.00, '2025-04-29 05:10:55', 'especes', 'Z', NULL),
(14, 'PAY-215215-658', 7, 10.00, 690.00, '2025-04-29 05:16:55', 'especes', 'q', NULL),
(15, 'PAY-613554-300', 7, 30.00, 660.00, '2025-04-29 05:40:13', 'carte', 'YU', NULL),
(16, 'PAY-618916-407', 13, 500.00, 0.00, '2025-05-02 19:30:18', 'especes', 'q', NULL),
(17, 'PAY-191350-441', 17, 200.00, 300.00, '2025-05-04 11:39:51', 'especes', 'Z', NULL),
(18, 'PAY-729454-802', 17, 100.00, 200.00, '2025-05-13 19:58:49', 'especes', 'HH', NULL),
(19, 'PAY-347402-760', 17, 100.00, 100.00, '2025-05-13 20:25:47', 'especes', 'GG', 27),
(20, 'PAY-888513-183', 18, 100.00, 100.00, '2025-05-16 02:28:08', 'especes', '', NULL),
(21, 'PAY-487727-454', 18, 100.00, 0.00, '2025-05-29 05:04:47', 'especes', '', 27),
(22, 'PAY-603313-732', 20, 299.00, 300.00, '2025-05-31 11:50:03', 'especes', 'na', 27),
(23, 'PAY-499618-483', 32, 999.00, 1000.00, '2025-06-15 16:48:19', 'especes', 'bien', 27),
(24, 'PAY-554323-212', 32, 199.00, 801.00, '2025-06-15 17:05:54', 'especes', '', 27),
(25, 'PAY-802642-193', 32, 199.00, 602.00, '2025-06-15 18:50:02', 'especes', '', 27);

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `element_name` varchar(100) DEFAULT NULL,
  `parent_element` varchar(100) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `permissions`
--

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

-- --------------------------------------------------------

--
-- Structure de la table `pistolets`
--

CREATE TABLE `pistolets` (
  `id` int(11) NOT NULL,
  `pompe_id` int(11) NOT NULL,
  `numero_pistolet` varchar(50) NOT NULL,
  `statut` enum('disponible','indisponible','maintenance') DEFAULT 'disponible',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nom_produit` varchar(50) NOT NULL DEFAULT 'Sans nom',
  `prix_unitaire` decimal(10,2) NOT NULL DEFAULT 0.00,
  `unite_mesure` varchar(10) DEFAULT 'Litre',
  `date_dernier_index` date DEFAULT NULL,
  `dernier_index` decimal(12,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pistolets`
--

INSERT INTO `pistolets` (`id`, `pompe_id`, `numero_pistolet`, `statut`, `created_at`, `updated_at`, `nom_produit`, `prix_unitaire`, `unite_mesure`, `date_dernier_index`, `dernier_index`) VALUES
(4, 34, 'PIII1', 'disponible', '2025-04-21 19:28:39', '2025-06-07 18:37:08', 'SP95', 2.50, 'Litre', '2025-06-04', 200.00),
(5, 35, 'PI01', 'maintenance', '2025-04-22 00:34:53', '2025-06-08 09:53:59', 'SP95', 2.50, 'Litre', '2025-06-08', 400.00),
(6, 35, 'PI03', 'disponible', '2025-04-22 00:34:53', '2025-06-08 00:48:15', 'GPL', 2.70, 'Litre', '2025-06-08', 400.00),
(7, 35, 'PI02', 'indisponible', '2025-04-22 00:34:53', '2025-06-08 00:48:15', 'GAZOLE', 2.30, 'Litre', '2025-06-08', 500.00),
(8, 36, 'PI04', 'disponible', '2025-04-22 00:39:26', '2025-06-08 00:19:34', 'SP95', 2.50, 'Litre', '2025-06-08', 298.00),
(11, 40, 'P024_PSGAZOLE02', 'disponible', '2025-06-15 14:10:57', '2025-06-15 14:10:57', 'GAZOLE', 1.85, 'Litre', NULL, 0.00),
(12, 40, 'P024_PSSP9802', 'disponible', '2025-06-15 14:10:57', '2025-06-15 14:10:57', 'SP98', 2.25, 'Litre', NULL, 0.00),
(13, 40, 'P024_PSSP9502', 'disponible', '2025-06-15 14:10:57', '2025-06-15 14:10:57', 'SP95', 2.15, 'Litre', NULL, 0.00),
(14, 42, 'P025_PSGAZOLE02', 'disponible', '2025-06-15 14:12:17', '2025-06-15 14:12:17', 'GAZOLE', 1.85, 'Litre', NULL, 0.00),
(15, 42, 'P025_PSSP9802', 'disponible', '2025-06-15 14:12:17', '2025-06-15 14:12:17', 'SP98', 2.25, 'Litre', NULL, 0.00),
(16, 42, 'P025_PSGPL02', 'disponible', '2025-06-15 14:12:17', '2025-06-15 14:12:17', 'GPL', 0.58, 'Litre', NULL, 0.00);

-- --------------------------------------------------------

--
-- Structure de la table `pompes`
--

CREATE TABLE `pompes` (
  `id` int(11) NOT NULL,
  `numero_pompe` varchar(50) NOT NULL,
  `type_pompe` enum('sans plomb','gasoil','multi-produits') NOT NULL,
  `statut` enum('en_service','hors_service_temporaire','reserve','maintenance','hors_service_definitif') DEFAULT 'reserve',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pompes`
--

INSERT INTO `pompes` (`id`, `numero_pompe`, `type_pompe`, `statut`, `created_at`) VALUES
(34, 'P020', 'gasoil', 'hors_service_temporaire', '2025-04-21 12:28:39'),
(35, 'P021', 'multi-produits', 'en_service', '2025-04-21 21:34:52'),
(36, 'P022', 'sans plomb', 'reserve', '2025-04-21 20:39:26'),
(40, 'P024', 'multi-produits', 'en_service', '2025-06-15 13:10:56'),
(42, 'P025', 'multi-produits', 'en_service', '2025-06-15 14:12:16');

-- --------------------------------------------------------

--
-- Structure de la table `postes`
--

CREATE TABLE `postes` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `postes`
--

INSERT INTO `postes` (`id`, `nom`, `heure_debut`, `heure_fin`) VALUES
(1, 'Matin', '06:00:00', '14:00:00'),
(2, 'Après-midi', '14:00:00', '22:00:00'),
(3, 'Nuit', '22:00:00', '06:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` int(11) NOT NULL,
  `code_barre` varchar(50) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `prix_achat` decimal(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
  `prix_vente` decimal(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
  `quantite_stock` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `seuil_alerte` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  `date_modification` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `fournisseur_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `code_barre`, `nom`, `description`, `categorie_id`, `prix_achat`, `prix_vente`, `quantite_stock`, `seuil_alerte`, `image_url`, `date_creation`, `date_modification`, `fournisseur_id`) VALUES
(2, '1234567890123', 'Huile 5W-30', 'Ceci est un produit exemple pour illustrer une insertion.', 36, 10.50, 15.00, 59, 10, 'http://localhost:3000/images_produits/produit_1750015991124.jpg', '2025-05-15 20:47:40', '2025-06-15 20:33:11', 14),
(4, 'CB1663413297', 'Gaufrettes', NULL, 50, 1.60, 1.80, 79, 5, 'http://localhost:3000/images_produits/produit_1748564410627.jpg', '2025-05-16 12:16:27', '2025-06-15 20:27:07', 6),
(5, 'CB6837771736', 'Canette Coca Cola', NULL, 45, 1.80, 2.00, 123, 2, 'http://localhost:3000/images_produits/produit_1748564399152.jpg', '2025-05-16 12:35:19', '2025-06-15 20:56:58', 1),
(10, 'CB9773656995', 'Sablito', NULL, 50, 1.70, 2.20, 39, 5, 'http://localhost:3000/images_produits/produit_1750016305652.jpg', '2025-05-16 19:51:33', '2025-06-15 20:38:25', 6),
(13, 'CB9103904112', 'Twin power turbo', NULL, 36, 49.00, 52.50, 51, 10, 'http://localhost:3000/images_produits/produit_1750016052999.jpeg', '2025-05-16 22:46:25', '2025-06-15 20:34:13', 14),
(14, 'CB1282042615', 'Dunup', NULL, 51, 1.00, 1.30, 146, 10, 'http://localhost:3000/images_produits/produit_1750015484764.webp', '2025-05-16 22:54:43', '2025-06-15 20:58:46', 1),
(16, 'CB2080557356', 'Huile Quartz', 'HHHH', 36, 29.00, 35.00, 43, 5, 'http://localhost:3000/images_produits/produit_1747438679148.jpeg', '2025-05-17 00:37:59', '2025-06-15 20:31:46', 12),
(18, 'CB8750034039', 'OxO', NULL, 50, 1.80, 2.10, 26, 5, 'http://localhost:3000/images_produits/produit_1750016373899.jpg', '2025-05-18 05:04:19', '2025-06-15 20:39:34', 6),
(19, 'CB1307118694', 'Chocotom', NULL, 50, 1.60, 1.80, 14, 5, 'http://localhost:3000/images_produits/produit_1748273257558.webp', '2025-05-26 16:27:37', '2025-06-15 20:52:07', 3),
(20, 'CB1937212160', 'Nettoyeur d\'interieur', NULL, 39, 13.00, 14.00, 21, 7, 'http://localhost:3000/images_produits/produit_1750016458833.jpg', '2025-05-29 18:59:19', '2025-06-15 20:40:58', 14),
(21, 'CB6052002399', 'Chips Sel', NULL, 49, 2.50, 2.68, 22, 5, 'http://localhost:3000/images_produits/produit_1748563511627.jpeg', '2025-05-30 01:04:36', '2025-06-15 21:01:54', 9),
(22, 'CB1056786993', 'FANTA', NULL, 45, 1.80, 2.00, 90, 0, 'http://localhost:3000/images_produits/produit_1750015037269.jpg', '2025-06-09 15:24:15', '2025-06-15 20:56:58', 1),
(26, 'CB7822369623', 'Blendy', 'bon yaourt', 51, 1.00, 1.50, 97, 5, 'http://localhost:3000/images_produits/produit_1750015595262.webp', '2025-06-10 22:19:20', '2025-06-15 20:58:46', 1),
(27, 'CB3441537160', 'Lustrant Carroserie', NULL, 39, 18.00, 21.00, 29, 5, 'http://localhost:3000/images_produits/produit_1750016243519.jpg', '2025-06-10 22:50:00', '2025-06-15 20:37:23', 14),
(28, 'CB4865435240', 'Cookies', NULL, 50, 2.00, 2.40, 15, 5, 'http://localhost:3000/images_produits/produit_1749595252537.jpeg', '2025-06-10 23:39:18', '2025-06-15 20:19:17', NULL),
(29, 'CB6156008575', 'Huile SW-30', NULL, 36, 19.00, 22.00, 29, 6, 'http://localhost:3000/images_produits/produit_1750015854655.jpg', '2025-06-15 16:33:21', '2025-06-15 20:30:55', 12);

--
-- Déclencheurs `produits`
--
DELIMITER $$
CREATE TRIGGER `before_produits_insert` BEFORE INSERT ON `produits` FOR EACH ROW BEGIN
    SET NEW.prix_achat = GREATEST(NEW.prix_achat, 0);
    SET NEW.prix_vente = GREATEST(NEW.prix_vente, 0);
    SET NEW.quantite_stock = GREATEST(NEW.quantite_stock, 0);
    SET NEW.seuil_alerte = GREATEST(NEW.seuil_alerte, 0);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_produits_update` BEFORE UPDATE ON `produits` FOR EACH ROW BEGIN
    SET NEW.prix_achat = GREATEST(NEW.prix_achat, 0);
    SET NEW.prix_vente = GREATEST(NEW.prix_vente, 0);
    SET NEW.quantite_stock = GREATEST(NEW.quantite_stock, 0);
    SET NEW.seuil_alerte = GREATEST(NEW.seuil_alerte, 0);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `rapports_journaliers`
--

CREATE TABLE `rapports_journaliers` (
  `id` int(11) NOT NULL,
  `date_rapport` date NOT NULL,
  `pistolet_id` int(11) NOT NULL,
  `total_quantite` decimal(10,2) NOT NULL,
  `total_montant` decimal(10,2) NOT NULL,
  `nombre_postes` int(11) NOT NULL,
  `date_generation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rapports_journaliers`
--

INSERT INTO `rapports_journaliers` (`id`, `date_rapport`, `pistolet_id`, `total_quantite`, `total_montant`, `nombre_postes`, `date_generation`) VALUES
(17, '2025-05-02', 4, 200.00, 500.00, 1, '2025-05-02 16:15:58'),
(21, '2025-05-04', 4, 200.00, 500.00, 1, '2025-05-04 16:10:33'),
(22, '2025-05-04', 8, 100.00, 400.00, 1, '2025-05-04 18:29:45'),
(23, '2025-05-31', 6, 129.00, 348.30, 1, '2025-05-31 11:17:23'),
(43, '2025-06-08', 5, 201.00, 502.50, 1, '2025-06-08 23:16:34'),
(44, '2025-06-08', 6, 271.00, 731.70, 1, '2025-06-08 23:16:34'),
(45, '2025-06-08', 7, 500.00, 1150.00, 1, '2025-06-08 23:16:34'),
(46, '2025-06-08', 8, 198.00, 495.00, 1, '2025-06-08 23:16:34');

-- --------------------------------------------------------

--
-- Structure de la table `reclamations`
--

CREATE TABLE `reclamations` (
  `id` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `objet` varchar(255) NOT NULL,
  `raison` enum('service','produit','facturation','autre') NOT NULL,
  `description` text NOT NULL,
  `reference` varchar(50) NOT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  `statut` enum('nouveau','en_cours','resolu','fermer') DEFAULT 'nouveau'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reclamations`
--

INSERT INTO `reclamations` (`id`, `id_client`, `objet`, `raison`, `description`, `reference`, `date_creation`, `statut`) VALUES
(4, 13, 'credit pas incrementé', 'service', 'ghegudgdeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'REC-553193-986', '2025-05-16 13:29:13', 'resolu'),
(5, 13, 'credit pas incrementé', 'service', 'gfddjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjg', 'REC-069248-224', '2025-05-16 13:37:49', 'resolu'),
(6, 13, 'credit pas incrementé', 'produit', 'zzzzzzzzzzzzzzzzzzzzzzz', 'REC-218998-520', '2025-05-16 13:40:19', 'resolu'),
(7, 13, 'credit pas incrementé', 'produit', 'sssssssssssssssssssssssss', 'REC-712859-866', '2025-05-16 14:05:12', 'fermer'),
(8, 13, 'Problème de livraison', 'produit', 'La livraison n\'est pas arrivée à la date promise', 'REC-634834-416', '2025-05-18 15:30:34', 'nouveau'),
(9, 13, 'credit pas incrementé', 'produit', 'j ai un produit defectuerux', 'REC-676056-383', '2025-05-26 16:51:16', 'resolu'),
(10, 13, 'credit pas incrementé', 'service', 'yyhhhhhhhhhhhhhhhhhhhhhhhhhhhh', 'REC-782665-558', '2025-06-08 19:03:02', 'nouveau');

-- --------------------------------------------------------

--
-- Structure de la table `releves_postes`
--

CREATE TABLE `releves_postes` (
  `id` int(11) NOT NULL,
  `affectation_id` int(11) NOT NULL,
  `pistolet_id` int(11) NOT NULL,
  `index_ouverture` decimal(12,2) NOT NULL CHECK (`index_ouverture` >= 0),
  `index_fermeture` decimal(12,2) NOT NULL CHECK (`index_fermeture` >= `index_ouverture`),
  `date_heure_saisie` datetime DEFAULT current_timestamp(),
  `statut` enum('saisie','valide','annule') DEFAULT 'saisie',
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `id_vehicule` int(11) DEFAULT NULL,
  `quantite` decimal(10,2) DEFAULT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `date_transaction` datetime DEFAULT NULL,
  `preuve` varchar(255) DEFAULT NULL COMMENT 'Chemin vers la preuve photo de la transaction',
  `id_pompiste` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `id_vehicule`, `quantite`, `montant`, `date_transaction`, `preuve`, `id_pompiste`) VALUES
(1, 18, 30.00, 315.00, '2025-04-17 20:23:15', NULL, NULL),
(2, 18, 7.62, 80.00, '2025-04-17 21:09:03', NULL, NULL),
(3, 18, 2.86, 30.00, '2025-04-17 21:09:16', NULL, NULL),
(4, 18, 0.95, 10.00, '2025-04-17 21:09:24', NULL, NULL),
(5, 18, 1.90, 20.00, '2025-04-17 21:11:53', NULL, NULL),
(6, 18, 0.95, 10.00, '2025-04-17 21:17:05', NULL, NULL),
(7, 18, 1.90, 20.00, '2025-04-17 21:28:36', NULL, NULL),
(8, 18, 1.90, 20.00, '2025-04-17 21:30:20', NULL, NULL),
(9, 19, 37.04, 100.00, '2025-04-18 00:28:45', NULL, NULL),
(10, 19, 111.11, 300.00, '2025-04-18 01:00:21', NULL, NULL),
(11, 19, 74.07, 200.00, '2025-04-18 01:04:04', NULL, NULL),
(12, 19, 80.00, 200.00, '2025-04-18 01:14:36', NULL, NULL),
(13, 19, 80.00, 200.00, '2025-04-18 01:17:54', NULL, NULL),
(14, 19, 9.52, 100.00, '2025-04-18 01:24:24', NULL, NULL),
(15, 19, 7.41, 20.00, '2025-04-18 01:27:17', NULL, NULL),
(16, 19, 1.90, 20.00, '2025-04-18 01:31:09', NULL, NULL),
(17, 19, 7.41, 20.00, '2025-04-18 01:42:32', NULL, NULL),
(18, 19, 1.90, 20.00, '2025-04-18 01:52:08', NULL, NULL),
(19, 19, 19.05, 200.00, '2025-04-18 01:52:25', NULL, NULL),
(20, 19, 19.05, 200.00, '2025-04-18 01:55:39', NULL, NULL),
(21, 19, 19.05, 200.00, '2025-04-18 01:59:39', NULL, NULL),
(22, 19, 1.90, 20.00, '2025-04-18 02:01:32', NULL, NULL),
(23, 19, 19.05, 200.00, '2025-04-18 03:02:56', NULL, NULL),
(24, 19, 1.90, 20.00, '2025-04-18 03:43:13', NULL, NULL),
(25, 20, 1.90, 20.00, '2025-04-18 13:35:28', NULL, NULL),
(26, 20, 1.90, 20.00, '2025-04-18 14:27:58', NULL, NULL),
(27, 20, 1.90, 20.00, '2025-04-18 14:53:17', NULL, NULL),
(28, 21, 9.52, 100.00, '2025-04-29 03:00:45', NULL, NULL),
(29, 21, 9.52, 100.00, '2025-04-29 03:09:55', NULL, NULL),
(30, 21, 18.52, 50.00, '2025-04-29 03:27:35', NULL, NULL),
(31, 21, 20.00, 50.00, '2025-04-29 03:35:42', NULL, NULL),
(32, 21, 20.00, 50.00, '2025-04-29 03:38:35', NULL, NULL),
(33, 21, 20.00, 50.00, '2025-04-29 03:39:45', NULL, NULL),
(34, 21, 16.00, 40.00, '2025-04-29 03:51:25', NULL, NULL),
(35, 21, 16.00, 40.00, '2025-04-29 04:01:54', NULL, NULL),
(36, 21, 3.81, 40.00, '2025-04-29 04:03:10', NULL, NULL),
(37, 21, 1.90, 20.00, '2025-04-29 04:06:52', NULL, NULL),
(38, 21, 1.90, 20.00, '2025-04-29 04:18:23', NULL, NULL),
(39, 21, 1.90, 20.00, '2025-04-29 04:29:37', NULL, NULL),
(40, 21, 1.90, 20.00, '2025-04-29 04:49:42', NULL, NULL),
(41, 21, 9.52, 100.00, '2025-04-29 05:19:36', NULL, NULL),
(42, 21, 9.52, 100.00, '2025-04-29 05:25:24', NULL, NULL),
(43, 21, 4.76, 50.00, '2025-04-29 05:32:05', NULL, NULL),
(44, 21, 20.00, 50.00, '2025-04-29 05:33:25', NULL, NULL),
(45, 21, 4.76, 50.00, '2025-04-29 05:38:26', NULL, NULL),
(46, 22, 38.10, 400.00, '2025-04-30 14:05:07', NULL, NULL),
(47, 22, 9.52, 100.00, '2025-04-30 14:07:06', NULL, NULL),
(48, 26, 9.52, 100.00, '2025-05-02 22:27:06', NULL, NULL),
(49, 26, 9.52, 100.00, '2025-05-02 22:28:27', NULL, NULL),
(50, 26, 9.52, 100.00, '2025-05-02 22:29:05', NULL, NULL),
(51, 27, 9.52, 100.00, '2025-05-02 23:15:26', NULL, NULL),
(52, 27, 9.52, 100.00, '2025-05-02 23:16:18', NULL, NULL),
(53, 27, 9.52, 100.00, '2025-05-02 23:19:06', NULL, NULL),
(54, 27, 9.52, 100.00, '2025-05-02 23:19:51', NULL, NULL),
(55, 27, 9.52, 100.00, '2025-05-02 23:20:01', NULL, NULL),
(56, 28, 9.52, 100.00, '2025-05-05 16:22:08', NULL, NULL),
(57, 28, 9.52, 100.00, '2025-05-05 16:24:48', NULL, NULL),
(58, 28, 9.52, 100.00, '2025-05-05 16:27:14', NULL, NULL),
(59, 28, 9.52, 100.00, '2025-05-05 16:43:38', NULL, NULL),
(60, 28, 1.90, 20.00, '2025-05-05 16:47:15', NULL, NULL),
(61, 28, 1.90, 20.00, '2025-05-05 16:53:24', NULL, NULL),
(62, 28, 0.95, 10.00, '2025-05-05 17:02:15', 'uploads\\transactions\\transaction_1746460935280.png', NULL),
(63, 28, 0.95, 10.00, '2025-05-05 17:04:46', 'transactions\\transaction_1746461085648.jpg', NULL),
(64, 28, 0.95, 10.00, '2025-05-05 17:09:05', 'http://localhost:3000/transactions/transaction_1746461345466.png', NULL),
(65, 28, 0.95, 10.00, '2025-05-05 18:38:24', 'http://localhost:3000/public/transactions/transaction_1746466704645.png', 25),
(70, 28, 0.95, 10.00, '2025-05-13 19:22:00', '25', NULL),
(72, 28, 0.48, 5.00, '2025-05-13 19:26:34', '25', NULL),
(73, 28, 0.19, 2.00, '2025-05-13 19:30:16', '25', NULL),
(75, 28, 0.10, 1.00, '2025-05-13 19:36:22', 'http://localhost:3000/transactions/transaction_1747161382077.png', 25),
(76, 8, 9.52, 100.00, '2025-05-21 00:42:10', 'http://localhost:3000/transactions/transaction_1747784530471.jpeg', 25),
(77, 8, 9.52, 100.00, '2025-05-23 22:27:10', 'http://localhost:3000/transactions/transaction_1748035629223.JPG', 25),
(78, 8, 4.76, 50.00, '2025-05-24 21:37:56', 'http://localhost:3000/transactions/transaction_1748119076154.png', 25),
(79, 8, 4.76, 50.00, '2025-05-24 21:49:33', 'http://localhost:3000/transactions/transaction_1748119773735.jpg', 25),
(80, 8, 4.76, 50.00, '2025-05-24 21:52:16', 'http://localhost:3000/transactions/transaction_1748119936223.jpg', 25),
(81, 8, 4.76, 50.00, '2025-05-24 22:31:59', NULL, 25),
(82, 8, 4.76, 50.00, '2025-05-24 22:32:23', NULL, 25),
(83, 8, 4.76, 50.00, '2025-05-24 22:37:32', NULL, 25),
(84, 8, 0.95, 10.00, '2025-05-24 22:38:55', NULL, 25),
(85, 33, 18.95, 199.00, '2025-05-31 11:47:01', 'http://localhost:3000/transactions/transaction_1748688420905.png', 25),
(86, 33, 13.71, 144.00, '2025-05-31 11:48:39', NULL, 25),
(87, 33, 4.29, 45.00, '2025-06-04 13:53:40', NULL, 25),
(88, 33, 4.29, 45.00, '2025-06-04 14:17:14', NULL, 25),
(89, 33, 1.05, 11.00, '2025-06-04 15:50:05', NULL, 25),
(90, 33, 1.05, 11.00, '2025-06-04 15:52:41', NULL, 25),
(91, 33, 19.05, 200.00, '2025-06-08 10:07:20', 'http://localhost:3000/transactions/transaction_1749373639773.png', 23),
(92, 38, 18.95, 199.00, '2025-06-15 14:09:35', 'http://localhost:3000/transactions/transaction_1749992974296.jpg', 25);

--
-- Déclencheurs `transactions`
--
DELIMITER $$
CREATE TRIGGER `verify_pompiste_role_before_insert` BEFORE INSERT ON `transactions` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    IF NEW.id_pompiste IS NOT NULL THEN
        SELECT role INTO user_role 
        FROM utilisateurs 
        WHERE id = NEW.id_pompiste;
        
        IF user_role != 'pompiste' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'L''utilisateur assigné comme pompiste doit avoir le rôle "pompiste"';
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `numero_telephone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('gerant','Cogerant','caissier','pompiste','client') NOT NULL DEFAULT 'client',
  `temps_de_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active',
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `username`, `email`, `numero_telephone`, `password`, `role`, `temps_de_creation`, `status`, `photo`) VALUES
(9, 'john jeffrey', 'johndoe@example.com', '1234567898', '$2b$10$ZTs0/GYkUz4R3c6.fqQbQuOaWbmaH0CJa9NCIlADeiDvF7e.urmFO', 'client', '2025-03-14 14:42:46', 'active', NULL),
(10, 'marc Hughes', 'jo@example.com', '1267898883', '$2b$10$r78JXVlJc7FO6ST/HS.o8ubQhjyFERrn/GfTlQzmvxcazkfl.pvWO', 'client', '2025-03-14 15:26:28', 'active', NULL),
(13, 'Amine Bey', 'cncservice2018@gmail.com', '56327280', '$2b$10$I.ack14P/JALNplUd9i3NuR6w/fys71k9DVysmRUSxk9QrDIOGWGi', 'Cogerant', '2025-03-14 16:45:22', 'active', '/images/y.jpg'),
(14, 'mahdi Bey', 'mahdibeyy@gmail.com', '56327237', '$2b$10$15LPvfNTiUCKQ4esBYEjGugb.JWcD0a3imZz6O4Yl1Lotee3WP2l2', 'gerant', '2025-03-17 13:43:35', 'active', '/images/nbg.png'),
(15, 'Ahmed Bey', 'mahdibey2002@gmail.com', '56327210', '$2b$10$0NjolxaLuID7fcKfLy8sOOYShGEjARg3L9BQN9spbEcnv8RkyrWZq', 'pompiste', '2025-03-17 20:55:51', 'active', NULL),
(16, 'mahdi Akilouch', 'newuser@example.com', '12345678', '$2b$10$1d0Yfs65TEqFFE5acBSGb.QP7xQWQv6RcKzFGJFLVytMV8i5Pdhzm', 'pompiste', '2025-03-29 10:18:29', 'active', NULL),
(19, 'Mariem Baccouche', 'baccouche.mariem.iset@gmail.com', '98830579', '$2b$10$OVCe4SOpRX94g4aE7AyFC.XJbOaw8A3InOVVy5AyLJ.lVyPqJ0wlm', 'client', '2025-04-14 13:37:31', 'active', NULL),
(20, 'Mario Balotelli', 'SuperMario45@gmail.com', '1234567890', '$2b$10$PyMaAOur3j5H93.EuK7O0Oz1Dpua6RlQWC8stOZxjH3wZI94MX/R2', 'pompiste', '2025-04-22 00:40:25', 'active', '/images/super.png'),
(21, 'Edin Dzeko', 'Edindzeko9@gmail.com', '54209180', '$2b$10$asZ.b8ntHVVZNyhQNdaFzusc/jPtNhD1S1EzdDdQHNPYqorcaXjzu', 'pompiste', '2025-04-22 00:41:20', 'active', NULL),
(22, 'Lautaro Martinez', 'LautaroMartinez9@gmail.com', '54209183', '$2b$10$jEz5RXNjm7Pc/75TjMV0yO5O0mj0ijKc1uaNnTs/rPfacGOQsz6Vi', 'pompiste', '2025-04-22 00:41:55', 'active', NULL),
(23, 'Nicolo Barella', 'NicoloBarella9@gmail.com', '54209187', '$2b$10$Jxx6.XusstHPy8I3DS.uB.dGpxuOvwC8jSZpeo26JSUpCjodHCA5.', 'pompiste', '2025-04-22 00:42:26', 'active', NULL),
(24, 'Hannibal Mejbri', 'HannibalMejbri9@gmail.com', '54209182', '$2b$10$Q.7O5BjpJbkHDwDI.z8KwOepeNpmjeVLAPMNL8k1m4O.lW6ZGyWty', 'pompiste', '2025-04-22 00:43:11', 'active', NULL),
(25, 'Radhouane Falhi', 'RadhouaneFalhi9@gmail.com', '54209181', '$2b$10$hdhts5/ARh4RjGADK/FUjONFaBrpnJdeD.Gm0N/D/5lCemMrWEOAK', 'pompiste', '2025-04-22 00:44:07', 'active', '/images/radhouane.png'),
(26, 'Davide Fratessi', 'DavideFratessi@gmail.com', '12345678908', '$2b$10$5sO016NlCVTYgMAe3RI...CxiJ22e3NwRVYVg7/glNXjzr5AZivgS', 'pompiste', '2025-04-27 15:37:03', 'active', NULL),
(27, 'Frank kessie', 'FrankKessie@gmail.com', '126789888322', '$2b$10$CAMtYtYp6Cx/kA1vQVvWPuTG8ERoFeUr6QRIolbr509CJzJuu/Qn2', 'caissier', '2025-05-13 17:49:29', 'active', NULL),
(28, 'Alaa naouali', 'mahdibeyyy@gmail.com', '123456789066', '$2b$10$9EUYLTIBkNmsdEAevwj4l.ZVTQchF4qcUXAEFNXBXSziQcswHUEV.', 'client', '2025-06-05 15:31:28', 'active', NULL),
(30, 'Rayen ben nouri', 'mahdibeyyeee@gmail.com', '5632728000', '$2b$10$ulrxySIRsmsZifC1rIUwvuc6YTJ8HDh6iq4dMncso.1IjI6JuaGQS', 'client', '2025-06-05 16:20:38', 'active', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `vehicules`
--

CREATE TABLE `vehicules` (
  `id` int(11) NOT NULL,
  `immatriculation` varchar(20) NOT NULL,
  `marque` varchar(50) DEFAULT NULL,
  `type_vehicule` enum('voiture','camion','bus','moto') DEFAULT 'voiture',
  `qr_code` varchar(255) DEFAULT NULL,
  `id_credit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicules`
--

INSERT INTO `vehicules` (`id`, `immatriculation`, `marque`, `type_vehicule`, `qr_code`, `id_credit`) VALUES
(8, '22TU2002', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/22TU2002.png', 19),
(11, '23TU2002', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/23TU2002.png', 3),
(12, '22TU2004', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2004.png', 4),
(13, '22TU2003', 'GOLF', 'voiture', 'http://localhost:3000/qrcodes/22TU2003.png', 2),
(14, '22TU2006', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2006.png', 2),
(15, '22TU2025', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2025.png', 3),
(17, '22TU2026', 'GOLF', 'camion', 'http://localhost:3000/qrcodes/22TU2026.png', 4),
(18, '22TU2027', 'GOLF', 'moto', 'http://localhost:3000/qrcodes/22TU2027.png', 2),
(19, '22TU2030', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2030.png', 3),
(20, '22TU2050', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2050.png', 5),
(21, '250TU2022', 'SEAT', 'voiture', 'http://localhost:3000/qrcodes/250TU2022.png', 7),
(22, '22TU2005', 'SEAT', 'voiture', 'http://localhost:3000/qrcodes/22TU2005.png', 29),
(23, '22TU2066', 'SEAT ', 'voiture', 'undefined/qrcodes/22TU2066.png', 9),
(24, '22TU2044', 'BMW', 'voiture', 'undefined/qrcodes/22TU2044.png', 14),
(25, '23TU255', 'BMW', 'voiture', 'undefined/qrcodes/23TU255.png', 12),
(26, '22TU2033', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/22TU2033.png', 11),
(27, '22TU2099', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2099.png', 31),
(28, '22TU2012', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2012.png', 17),
(29, '22TU2054', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2054.png', 31),
(31, '22TU2045', 'CATCAT', 'voiture', 'http://localhost:3000/qrcodes/22TU2045.png', 19),
(33, '22TU2035', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2035.png', 20),
(34, '22TU2077', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2077.png', 26),
(36, '22TU2023', 'SEAT', 'voiture', 'http://localhost:3000/qrcodes/22TU2023.png', 23),
(37, '22TU2029', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2029.png', 30),
(38, '22TU2055', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2055.png', 23),
(40, '22TU2065', 'VOLVO', 'voiture', 'http://localhost:3000/qrcodes/22TU2065.png', 32);

-- --------------------------------------------------------

--
-- Structure de la table `ventes`
--

CREATE TABLE `ventes` (
  `id` int(11) NOT NULL,
  `date_vente` datetime DEFAULT current_timestamp(),
  `montant_total` decimal(12,2) NOT NULL,
  `montant_paye` decimal(12,2) NOT NULL,
  `monnaie_rendue` decimal(10,2) GENERATED ALWAYS AS (`montant_paye` - `montant_total`) VIRTUAL,
  `mode_paiement` enum('ESPECES','CARTE','CHEQUE') NOT NULL DEFAULT 'ESPECES',
  `id_caissier` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ventes`
--

INSERT INTO `ventes` (`id`, `date_vente`, `montant_total`, `montant_paye`, `mode_paiement`, `id_caissier`) VALUES
(9, '2025-06-15 20:50:44', 18.14, 21.00, 'ESPECES', 27),
(10, '2025-06-15 20:51:04', 4.50, 5.00, 'ESPECES', 27),
(11, '2025-06-15 20:51:32', 8.96, 10.00, 'ESPECES', 27),
(12, '2025-06-15 20:52:07', 3.30, 5.00, 'ESPECES', 27),
(13, '2025-06-15 20:52:39', 8.00, 10.00, 'ESPECES', 27);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `affectations`
--
ALTER TABLE `affectations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pompiste_id` (`pompiste_id`),
  ADD KEY `poste_id` (`poste_id`),
  ADD KEY `pompe_id` (`pompe_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Index pour la table `commandes_achat`
--
ALTER TABLE `commandes_achat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fournisseur_id` (`fournisseur_id`),
  ADD KEY `agent_id` (`agent_id`);

--
-- Index pour la table `details_credits`
--
ALTER TABLE `details_credits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom_unique` (`nom`);

--
-- Index pour la table `ligne_commande`
--
ALTER TABLE `ligne_commande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commande_id` (`commande_id`),
  ADD KEY `produit_id` (`produit_id`);

--
-- Index pour la table `ligne_vente`
--
ALTER TABLE `ligne_vente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vente_id` (`vente_id`),
  ADD KEY `produit_id` (`produit_id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_sender_receiver` (`sender_id`,`receiver_id`),
  ADD KEY `idx_receiver_sender` (`receiver_id`,`sender_id`);

--
-- Index pour la table `mouvements_stock`
--
ALTER TABLE `mouvements_stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produit_id` (`produit_id`),
  ADD KEY `utilisateur_id` (`agent_id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference_paiement` (`reference_paiement`),
  ADD KEY `id_credit` (`id_credit`),
  ADD KEY `fk_caissier` (`id_caissier`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pistolets`
--
ALTER TABLE `pistolets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pompe_id` (`pompe_id`);

--
-- Index pour la table `pompes`
--
ALTER TABLE `pompes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_pompe` (`numero_pompe`);

--
-- Index pour la table `postes`
--
ALTER TABLE `postes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_barre` (`code_barre`),
  ADD UNIQUE KEY `code_barre_unique` (`code_barre`),
  ADD KEY `fk_produits_categorie` (`categorie_id`),
  ADD KEY `fk_produits_fournisseur` (`fournisseur_id`);

--
-- Index pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pistolet_id` (`pistolet_id`),
  ADD KEY `date_rapport` (`date_rapport`);

--
-- Index pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `releves_postes`
--
ALTER TABLE `releves_postes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `affectation_id` (`affectation_id`),
  ADD KEY `pistolet_id` (`pistolet_id`);

--
-- Index pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_vehicule` (`id_vehicule`),
  ADD KEY `fk_pompiste` (`id_pompiste`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `immatriculation` (`immatriculation`),
  ADD UNIQUE KEY `qr_code` (`qr_code`),
  ADD KEY `id_credit` (`id_credit`);

--
-- Index pour la table `ventes`
--
ALTER TABLE `ventes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_caissier` (`id_caissier`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `affectations`
--
ALTER TABLE `affectations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13153;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `commandes_achat`
--
ALTER TABLE `commandes_achat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `details_credits`
--
ALTER TABLE `details_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `ligne_commande`
--
ALTER TABLE `ligne_commande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `ligne_vente`
--
ALTER TABLE `ligne_vente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `mouvements_stock`
--
ALTER TABLE `mouvements_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT pour la table `pistolets`
--
ALTER TABLE `pistolets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `pompes`
--
ALTER TABLE `pompes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `postes`
--
ALTER TABLE `postes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `reclamations`
--
ALTER TABLE `reclamations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `releves_postes`
--
ALTER TABLE `releves_postes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `vehicules`
--
ALTER TABLE `vehicules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `ventes`
--
ALTER TABLE `ventes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `affectations`
--
ALTER TABLE `affectations`
  ADD CONSTRAINT `affectations_ibfk_1` FOREIGN KEY (`pompiste_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `affectations_ibfk_2` FOREIGN KEY (`poste_id`) REFERENCES `postes` (`id`),
  ADD CONSTRAINT `affectations_ibfk_3` FOREIGN KEY (`pompe_id`) REFERENCES `pompes` (`id`);

--
-- Contraintes pour la table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `commandes_achat`
--
ALTER TABLE `commandes_achat`
  ADD CONSTRAINT `commandes_achat_ibfk_1` FOREIGN KEY (`fournisseur_id`) REFERENCES `fournisseurs` (`id`),
  ADD CONSTRAINT `commandes_achat_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `details_credits`
--
ALTER TABLE `details_credits`
  ADD CONSTRAINT `details_credits_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `ligne_commande`
--
ALTER TABLE `ligne_commande`
  ADD CONSTRAINT `ligne_commande_ibfk_1` FOREIGN KEY (`commande_id`) REFERENCES `commandes_achat` (`id`),
  ADD CONSTRAINT `ligne_commande_ibfk_2` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`);

--
-- Contraintes pour la table `ligne_vente`
--
ALTER TABLE `ligne_vente`
  ADD CONSTRAINT `ligne_vente_ibfk_1` FOREIGN KEY (`vente_id`) REFERENCES `ventes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ligne_vente_ibfk_2` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`);

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `mouvements_stock`
--
ALTER TABLE `mouvements_stock`
  ADD CONSTRAINT `mouvements_stock_ibfk_1` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`),
  ADD CONSTRAINT `mouvements_stock_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  ADD CONSTRAINT `fk_caissier` FOREIGN KEY (`id_caissier`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `paiements_credits_ibfk_1` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`);

--
-- Contraintes pour la table `pistolets`
--
ALTER TABLE `pistolets`
  ADD CONSTRAINT `pistolets_ibfk_1` FOREIGN KEY (`pompe_id`) REFERENCES `pompes` (`id`);

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `fk_produits_categorie` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_produits_fournisseur` FOREIGN KEY (`fournisseur_id`) REFERENCES `fournisseurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  ADD CONSTRAINT `rapports_journaliers_ibfk_1` FOREIGN KEY (`pistolet_id`) REFERENCES `pistolets` (`id`);

--
-- Contraintes pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD CONSTRAINT `reclamations_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `releves_postes`
--
ALTER TABLE `releves_postes`
  ADD CONSTRAINT `releves_postes_ibfk_1` FOREIGN KEY (`affectation_id`) REFERENCES `affectations` (`id`),
  ADD CONSTRAINT `releves_postes_ibfk_2` FOREIGN KEY (`pistolet_id`) REFERENCES `pistolets` (`id`);

--
-- Contraintes pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_pompiste` FOREIGN KEY (`id_pompiste`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_vehicule`) REFERENCES `vehicules` (`id`);

--
-- Contraintes pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD CONSTRAINT `vehicules_ibfk_2` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`);

--
-- Contraintes pour la table `ventes`
--
ALTER TABLE `ventes`
  ADD CONSTRAINT `ventes_ibfk_1` FOREIGN KEY (`id_caissier`) REFERENCES `utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
