-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 19 avr. 2025 à 16:15
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
(963, 16, 1, 12, 91),
(964, 15, 1, 13, 91),
(965, 16, 1, 14, 91),
(966, 15, 1, 15, 91),
(967, 16, 2, 12, 91),
(968, 15, 2, 13, 91),
(969, 16, 2, 14, 91),
(970, 15, 2, 15, 91),
(971, 16, 3, 12, 91),
(972, 15, 3, 13, 91),
(973, 16, 3, 14, 91),
(974, 15, 3, 15, 91),
(975, 16, 1, 12, 92),
(976, 15, 1, 13, 92),
(977, 16, 1, 14, 92),
(978, 15, 1, 15, 92),
(979, 16, 2, 12, 92),
(980, 15, 2, 13, 92),
(981, 16, 2, 14, 92),
(982, 15, 2, 15, 92),
(983, 16, 3, 12, 92),
(984, 15, 3, 13, 92),
(985, 16, 3, 14, 92),
(986, 15, 3, 15, 92),
(987, 15, 1, 12, 93),
(988, 16, 1, 13, 93),
(989, 15, 1, 14, 93),
(990, 16, 1, 15, 93),
(991, 15, 2, 12, 93),
(992, 16, 2, 13, 93),
(993, 15, 2, 14, 93),
(994, 16, 2, 15, 93),
(995, 15, 3, 12, 93),
(996, 16, 3, 13, 93),
(997, 15, 3, 14, 93),
(998, 16, 3, 15, 93),
(999, 15, 1, 12, 94),
(1000, 16, 1, 13, 94),
(1001, 15, 1, 14, 94),
(1002, 16, 1, 15, 94),
(1003, 15, 2, 12, 94),
(1004, 16, 2, 13, 94),
(1005, 15, 2, 14, 94),
(1006, 16, 2, 15, 94),
(1007, 15, 3, 12, 94),
(1008, 16, 3, 13, 94),
(1009, 15, 3, 14, 94),
(1010, 16, 3, 15, 94),
(1011, 15, 1, 12, 95),
(1012, 16, 1, 13, 95),
(1013, 15, 1, 14, 95),
(1014, 16, 1, 15, 95),
(1015, 15, 2, 12, 95),
(1016, 16, 2, 13, 95),
(1017, 15, 2, 14, 95),
(1018, 16, 2, 15, 95),
(1019, 15, 3, 12, 95),
(1020, 16, 3, 13, 95),
(1021, 15, 3, 14, 95),
(1022, 16, 3, 15, 95),
(1023, 15, 1, 12, 96),
(1024, 16, 1, 13, 96),
(1025, 15, 1, 14, 96),
(1026, 16, 1, 15, 96),
(1027, 15, 2, 12, 96),
(1028, 16, 2, 13, 96),
(1029, 15, 2, 14, 96),
(1030, 16, 2, 15, 96),
(1031, 15, 3, 12, 96),
(1032, 16, 3, 13, 96),
(1033, 15, 3, 14, 96),
(1034, 16, 3, 15, 96),
(1035, 15, 1, 12, 97),
(1036, 16, 1, 13, 97),
(1037, 15, 1, 14, 97),
(1038, 16, 1, 15, 97),
(1039, 15, 2, 12, 97),
(1040, 16, 2, 13, 97),
(1041, 15, 2, 14, 97),
(1042, 16, 2, 15, 97),
(1043, 15, 3, 12, 97),
(1044, 16, 3, 13, 97),
(1045, 15, 3, 14, 97),
(1046, 16, 3, 15, 97),
(1047, 16, 1, 12, 98),
(1048, 15, 1, 13, 98),
(1049, 16, 1, 14, 98),
(1050, 15, 1, 15, 98),
(1051, 16, 2, 12, 98),
(1052, 15, 2, 13, 98),
(1053, 16, 2, 14, 98),
(1054, 15, 2, 15, 98),
(1055, 16, 3, 12, 98),
(1056, 15, 3, 13, 98),
(1057, 16, 3, 14, 98),
(1058, 15, 3, 15, 98),
(1059, 15, 1, 12, 99),
(1060, 16, 1, 13, 99),
(1061, 15, 1, 14, 99),
(1062, 16, 1, 15, 99),
(1063, 15, 2, 12, 99),
(1064, 16, 2, 13, 99),
(1065, 15, 2, 14, 99),
(1066, 16, 2, 15, 99),
(1067, 15, 3, 12, 99),
(1068, 16, 3, 13, 99),
(1069, 15, 3, 14, 99),
(1070, 16, 3, 15, 99),
(1071, 15, 1, 12, 100),
(1072, 16, 1, 13, 100),
(1073, 15, 1, 14, 100),
(1074, 16, 1, 15, 100),
(1075, 15, 2, 12, 100),
(1076, 16, 2, 13, 100),
(1077, 15, 2, 14, 100),
(1078, 16, 2, 15, 100),
(1079, 15, 3, 12, 100),
(1080, 16, 3, 13, 100),
(1081, 15, 3, 14, 100),
(1082, 16, 3, 15, 100),
(1083, 16, 1, 12, 101),
(1084, 15, 1, 13, 101),
(1085, 16, 1, 14, 101),
(1086, 15, 1, 15, 101),
(1087, 16, 2, 12, 101),
(1088, 15, 2, 13, 101),
(1089, 16, 2, 14, 101),
(1090, 15, 2, 15, 101),
(1091, 16, 3, 12, 101),
(1092, 15, 3, 13, 101),
(1093, 16, 3, 14, 101),
(1094, 15, 3, 15, 101),
(1095, 15, 1, 12, 102),
(1096, 16, 1, 13, 102),
(1097, 15, 1, 14, 102),
(1098, 16, 1, 15, 102),
(1099, 15, 2, 12, 102),
(1100, 16, 2, 13, 102),
(1101, 15, 2, 14, 102),
(1102, 16, 2, 15, 102),
(1103, 15, 3, 12, 102),
(1104, 16, 3, 13, 102),
(1105, 15, 3, 14, 102),
(1106, 16, 3, 15, 102),
(1107, 16, 1, 12, 103),
(1108, 15, 1, 13, 103),
(1109, 16, 1, 14, 103),
(1110, 15, 1, 15, 103),
(1111, 16, 2, 12, 103),
(1112, 15, 2, 13, 103),
(1113, 16, 2, 14, 103),
(1114, 15, 2, 15, 103),
(1115, 16, 3, 12, 103),
(1116, 15, 3, 13, 103),
(1117, 16, 3, 14, 103),
(1118, 15, 3, 15, 103),
(1119, 16, 1, 12, 104),
(1120, 15, 1, 13, 104),
(1121, 16, 1, 14, 104),
(1122, 15, 1, 15, 104),
(1123, 16, 2, 12, 104),
(1124, 15, 2, 13, 104),
(1125, 16, 2, 14, 104),
(1126, 15, 2, 15, 104),
(1127, 16, 3, 12, 104),
(1128, 15, 3, 13, 104),
(1129, 16, 3, 14, 104),
(1130, 15, 3, 15, 104),
(1131, 15, 1, 12, 105),
(1132, 16, 1, 13, 105),
(1133, 15, 1, 14, 105),
(1134, 16, 1, 15, 105),
(1135, 15, 2, 12, 105),
(1136, 16, 2, 13, 105),
(1137, 15, 2, 14, 105),
(1138, 16, 2, 15, 105),
(1139, 15, 3, 12, 105),
(1140, 16, 3, 13, 105),
(1141, 15, 3, 14, 105),
(1142, 16, 3, 15, 105),
(1143, 15, 1, 12, 106),
(1144, 16, 1, 13, 106),
(1145, 15, 1, 14, 106),
(1146, 16, 1, 15, 106),
(1147, 15, 2, 12, 106),
(1148, 16, 2, 13, 106),
(1149, 15, 2, 14, 106),
(1150, 16, 2, 15, 106),
(1151, 15, 3, 12, 106),
(1152, 16, 3, 13, 106),
(1153, 15, 3, 14, 106),
(1154, 16, 3, 15, 106),
(1155, 15, 1, 12, 107),
(1156, 16, 1, 13, 107),
(1157, 15, 1, 14, 107),
(1158, 16, 1, 15, 107),
(1159, 15, 2, 12, 107),
(1160, 16, 2, 13, 107),
(1161, 15, 2, 14, 107),
(1162, 16, 2, 15, 107),
(1163, 15, 3, 12, 107),
(1164, 16, 3, 13, 107),
(1165, 15, 3, 14, 107),
(1166, 16, 3, 15, 107),
(1167, 16, 1, 12, 108),
(1168, 15, 1, 13, 108),
(1169, 16, 1, 14, 108),
(1170, 15, 1, 15, 108),
(1171, 16, 2, 12, 108),
(1172, 15, 2, 13, 108),
(1173, 16, 2, 14, 108),
(1174, 15, 2, 15, 108),
(1175, 16, 3, 12, 108),
(1176, 15, 3, 13, 108),
(1177, 16, 3, 14, 108),
(1178, 15, 3, 15, 108),
(1179, 15, 1, 12, 109),
(1180, 16, 1, 13, 109),
(1181, 15, 1, 14, 109),
(1182, 16, 1, 15, 109),
(1183, 15, 2, 12, 109),
(1184, 16, 2, 13, 109),
(1185, 15, 2, 14, 109),
(1186, 16, 2, 15, 109),
(1187, 15, 3, 12, 109),
(1188, 16, 3, 13, 109),
(1189, 15, 3, 14, 109),
(1190, 16, 3, 15, 109),
(1191, 16, 1, 12, 110),
(1192, 15, 1, 13, 110),
(1193, 16, 1, 14, 110),
(1194, 15, 1, 15, 110),
(1195, 16, 2, 12, 110),
(1196, 15, 2, 13, 110),
(1197, 16, 2, 14, 110),
(1198, 15, 2, 15, 110),
(1199, 16, 3, 12, 110),
(1200, 15, 3, 13, 110),
(1201, 16, 3, 14, 110),
(1202, 15, 3, 15, 110),
(1203, 16, 1, 12, 111),
(1204, 15, 1, 13, 111),
(1205, 16, 1, 14, 111),
(1206, 15, 1, 15, 111),
(1207, 16, 2, 12, 111),
(1208, 15, 2, 13, 111),
(1209, 16, 2, 14, 111),
(1210, 15, 2, 15, 111),
(1211, 16, 3, 12, 111),
(1212, 15, 3, 13, 111),
(1213, 16, 3, 14, 111),
(1214, 15, 3, 15, 111),
(1215, 15, 1, 12, 112),
(1216, 16, 1, 13, 112),
(1217, 15, 1, 14, 112),
(1218, 16, 1, 15, 112),
(1219, 15, 2, 12, 112),
(1220, 16, 2, 13, 112),
(1221, 15, 2, 14, 112),
(1222, 16, 2, 15, 112),
(1223, 15, 3, 12, 112),
(1224, 16, 3, 13, 112),
(1225, 15, 3, 14, 112),
(1226, 16, 3, 15, 112),
(1227, 16, 1, 12, 113),
(1228, 15, 1, 13, 113),
(1229, 16, 1, 14, 113),
(1230, 15, 1, 15, 113),
(1231, 16, 2, 12, 113),
(1232, 15, 2, 13, 113),
(1233, 16, 2, 14, 113),
(1234, 15, 2, 15, 113),
(1235, 16, 3, 12, 113),
(1236, 15, 3, 13, 113),
(1237, 16, 3, 14, 113),
(1238, 15, 3, 15, 113),
(1239, 15, 1, 12, 114),
(1240, 16, 1, 13, 114),
(1241, 15, 1, 14, 114),
(1242, 16, 1, 15, 114),
(1243, 15, 2, 12, 114),
(1244, 16, 2, 13, 114),
(1245, 15, 2, 14, 114),
(1246, 16, 2, 15, 114),
(1247, 15, 3, 12, 114),
(1248, 16, 3, 13, 114),
(1249, 15, 3, 14, 114),
(1250, 16, 3, 15, 114),
(1251, 16, 1, 12, 115),
(1252, 15, 1, 13, 115),
(1253, 16, 1, 14, 115),
(1254, 15, 1, 15, 115),
(1255, 16, 2, 12, 115),
(1256, 15, 2, 13, 115),
(1257, 16, 2, 14, 115),
(1258, 15, 2, 15, 115),
(1259, 16, 3, 12, 115),
(1260, 15, 3, 13, 115),
(1261, 16, 3, 14, 115),
(1262, 15, 3, 15, 115),
(1263, 15, 1, 12, 116),
(1264, 16, 1, 13, 116),
(1265, 15, 1, 14, 116),
(1266, 16, 1, 15, 116),
(1267, 15, 2, 12, 116),
(1268, 16, 2, 13, 116),
(1269, 15, 2, 14, 116),
(1270, 16, 2, 15, 116),
(1271, 15, 3, 12, 116),
(1272, 16, 3, 13, 116),
(1273, 15, 3, 14, 116),
(1274, 16, 3, 15, 116),
(1275, 15, 1, 12, 117),
(1276, 16, 1, 13, 117),
(1277, 15, 1, 14, 117),
(1278, 16, 1, 15, 117),
(1279, 15, 2, 12, 117),
(1280, 16, 2, 13, 117),
(1281, 15, 2, 14, 117),
(1282, 16, 2, 15, 117),
(1283, 15, 3, 12, 117),
(1284, 16, 3, 13, 117),
(1285, 15, 3, 14, 117),
(1286, 16, 3, 15, 117),
(1287, 16, 1, 12, 118),
(1288, 15, 1, 13, 118),
(1289, 16, 1, 14, 118),
(1290, 15, 1, 15, 118),
(1291, 16, 2, 12, 118),
(1292, 15, 2, 13, 118),
(1293, 16, 2, 14, 118),
(1294, 15, 2, 15, 118),
(1295, 16, 3, 12, 118),
(1296, 15, 3, 13, 118),
(1297, 16, 3, 14, 118),
(1298, 15, 3, 15, 118),
(1299, 15, 1, 12, 119),
(1300, 16, 1, 13, 119),
(1301, 15, 1, 14, 119),
(1302, 16, 1, 15, 119),
(1303, 15, 2, 12, 119),
(1304, 16, 2, 13, 119),
(1305, 15, 2, 14, 119),
(1306, 16, 2, 15, 119),
(1307, 15, 3, 12, 119),
(1308, 16, 3, 13, 119),
(1309, 15, 3, 14, 119),
(1310, 16, 3, 15, 119),
(1311, 15, 1, 12, 120),
(1312, 16, 1, 13, 120),
(1313, 15, 1, 14, 120),
(1314, 16, 1, 15, 120),
(1315, 15, 2, 12, 120),
(1316, 16, 2, 13, 120),
(1317, 15, 2, 14, 120),
(1318, 16, 2, 15, 120),
(1319, 15, 3, 12, 120),
(1320, 16, 3, 13, 120),
(1321, 15, 3, 14, 120),
(1322, 16, 3, 15, 120),
(1323, 16, 1, 12, 121),
(1324, 15, 1, 13, 121),
(1325, 16, 1, 14, 121),
(1326, 15, 1, 15, 121),
(1327, 16, 2, 12, 121),
(1328, 15, 2, 13, 121),
(1329, 16, 2, 14, 121),
(1330, 15, 2, 15, 121),
(1331, 16, 3, 12, 121),
(1332, 15, 3, 13, 121),
(1333, 16, 3, 14, 121),
(1334, 15, 3, 15, 121),
(1335, 16, 1, 12, 61),
(1336, 15, 1, 13, 61),
(1337, 19, 1, 14, 61);

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
(61, '2025-04-01', 'disponible', 4, 2025),
(62, '2025-04-02', 'disponible', 4, 2025),
(63, '2025-04-03', 'disponible', 4, 2025),
(64, '2025-04-04', 'disponible', 4, 2025),
(65, '2025-04-05', 'disponible', 4, 2025),
(66, '2025-04-06', 'disponible', 4, 2025),
(67, '2025-04-07', 'disponible', 4, 2025),
(68, '2025-04-08', 'disponible', 4, 2025),
(69, '2025-04-09', 'disponible', 4, 2025),
(70, '2025-04-10', 'disponible', 4, 2025),
(71, '2025-04-11', 'disponible', 4, 2025),
(72, '2025-04-12', 'disponible', 4, 2025),
(73, '2025-04-13', 'disponible', 4, 2025),
(74, '2025-04-14', 'disponible', 4, 2025),
(75, '2025-04-15', 'disponible', 4, 2025),
(76, '2025-04-16', 'disponible', 4, 2025),
(77, '2025-04-17', 'disponible', 4, 2025),
(78, '2025-04-18', 'disponible', 4, 2025),
(79, '2025-04-19', 'disponible', 4, 2025),
(80, '2025-04-20', 'disponible', 4, 2025),
(81, '2025-04-21', 'disponible', 4, 2025),
(82, '2025-04-22', 'disponible', 4, 2025),
(83, '2025-04-23', 'disponible', 4, 2025),
(84, '2025-04-24', 'disponible', 4, 2025),
(85, '2025-04-25', 'disponible', 4, 2025),
(86, '2025-04-26', 'disponible', 4, 2025),
(87, '2025-04-27', 'disponible', 4, 2025),
(88, '2025-04-28', 'disponible', 4, 2025),
(89, '2025-04-29', 'disponible', 4, 2025),
(90, '2025-04-30', 'disponible', 4, 2025),
(91, '2025-05-01', 'disponible', 5, 2025),
(92, '2025-05-02', 'disponible', 5, 2025),
(93, '2025-05-03', 'disponible', 5, 2025),
(94, '2025-05-04', 'disponible', 5, 2025),
(95, '2025-05-05', 'disponible', 5, 2025),
(96, '2025-05-06', 'disponible', 5, 2025),
(97, '2025-05-07', 'disponible', 5, 2025),
(98, '2025-05-08', 'disponible', 5, 2025),
(99, '2025-05-09', 'disponible', 5, 2025),
(100, '2025-05-10', 'disponible', 5, 2025),
(101, '2025-05-11', 'disponible', 5, 2025),
(102, '2025-05-12', 'disponible', 5, 2025),
(103, '2025-05-13', 'disponible', 5, 2025),
(104, '2025-05-14', 'disponible', 5, 2025),
(105, '2025-05-15', 'disponible', 5, 2025),
(106, '2025-05-16', 'disponible', 5, 2025),
(107, '2025-05-17', 'disponible', 5, 2025),
(108, '2025-05-18', 'disponible', 5, 2025),
(109, '2025-05-19', 'disponible', 5, 2025),
(110, '2025-05-20', 'disponible', 5, 2025),
(111, '2025-05-21', 'disponible', 5, 2025),
(112, '2025-05-22', 'disponible', 5, 2025),
(113, '2025-05-23', 'disponible', 5, 2025),
(114, '2025-05-24', 'disponible', 5, 2025),
(115, '2025-05-25', 'disponible', 5, 2025),
(116, '2025-05-26', 'disponible', 5, 2025),
(117, '2025-05-27', 'disponible', 5, 2025),
(118, '2025-05-28', 'disponible', 5, 2025),
(119, '2025-05-29', 'disponible', 5, 2025),
(120, '2025-05-30', 'disponible', 5, 2025),
(121, '2025-05-31', 'disponible', 5, 2025);

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
(5, 9, 'individuelle', 300.00, '2025-04-25', 30, 60.00, 'actif', NULL, '2025-04-18 14:53:17');

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
(3, 'PAY-678268-410', 3, 10, 20.00, 480.00, '2025-04-16 19:21:18', 'especes', 'uu');

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
(33, 'caissier', 'Historique transactions', NULL, 1),
(34, 'pompiste', 'Historique transactions', NULL, 0),
(35, 'client', 'Historique transactions', NULL, 1),
(36, 'gerant', 'Saisie vente credit', NULL, 0),
(37, 'cogerant', 'Saisie vente credit', NULL, 0),
(38, 'caissier', 'Saisie vente credit', NULL, 0),
(39, 'pompiste', 'Saisie vente credit', NULL, 1),
(40, 'client', 'Saisie vente credit', NULL, 0),
(41, 'gerant', 'Saisie Index fermeture', NULL, 0),
(42, 'cogerant', 'Saisie Index fermeture', NULL, 0),
(43, 'caissier', 'Saisie Index fermeture', NULL, 0),
(44, 'pompiste', 'Saisie Index fermeture', NULL, 1),
(45, 'client', 'Saisie Index fermeture', NULL, 0),
(69, 'gerant', 'Créer compte', 'Utilisateurs', 1),
(70, 'cogerant', 'Créer compte', 'Utilisateurs', 1),
(71, 'caissier', 'Créer compte', 'Utilisateurs', 1),
(72, 'pompiste', 'Créer compte', 'Utilisateurs', 1),
(73, 'client', 'Créer compte', 'Utilisateurs', 1),
(74, 'gerant', 'Liste utilisateurs', 'Utilisateurs', 1),
(75, 'cogerant', 'Liste utilisateurs', 'Utilisateurs', 1),
(76, 'caissier', 'Liste utilisateurs', 'Utilisateurs', 1),
(77, 'pompiste', 'Liste utilisateurs', 'Utilisateurs', 1),
(78, 'client', 'Liste utilisateurs', 'Utilisateurs', 1),
(79, 'gerant', 'Enregistrer crédit', 'Crédits', 1),
(80, 'cogerant', 'Enregistrer crédit', 'Crédits', 1),
(81, 'caissier', 'Enregistrer crédit', 'Crédits', 1),
(82, 'pompiste', 'Enregistrer crédit', 'Crédits', 1),
(83, 'client', 'Enregistrer crédit', 'Crédits', 1),
(84, 'gerant', 'Enregistrer Véhicules', 'Crédits', 1),
(85, 'cogerant', 'Enregistrer Véhicules', 'Crédits', 1),
(86, 'caissier', 'Enregistrer Véhicules', 'Crédits', 1),
(87, 'pompiste', 'Enregistrer Véhicules', 'Crédits', 1),
(88, 'client', 'Enregistrer Véhicules', 'Crédits', 1),
(89, 'gerant', 'Historique des Paiements', 'Crédits', 1),
(90, 'cogerant', 'Historique des Paiements', 'Crédits', 1),
(91, 'caissier', 'Historique des Paiements', 'Crédits', 1),
(92, 'pompiste', 'Historique des Paiements', 'Crédits', 1),
(93, 'client', 'Historique des Paiements', 'Crédits', 1),
(94, 'gerant', 'Historique des Transactions', 'Crédits', 0),
(95, 'cogerant', 'Historique des Transactions', 'Crédits', 0),
(96, 'caissier', 'Historique des Transactions', 'Crédits', 0),
(97, 'pompiste', 'Historique des Transactions', 'Crédits', 0),
(98, 'client', 'Historique des Transactions', 'Crédits', 0),
(99, 'gerant', 'Enregistrer pompe', 'Pompes', 1),
(100, 'cogerant', 'Enregistrer pompe', 'Pompes', 1),
(101, 'caissier', 'Enregistrer pompe', 'Pompes', 1),
(102, 'pompiste', 'Enregistrer pompe', 'Pompes', 1),
(103, 'client', 'Enregistrer pompe', 'Pompes', 1),
(104, 'gerant', 'Liste pompes', 'Pompes', 1),
(105, 'cogerant', 'Liste pompes', 'Pompes', 1),
(106, 'caissier', 'Liste pompes', 'Pompes', 1),
(107, 'pompiste', 'Liste pompes', 'Pompes', 1),
(108, 'client', 'Liste pompes', 'Pompes', 1);

-- --------------------------------------------------------

--
-- Structure de la table `pistolets`
--

CREATE TABLE `pistolets` (
  `id` int(11) NOT NULL,
  `pompe_id` int(11) NOT NULL,
  `numero_pistolet` varchar(50) NOT NULL,
  `index_ouverture` decimal(10,2) DEFAULT 0.00,
  `index_fermeture` decimal(10,2) DEFAULT 0.00,
  `statut` enum('disponible','indisponible') DEFAULT 'disponible',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pistolets`
--

INSERT INTO `pistolets` (`id`, `pompe_id`, `numero_pistolet`, `index_ouverture`, `index_fermeture`, `statut`, `created_at`, `updated_at`) VALUES
(1, 30, 'PI02', 0.00, 0.00, 'disponible', '2025-04-14 20:27:21', '2025-04-14 20:27:21'),
(2, 33, 'PI02', 0.00, 0.00, 'disponible', '2025-04-15 12:18:11', '2025-04-15 20:27:01'),
(3, 33, 'PI03', 0.00, 0.00, 'indisponible', '2025-04-15 12:18:11', '2025-04-15 20:26:32');

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
(12, 'P001', 'sans plomb', 'maintenance', '2025-04-08 21:50:46'),
(13, 'P002', 'gasoil', 'reserve', '2025-04-08 23:50:55'),
(14, 'P003', 'sans plomb', 'reserve', '2025-04-08 23:51:05'),
(15, 'P004', 'multi-produits', 'reserve', '2025-04-08 23:51:16'),
(16, 'P005', 'multi-produits', 'reserve', '2025-04-08 23:51:22'),
(17, 'P008', 'multi-produits', 'reserve', '2025-04-14 18:46:26'),
(19, 'P009', 'sans plomb', 'reserve', '2025-04-14 19:31:06'),
(20, 'P010', 'sans plomb', 'reserve', '2025-04-14 20:00:56'),
(21, 'P011', 'sans plomb', 'reserve', '2025-04-14 20:04:17'),
(22, 'P090', 'sans plomb', 'reserve', '2025-04-14 20:06:30'),
(25, 'P012', 'sans plomb', 'reserve', '2025-04-14 20:09:05'),
(27, 'P013', 'sans plomb', 'reserve', '2025-04-14 20:10:58'),
(28, 'P014', 'gasoil', 'reserve', '2025-04-14 20:25:51'),
(30, 'P015', 'gasoil', 'reserve', '2025-04-14 20:27:21'),
(33, 'P016', 'sans plomb', 'reserve', '2025-04-15 12:18:11');

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
(13, 'Mahdi Bey', 'mahdibeyy202@gmail.com', '56327280', '$2b$10$djxErd2eHbhS0PKTK4PuXeE/Y/JQvqmppg7kk2t0R6RjSSQLRbzO6', 'client', '2025-03-14 16:45:22', 'active', NULL),
(14, 'Ahmed Zamma', 'mahdibeyy@gmail.com', '56327237', '$2b$10$3qvhoX.KKYtvZ5sIzXrgIORhFSgWR4XsR71VwaMGeiEcj.9her1/O', 'gerant', '2025-03-17 13:43:35', 'active', '/images/nbg.png'),
(15, 'Ahmed Bey', 'mahdibey2002@gmail.com', '56327210', '$2b$10$0NjolxaLuID7fcKfLy8sOOYShGEjARg3L9BQN9spbEcnv8RkyrWZq', 'pompiste', '2025-03-17 20:55:51', 'active', NULL),
(16, 'mahdi', 'newuser@example.com', '12345678', '$2b$10$1d0Yfs65TEqFFE5acBSGb.QP7xQWQv6RcKzFGJFLVytMV8i5Pdhzm', 'pompiste', '2025-03-29 10:18:29', 'active', NULL),
(19, 'Mariem Baccouche', 'baccouche.mariem.iset@gmail.com', '98830579', '$2b$10$OVCe4SOpRX94g4aE7AyFC.XJbOaw8A3InOVVy5AyLJ.lVyPqJ0wlm', 'pompiste', '2025-04-14 13:37:31', 'active', NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1338;

--
-- AUTO_INCREMENT pour la table `calendrier`
--
ALTER TABLE `calendrier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT pour la table `details_credits`
--
ALTER TABLE `details_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT pour la table `pistolets`
--
ALTER TABLE `pistolets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `pompes`
--
ALTER TABLE `pompes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `postes`
--
ALTER TABLE `postes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
