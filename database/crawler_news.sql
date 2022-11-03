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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(2500) NOT NULL,
  `shortDescription` varchar(255) DEFAULT NULL,
  `img` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Test news 1','Test news 1',NULL,'d1435ee5-2ac0-4eb8-ac58-35a979c4df80.jpg',NULL,NULL,'2022-10-26 19:48:12','2022-10-26 19:48:12'),(2,'Test news 2','Test news 2',NULL,'5569e00b-b10b-456b-a692-e451ee8e3479.jpg',NULL,NULL,'2022-10-26 19:48:21','2022-10-26 19:48:21'),(3,'Test news 3','Test news 3',NULL,'fb3861de-835f-4eb9-99dc-595d41ff043b.jpg',NULL,NULL,'2022-10-26 19:48:30','2022-10-26 19:48:30'),(4,'Test news 4','Test news 4',NULL,'9f833230-aafc-4ee6-be57-a4de562768c6.jpg',NULL,NULL,'2022-10-26 19:48:38','2022-10-26 19:48:38'),(5,'Test news 5','Test news 5',NULL,'ba7d1c32-bc0b-45a6-abf9-51e14b241090.jpg',NULL,NULL,'2022-10-26 19:48:45','2022-10-26 19:48:45'),(6,'Test news 1','Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1Test news 1',NULL,'4321980c-c752-4180-b34b-900f439d17fe.jfif',NULL,NULL,'2022-10-26 19:52:55','2022-10-26 19:52:55'),(7,'My new news','My new news',NULL,'564e7f55-6c26-430d-9e54-7151c8648d9a.png',NULL,NULL,'2022-11-01 14:53:33','2022-11-01 14:53:33');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
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
