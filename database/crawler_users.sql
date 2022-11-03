-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: crawler
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT 'USER',
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ADMIN','ALIAKSEI','ARTSIUSH','artush.alexey@gmail.com','$2b$05$Miglt0Vu3j1cG4lXPDeEzOwj1Vz.MIWQd8jrrfVoeT5fh4qKME3LW','Minsk','Men','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','80445166488','2022-10-25 07:14:27','2022-10-28 19:29:59'),(2,'ADMIN','ALIAKSEI','ARTSIUSH','art@gmail.com','$2b$05$uRQMTGMADO8FNj0AY5SeXOFd7lkZUNCaFdL0J/HsLEDwivG1sWaNO','Minsk','Men','8df05469-e4a6-42a4-9c64-c18846403c37.jpg','80445166489','2022-10-25 21:09:29','2022-10-25 21:09:29'),(3,'ADMIN','ALIAKSEI','ARTSIUSH','art.alexey@gmail.com','$2b$05$hshZBDv/MfavKle9tob6D.2jjKZK.w7Z.Nw/2k7sjGGJ.BAdCA2jq','Minsk','Men','55c774e9-ae67-4235-86a6-434446d44161.jpg','80445166489','2022-10-31 15:50:53','2022-10-31 15:50:53'),(4,'USER','ALIAKSEI','ARTSIUSH','alexey@gmail.com','$2b$05$.EOEQtNAEcpvhGHJnxdou..whyOYclUsAcp0irTd25GS.RDx8eZW2','Minsk','Men','46a04ca1-26fd-467f-8dc3-02e4365315c4.jpg','80445166489','2022-10-31 15:54:08','2022-10-31 15:54:08'),(5,'USER','ALIAKSEI','ARTSIUSH','a.alexey@gmail.com','$2b$05$Ttav3higgOAW41dNBbs.POF9UFLvIF4sITY8iNk6nUBoqjeVm7VRW','Minsk','Men','6278e8f3-f1df-477b-a70f-e57ad0a79ae5.jpg','80445166489','2022-10-31 16:16:43','2022-10-31 16:16:43'),(6,'USER','ALIAKSEI','ARTSIUSH','alexey.art@gmail.com','$2b$05$AkWCtbMMRvEGcZj3rz0tROW0Wbe50M.RmazC3ZWx5OqKi3qLEVCti','Minsk','Men','0f9e854f-ecb1-443e-b6a0-964bbbc19387.jpg','80445166489','2022-11-01 14:48:13','2022-11-01 14:48:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-01 18:16:22
