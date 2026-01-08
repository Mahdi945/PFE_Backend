-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: station_service
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (9,'john jeffrey','johndoe@example.com','1234567898','$2b$10$ZTs0/GYkUz4R3c6.fqQbQuOaWbmaH0CJa9NCIlADeiDvF7e.urmFO','client','2025-03-14 14:42:46','active',NULL),(10,'marc Hughes','jo@example.com','1267898883','$2b$10$r78JXVlJc7FO6ST/HS.o8ubQhjyFERrn/GfTlQzmvxcazkfl.pvWO','client','2025-03-14 15:26:28','active',NULL),(13,'Amine Bey','cncservice2018@gmail.com','56327280','$2b$10$I.ack14P/JALNplUd9i3NuR6w/fys71k9DVysmRUSxk9QrDIOGWGi','Cogerant','2025-03-14 16:45:22','active','/images/y.jpg'),(14,'mahdi Bey','mahdibeyy@gmail.com','56327237','$2b$10$IgSxRbXHQt6RgbtjAAuUt.eWWe5bCgqse9NgEDAgVZ4bU6ehJs2x2','gerant','2025-03-17 13:43:35','active','/images/nbg.png'),(15,'Ahmed Bey','mahdibey2002@gmail.com','56327210','$2b$10$0NjolxaLuID7fcKfLy8sOOYShGEjARg3L9BQN9spbEcnv8RkyrWZq','pompiste','2025-03-17 20:55:51','active',NULL),(16,'mahdi Akilouch','newuser@example.com','12345678','$2b$10$1d0Yfs65TEqFFE5acBSGb.QP7xQWQv6RcKzFGJFLVytMV8i5Pdhzm','pompiste','2025-03-29 10:18:29','active',NULL),(19,'Mariem Baccouche','baccouche.mariem.iset@gmail.com','98830579','$2b$10$OVCe4SOpRX94g4aE7AyFC.XJbOaw8A3InOVVy5AyLJ.lVyPqJ0wlm','client','2025-04-14 13:37:31','active',NULL),(20,'Mario Balotelli','SuperMario45@gmail.com','1234567890','$2b$10$PyMaAOur3j5H93.EuK7O0Oz1Dpua6RlQWC8stOZxjH3wZI94MX/R2','pompiste','2025-04-22 00:40:25','active','/images/super.png'),(21,'Edin Dzeko','Edindzeko9@gmail.com','54209180','$2b$10$asZ.b8ntHVVZNyhQNdaFzusc/jPtNhD1S1EzdDdQHNPYqorcaXjzu','pompiste','2025-04-22 00:41:20','active',NULL),(22,'Lautaro Martinez','LautaroMartinez9@gmail.com','54209183','$2b$10$jEz5RXNjm7Pc/75TjMV0yO5O0mj0ijKc1uaNnTs/rPfacGOQsz6Vi','pompiste','2025-04-22 00:41:55','active',NULL),(23,'Nicolo Barella','NicoloBarella9@gmail.com','54209187','$2b$10$Jxx6.XusstHPy8I3DS.uB.dGpxuOvwC8jSZpeo26JSUpCjodHCA5.','pompiste','2025-04-22 00:42:26','active',NULL),(24,'Hannibal Mejbri','HannibalMejbri9@gmail.com','54209182','$2b$10$Q.7O5BjpJbkHDwDI.z8KwOepeNpmjeVLAPMNL8k1m4O.lW6ZGyWty','pompiste','2025-04-22 00:43:11','active',NULL),(25,'Radhouane Falhi','RadhouaneFalhi9@gmail.com','54209181','$2b$10$hdhts5/ARh4RjGADK/FUjONFaBrpnJdeD.Gm0N/D/5lCemMrWEOAK','pompiste','2025-04-22 00:44:07','active','/images/radhouane.png'),(26,'Davide Fratessi','DavideFratessi@gmail.com','12345678908','$2b$10$5sO016NlCVTYgMAe3RI...CxiJ22e3NwRVYVg7/glNXjzr5AZivgS','pompiste','2025-04-27 15:37:03','active',NULL),(27,'Frank kessie','FrankKessie@gmail.com','126789888322','$2b$10$CAMtYtYp6Cx/kA1vQVvWPuTG8ERoFeUr6QRIolbr509CJzJuu/Qn2','caissier','2025-05-13 17:49:29','active',NULL),(28,'Alaa naouali','mahdibeyyy@gmail.com','123456789066','$2b$10$9EUYLTIBkNmsdEAevwj4l.ZVTQchF4qcUXAEFNXBXSziQcswHUEV.','client','2025-06-05 15:31:28','active',NULL),(30,'Rayen ben nouri','mahdibeyyeee@gmail.com','5632728000','$2b$10$ulrxySIRsmsZifC1rIUwvuc6YTJ8HDh6iq4dMncso.1IjI6JuaGQS','client','2025-06-05 16:20:38','active',NULL);
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-07 16:21:36
