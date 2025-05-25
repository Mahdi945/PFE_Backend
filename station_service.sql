-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 25 mai 2025 à 14:34
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
(5982, 19, 1, 34, '2025-04-30'),
(5983, 23, 1, 35, '2025-04-30'),
(5984, 24, 1, 36, '2025-04-30'),
(5985, 20, 2, 34, '2025-04-30'),
(5986, 15, 2, 35, '2025-04-30'),
(5987, 22, 2, 36, '2025-04-30'),
(5988, 21, 3, 34, '2025-04-30'),
(5989, 25, 3, 35, '2025-04-30'),
(5990, 16, 3, 36, '2025-04-30'),
(6261, 15, 1, 34, '2025-04-30'),
(6262, 15, 1, 35, '2025-04-30'),
(6263, 15, 1, 36, '2025-04-30'),
(6264, 15, 2, 34, '2025-04-30'),
(6265, 15, 2, 35, '2025-04-30'),
(6266, 15, 2, 36, '2025-04-30'),
(6267, 15, 3, 34, '2025-04-30'),
(6268, 15, 3, 35, '2025-04-30'),
(6269, 15, 3, 36, '2025-04-30'),
(7350, 15, 1, 34, '2025-04-30'),
(7351, 15, 1, 35, '2025-04-30'),
(7352, 15, 1, 36, '2025-04-30'),
(7353, 15, 2, 34, '2025-04-30'),
(7354, 15, 2, 35, '2025-04-30'),
(7355, 15, 2, 36, '2025-04-30'),
(7356, 15, 3, 34, '2025-04-30'),
(7357, 15, 3, 35, '2025-04-30'),
(7358, 15, 3, 36, '2025-04-30'),
(8169, 15, 1, 34, '2025-04-30'),
(8170, 16, 1, 35, '2025-04-30'),
(8171, 19, 1, 36, '2025-04-30'),
(8172, 20, 2, 34, '2025-04-30'),
(8173, 21, 2, 35, '2025-04-30'),
(8174, 22, 2, 36, '2025-04-30'),
(8175, 23, 3, 34, '2025-04-30'),
(8176, 24, 3, 35, '2025-04-30'),
(8177, 25, 3, 36, '2025-04-30'),
(8448, 25, 1, 34, '2025-04-30'),
(8449, 25, 1, 35, '2025-04-30'),
(8450, 25, 1, 36, '2025-04-30'),
(8451, 25, 2, 34, '2025-04-30'),
(8452, 25, 2, 35, '2025-04-30'),
(8453, 25, 2, 36, '2025-04-30'),
(8454, 25, 3, 34, '2025-04-30'),
(8455, 25, 3, 35, '2025-04-30'),
(8456, 25, 3, 36, '2025-04-30'),
(8736, 15, 1, 34, '2025-04-30'),
(8737, 16, 1, 35, '2025-04-30'),
(8738, 19, 1, 36, '2025-04-30'),
(8739, 20, 2, 34, '2025-04-30'),
(8740, 21, 2, 35, '2025-04-30'),
(8741, 22, 2, 36, '2025-04-30'),
(8742, 23, 3, 34, '2025-04-30'),
(8743, 24, 3, 35, '2025-04-30'),
(8744, 25, 3, 36, '2025-04-30'),
(9015, 16, 1, 34, '2025-04-30'),
(9016, 16, 1, 35, '2025-04-30'),
(9017, 16, 1, 36, '2025-04-30'),
(9018, 16, 2, 34, '2025-04-30'),
(9019, 16, 2, 35, '2025-04-30'),
(9020, 16, 2, 36, '2025-04-30'),
(9021, 16, 3, 34, '2025-04-30'),
(9022, 16, 3, 35, '2025-04-30'),
(9023, 16, 3, 36, '2025-04-30'),
(10905, 15, 1, 34, '2025-05-01'),
(10906, 16, 1, 35, '2025-05-01'),
(10907, 19, 1, 36, '2025-05-01'),
(10908, 20, 2, 34, '2025-05-01'),
(10909, 21, 2, 35, '2025-05-01'),
(10910, 22, 2, 36, '2025-05-01'),
(10911, 23, 3, 34, '2025-05-01'),
(10912, 24, 3, 35, '2025-05-01'),
(10913, 25, 3, 36, '2025-05-01'),
(10914, 15, 1, 34, '2025-05-02'),
(10915, 16, 1, 35, '2025-05-02'),
(10916, 19, 1, 36, '2025-05-02'),
(10917, 20, 2, 34, '2025-05-02'),
(10918, 21, 2, 35, '2025-05-02'),
(10919, 22, 2, 36, '2025-05-02'),
(10920, 23, 3, 34, '2025-05-02'),
(10921, 24, 3, 35, '2025-05-02'),
(10922, 25, 3, 36, '2025-05-02'),
(10923, 15, 1, 34, '2025-05-03'),
(10924, 16, 1, 35, '2025-05-03'),
(10925, 19, 1, 36, '2025-05-03'),
(10926, 20, 2, 34, '2025-05-03'),
(10927, 21, 2, 35, '2025-05-03'),
(10928, 22, 2, 36, '2025-05-03'),
(10929, 23, 3, 34, '2025-05-03'),
(10930, 24, 3, 35, '2025-05-03'),
(10931, 25, 3, 36, '2025-05-03'),
(10932, 15, 1, 34, '2025-05-04'),
(10933, 16, 1, 35, '2025-05-04'),
(10934, 19, 1, 36, '2025-05-04'),
(10935, 20, 2, 34, '2025-05-04'),
(10936, 21, 2, 35, '2025-05-04'),
(10937, 22, 2, 36, '2025-05-04'),
(10938, 23, 3, 34, '2025-05-04'),
(10939, 24, 3, 35, '2025-05-04'),
(10940, 25, 3, 36, '2025-05-04'),
(10941, 15, 1, 34, '2025-05-05'),
(10942, 16, 1, 35, '2025-05-05'),
(10943, 19, 1, 36, '2025-05-05'),
(10944, 20, 2, 34, '2025-05-05'),
(10945, 21, 2, 35, '2025-05-05'),
(10946, 22, 2, 36, '2025-05-05'),
(10947, 23, 3, 34, '2025-05-05'),
(10948, 24, 3, 35, '2025-05-05'),
(10949, 25, 3, 36, '2025-05-05'),
(10950, 15, 1, 34, '2025-05-06'),
(10951, 16, 1, 35, '2025-05-06'),
(10952, 19, 1, 36, '2025-05-06'),
(10953, 20, 2, 34, '2025-05-06'),
(10954, 21, 2, 35, '2025-05-06'),
(10955, 22, 2, 36, '2025-05-06'),
(10956, 23, 3, 34, '2025-05-06'),
(10957, 24, 3, 35, '2025-05-06'),
(10958, 25, 3, 36, '2025-05-06'),
(10959, 15, 1, 34, '2025-05-07'),
(10960, 16, 1, 35, '2025-05-07'),
(10961, 19, 1, 36, '2025-05-07'),
(10962, 20, 2, 34, '2025-05-07'),
(10963, 21, 2, 35, '2025-05-07'),
(10964, 22, 2, 36, '2025-05-07'),
(10965, 23, 3, 34, '2025-05-07'),
(10966, 24, 3, 35, '2025-05-07'),
(10967, 25, 3, 36, '2025-05-07'),
(10968, 15, 1, 34, '2025-05-08'),
(10969, 16, 1, 35, '2025-05-08'),
(10970, 19, 1, 36, '2025-05-08'),
(10971, 20, 2, 34, '2025-05-08'),
(10972, 21, 2, 35, '2025-05-08'),
(10973, 22, 2, 36, '2025-05-08'),
(10974, 23, 3, 34, '2025-05-08'),
(10975, 24, 3, 35, '2025-05-08'),
(10976, 25, 3, 36, '2025-05-08'),
(10977, 15, 1, 34, '2025-05-09'),
(10978, 16, 1, 35, '2025-05-09'),
(10979, 19, 1, 36, '2025-05-09'),
(10980, 20, 2, 34, '2025-05-09'),
(10981, 21, 2, 35, '2025-05-09'),
(10982, 22, 2, 36, '2025-05-09'),
(10983, 23, 3, 34, '2025-05-09'),
(10984, 24, 3, 35, '2025-05-09'),
(10985, 25, 3, 36, '2025-05-09'),
(10986, 15, 1, 34, '2025-05-10'),
(10987, 16, 1, 35, '2025-05-10'),
(10988, 19, 1, 36, '2025-05-10'),
(10989, 20, 2, 34, '2025-05-10'),
(10990, 21, 2, 35, '2025-05-10'),
(10991, 22, 2, 36, '2025-05-10'),
(10992, 23, 3, 34, '2025-05-10'),
(10993, 24, 3, 35, '2025-05-10'),
(10994, 25, 3, 36, '2025-05-10'),
(10995, 15, 1, 34, '2025-05-11'),
(10996, 16, 1, 35, '2025-05-11'),
(10997, 19, 1, 36, '2025-05-11'),
(10998, 20, 2, 34, '2025-05-11'),
(10999, 21, 2, 35, '2025-05-11'),
(11000, 22, 2, 36, '2025-05-11'),
(11001, 23, 3, 34, '2025-05-11'),
(11002, 24, 3, 35, '2025-05-11'),
(11003, 25, 3, 36, '2025-05-11'),
(11004, 15, 1, 34, '2025-05-12'),
(11005, 16, 1, 35, '2025-05-12'),
(11006, 19, 1, 36, '2025-05-12'),
(11007, 20, 2, 34, '2025-05-12'),
(11008, 21, 2, 35, '2025-05-12'),
(11009, 22, 2, 36, '2025-05-12'),
(11010, 23, 3, 34, '2025-05-12'),
(11011, 24, 3, 35, '2025-05-12'),
(11012, 25, 3, 36, '2025-05-12'),
(11013, 15, 1, 34, '2025-05-13'),
(11014, 16, 1, 35, '2025-05-13'),
(11015, 19, 1, 36, '2025-05-13'),
(11016, 20, 2, 34, '2025-05-13'),
(11017, 21, 2, 35, '2025-05-13'),
(11018, 22, 2, 36, '2025-05-13'),
(11019, 23, 3, 34, '2025-05-13'),
(11020, 24, 3, 35, '2025-05-13'),
(11021, 25, 3, 36, '2025-05-13'),
(11022, 15, 1, 34, '2025-05-14'),
(11023, 16, 1, 35, '2025-05-14'),
(11024, 19, 1, 36, '2025-05-14'),
(11025, 20, 2, 34, '2025-05-14'),
(11026, 21, 2, 35, '2025-05-14'),
(11027, 22, 2, 36, '2025-05-14'),
(11028, 23, 3, 34, '2025-05-14'),
(11029, 24, 3, 35, '2025-05-14'),
(11030, 25, 3, 36, '2025-05-14'),
(11031, 15, 1, 34, '2025-05-15'),
(11032, 16, 1, 35, '2025-05-15'),
(11033, 19, 1, 36, '2025-05-15'),
(11034, 20, 2, 34, '2025-05-15'),
(11035, 21, 2, 35, '2025-05-15'),
(11036, 22, 2, 36, '2025-05-15'),
(11037, 23, 3, 34, '2025-05-15'),
(11038, 24, 3, 35, '2025-05-15'),
(11039, 25, 3, 36, '2025-05-15'),
(11040, 15, 1, 34, '2025-05-16'),
(11041, 16, 1, 35, '2025-05-16'),
(11042, 19, 1, 36, '2025-05-16'),
(11043, 20, 2, 34, '2025-05-16'),
(11044, 21, 2, 35, '2025-05-16'),
(11045, 22, 2, 36, '2025-05-16'),
(11046, 23, 3, 34, '2025-05-16'),
(11047, 24, 3, 35, '2025-05-16'),
(11048, 25, 3, 36, '2025-05-16'),
(11049, 15, 1, 34, '2025-05-17'),
(11050, 16, 1, 35, '2025-05-17'),
(11051, 19, 1, 36, '2025-05-17'),
(11052, 20, 2, 34, '2025-05-17'),
(11053, 21, 2, 35, '2025-05-17'),
(11054, 22, 2, 36, '2025-05-17'),
(11055, 23, 3, 34, '2025-05-17'),
(11056, 24, 3, 35, '2025-05-17'),
(11057, 25, 3, 36, '2025-05-17'),
(11058, 15, 1, 34, '2025-05-18'),
(11059, 16, 1, 35, '2025-05-18'),
(11060, 19, 1, 36, '2025-05-18'),
(11061, 20, 2, 34, '2025-05-18'),
(11062, 21, 2, 35, '2025-05-18'),
(11063, 22, 2, 36, '2025-05-18'),
(11064, 23, 3, 34, '2025-05-18'),
(11065, 24, 3, 35, '2025-05-18'),
(11066, 25, 3, 36, '2025-05-18'),
(11067, 15, 1, 34, '2025-05-19'),
(11068, 16, 1, 35, '2025-05-19'),
(11069, 19, 1, 36, '2025-05-19'),
(11070, 20, 2, 34, '2025-05-19'),
(11071, 21, 2, 35, '2025-05-19'),
(11072, 22, 2, 36, '2025-05-19'),
(11073, 23, 3, 34, '2025-05-19'),
(11074, 24, 3, 35, '2025-05-19'),
(11075, 25, 3, 36, '2025-05-19'),
(11076, 15, 1, 34, '2025-05-20'),
(11077, 16, 1, 35, '2025-05-20'),
(11078, 19, 1, 36, '2025-05-20'),
(11079, 20, 2, 34, '2025-05-20'),
(11080, 21, 2, 35, '2025-05-20'),
(11081, 22, 2, 36, '2025-05-20'),
(11082, 23, 3, 34, '2025-05-20'),
(11083, 24, 3, 35, '2025-05-20'),
(11084, 25, 3, 36, '2025-05-20'),
(11085, 15, 1, 34, '2025-05-21'),
(11086, 16, 1, 35, '2025-05-21'),
(11087, 19, 1, 36, '2025-05-21'),
(11088, 20, 2, 34, '2025-05-21'),
(11089, 21, 2, 35, '2025-05-21'),
(11090, 22, 2, 36, '2025-05-21'),
(11091, 23, 3, 34, '2025-05-21'),
(11092, 24, 3, 35, '2025-05-21'),
(11093, 25, 3, 36, '2025-05-21'),
(11094, 15, 1, 34, '2025-05-22'),
(11095, 16, 1, 35, '2025-05-22'),
(11096, 19, 1, 36, '2025-05-22'),
(11097, 20, 2, 34, '2025-05-22'),
(11098, 21, 2, 35, '2025-05-22'),
(11099, 22, 2, 36, '2025-05-22'),
(11100, 23, 3, 34, '2025-05-22'),
(11101, 24, 3, 35, '2025-05-22'),
(11102, 25, 3, 36, '2025-05-22'),
(11103, 15, 1, 34, '2025-05-23'),
(11104, 16, 1, 35, '2025-05-23'),
(11105, 19, 1, 36, '2025-05-23'),
(11106, 20, 2, 34, '2025-05-23'),
(11107, 21, 2, 35, '2025-05-23'),
(11108, 22, 2, 36, '2025-05-23'),
(11109, 23, 3, 34, '2025-05-23'),
(11110, 24, 3, 35, '2025-05-23'),
(11111, 25, 3, 36, '2025-05-23'),
(11112, 15, 1, 34, '2025-05-24'),
(11113, 16, 1, 35, '2025-05-24'),
(11114, 19, 1, 36, '2025-05-24'),
(11115, 20, 2, 34, '2025-05-24'),
(11116, 21, 2, 35, '2025-05-24'),
(11117, 22, 2, 36, '2025-05-24'),
(11118, 23, 3, 34, '2025-05-24'),
(11119, 24, 3, 35, '2025-05-24'),
(11120, 25, 3, 36, '2025-05-24'),
(11121, 15, 1, 34, '2025-05-25'),
(11122, 16, 1, 35, '2025-05-25'),
(11123, 19, 1, 36, '2025-05-25'),
(11124, 20, 2, 34, '2025-05-25'),
(11125, 21, 2, 35, '2025-05-25'),
(11126, 22, 2, 36, '2025-05-25'),
(11127, 23, 3, 34, '2025-05-25'),
(11128, 24, 3, 35, '2025-05-25'),
(11129, 25, 3, 36, '2025-05-25'),
(11130, 15, 1, 34, '2025-05-26'),
(11131, 16, 1, 35, '2025-05-26'),
(11132, 19, 1, 36, '2025-05-26'),
(11133, 20, 2, 34, '2025-05-26'),
(11134, 21, 2, 35, '2025-05-26'),
(11135, 22, 2, 36, '2025-05-26'),
(11136, 23, 3, 34, '2025-05-26'),
(11137, 24, 3, 35, '2025-05-26'),
(11138, 25, 3, 36, '2025-05-26'),
(11139, 15, 1, 34, '2025-05-27'),
(11140, 16, 1, 35, '2025-05-27'),
(11141, 19, 1, 36, '2025-05-27'),
(11142, 20, 2, 34, '2025-05-27'),
(11143, 21, 2, 35, '2025-05-27'),
(11144, 22, 2, 36, '2025-05-27'),
(11145, 23, 3, 34, '2025-05-27'),
(11146, 24, 3, 35, '2025-05-27'),
(11147, 25, 3, 36, '2025-05-27'),
(11148, 15, 1, 34, '2025-05-28'),
(11149, 16, 1, 35, '2025-05-28'),
(11150, 19, 1, 36, '2025-05-28'),
(11151, 20, 2, 34, '2025-05-28'),
(11152, 21, 2, 35, '2025-05-28'),
(11153, 22, 2, 36, '2025-05-28'),
(11154, 23, 3, 34, '2025-05-28'),
(11155, 24, 3, 35, '2025-05-28'),
(11156, 25, 3, 36, '2025-05-28'),
(11157, 15, 1, 34, '2025-05-29'),
(11158, 16, 1, 35, '2025-05-29'),
(11159, 19, 1, 36, '2025-05-29'),
(11160, 20, 2, 34, '2025-05-29'),
(11161, 21, 2, 35, '2025-05-29'),
(11162, 22, 2, 36, '2025-05-29'),
(11163, 23, 3, 34, '2025-05-29'),
(11164, 24, 3, 35, '2025-05-29'),
(11165, 25, 3, 36, '2025-05-29'),
(11166, 15, 1, 34, '2025-05-30'),
(11167, 16, 1, 35, '2025-05-30'),
(11168, 19, 1, 36, '2025-05-30'),
(11169, 20, 2, 34, '2025-05-30'),
(11170, 21, 2, 35, '2025-05-30'),
(11171, 22, 2, 36, '2025-05-30'),
(11172, 23, 3, 34, '2025-05-30'),
(11173, 24, 3, 35, '2025-05-30'),
(11174, 25, 3, 36, '2025-05-30'),
(11175, 15, 1, 34, '2025-05-31'),
(11176, 16, 1, 35, '2025-05-31'),
(11177, 19, 1, 36, '2025-05-31'),
(11178, 20, 2, 34, '2025-05-31'),
(11179, 21, 2, 35, '2025-05-31'),
(11180, 22, 2, 36, '2025-05-31'),
(11181, 23, 3, 34, '2025-05-31'),
(11182, 24, 3, 35, '2025-05-31'),
(11183, 25, 3, 36, '2025-05-31'),
(11184, 15, 1, 34, '2025-06-01'),
(11185, 16, 1, 35, '2025-06-01'),
(11186, 19, 1, 36, '2025-06-01'),
(11187, 20, 2, 34, '2025-06-01'),
(11188, 21, 2, 35, '2025-06-01'),
(11189, 22, 2, 36, '2025-06-01'),
(11190, 23, 3, 34, '2025-06-01'),
(11191, 24, 3, 35, '2025-06-01'),
(11192, 25, 3, 36, '2025-06-01'),
(11193, 15, 1, 34, '2025-06-02'),
(11194, 16, 1, 35, '2025-06-02'),
(11195, 19, 1, 36, '2025-06-02'),
(11196, 20, 2, 34, '2025-06-02'),
(11197, 21, 2, 35, '2025-06-02'),
(11198, 22, 2, 36, '2025-06-02'),
(11199, 23, 3, 34, '2025-06-02'),
(11200, 24, 3, 35, '2025-06-02'),
(11201, 25, 3, 36, '2025-06-02'),
(11202, 15, 1, 34, '2025-06-03'),
(11203, 16, 1, 35, '2025-06-03'),
(11204, 19, 1, 36, '2025-06-03'),
(11205, 20, 2, 34, '2025-06-03'),
(11206, 21, 2, 35, '2025-06-03'),
(11207, 22, 2, 36, '2025-06-03'),
(11208, 23, 3, 34, '2025-06-03'),
(11209, 24, 3, 35, '2025-06-03'),
(11210, 25, 3, 36, '2025-06-03'),
(11211, 15, 1, 34, '2025-06-04'),
(11212, 16, 1, 35, '2025-06-04'),
(11213, 19, 1, 36, '2025-06-04'),
(11214, 20, 2, 34, '2025-06-04'),
(11215, 21, 2, 35, '2025-06-04'),
(11216, 22, 2, 36, '2025-06-04'),
(11217, 23, 3, 34, '2025-06-04'),
(11218, 24, 3, 35, '2025-06-04'),
(11219, 25, 3, 36, '2025-06-04'),
(11220, 15, 1, 34, '2025-06-05'),
(11221, 16, 1, 35, '2025-06-05'),
(11222, 19, 1, 36, '2025-06-05'),
(11223, 20, 2, 34, '2025-06-05'),
(11224, 21, 2, 35, '2025-06-05'),
(11225, 22, 2, 36, '2025-06-05'),
(11226, 23, 3, 34, '2025-06-05'),
(11227, 24, 3, 35, '2025-06-05'),
(11228, 25, 3, 36, '2025-06-05'),
(11229, 15, 1, 34, '2025-06-06'),
(11230, 16, 1, 35, '2025-06-06'),
(11231, 19, 1, 36, '2025-06-06'),
(11232, 20, 2, 34, '2025-06-06'),
(11233, 21, 2, 35, '2025-06-06'),
(11234, 22, 2, 36, '2025-06-06'),
(11235, 23, 3, 34, '2025-06-06'),
(11236, 24, 3, 35, '2025-06-06'),
(11237, 25, 3, 36, '2025-06-06'),
(11238, 15, 1, 34, '2025-06-07'),
(11239, 16, 1, 35, '2025-06-07'),
(11240, 19, 1, 36, '2025-06-07'),
(11241, 20, 2, 34, '2025-06-07'),
(11242, 21, 2, 35, '2025-06-07'),
(11243, 22, 2, 36, '2025-06-07'),
(11244, 23, 3, 34, '2025-06-07'),
(11245, 24, 3, 35, '2025-06-07'),
(11246, 25, 3, 36, '2025-06-07'),
(11247, 15, 1, 34, '2025-06-08'),
(11248, 16, 1, 35, '2025-06-08'),
(11249, 19, 1, 36, '2025-06-08'),
(11250, 20, 2, 34, '2025-06-08'),
(11251, 21, 2, 35, '2025-06-08'),
(11252, 22, 2, 36, '2025-06-08'),
(11253, 23, 3, 34, '2025-06-08'),
(11254, 24, 3, 35, '2025-06-08'),
(11255, 25, 3, 36, '2025-06-08'),
(11256, 15, 1, 34, '2025-06-09'),
(11257, 16, 1, 35, '2025-06-09'),
(11258, 19, 1, 36, '2025-06-09'),
(11259, 20, 2, 34, '2025-06-09'),
(11260, 21, 2, 35, '2025-06-09'),
(11261, 22, 2, 36, '2025-06-09'),
(11262, 23, 3, 34, '2025-06-09'),
(11263, 24, 3, 35, '2025-06-09'),
(11264, 25, 3, 36, '2025-06-09'),
(11265, 15, 1, 34, '2025-06-10'),
(11266, 16, 1, 35, '2025-06-10'),
(11267, 19, 1, 36, '2025-06-10'),
(11268, 20, 2, 34, '2025-06-10'),
(11269, 21, 2, 35, '2025-06-10'),
(11270, 22, 2, 36, '2025-06-10'),
(11271, 23, 3, 34, '2025-06-10'),
(11272, 24, 3, 35, '2025-06-10'),
(11273, 25, 3, 36, '2025-06-10'),
(11274, 15, 1, 34, '2025-06-11'),
(11275, 16, 1, 35, '2025-06-11'),
(11276, 19, 1, 36, '2025-06-11'),
(11277, 20, 2, 34, '2025-06-11'),
(11278, 21, 2, 35, '2025-06-11'),
(11279, 22, 2, 36, '2025-06-11'),
(11280, 23, 3, 34, '2025-06-11'),
(11281, 24, 3, 35, '2025-06-11'),
(11282, 25, 3, 36, '2025-06-11'),
(11283, 15, 1, 34, '2025-06-12'),
(11284, 16, 1, 35, '2025-06-12'),
(11285, 19, 1, 36, '2025-06-12'),
(11286, 20, 2, 34, '2025-06-12'),
(11287, 21, 2, 35, '2025-06-12'),
(11288, 22, 2, 36, '2025-06-12'),
(11289, 23, 3, 34, '2025-06-12'),
(11290, 24, 3, 35, '2025-06-12'),
(11291, 25, 3, 36, '2025-06-12'),
(11292, 15, 1, 34, '2025-06-13'),
(11293, 16, 1, 35, '2025-06-13'),
(11294, 19, 1, 36, '2025-06-13'),
(11295, 20, 2, 34, '2025-06-13'),
(11296, 21, 2, 35, '2025-06-13'),
(11297, 22, 2, 36, '2025-06-13'),
(11298, 23, 3, 34, '2025-06-13'),
(11299, 24, 3, 35, '2025-06-13'),
(11300, 25, 3, 36, '2025-06-13'),
(11301, 15, 1, 34, '2025-06-14'),
(11302, 16, 1, 35, '2025-06-14'),
(11303, 19, 1, 36, '2025-06-14'),
(11304, 20, 2, 34, '2025-06-14'),
(11305, 21, 2, 35, '2025-06-14'),
(11306, 22, 2, 36, '2025-06-14'),
(11307, 23, 3, 34, '2025-06-14'),
(11308, 24, 3, 35, '2025-06-14'),
(11309, 25, 3, 36, '2025-06-14'),
(11310, 15, 1, 34, '2025-06-15'),
(11311, 16, 1, 35, '2025-06-15'),
(11312, 19, 1, 36, '2025-06-15'),
(11313, 20, 2, 34, '2025-06-15'),
(11314, 21, 2, 35, '2025-06-15'),
(11315, 22, 2, 36, '2025-06-15'),
(11316, 23, 3, 34, '2025-06-15'),
(11317, 24, 3, 35, '2025-06-15'),
(11318, 25, 3, 36, '2025-06-15'),
(11319, 15, 1, 34, '2025-06-16'),
(11320, 16, 1, 35, '2025-06-16'),
(11321, 19, 1, 36, '2025-06-16'),
(11322, 20, 2, 34, '2025-06-16'),
(11323, 21, 2, 35, '2025-06-16'),
(11324, 22, 2, 36, '2025-06-16'),
(11325, 23, 3, 34, '2025-06-16'),
(11326, 24, 3, 35, '2025-06-16'),
(11327, 25, 3, 36, '2025-06-16'),
(11328, 15, 1, 34, '2025-06-17'),
(11329, 16, 1, 35, '2025-06-17'),
(11330, 19, 1, 36, '2025-06-17'),
(11331, 20, 2, 34, '2025-06-17'),
(11332, 21, 2, 35, '2025-06-17'),
(11333, 22, 2, 36, '2025-06-17'),
(11334, 23, 3, 34, '2025-06-17'),
(11335, 24, 3, 35, '2025-06-17'),
(11336, 25, 3, 36, '2025-06-17'),
(11337, 15, 1, 34, '2025-06-18'),
(11338, 16, 1, 35, '2025-06-18'),
(11339, 19, 1, 36, '2025-06-18'),
(11340, 20, 2, 34, '2025-06-18'),
(11341, 21, 2, 35, '2025-06-18'),
(11342, 22, 2, 36, '2025-06-18'),
(11343, 23, 3, 34, '2025-06-18'),
(11344, 24, 3, 35, '2025-06-18'),
(11345, 25, 3, 36, '2025-06-18'),
(11346, 15, 1, 34, '2025-06-19'),
(11347, 16, 1, 35, '2025-06-19'),
(11348, 19, 1, 36, '2025-06-19'),
(11349, 20, 2, 34, '2025-06-19'),
(11350, 21, 2, 35, '2025-06-19'),
(11351, 22, 2, 36, '2025-06-19'),
(11352, 23, 3, 34, '2025-06-19'),
(11353, 24, 3, 35, '2025-06-19'),
(11354, 25, 3, 36, '2025-06-19'),
(11355, 15, 1, 34, '2025-06-20'),
(11356, 16, 1, 35, '2025-06-20'),
(11357, 19, 1, 36, '2025-06-20'),
(11358, 20, 2, 34, '2025-06-20'),
(11359, 21, 2, 35, '2025-06-20'),
(11360, 22, 2, 36, '2025-06-20'),
(11361, 23, 3, 34, '2025-06-20'),
(11362, 24, 3, 35, '2025-06-20'),
(11363, 25, 3, 36, '2025-06-20'),
(11364, 15, 1, 34, '2025-06-21'),
(11365, 16, 1, 35, '2025-06-21'),
(11366, 19, 1, 36, '2025-06-21'),
(11367, 20, 2, 34, '2025-06-21'),
(11368, 21, 2, 35, '2025-06-21'),
(11369, 22, 2, 36, '2025-06-21'),
(11370, 23, 3, 34, '2025-06-21'),
(11371, 24, 3, 35, '2025-06-21'),
(11372, 25, 3, 36, '2025-06-21'),
(11373, 15, 1, 34, '2025-06-22'),
(11374, 16, 1, 35, '2025-06-22'),
(11375, 19, 1, 36, '2025-06-22'),
(11376, 20, 2, 34, '2025-06-22'),
(11377, 21, 2, 35, '2025-06-22'),
(11378, 22, 2, 36, '2025-06-22'),
(11379, 23, 3, 34, '2025-06-22'),
(11380, 24, 3, 35, '2025-06-22'),
(11381, 25, 3, 36, '2025-06-22'),
(11382, 15, 1, 34, '2025-06-23'),
(11383, 16, 1, 35, '2025-06-23'),
(11384, 19, 1, 36, '2025-06-23'),
(11385, 20, 2, 34, '2025-06-23'),
(11386, 21, 2, 35, '2025-06-23'),
(11387, 22, 2, 36, '2025-06-23'),
(11388, 23, 3, 34, '2025-06-23'),
(11389, 24, 3, 35, '2025-06-23'),
(11390, 25, 3, 36, '2025-06-23'),
(11391, 15, 1, 34, '2025-06-24'),
(11392, 16, 1, 35, '2025-06-24'),
(11393, 19, 1, 36, '2025-06-24'),
(11394, 20, 2, 34, '2025-06-24'),
(11395, 21, 2, 35, '2025-06-24'),
(11396, 22, 2, 36, '2025-06-24'),
(11397, 23, 3, 34, '2025-06-24'),
(11398, 24, 3, 35, '2025-06-24'),
(11399, 25, 3, 36, '2025-06-24'),
(11400, 15, 1, 34, '2025-06-25'),
(11401, 16, 1, 35, '2025-06-25'),
(11402, 19, 1, 36, '2025-06-25'),
(11403, 20, 2, 34, '2025-06-25'),
(11404, 21, 2, 35, '2025-06-25'),
(11405, 22, 2, 36, '2025-06-25'),
(11406, 23, 3, 34, '2025-06-25'),
(11407, 24, 3, 35, '2025-06-25'),
(11408, 25, 3, 36, '2025-06-25'),
(11409, 15, 1, 34, '2025-06-26'),
(11410, 16, 1, 35, '2025-06-26'),
(11411, 19, 1, 36, '2025-06-26'),
(11412, 20, 2, 34, '2025-06-26'),
(11413, 21, 2, 35, '2025-06-26'),
(11414, 22, 2, 36, '2025-06-26'),
(11415, 23, 3, 34, '2025-06-26'),
(11416, 24, 3, 35, '2025-06-26'),
(11417, 25, 3, 36, '2025-06-26'),
(11418, 15, 1, 34, '2025-06-27'),
(11419, 16, 1, 35, '2025-06-27'),
(11420, 19, 1, 36, '2025-06-27'),
(11421, 20, 2, 34, '2025-06-27'),
(11422, 21, 2, 35, '2025-06-27'),
(11423, 22, 2, 36, '2025-06-27'),
(11424, 23, 3, 34, '2025-06-27'),
(11425, 24, 3, 35, '2025-06-27'),
(11426, 25, 3, 36, '2025-06-27'),
(11427, 15, 1, 34, '2025-06-28'),
(11428, 16, 1, 35, '2025-06-28'),
(11429, 19, 1, 36, '2025-06-28'),
(11430, 20, 2, 34, '2025-06-28'),
(11431, 21, 2, 35, '2025-06-28'),
(11432, 22, 2, 36, '2025-06-28'),
(11433, 23, 3, 34, '2025-06-28'),
(11434, 24, 3, 35, '2025-06-28'),
(11435, 25, 3, 36, '2025-06-28'),
(11436, 15, 1, 34, '2025-06-29'),
(11437, 16, 1, 35, '2025-06-29'),
(11438, 19, 1, 36, '2025-06-29'),
(11439, 20, 2, 34, '2025-06-29'),
(11440, 21, 2, 35, '2025-06-29'),
(11441, 22, 2, 36, '2025-06-29'),
(11442, 23, 3, 34, '2025-06-29'),
(11443, 24, 3, 35, '2025-06-29'),
(11444, 25, 3, 36, '2025-06-29'),
(11445, 15, 1, 34, '2025-06-30'),
(11446, 16, 1, 35, '2025-06-30'),
(11447, 19, 1, 36, '2025-06-30'),
(11448, 20, 2, 34, '2025-06-30'),
(11449, 21, 2, 35, '2025-06-30'),
(11450, 22, 2, 36, '2025-06-30'),
(11451, 23, 3, 34, '2025-06-30'),
(11452, 24, 3, 35, '2025-06-30'),
(11453, 25, 3, 36, '2025-06-30');

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
(1, 'Magasin', 'Catégorie principale pour tous les produits en vente', NULL, '2025-05-15 20:47:25'),
(3, 'Produits', NULL, 1, '2025-05-16 19:46:10'),
(4, 'Produits Alimentaires', NULL, 1, '2025-05-16 23:10:45'),
(5, 'Accessoires voitures', NULL, 1, '2025-05-17 21:42:41');

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
(18, 13, 'individuelle', 200.00, '2025-05-16', 30, NULL, 'actif', 100.00, '2025-05-16 02:28:08'),
(19, 10, 'individuelle', 500.00, '2025-05-19', 30, 410.00, 'actif', 500.00, '2025-05-24 22:38:55');

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
(1, 2, 4, 3, 2.00, '2025-05-17 11:13:53'),
(2, 2, 5, 2, 2.00, '2025-05-17 11:13:53'),
(3, 2, 14, 1, 2.00, '2025-05-17 11:13:53'),
(4, 3, 17, 3, 2.00, '2025-05-18 00:16:50'),
(5, 3, 16, 2, 2.00, '2025-05-18 00:16:50'),
(6, 4, 16, 1, 2.00, '2025-05-18 00:33:24');

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
(13, 14, 15, 'HI', 0, '2025-05-25 12:30:37');

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
(1, 2, 'SORTIE', 2, '2025-05-15 21:51:41', 27, 'Vente N°1'),
(2, 4, 'ENTREE', 1, '2025-05-16 19:46:25', NULL, 'hh'),
(3, 10, 'ENTREE', 50, '2025-05-16 23:11:07', NULL, 's'),
(4, 13, 'ENTREE', 1, '2025-05-17 00:40:55', NULL, 's'),
(5, 5, 'SORTIE', 20, '2025-05-17 00:43:23', NULL, NULL),
(6, 5, 'ENTREE', 10, '2025-05-17 00:52:44', NULL, NULL),
(7, 5, 'ENTREE', 1, '2025-05-17 00:52:51', NULL, NULL),
(8, 16, 'ENTREE', 1, '2025-05-17 01:02:51', 14, 'z'),
(9, 5, 'ENTREE', 1, '2025-05-17 01:26:32', 14, 'r'),
(10, 4, 'SORTIE', 40, '2025-05-17 15:40:17', 14, NULL),
(11, 16, 'ENTREE', 30, '2025-05-17 15:40:37', 14, NULL),
(12, 16, 'SORTIE', 30, '2025-05-17 15:41:03', 14, NULL),
(13, 16, 'AJUSTEMENT', 30, '2025-05-17 15:42:34', 14, NULL),
(14, 16, 'ENTREE', 10, '2025-05-17 15:44:52', 14, NULL),
(15, 16, 'ENTREE', 20, '2025-05-17 15:45:15', 14, NULL),
(16, 16, 'AJUSTEMENT', 30, '2025-05-17 15:58:44', 14, NULL),
(17, 16, 'ENTREE', 10, '2025-05-17 15:58:59', 14, NULL),
(18, 16, 'SORTIE', 20, '2025-05-17 15:59:27', 14, NULL),
(19, 16, 'ENTREE', 50, '2025-05-17 15:59:47', 14, NULL),
(20, 16, 'ENTREE', 10, '2025-05-17 16:03:11', 14, NULL),
(21, 5, 'AJUSTEMENT', 10, '2025-05-17 16:05:14', 14, NULL),
(22, 5, 'ENTREE', 22, '2025-05-17 16:08:04', 14, NULL),
(23, 5, 'ENTREE', 1, '2025-05-17 16:08:19', 14, NULL),
(24, 5, 'ENTREE', 10, '2025-05-17 21:42:00', 14, NULL),
(25, 5, 'ENTREE', 4, '2025-05-17 21:42:17', 14, NULL),
(26, 5, 'ENTREE', 1, '2025-05-17 23:22:44', 14, NULL),
(27, 17, 'SORTIE', 3, '2025-05-18 01:16:50', NULL, 'Vente #3'),
(28, 16, 'SORTIE', 2, '2025-05-18 01:16:50', NULL, 'Vente #3'),
(29, 16, 'SORTIE', 1, '2025-05-18 01:33:24', 27, 'Vente #4');

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
  `type` enum('paiement_reussi','remboursement','transaction_reussie','expiration','expiration_proche','systeme','autre','reclamation_created','reclamation_closed','reclamation_updated','reclamation_resolved','alerte_stock') NOT NULL,
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
(27, 10, 'credit', 17, 'expiration_proche', 'Votre crédit #17 expire dans 7 jours', 0, '2025-05-24 23:00:13');

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
(20, 'PAY-888513-183', 18, 100.00, 100.00, '2025-05-16 02:28:08', 'especes', '', NULL);

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
(4, 34, 'PIII1', 'disponible', '2025-04-21 19:28:39', '2025-05-08 19:37:27', 'SP95', 2.50, 'Litre', '2025-05-08', 400.00),
(5, 35, 'PI01', 'maintenance', '2025-04-22 00:34:53', '2025-05-08 19:26:49', 'SP95', 2.50, 'Litre', '2025-04-24', NULL),
(6, 35, 'PI03', 'disponible', '2025-04-22 00:34:53', '2025-05-08 19:27:10', 'GPL', 2.70, 'Litre', '2025-04-24', NULL),
(7, 35, 'PI02', 'disponible', '2025-04-22 00:34:53', '2025-05-08 19:27:33', 'GAZOLE', 2.30, 'Litre', '2025-04-30', NULL),
(8, 36, 'PI04', 'disponible', '2025-04-22 00:39:26', '2025-05-23 21:29:18', 'SP95', 2.50, 'Litre', '2025-05-23', 100.00);

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
(34, 'P020', 'gasoil', 'en_service', '2025-04-21 16:28:39'),
(35, 'P021', 'multi-produits', 'en_service', '2025-04-21 23:34:52'),
(36, 'P022', 'sans plomb', 'en_service', '2025-04-21 23:39:26');

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
  `categorie_id` int(11) NOT NULL,
  `prix_achat` decimal(10,2) NOT NULL,
  `prix_vente` decimal(10,2) NOT NULL,
  `quantite_stock` int(11) DEFAULT 0,
  `seuil_alerte` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  `date_modification` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `code_barre`, `nom`, `description`, `categorie_id`, `prix_achat`, `prix_vente`, `quantite_stock`, `seuil_alerte`, `image_url`, `date_creation`, `date_modification`) VALUES
(2, '1234567890123', 'Produit Exemple', 'Ceci est un produit exemple pour illustrer une insertion.', 1, 10.50, 15.00, 98, 10, 'http://localhost:3000/public/transactions/transaction_1746466704645.png', '2025-05-15 20:47:40', '2025-05-15 21:51:41'),
(4, '5449000000995', 'Gaufrettes', NULL, 1, 1.00, 2.00, 40, 5, NULL, '2025-05-16 12:16:27', '2025-05-17 21:36:09'),
(5, '3017620422003', 'Coca Cola Boycott', NULL, 1, 1.00, 2.00, 85, 20, NULL, '2025-05-16 12:35:19', '2025-05-17 23:22:44'),
(10, '123444444444444442', 'Sablito', NULL, 3, 200.00, 300.00, 150, 5, NULL, '2025-05-16 19:51:33', '2025-05-16 23:11:07'),
(13, '2222229999', 'mahdeeeen', NULL, 3, 1.00, 2.00, 52, 10, 'http://localhost:3000/images_produits/produit_1747433401088.jpeg', '2025-05-16 22:46:25', '2025-05-17 00:40:55'),
(14, '3332222222222222', 'HUILE', NULL, 3, 1.00, 2.00, 50, 10, 'http://localhost:3000/images_produits/produit_1747433378757.jpg', '2025-05-16 22:54:43', '2025-05-16 23:09:38'),
(15, '6666666666666666666666', 'Monoo', 'YHY', 4, 1.00, 2.00, 50, 30, 'http://localhost:3000/images_produits/produit_1747437711442.jpg', '2025-05-17 00:21:51', NULL),
(16, 'CB2080557356', 'ghuuuuu', 'HHHH', 4, 1.00, 2.00, 121, 2, 'http://localhost:3000/images_produits/produit_1747438679148.jpeg', '2025-05-17 00:37:59', '2025-05-18 01:33:24'),
(17, 'CB3508654297', 'zhéugzé', NULL, 3, 1.00, 2.00, 41, 20, NULL, '2025-05-17 15:07:37', '2025-05-18 01:16:50'),
(18, 'CB8750034039', 'Yaoughrt', NULL, 4, 0.30, 0.50, 200, 50, NULL, '2025-05-18 05:04:19', NULL);

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
(22, '2025-05-04', 8, 100.00, 400.00, 1, '2025-05-04 18:29:45');

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
(8, 13, 'Problème de livraison', 'produit', 'La livraison n\'est pas arrivée à la date promise', 'REC-634834-416', '2025-05-18 15:30:34', 'nouveau');

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

--
-- Déchargement des données de la table `releves_postes`
--

INSERT INTO `releves_postes` (`id`, `affectation_id`, `pistolet_id`, `index_ouverture`, `index_fermeture`, `date_heure_saisie`, `statut`, `updated_at`) VALUES
(20, 11111, 8, 0.00, 100.00, '2025-05-23 22:29:18', 'saisie', NULL);

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
  `id_credit` int(11) DEFAULT NULL,
  `preuve` varchar(255) DEFAULT NULL COMMENT 'Chemin vers la preuve photo de la transaction',
  `id_pompiste` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `id_vehicule`, `quantite`, `montant`, `date_transaction`, `id_credit`, `preuve`, `id_pompiste`) VALUES
(1, 18, 30.00, 315.00, '2025-04-17 20:23:15', 2, NULL, NULL),
(2, 18, 7.62, 80.00, '2025-04-17 21:09:03', 2, NULL, NULL),
(3, 18, 2.86, 30.00, '2025-04-17 21:09:16', 2, NULL, NULL),
(4, 18, 0.95, 10.00, '2025-04-17 21:09:24', 2, NULL, NULL),
(5, 18, 1.90, 20.00, '2025-04-17 21:11:53', 2, NULL, NULL),
(6, 18, 0.95, 10.00, '2025-04-17 21:17:05', 2, NULL, NULL),
(7, 18, 1.90, 20.00, '2025-04-17 21:28:36', 2, NULL, NULL),
(8, 18, 1.90, 20.00, '2025-04-17 21:30:20', 2, NULL, NULL),
(9, 19, 37.04, 100.00, '2025-04-18 00:28:45', 3, NULL, NULL),
(10, 19, 111.11, 300.00, '2025-04-18 01:00:21', 3, NULL, NULL),
(11, 19, 74.07, 200.00, '2025-04-18 01:04:04', 3, NULL, NULL),
(12, 19, 80.00, 200.00, '2025-04-18 01:14:36', 3, NULL, NULL),
(13, 19, 80.00, 200.00, '2025-04-18 01:17:54', 3, NULL, NULL),
(14, 19, 9.52, 100.00, '2025-04-18 01:24:24', 3, NULL, NULL),
(15, 19, 7.41, 20.00, '2025-04-18 01:27:17', 3, NULL, NULL),
(16, 19, 1.90, 20.00, '2025-04-18 01:31:09', 3, NULL, NULL),
(17, 19, 7.41, 20.00, '2025-04-18 01:42:32', 3, NULL, NULL),
(18, 19, 1.90, 20.00, '2025-04-18 01:52:08', 3, NULL, NULL),
(19, 19, 19.05, 200.00, '2025-04-18 01:52:25', 3, NULL, NULL),
(20, 19, 19.05, 200.00, '2025-04-18 01:55:39', 3, NULL, NULL),
(21, 19, 19.05, 200.00, '2025-04-18 01:59:39', 3, NULL, NULL),
(22, 19, 1.90, 20.00, '2025-04-18 02:01:32', 3, NULL, NULL),
(23, 19, 19.05, 200.00, '2025-04-18 03:02:56', 3, NULL, NULL),
(24, 19, 1.90, 20.00, '2025-04-18 03:43:13', 3, NULL, NULL),
(25, 20, 1.90, 20.00, '2025-04-18 13:35:28', 5, NULL, NULL),
(26, 20, 1.90, 20.00, '2025-04-18 14:27:58', 5, NULL, NULL),
(27, 20, 1.90, 20.00, '2025-04-18 14:53:17', 5, NULL, NULL),
(28, 21, 9.52, 100.00, '2025-04-29 03:00:45', 7, NULL, NULL),
(29, 21, 9.52, 100.00, '2025-04-29 03:09:55', 7, NULL, NULL),
(30, 21, 18.52, 50.00, '2025-04-29 03:27:35', 7, NULL, NULL),
(31, 21, 20.00, 50.00, '2025-04-29 03:35:42', 7, NULL, NULL),
(32, 21, 20.00, 50.00, '2025-04-29 03:38:35', 7, NULL, NULL),
(33, 21, 20.00, 50.00, '2025-04-29 03:39:45', 7, NULL, NULL),
(34, 21, 16.00, 40.00, '2025-04-29 03:51:25', 7, NULL, NULL),
(35, 21, 16.00, 40.00, '2025-04-29 04:01:54', 7, NULL, NULL),
(36, 21, 3.81, 40.00, '2025-04-29 04:03:10', 7, NULL, NULL),
(37, 21, 1.90, 20.00, '2025-04-29 04:06:52', 7, NULL, NULL),
(38, 21, 1.90, 20.00, '2025-04-29 04:18:23', 7, NULL, NULL),
(39, 21, 1.90, 20.00, '2025-04-29 04:29:37', 7, NULL, NULL),
(40, 21, 1.90, 20.00, '2025-04-29 04:49:42', 7, NULL, NULL),
(41, 21, 9.52, 100.00, '2025-04-29 05:19:36', 7, NULL, NULL),
(42, 21, 9.52, 100.00, '2025-04-29 05:25:24', 7, NULL, NULL),
(43, 21, 4.76, 50.00, '2025-04-29 05:32:05', 7, NULL, NULL),
(44, 21, 20.00, 50.00, '2025-04-29 05:33:25', 7, NULL, NULL),
(45, 21, 4.76, 50.00, '2025-04-29 05:38:26', 7, NULL, NULL),
(46, 22, 38.10, 400.00, '2025-04-30 14:05:07', 8, NULL, NULL),
(47, 22, 9.52, 100.00, '2025-04-30 14:07:06', 8, NULL, NULL),
(48, 26, 9.52, 100.00, '2025-05-02 22:27:06', 11, NULL, NULL),
(49, 26, 9.52, 100.00, '2025-05-02 22:28:27', 11, NULL, NULL),
(50, 26, 9.52, 100.00, '2025-05-02 22:29:05', 11, NULL, NULL),
(51, 27, 9.52, 100.00, '2025-05-02 23:15:26', 16, NULL, NULL),
(52, 27, 9.52, 100.00, '2025-05-02 23:16:18', 16, NULL, NULL),
(53, 27, 9.52, 100.00, '2025-05-02 23:19:06', 16, NULL, NULL),
(54, 27, 9.52, 100.00, '2025-05-02 23:19:51', 16, NULL, NULL),
(55, 27, 9.52, 100.00, '2025-05-02 23:20:01', 16, NULL, NULL),
(56, 28, 9.52, 100.00, '2025-05-05 16:22:08', 17, NULL, NULL),
(57, 28, 9.52, 100.00, '2025-05-05 16:24:48', 17, NULL, NULL),
(58, 28, 9.52, 100.00, '2025-05-05 16:27:14', 17, NULL, NULL),
(59, 28, 9.52, 100.00, '2025-05-05 16:43:38', 17, NULL, NULL),
(60, 28, 1.90, 20.00, '2025-05-05 16:47:15', 17, NULL, NULL),
(61, 28, 1.90, 20.00, '2025-05-05 16:53:24', 17, NULL, NULL),
(62, 28, 0.95, 10.00, '2025-05-05 17:02:15', 17, 'uploads\\transactions\\transaction_1746460935280.png', NULL),
(63, 28, 0.95, 10.00, '2025-05-05 17:04:46', 17, 'transactions\\transaction_1746461085648.jpg', NULL),
(64, 28, 0.95, 10.00, '2025-05-05 17:09:05', 17, 'http://localhost:3000/transactions/transaction_1746461345466.png', NULL),
(65, 28, 0.95, 10.00, '2025-05-05 18:38:24', 17, 'http://localhost:3000/public/transactions/transaction_1746466704645.png', 25),
(70, 28, 0.95, 10.00, '2025-05-13 19:22:00', 17, '25', NULL),
(72, 28, 0.48, 5.00, '2025-05-13 19:26:34', 17, '25', NULL),
(73, 28, 0.19, 2.00, '2025-05-13 19:30:16', 17, '25', NULL),
(75, 28, 0.10, 1.00, '2025-05-13 19:36:22', 17, 'http://localhost:3000/transactions/transaction_1747161382077.png', 25),
(76, 8, 9.52, 100.00, '2025-05-21 00:42:10', 19, 'http://localhost:3000/transactions/transaction_1747784530471.jpeg', 25),
(77, 8, 9.52, 100.00, '2025-05-23 22:27:10', 19, 'http://localhost:3000/transactions/transaction_1748035629223.JPG', 25),
(78, 8, 4.76, 50.00, '2025-05-24 21:37:56', 19, 'http://localhost:3000/transactions/transaction_1748119076154.png', 25),
(79, 8, 4.76, 50.00, '2025-05-24 21:49:33', 19, 'http://localhost:3000/transactions/transaction_1748119773735.jpg', 25),
(80, 8, 4.76, 50.00, '2025-05-24 21:52:16', 19, 'http://localhost:3000/transactions/transaction_1748119936223.jpg', 25),
(81, 8, 4.76, 50.00, '2025-05-24 22:31:59', 19, NULL, 25),
(82, 8, 4.76, 50.00, '2025-05-24 22:32:23', 19, NULL, 25),
(83, 8, 4.76, 50.00, '2025-05-24 22:37:32', 19, NULL, 25),
(84, 8, 0.95, 10.00, '2025-05-24 22:38:55', 19, NULL, 25);

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
(9, 'john', 'johndoe@example.com', '1234567898', '$2b$10$ZTs0/GYkUz4R3c6.fqQbQuOaWbmaH0CJa9NCIlADeiDvF7e.urmFO', 'client', '2025-03-14 14:42:46', 'active', NULL),
(10, 'mahdov', 'jo@example.com', '1267898883', '$2b$10$r78JXVlJc7FO6ST/HS.o8ubQhjyFERrn/GfTlQzmvxcazkfl.pvWO', 'client', '2025-03-14 15:26:28', 'active', NULL),
(13, 'Mahdi Bey', 'cncservice2018@gmail.com', '56327280', '$2b$10$I.ack14P/JALNplUd9i3NuR6w/fys71k9DVysmRUSxk9QrDIOGWGi', 'client', '2025-03-14 16:45:22', 'active', '/images/nbg.png'),
(14, 'Ahmed Zamma', 'mahdibeyy@gmail.com', '56327237', '$2b$10$3CWPvFBhxga1s4jGx88YjeUI0CRAKEBm1I/1Lbp0Jn/ipokbW18r.', 'gerant', '2025-03-17 13:43:35', 'active', '/images/nbg.png'),
(15, 'Ahmed Bey', 'mahdibey2002@gmail.com', '56327210', '$2b$10$0NjolxaLuID7fcKfLy8sOOYShGEjARg3L9BQN9spbEcnv8RkyrWZq', 'pompiste', '2025-03-17 20:55:51', 'active', NULL),
(16, 'mahdi', 'newuser@example.com', '12345678', '$2b$10$1d0Yfs65TEqFFE5acBSGb.QP7xQWQv6RcKzFGJFLVytMV8i5Pdhzm', 'pompiste', '2025-03-29 10:18:29', 'active', NULL),
(19, 'Mariem Baccouche', 'baccouche.mariem.iset@gmail.com', '98830579', '$2b$10$OVCe4SOpRX94g4aE7AyFC.XJbOaw8A3InOVVy5AyLJ.lVyPqJ0wlm', 'pompiste', '2025-04-14 13:37:31', 'active', NULL),
(20, 'Mario Balotelli', 'SuperMario45@gmail.com', '1234567890', '$2b$10$IMKRHiru0FvkPr72Uv2D1efDlfNfkLfmsswC9bnTLtizCbK.O.9W2', 'pompiste', '2025-04-22 00:40:25', 'active', NULL),
(21, 'Edin Dzeko', 'Edindzeko9@gmail.com', '54209180', '$2b$10$asZ.b8ntHVVZNyhQNdaFzusc/jPtNhD1S1EzdDdQHNPYqorcaXjzu', 'pompiste', '2025-04-22 00:41:20', 'active', NULL),
(22, 'Lautaro Martinez', 'LautaroMartinez9@gmail.com', '54209183', '$2b$10$jEz5RXNjm7Pc/75TjMV0yO5O0mj0ijKc1uaNnTs/rPfacGOQsz6Vi', 'pompiste', '2025-04-22 00:41:55', 'active', NULL),
(23, 'Nicolo Barella', 'NicoloBarella9@gmail.com', '54209187', '$2b$10$Jxx6.XusstHPy8I3DS.uB.dGpxuOvwC8jSZpeo26JSUpCjodHCA5.', 'pompiste', '2025-04-22 00:42:26', 'active', NULL),
(24, 'Hannibal Mejbri', 'HannibalMejbri9@gmail.com', '54209182', '$2b$10$Q.7O5BjpJbkHDwDI.z8KwOepeNpmjeVLAPMNL8k1m4O.lW6ZGyWty', 'pompiste', '2025-04-22 00:43:11', 'active', NULL),
(25, 'Radhouane Falhi', 'RadhouaneFalhi9@gmail.com', '54209181', '$2b$10$hdhts5/ARh4RjGADK/FUjONFaBrpnJdeD.Gm0N/D/5lCemMrWEOAK', 'pompiste', '2025-04-22 00:44:07', 'active', '/images/radhouane.png'),
(26, 'Davide Fratessi', 'DavideFratessi@gmail.com', '12345678908', '$2b$10$5sO016NlCVTYgMAe3RI...CxiJ22e3NwRVYVg7/glNXjzr5AZivgS', 'Cogerant', '2025-04-27 15:37:03', 'active', NULL),
(27, 'Frank kessie', 'FrankKessie@gmail.com', '126789888322', '$2b$10$CAMtYtYp6Cx/kA1vQVvWPuTG8ERoFeUr6QRIolbr509CJzJuu/Qn2', 'caissier', '2025-05-13 17:49:29', 'active', NULL);

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
(22, '22TU2005', 'SEAT', 'voiture', 'http://localhost:3000/qrcodes/22TU2005.png', 8),
(23, '22TU2066', 'SEAT ', 'voiture', 'undefined/qrcodes/22TU2066.png', 9),
(24, '22TU2044', 'BMW', 'voiture', 'undefined/qrcodes/22TU2044.png', 14),
(25, '23TU255', 'BMW', 'voiture', 'undefined/qrcodes/23TU255.png', 12),
(26, '22TU2033', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/22TU2033.png', 11),
(27, '22TU2099', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2099.png', 16),
(28, '22TU2012', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2012.png', 17),
(29, '22TU2054', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2054.png', 18),
(31, '22TU2045', 'CATCAT', 'voiture', 'http://localhost:3000/qrcodes/22TU2045.png', 19);

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
(1, '2025-05-15 21:51:41', 20.00, 50.00, 'ESPECES', 27),
(2, '2025-05-17 10:30:00', 12.00, 20.00, 'ESPECES', 27),
(3, '2025-05-18 01:16:50', 10.00, 12.00, 'ESPECES', NULL),
(4, '2025-05-18 01:33:24', 2.00, 2.00, 'ESPECES', 27);

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
-- Index pour la table `details_credits`
--
ALTER TABLE `details_credits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

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
  ADD KEY `categorie_id` (`categorie_id`);

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
  ADD KEY `id_credit` (`id_credit`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11454;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `details_credits`
--
ALTER TABLE `details_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `ligne_vente`
--
ALTER TABLE `ligne_vente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `mouvements_stock`
--
ALTER TABLE `mouvements_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

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
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `reclamations`
--
ALTER TABLE `reclamations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `releves_postes`
--
ALTER TABLE `releves_postes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `vehicules`
--
ALTER TABLE `vehicules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `ventes`
--
ALTER TABLE `ventes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- Contraintes pour la table `details_credits`
--
ALTER TABLE `details_credits`
  ADD CONSTRAINT `details_credits_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

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
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`);

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
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_vehicule`) REFERENCES `vehicules` (`id`),
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`);

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
