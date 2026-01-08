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
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `affectations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `affectations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pompiste_id` int(11) NOT NULL,
  `poste_id` int(11) NOT NULL,
  `pompe_id` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pompiste_id` (`pompiste_id`),
  KEY `poste_id` (`poste_id`),
  KEY `pompe_id` (`pompe_id`),
  CONSTRAINT `affectations_ibfk_1` FOREIGN KEY (`pompiste_id`) REFERENCES `utilisateurs` (`id`),
  CONSTRAINT `affectations_ibfk_2` FOREIGN KEY (`poste_id`) REFERENCES `postes` (`id`),
  CONSTRAINT `affectations_ibfk_3` FOREIGN KEY (`pompe_id`) REFERENCES `pompes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commandes_achat`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commandes_achat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fournisseur_id` int(11) NOT NULL,
  `date_commande` datetime DEFAULT current_timestamp(),
  `montant_total` decimal(10,2) DEFAULT NULL,
  `statut` enum('brouillon','valid├®e','re├ºue','annul├®e') DEFAULT 'brouillon',
  `agent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fournisseur_id` (`fournisseur_id`),
  KEY `agent_id` (`agent_id`),
  CONSTRAINT `commandes_achat_ibfk_1` FOREIGN KEY (`fournisseur_id`) REFERENCES `fournisseurs` (`id`),
  CONSTRAINT `commandes_achat_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `details_credits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `details_credits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int(11) DEFAULT NULL,
  `type_credit` enum('individuelle','organisationnelle') NOT NULL,
  `solde_credit` decimal(10,2) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `duree_credit` int(11) DEFAULT NULL,
  `credit_utilise` decimal(10,2) DEFAULT NULL,
  `etat` enum('actif','expir├®','annul├®','rembours├®') DEFAULT 'actif',
  `montant_restant` decimal(10,2) DEFAULT NULL,
  `date_dernier_paiement` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  CONSTRAINT `details_credits_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fournisseurs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fournisseurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `adresse` text DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom_unique` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ligne_commande`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ligne_commande` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commande_id` int(11) NOT NULL,
  `produit_id` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commande_id` (`commande_id`),
  KEY `produit_id` (`produit_id`),
  CONSTRAINT `ligne_commande_ibfk_1` FOREIGN KEY (`commande_id`) REFERENCES `commandes_achat` (`id`),
  CONSTRAINT `ligne_commande_ibfk_2` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ligne_vente`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ligne_vente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vente_id` int(11) NOT NULL,
  `produit_id` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `vente_id` (`vente_id`),
  KEY `produit_id` (`produit_id`),
  CONSTRAINT `ligne_vente_ibfk_1` FOREIGN KEY (`vente_id`) REFERENCES `ventes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ligne_vente_ibfk_2` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_sender_receiver` (`sender_id`,`receiver_id`),
  KEY `idx_receiver_sender` (`receiver_id`,`sender_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mouvements_stock`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mouvements_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `produit_id` int(11) NOT NULL,
  `type` enum('ENTREE','SORTIE','AJUSTEMENT') NOT NULL,
  `quantite` int(11) NOT NULL,
  `date_mouvement` datetime DEFAULT current_timestamp(),
  `agent_id` int(11) DEFAULT NULL,
  `raison` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produit_id` (`produit_id`),
  KEY `utilisateur_id` (`agent_id`),
  CONSTRAINT `mouvements_stock_ibfk_1` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`),
  CONSTRAINT `mouvements_stock_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notifications`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int(11) NOT NULL,
  `entity_type` enum('paiement','transaction','credit','vehicule','utilisateur','reclamation','stock') NOT NULL,
  `entity_id` int(11) NOT NULL,
  `type` enum('paiement_reussi','remboursement','transaction_reussie','expiration','expiration_proche','systeme','autre','reclamation_created','reclamation_closed','reclamation_updated','reclamation_resolved','alerte_stock','r├®approvisionnement') NOT NULL,
  `message` varchar(255) NOT NULL,
  `vue` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paiements_credits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paiements_credits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_paiement` varchar(50) DEFAULT NULL,
  `id_credit` int(11) NOT NULL,
  `montant_paye` decimal(10,2) NOT NULL,
  `montant_restant` decimal(10,2) DEFAULT NULL,
  `date_paiement` datetime DEFAULT current_timestamp(),
  `mode_paiement` enum('especes','carte','virement','cheque') NOT NULL,
  `description` text DEFAULT NULL,
  `id_caissier` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference_paiement` (`reference_paiement`),
  KEY `id_credit` (`id_credit`),
  KEY `fk_caissier` (`id_caissier`),
  CONSTRAINT `fk_caissier` FOREIGN KEY (`id_caissier`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL,
  CONSTRAINT `paiements_credits_ibfk_1` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permissions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(50) DEFAULT NULL,
  `element_name` varchar(100) DEFAULT NULL,
  `parent_element` varchar(100) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pistolets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pistolets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pompe_id` int(11) NOT NULL,
  `numero_pistolet` varchar(50) NOT NULL,
  `statut` enum('disponible','indisponible','maintenance') DEFAULT 'disponible',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nom_produit` varchar(50) NOT NULL DEFAULT 'Sans nom',
  `prix_unitaire` decimal(10,2) NOT NULL DEFAULT 0.00,
  `unite_mesure` varchar(10) DEFAULT 'Litre',
  `date_dernier_index` date DEFAULT NULL,
  `dernier_index` decimal(12,2) DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `pompe_id` (`pompe_id`),
  CONSTRAINT `pistolets_ibfk_1` FOREIGN KEY (`pompe_id`) REFERENCES `pompes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pompes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pompes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero_pompe` varchar(50) NOT NULL,
  `type_pompe` enum('sans plomb','gasoil','multi-produits') NOT NULL,
  `statut` enum('en_service','hors_service_temporaire','reserve','maintenance','hors_service_definitif') DEFAULT 'reserve',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_pompe` (`numero_pompe`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `postes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `produits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_barre` varchar(50) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `prix_achat` decimal(10,2) unsigned NOT NULL DEFAULT 0.00,
  `prix_vente` decimal(10,2) unsigned NOT NULL DEFAULT 0.00,
  `quantite_stock` int(10) unsigned NOT NULL DEFAULT 0,
  `seuil_alerte` int(10) unsigned NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  `date_modification` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `fournisseur_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_barre` (`code_barre`),
  UNIQUE KEY `code_barre_unique` (`code_barre`),
  KEY `fk_produits_categorie` (`categorie_id`),
  KEY `fk_produits_fournisseur` (`fournisseur_id`),
  CONSTRAINT `fk_produits_categorie` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_produits_fournisseur` FOREIGN KEY (`fournisseur_id`) REFERENCES `fournisseurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rapports_journaliers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rapports_journaliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_rapport` date NOT NULL,
  `pistolet_id` int(11) NOT NULL,
  `total_quantite` decimal(10,2) NOT NULL,
  `total_montant` decimal(10,2) NOT NULL,
  `nombre_postes` int(11) NOT NULL,
  `date_generation` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `pistolet_id` (`pistolet_id`),
  KEY `date_rapport` (`date_rapport`),
  CONSTRAINT `rapports_journaliers_ibfk_1` FOREIGN KEY (`pistolet_id`) REFERENCES `pistolets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reclamations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reclamations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `objet` varchar(255) NOT NULL,
  `raison` enum('service','produit','facturation','autre') NOT NULL,
  `description` text NOT NULL,
  `reference` varchar(50) NOT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  `statut` enum('nouveau','en_cours','resolu','fermer') DEFAULT 'nouveau',
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  KEY `id_client` (`id_client`),
  CONSTRAINT `reclamations_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `releves_postes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `releves_postes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `affectation_id` int(11) NOT NULL,
  `pistolet_id` int(11) NOT NULL,
  `index_ouverture` decimal(12,2) NOT NULL CHECK (`index_ouverture` >= 0),
  `index_fermeture` decimal(12,2) NOT NULL CHECK (`index_fermeture` >= `index_ouverture`),
  `date_heure_saisie` datetime DEFAULT current_timestamp(),
  `statut` enum('saisie','valide','annule') DEFAULT 'saisie',
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `affectation_id` (`affectation_id`),
  KEY `pistolet_id` (`pistolet_id`),
  CONSTRAINT `releves_postes_ibfk_1` FOREIGN KEY (`affectation_id`) REFERENCES `affectations` (`id`),
  CONSTRAINT `releves_postes_ibfk_2` FOREIGN KEY (`pistolet_id`) REFERENCES `pistolets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_vehicule` int(11) DEFAULT NULL,
  `quantite` decimal(10,2) DEFAULT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `date_transaction` datetime DEFAULT NULL,
  `preuve` varchar(255) DEFAULT NULL COMMENT 'Chemin vers la preuve photo de la transaction',
  `id_pompiste` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_vehicule` (`id_vehicule`),
  KEY `fk_pompiste` (`id_pompiste`),
  CONSTRAINT `fk_pompiste` FOREIGN KEY (`id_pompiste`) REFERENCES `utilisateurs` (`id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_vehicule`) REFERENCES `vehicules` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `utilisateurs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `numero_telephone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('gerant','Cogerant','caissier','pompiste','client') NOT NULL DEFAULT 'client',
  `temps_de_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active',
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehicules`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `immatriculation` varchar(20) NOT NULL,
  `marque` varchar(50) DEFAULT NULL,
  `type_vehicule` enum('voiture','camion','bus','moto') DEFAULT 'voiture',
  `qr_code` varchar(255) DEFAULT NULL,
  `id_credit` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `immatriculation` (`immatriculation`),
  UNIQUE KEY `qr_code` (`qr_code`),
  KEY `id_credit` (`id_credit`),
  CONSTRAINT `vehicules_ibfk_2` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ventes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_vente` datetime DEFAULT current_timestamp(),
  `montant_total` decimal(12,2) NOT NULL,
  `montant_paye` decimal(12,2) NOT NULL,
  `monnaie_rendue` decimal(10,2) GENERATED ALWAYS AS (`montant_paye` - `montant_total`) VIRTUAL,
  `mode_paiement` enum('ESPECES','CARTE','CHEQUE') NOT NULL DEFAULT 'ESPECES',
  `id_caissier` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_caissier` (`id_caissier`),
  CONSTRAINT `ventes_ibfk_1` FOREIGN KEY (`id_caissier`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-07 16:21:35
