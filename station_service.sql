-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 25 avr. 2025 à 02:48
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
  `calendrier_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `affectations`
--

INSERT INTO `affectations` (`id`, `pompiste_id`, `poste_id`, `pompe_id`, `calendrier_id`) VALUES
(2148, 20, 1, 34, 122),
(2149, 23, 1, 35, 122),
(2150, 25, 1, 36, 122),
(2151, 21, 2, 34, 122),
(2152, 24, 2, 35, 122),
(2153, 19, 2, 36, 122),
(2154, 15, 3, 34, 122),
(2155, 16, 3, 35, 122),
(2156, 22, 3, 36, 122),
(2157, 24, 1, 34, 123),
(2158, 19, 1, 35, 123),
(2159, 16, 1, 36, 123),
(2160, 23, 2, 34, 123),
(2161, 20, 2, 35, 123),
(2162, 15, 2, 36, 123),
(2163, 21, 3, 34, 123),
(2164, 25, 3, 35, 123),
(2165, 22, 3, 36, 123),
(2166, 19, 1, 34, 124),
(2167, 20, 1, 35, 124),
(2168, 24, 1, 36, 124),
(2169, 21, 2, 34, 124),
(2170, 15, 2, 35, 124),
(2171, 16, 2, 36, 124),
(2172, 22, 3, 34, 124),
(2173, 23, 3, 35, 124),
(2174, 25, 3, 36, 124),
(2175, 23, 1, 34, 125),
(2176, 20, 1, 35, 125),
(2177, 16, 1, 36, 125),
(2178, 19, 2, 34, 125),
(2179, 22, 2, 35, 125),
(2180, 21, 2, 36, 125),
(2181, 15, 3, 34, 125),
(2182, 25, 3, 35, 125),
(2183, 24, 3, 36, 125),
(2184, 20, 1, 34, 126),
(2185, 25, 1, 35, 126),
(2186, 23, 1, 36, 126),
(2187, 16, 2, 34, 126),
(2188, 22, 2, 35, 126),
(2189, 15, 2, 36, 126),
(2190, 21, 3, 34, 126),
(2191, 19, 3, 35, 126),
(2192, 24, 3, 36, 126),
(2193, 25, 1, 34, 127),
(2194, 22, 1, 35, 127),
(2195, 24, 1, 36, 127),
(2196, 21, 2, 34, 127),
(2197, 15, 2, 35, 127),
(2198, 23, 2, 36, 127),
(2199, 16, 3, 34, 127),
(2200, 20, 3, 35, 127),
(2201, 19, 3, 36, 127),
(2202, 24, 1, 34, 128),
(2203, 22, 1, 35, 128),
(2204, 15, 1, 36, 128),
(2205, 23, 2, 34, 128),
(2206, 20, 2, 35, 128),
(2207, 16, 2, 36, 128),
(2208, 19, 3, 34, 128),
(2209, 25, 3, 35, 128),
(2210, 21, 3, 36, 128),
(2211, 24, 1, 34, 129),
(2212, 23, 1, 35, 129),
(2213, 20, 1, 36, 129),
(2214, 19, 2, 34, 129),
(2215, 16, 2, 35, 129),
(2216, 15, 2, 36, 129),
(2217, 21, 3, 34, 129),
(2218, 22, 3, 35, 129),
(2219, 25, 3, 36, 129),
(2220, 19, 1, 34, 130),
(2221, 15, 1, 35, 130),
(2222, 22, 1, 36, 130),
(2223, 21, 2, 34, 130),
(2224, 16, 2, 35, 130),
(2225, 24, 2, 36, 130),
(2226, 23, 3, 34, 130),
(2227, 25, 3, 35, 130),
(2228, 20, 3, 36, 130),
(2229, 21, 1, 34, 131),
(2230, 25, 1, 35, 131),
(2231, 15, 1, 36, 131),
(2232, 24, 2, 34, 131),
(2233, 23, 2, 35, 131),
(2234, 22, 2, 36, 131),
(2235, 19, 3, 34, 131),
(2236, 16, 3, 35, 131),
(2237, 20, 3, 36, 131),
(2238, 22, 1, 34, 132),
(2239, 24, 1, 35, 132),
(2240, 16, 1, 36, 132),
(2241, 25, 2, 34, 132),
(2242, 20, 2, 35, 132),
(2243, 23, 2, 36, 132),
(2244, 15, 3, 34, 132),
(2245, 21, 3, 35, 132),
(2246, 19, 3, 36, 132),
(2247, 21, 1, 34, 133),
(2248, 20, 1, 35, 133),
(2249, 24, 1, 36, 133),
(2250, 15, 2, 34, 133),
(2251, 16, 2, 35, 133),
(2252, 19, 2, 36, 133),
(2253, 25, 3, 34, 133),
(2254, 22, 3, 35, 133),
(2255, 23, 3, 36, 133),
(2256, 22, 1, 34, 134),
(2257, 20, 1, 35, 134),
(2258, 25, 1, 36, 134),
(2259, 19, 2, 34, 134),
(2260, 16, 2, 35, 134),
(2261, 15, 2, 36, 134),
(2262, 21, 3, 34, 134),
(2263, 24, 3, 35, 134),
(2264, 23, 3, 36, 134),
(2265, 24, 1, 34, 135),
(2266, 15, 1, 35, 135),
(2267, 20, 1, 36, 135),
(2268, 25, 2, 34, 135),
(2269, 22, 2, 35, 135),
(2270, 23, 2, 36, 135),
(2271, 16, 3, 34, 135),
(2272, 21, 3, 35, 135),
(2273, 19, 3, 36, 135),
(2274, 24, 1, 34, 136),
(2275, 23, 1, 35, 136),
(2276, 22, 1, 36, 136),
(2277, 21, 2, 34, 136),
(2278, 20, 2, 35, 136),
(2279, 19, 2, 36, 136),
(2280, 15, 3, 34, 136),
(2281, 25, 3, 35, 136),
(2282, 16, 3, 36, 136),
(2283, 15, 1, 34, 137),
(2284, 24, 1, 35, 137),
(2285, 22, 1, 36, 137),
(2286, 25, 2, 34, 137),
(2287, 19, 2, 35, 137),
(2288, 23, 2, 36, 137),
(2289, 21, 3, 34, 137),
(2290, 16, 3, 35, 137),
(2291, 20, 3, 36, 137),
(2292, 23, 1, 34, 138),
(2293, 20, 1, 35, 138),
(2294, 24, 1, 36, 138),
(2295, 19, 2, 34, 138),
(2296, 16, 2, 35, 138),
(2297, 22, 2, 36, 138),
(2298, 25, 3, 34, 138),
(2299, 15, 3, 35, 138),
(2300, 21, 3, 36, 138),
(2301, 21, 1, 34, 139),
(2302, 20, 1, 35, 139),
(2303, 19, 1, 36, 139),
(2304, 15, 2, 34, 139),
(2305, 16, 2, 35, 139),
(2306, 22, 2, 36, 139),
(2307, 25, 3, 34, 139),
(2308, 23, 3, 35, 139),
(2309, 24, 3, 36, 139),
(2310, 20, 1, 34, 140),
(2311, 19, 1, 35, 140),
(2312, 16, 1, 36, 140),
(2313, 15, 2, 34, 140),
(2314, 21, 2, 35, 140),
(2315, 24, 2, 36, 140),
(2316, 25, 3, 34, 140),
(2317, 23, 3, 35, 140),
(2318, 22, 3, 36, 140),
(2319, 20, 1, 34, 141),
(2320, 15, 1, 35, 141),
(2321, 16, 1, 36, 141),
(2322, 21, 2, 34, 141),
(2323, 25, 2, 35, 141),
(2324, 22, 2, 36, 141),
(2325, 24, 3, 34, 141),
(2326, 19, 3, 35, 141),
(2327, 23, 3, 36, 141),
(2328, 15, 1, 34, 142),
(2329, 20, 1, 35, 142),
(2330, 23, 1, 36, 142),
(2331, 22, 2, 34, 142),
(2332, 21, 2, 35, 142),
(2333, 19, 2, 36, 142),
(2334, 24, 3, 34, 142),
(2335, 16, 3, 35, 142),
(2336, 25, 3, 36, 142),
(2337, 16, 1, 34, 143),
(2338, 24, 1, 35, 143),
(2339, 22, 1, 36, 143),
(2340, 20, 2, 34, 143),
(2341, 15, 2, 35, 143),
(2342, 21, 2, 36, 143),
(2343, 19, 3, 34, 143),
(2344, 23, 3, 35, 143),
(2345, 25, 3, 36, 143),
(2346, 22, 1, 34, 144),
(2347, 20, 1, 35, 144),
(2348, 25, 1, 36, 144),
(2349, 19, 2, 34, 144),
(2350, 20, 2, 35, 144),
(2351, 24, 2, 36, 144),
(2352, 23, 3, 34, 144),
(2353, 21, 3, 35, 144),
(2354, 15, 3, 36, 144),
(2355, 19, 1, 34, 145),
(2356, 21, 1, 35, 145),
(2357, 25, 1, 36, 145),
(2358, 15, 2, 34, 145),
(2359, 16, 2, 35, 145),
(2360, 24, 2, 36, 145),
(2361, 20, 3, 34, 145),
(2362, 23, 3, 35, 145),
(2363, 22, 3, 36, 145),
(2364, 15, 1, 34, 146),
(2365, 16, 1, 35, 146),
(2366, 23, 1, 36, 146),
(2367, 21, 2, 34, 146),
(2368, 22, 2, 35, 146),
(2369, 25, 2, 36, 146),
(2370, 19, 3, 34, 146),
(2371, 20, 3, 35, 146),
(2372, 24, 3, 36, 146),
(2373, 15, 1, 34, 147),
(2374, 16, 1, 35, 147),
(2375, 19, 1, 36, 147),
(2376, 21, 2, 34, 147),
(2377, 24, 2, 35, 147),
(2378, 23, 2, 36, 147),
(2379, 22, 3, 34, 147),
(2380, 25, 3, 35, 147),
(2381, 20, 3, 36, 147),
(2382, 19, 1, 34, 148),
(2383, 15, 1, 35, 148),
(2384, 16, 1, 36, 148),
(2385, 25, 2, 34, 148),
(2386, 21, 2, 35, 148),
(2387, 20, 2, 36, 148),
(2388, 24, 3, 34, 148),
(2389, 22, 3, 35, 148),
(2390, 23, 3, 36, 148),
(2391, 19, 1, 34, 149),
(2392, 21, 1, 35, 149),
(2393, 25, 1, 36, 149),
(2394, 24, 2, 34, 149),
(2395, 16, 2, 35, 149),
(2396, 23, 2, 36, 149),
(2397, 22, 3, 34, 149),
(2398, 15, 3, 35, 149),
(2399, 20, 3, 36, 149),
(2400, 25, 1, 34, 150),
(2401, 15, 1, 35, 150),
(2402, 16, 1, 36, 150),
(2403, 23, 2, 34, 150),
(2404, 19, 2, 35, 150),
(2405, 21, 2, 36, 150),
(2406, 22, 3, 34, 150),
(2407, 20, 3, 35, 150),
(2408, 24, 3, 36, 150),
(2409, 19, 1, 34, 151),
(2410, 22, 1, 35, 151),
(2411, 25, 1, 36, 151),
(2412, 15, 2, 34, 151),
(2413, 24, 2, 35, 151),
(2414, 21, 2, 36, 151),
(2415, 16, 3, 34, 151),
(2416, 23, 3, 35, 151),
(2417, 20, 3, 36, 151);

-- --------------------------------------------------------

--
-- Structure de la table `calendrier`
--

CREATE TABLE `calendrier` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `statut` enum('disponible','occupé') NOT NULL,
  `mois` int(11) NOT NULL,
  `annee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `calendrier`
--

INSERT INTO `calendrier` (`id`, `date`, `statut`, `mois`, `annee`) VALUES
(122, '2025-04-01', 'disponible', 4, 2025),
(123, '2025-04-02', 'disponible', 4, 2025),
(124, '2025-04-03', 'disponible', 4, 2025),
(125, '2025-04-04', 'disponible', 4, 2025),
(126, '2025-04-05', 'disponible', 4, 2025),
(127, '2025-04-06', 'disponible', 4, 2025),
(128, '2025-04-07', 'disponible', 4, 2025),
(129, '2025-04-08', 'disponible', 4, 2025),
(130, '2025-04-09', 'disponible', 4, 2025),
(131, '2025-04-10', 'disponible', 4, 2025),
(132, '2025-04-11', 'disponible', 4, 2025),
(133, '2025-04-12', 'disponible', 4, 2025),
(134, '2025-04-13', 'disponible', 4, 2025),
(135, '2025-04-14', 'disponible', 4, 2025),
(136, '2025-04-15', 'disponible', 4, 2025),
(137, '2025-04-16', 'disponible', 4, 2025),
(138, '2025-04-17', 'disponible', 4, 2025),
(139, '2025-04-18', 'disponible', 4, 2025),
(140, '2025-04-19', 'disponible', 4, 2025),
(141, '2025-04-20', 'disponible', 4, 2025),
(142, '2025-04-21', 'disponible', 4, 2025),
(143, '2025-04-22', 'disponible', 4, 2025),
(144, '2025-04-23', 'disponible', 4, 2025),
(145, '2025-04-24', 'disponible', 4, 2025),
(146, '2025-04-25', 'disponible', 4, 2025),
(147, '2025-04-26', 'disponible', 4, 2025),
(148, '2025-04-27', 'disponible', 4, 2025),
(149, '2025-04-28', 'disponible', 4, 2025),
(150, '2025-04-29', 'disponible', 4, 2025),
(151, '2025-04-30', 'disponible', 4, 2025);

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
(2, 13, 'organisationnelle', 185.00, '2025-04-10', 30, 415.00, 'actif', 400.00, '2025-04-16 19:06:03'),
(3, 10, 'organisationnelle', 500.00, '2025-04-10', 30, 500.00, 'expiré', 0.00, '2025-04-18 03:43:13'),
(4, 13, 'individuelle', 300.00, '2025-04-10', 1, NULL, 'expiré', NULL, NULL),
(5, 9, 'individuelle', 300.00, '2025-04-25', 30, 120.00, 'actif', 110.00, '2025-04-21 18:17:28'),
(6, 10, 'individuelle', 500.00, '2025-04-24', 30, NULL, 'remboursé', 0.00, '2025-04-21 18:25:07');

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

-- --------------------------------------------------------

--
-- Structure de la table `paiements_credits`
--

CREATE TABLE `paiements_credits` (
  `id` int(11) NOT NULL,
  `reference_paiement` varchar(50) DEFAULT NULL,
  `id_credit` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `montant_paye` decimal(10,2) NOT NULL,
  `montant_restant` decimal(10,2) DEFAULT NULL,
  `date_paiement` datetime DEFAULT current_timestamp(),
  `mode_paiement` enum('especes','carte','virement','cheque') NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `paiements_credits`
--

INSERT INTO `paiements_credits` (`id`, `reference_paiement`, `id_credit`, `id_utilisateur`, `montant_paye`, `montant_restant`, `date_paiement`, `mode_paiement`, `description`) VALUES
(1, 'PAY-713926-205', 2, 13, 50.00, 450.00, '2025-04-16 18:48:33', 'especes', 'hyt'),
(2, 'PAY-763060-263', 2, 13, 50.00, 400.00, '2025-04-16 19:06:03', 'especes', 'aa'),
(3, 'PAY-678268-410', 3, 10, 20.00, 480.00, '2025-04-16 19:21:18', 'especes', 'uu'),
(4, 'PAY-011405-645', 5, 9, 20.00, 220.00, '2025-04-21 18:03:31', 'especes', 'ZZ'),
(5, 'PAY-082920-520', 5, 9, 20.00, 200.00, '2025-04-21 18:04:42', 'carte', 'a'),
(6, 'PAY-137335-971', 5, 9, 20.00, 180.00, '2025-04-21 18:05:37', 'especes', 'Z'),
(8, 'PAY-808660-435', 5, 9, 50.00, 130.00, '2025-04-21 18:16:48', 'especes', 'zz'),
(9, 'PAY-848827-537', 5, 9, 20.00, 110.00, '2025-04-21 18:17:28', 'especes', 'S'),
(10, 'PAY-307091-330', 6, 10, 500.00, 0.00, '2025-04-21 18:25:07', 'virement', 'J');

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
(1, 'gerant', 'Dashboard', NULL, 1),
(2, 'cogerant', 'Dashboard', NULL, 1),
(3, 'caissier', 'Dashboard', NULL, 1),
(4, 'pompiste', 'Dashboard', NULL, 1),
(5, 'client', 'Dashboard', NULL, 1),
(6, 'gerant', 'Utilisateurs', NULL, 1),
(7, 'cogerant', 'Utilisateurs', NULL, 1),
(8, 'caissier', 'Utilisateurs', NULL, 0),
(9, 'pompiste', 'Utilisateurs', NULL, 0),
(10, 'client', 'Utilisateurs', NULL, 0),
(11, 'gerant', 'Affecter pompistes', NULL, 1),
(12, 'cogerant', 'Affecter pompistes', NULL, 1),
(13, 'caissier', 'Affecter pompistes', NULL, 0),
(14, 'pompiste', 'Affecter pompistes', NULL, 0),
(15, 'client', 'Affecter pompistes', NULL, 0),
(16, 'gerant', 'Crédits', NULL, 1),
(17, 'cogerant', 'Crédits', NULL, 1),
(18, 'caissier', 'Crédits', NULL, 0),
(19, 'pompiste', 'Crédits', NULL, 0),
(20, 'client', 'Crédits', NULL, 0),
(21, 'gerant', 'Pompes', NULL, 1),
(22, 'cogerant', 'Pompes', NULL, 1),
(23, 'caissier', 'Pompes', NULL, 0),
(24, 'pompiste', 'Pompes', NULL, 0),
(25, 'client', 'Pompes', NULL, 0),
(26, 'gerant', 'Stock', NULL, 1),
(27, 'cogerant', 'Stock', NULL, 1),
(28, 'caissier', 'Stock', NULL, 0),
(29, 'pompiste', 'Stock', NULL, 0),
(30, 'client', 'Stock', NULL, 0),
(31, 'gerant', 'Historique transactions', NULL, 0),
(32, 'cogerant', 'Historique transactions', NULL, 0),
(33, 'caissier', 'Historique transactions', NULL, 0),
(34, 'pompiste', 'Historique transactions', NULL, 0),
(35, 'client', 'Historique transactions', NULL, 0),
(36, 'gerant', 'Saisie vente credit', NULL, 0),
(37, 'cogerant', 'Saisie vente credit', NULL, 0),
(38, 'caissier', 'Saisie vente credit', NULL, 0),
(39, 'pompiste', 'Saisie vente credit', NULL, 1),
(40, 'client', 'Saisie vente credit', NULL, 0),
(41, 'gerant', 'Saisie Index fermeture', 'Pompes', 0),
(42, 'cogerant', 'Saisie Index fermeture', NULL, 0),
(43, 'caissier', 'Saisie Index fermeture', NULL, 0),
(44, 'pompiste', 'Saisie Index fermeture', NULL, 1),
(45, 'client', 'Saisie Index fermeture', NULL, 0),
(69, 'gerant', 'Créer compte', 'Utilisateurs', 1),
(70, 'cogerant', 'Créer compte', 'Utilisateurs', 1),
(71, 'caissier', 'Créer compte', 'Utilisateurs', 0),
(72, 'pompiste', 'Créer compte', 'Utilisateurs', 1),
(73, 'client', 'Créer compte', 'Utilisateurs', 1),
(74, 'gerant', 'Liste utilisateurs', 'Utilisateurs', 1),
(75, 'cogerant', 'Liste utilisateurs', 'Utilisateurs', 0),
(76, 'caissier', 'Liste utilisateurs', 'Utilisateurs', 0),
(77, 'pompiste', 'Liste utilisateurs', 'Utilisateurs', 1),
(78, 'client', 'Liste utilisateurs', 'Utilisateurs', 1),
(79, 'gerant', 'Enregistrer crédit', 'Crédits', 1),
(80, 'cogerant', 'Enregistrer crédit', 'Crédits', 1),
(81, 'caissier', 'Enregistrer crédit', 'Crédits', 1),
(82, 'pompiste', 'Enregistrer crédit', 'Crédits', 1),
(83, 'client', 'Enregistrer crédit', 'Crédits', 1),
(84, 'gerant', 'Enregistrer Véhicules', 'Crédits', 1),
(85, 'cogerant', 'Enregistrer Véhicules', 'Crédits', 1),
(86, 'caissier', 'Enregistrer Véhicules', 'Crédits', 0),
(87, 'pompiste', 'Enregistrer Véhicules', 'Crédits', 1),
(88, 'client', 'Enregistrer Véhicules', 'Crédits', 1),
(89, 'gerant', 'Historique des Paiements', 'Crédits', 1),
(90, 'cogerant', 'Historique des Paiements', 'Crédits', 0),
(91, 'caissier', 'Historique des Paiements', 'Crédits', 0),
(92, 'pompiste', 'Historique des Paiements', 'Crédits', 1),
(93, 'client', 'Historique des Paiements', 'Crédits', 1),
(94, 'gerant', 'Historique des Transactions', 'Crédits', 1),
(95, 'cogerant', 'Historique des Transactions', 'Crédits', 0),
(96, 'caissier', 'Historique des Transactions', 'Crédits', 0),
(97, 'pompiste', 'Historique des Transactions', 'Crédits', 0),
(98, 'client', 'Historique des Transactions', 'Crédits', 0),
(99, 'gerant', 'Enregistrer pompe', 'Pompes', 1),
(100, 'cogerant', 'Enregistrer pompe', 'Pompes', 1),
(101, 'caissier', 'Enregistrer pompe', 'Pompes', 0),
(102, 'pompiste', 'Enregistrer pompe', 'Pompes', 1),
(103, 'client', 'Enregistrer pompe', 'Pompes', 1),
(104, 'gerant', 'Liste pompes', 'Pompes', 1),
(105, 'cogerant', 'Liste pompes', 'Pompes', 1),
(106, 'caissier', 'Liste pompes', 'Pompes', 0),
(107, 'pompiste', 'Liste pompes', 'Pompes', 1),
(108, 'client', 'Liste pompes', 'Pompes', 1),
(109, 'caissier', 'Saisie Paiements', NULL, 1),
(110, 'cogerant', 'Saisie Paiements', 'Crédits', 1),
(111, 'gerant', 'Saisie Paiements', 'Crédits', 1),
(112, 'gerant', 'Visualiser Revenues', 'Pompes', 1),
(113, 'cogerant', 'Visualiser Revenues', 'Pompes', 1);

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
(4, 34, 'PIII1', 'disponible', '2025-04-21 19:28:39', '2025-04-21 20:41:57', 'SP95', 2.50, 'Litre', NULL, 0.00),
(5, 35, 'PI01', 'disponible', '2025-04-22 00:34:53', '2025-04-24 19:57:40', 'SP95', 2.50, 'Litre', '2025-04-24', 900.00),
(6, 35, 'PI03', 'disponible', '2025-04-22 00:34:53', '2025-04-24 19:58:12', 'GPL', 2.70, 'Litre', '2025-04-24', 100.00),
(7, 35, 'PI02', 'disponible', '2025-04-22 00:34:53', '2025-04-24 19:58:45', 'GAZOLE', 2.30, 'Litre', '2025-04-24', 200.00),
(8, 36, 'PI04', 'disponible', '2025-04-22 00:39:26', '2025-04-23 21:28:07', 'SP95', 2.50, 'Litre', '2025-04-23', 600.00);

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
(34, 'P020', 'gasoil', 'reserve', '2025-04-21 18:28:39'),
(35, 'P021', 'multi-produits', 'reserve', '2025-04-22 00:34:52'),
(36, 'P022', 'sans plomb', 'reserve', '2025-04-22 00:39:26');

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
(8, '2025-04-23', 5, 400.00, 1000.00, 2, '2025-04-24 00:45:26'),
(9, '2025-04-23', 6, 100.00, 270.00, 2, '2025-04-24 00:45:26'),
(10, '2025-04-23', 7, 400.00, 920.00, 2, '2025-04-24 00:45:26'),
(11, '2025-04-23', 8, 400.00, 1000.00, 2, '2025-04-24 00:45:26'),
(12, '2025-04-24', 5, 200.00, 500.00, 1, '2025-04-24 21:11:11'),
(13, '2025-04-24', 6, 100.00, 270.00, 1, '2025-04-24 21:11:11'),
(14, '2025-04-24', 7, 200.00, 460.00, 1, '2025-04-24 21:11:11'),
(15, '2025-04-25', 5, 500.00, 400.00, 1, '2025-04-24 21:25:40');

-- --------------------------------------------------------

--
-- Structure de la table `releves_postes`
--

CREATE TABLE `releves_postes` (
  `id` int(11) NOT NULL,
  `affectation_id` int(11) NOT NULL,
  `pompiste_id` int(11) DEFAULT NULL,
  `pistolet_id` int(11) NOT NULL,
  `index_ouverture` decimal(12,2) NOT NULL CHECK (`index_ouverture` >= 0),
  `index_fermeture` decimal(12,2) NOT NULL CHECK (`index_fermeture` >= `index_ouverture`),
  `date_heure_saisie` datetime DEFAULT current_timestamp(),
  `statut` enum('saisie','valide','annule') DEFAULT 'saisie'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `releves_postes`
--

INSERT INTO `releves_postes` (`id`, `affectation_id`, `pompiste_id`, `pistolet_id`, `index_ouverture`, `index_fermeture`, `date_heure_saisie`, `statut`) VALUES
(12, 2353, NULL, 5, 400.00, 700.00, '2025-04-23 23:12:29', 'saisie'),
(13, 2362, 23, 5, 700.00, 900.00, '2025-04-24 20:57:40', 'saisie'),
(14, 2362, 23, 6, 0.00, 100.00, '2025-04-24 20:58:12', 'saisie'),
(15, 2362, 23, 7, 0.00, 200.00, '2025-04-24 20:58:45', 'saisie');

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `id_vehicule` int(11) DEFAULT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  `quantite` decimal(10,2) DEFAULT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `date_transaction` datetime DEFAULT NULL,
  `id_credit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `id_vehicule`, `id_utilisateur`, `quantite`, `montant`, `date_transaction`, `id_credit`) VALUES
(1, 18, 13, 30.00, 315.00, '2025-04-17 20:23:15', 2),
(2, 18, 13, 7.62, 80.00, '2025-04-17 21:09:03', 2),
(3, 18, 13, 2.86, 30.00, '2025-04-17 21:09:16', 2),
(4, 18, 13, 0.95, 10.00, '2025-04-17 21:09:24', 2),
(5, 18, 13, 1.90, 20.00, '2025-04-17 21:11:53', 2),
(6, 18, 13, 0.95, 10.00, '2025-04-17 21:17:05', 2),
(7, 18, 13, 1.90, 20.00, '2025-04-17 21:28:36', 2),
(8, 18, 13, 1.90, 20.00, '2025-04-17 21:30:20', 2),
(9, 19, 10, 37.04, 100.00, '2025-04-18 00:28:45', 3),
(10, 19, 10, 111.11, 300.00, '2025-04-18 01:00:21', 3),
(11, 19, 10, 74.07, 200.00, '2025-04-18 01:04:04', 3),
(12, 19, 10, 80.00, 200.00, '2025-04-18 01:14:36', 3),
(13, 19, 10, 80.00, 200.00, '2025-04-18 01:17:54', 3),
(14, 19, 10, 9.52, 100.00, '2025-04-18 01:24:24', 3),
(15, 19, 10, 7.41, 20.00, '2025-04-18 01:27:17', 3),
(16, 19, 10, 1.90, 20.00, '2025-04-18 01:31:09', 3),
(17, 19, 10, 7.41, 20.00, '2025-04-18 01:42:32', 3),
(18, 19, 10, 1.90, 20.00, '2025-04-18 01:52:08', 3),
(19, 19, 10, 19.05, 200.00, '2025-04-18 01:52:25', 3),
(20, 19, 10, 19.05, 200.00, '2025-04-18 01:55:39', 3),
(21, 19, 10, 19.05, 200.00, '2025-04-18 01:59:39', 3),
(22, 19, 10, 1.90, 20.00, '2025-04-18 02:01:32', 3),
(23, 19, 10, 19.05, 200.00, '2025-04-18 03:02:56', 3),
(24, 19, 10, 1.90, 20.00, '2025-04-18 03:43:13', 3),
(25, 20, 9, 1.90, 20.00, '2025-04-18 13:35:28', 5),
(26, 20, 9, 1.90, 20.00, '2025-04-18 14:27:58', 5),
(27, 20, 9, 1.90, 20.00, '2025-04-18 14:53:17', 5);

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
(9, 'john', 'johndoe@example.com', '1234567898', '$2b$10$ZTs0/GYkUz4R3c6.fqQbQuOaWbmaH0CJa9NCIlADeiDvF7e.urmFO', 'client', '2025-03-14 14:42:46', 'active', NULL),
(10, 'mahdov', 'jo@example.com', '1267898883', '$2b$10$r78JXVlJc7FO6ST/HS.o8ubQhjyFERrn/GfTlQzmvxcazkfl.pvWO', 'client', '2025-03-14 15:26:28', 'active', NULL),
(13, 'Mahdi Bey', 'cncservice2018@gmail.com', '56327280', '$2b$10$I.ack14P/JALNplUd9i3NuR6w/fys71k9DVysmRUSxk9QrDIOGWGi', 'client', '2025-03-14 16:45:22', 'active', '/images/nbg.png'),
(14, 'Ahmed Zamma', 'mahdibeyy@gmail.com', '56327237', '$2b$10$3qvhoX.KKYtvZ5sIzXrgIORhFSgWR4XsR71VwaMGeiEcj.9her1/O', 'gerant', '2025-03-17 13:43:35', 'active', '/images/nbg.png'),
(15, 'Ahmed Bey', 'mahdibey2002@gmail.com', '56327210', '$2b$10$0NjolxaLuID7fcKfLy8sOOYShGEjARg3L9BQN9spbEcnv8RkyrWZq', 'pompiste', '2025-03-17 20:55:51', 'active', NULL),
(16, 'mahdi', 'newuser@example.com', '12345678', '$2b$10$1d0Yfs65TEqFFE5acBSGb.QP7xQWQv6RcKzFGJFLVytMV8i5Pdhzm', 'pompiste', '2025-03-29 10:18:29', 'active', NULL),
(19, 'Mariem Baccouche', 'baccouche.mariem.iset@gmail.com', '98830579', '$2b$10$OVCe4SOpRX94g4aE7AyFC.XJbOaw8A3InOVVy5AyLJ.lVyPqJ0wlm', 'pompiste', '2025-04-14 13:37:31', 'active', NULL),
(20, 'Mario Balotelli', 'SuperMario45@gmail.com', '1234567890', '$2b$10$IMKRHiru0FvkPr72Uv2D1efDlfNfkLfmsswC9bnTLtizCbK.O.9W2', 'pompiste', '2025-04-22 00:40:25', 'active', NULL),
(21, 'Edin Dzeko', 'Edindzeko9@gmail.com', '54209180', '$2b$10$asZ.b8ntHVVZNyhQNdaFzusc/jPtNhD1S1EzdDdQHNPYqorcaXjzu', 'pompiste', '2025-04-22 00:41:20', 'active', NULL),
(22, 'Lautaro Martinez', 'LautaroMartinez9@gmail.com', '54209183', '$2b$10$jEz5RXNjm7Pc/75TjMV0yO5O0mj0ijKc1uaNnTs/rPfacGOQsz6Vi', 'pompiste', '2025-04-22 00:41:55', 'active', NULL),
(23, 'Nicolo Barella', 'NicoloBarella9@gmail.com', '54209187', '$2b$10$Jxx6.XusstHPy8I3DS.uB.dGpxuOvwC8jSZpeo26JSUpCjodHCA5.', 'pompiste', '2025-04-22 00:42:26', 'active', NULL),
(24, 'Hannibal Mejbri', 'HannibalMejbri9@gmail.com', '54209182', '$2b$10$Q.7O5BjpJbkHDwDI.z8KwOepeNpmjeVLAPMNL8k1m4O.lW6ZGyWty', 'pompiste', '2025-04-22 00:43:11', 'active', NULL),
(25, 'Radhouane Falhi', 'RadhouaneFalhi9@gmail.com', '54209181', '$2b$10$hdhts5/ARh4RjGADK/FUjONFaBrpnJdeD.Gm0N/D/5lCemMrWEOAK', 'pompiste', '2025-04-22 00:44:07', 'active', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `vehicules`
--

CREATE TABLE `vehicules` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  `immatriculation` varchar(20) NOT NULL,
  `marque` varchar(50) DEFAULT NULL,
  `type_vehicule` enum('voiture','camion','bus','moto') DEFAULT 'voiture',
  `qr_code` varchar(255) DEFAULT NULL,
  `id_credit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicules`
--

INSERT INTO `vehicules` (`id`, `id_utilisateur`, `immatriculation`, `marque`, `type_vehicule`, `qr_code`, `id_credit`) VALUES
(8, 13, '22TU2002', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/22TU2002.png', 2),
(11, 10, '23TU2002', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/23TU2002.png', 3),
(12, 13, '22TU2004', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2004.png', 4),
(13, 13, '22TU2003', 'GOLF', 'voiture', 'http://localhost:3000/qrcodes/22TU2003.png', 2),
(14, 13, '22TU2006', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2006.png', 2),
(15, 10, '22TU2025', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2025.png', 3),
(17, 13, '22TU2026', 'GOLF', 'camion', 'http://localhost:3000/qrcodes/22TU2026.png', 4),
(18, 13, '22TU2027', 'GOLF', 'moto', 'http://localhost:3000/qrcodes/22TU2027.png', 2),
(19, 10, '22TU2030', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2030.png', 3),
(20, 9, '22TU2050', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2050.png', 5);

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
  ADD KEY `pompe_id` (`pompe_id`),
  ADD KEY `calendrier_id` (`calendrier_id`);

--
-- Index pour la table `calendrier`
--
ALTER TABLE `calendrier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_jour` (`date`);

--
-- Index pour la table `details_credits`
--
ALTER TABLE `details_credits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference_paiement` (`reference_paiement`),
  ADD KEY `id_credit` (`id_credit`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

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
-- Index pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pistolet_id` (`pistolet_id`),
  ADD KEY `date_rapport` (`date_rapport`);

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
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_credit` (`id_credit`);

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
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_credit` (`id_credit`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `affectations`
--
ALTER TABLE `affectations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2418;

--
-- AUTO_INCREMENT pour la table `calendrier`
--
ALTER TABLE `calendrier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT pour la table `details_credits`
--
ALTER TABLE `details_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT pour la table `pistolets`
--
ALTER TABLE `pistolets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `pompes`
--
ALTER TABLE `pompes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT pour la table `postes`
--
ALTER TABLE `postes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `releves_postes`
--
ALTER TABLE `releves_postes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `vehicules`
--
ALTER TABLE `vehicules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `affectations`
--
ALTER TABLE `affectations`
  ADD CONSTRAINT `affectations_ibfk_1` FOREIGN KEY (`pompiste_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `affectations_ibfk_2` FOREIGN KEY (`poste_id`) REFERENCES `postes` (`id`),
  ADD CONSTRAINT `affectations_ibfk_3` FOREIGN KEY (`pompe_id`) REFERENCES `pompes` (`id`),
  ADD CONSTRAINT `affectations_ibfk_4` FOREIGN KEY (`calendrier_id`) REFERENCES `calendrier` (`id`);

--
-- Contraintes pour la table `details_credits`
--
ALTER TABLE `details_credits`
  ADD CONSTRAINT `details_credits_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  ADD CONSTRAINT `paiements_credits_ibfk_1` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`),
  ADD CONSTRAINT `paiements_credits_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `pistolets`
--
ALTER TABLE `pistolets`
  ADD CONSTRAINT `pistolets_ibfk_1` FOREIGN KEY (`pompe_id`) REFERENCES `pompes` (`id`);

--
-- Contraintes pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  ADD CONSTRAINT `rapports_journaliers_ibfk_1` FOREIGN KEY (`pistolet_id`) REFERENCES `pistolets` (`id`);

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
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_vehicule`) REFERENCES `vehicules` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`);

--
-- Contraintes pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD CONSTRAINT `vehicules_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `vehicules_ibfk_2` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
