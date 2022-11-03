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
-- Table structure for table `apartments`
--

DROP TABLE IF EXISTS `apartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `square` int NOT NULL,
  `leavingRoom` int NOT NULL,
  `metro` varchar(255) DEFAULT '-',
  `parkingSpace` varchar(255) DEFAULT NULL,
  `yearBuilt` int DEFAULT NULL,
  `bathroom` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `rentalPeriod` varchar(255) NOT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `floor` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `premium` tinyint(1) DEFAULT '0',
  `ownerName` varchar(255) DEFAULT NULL,
  `ownerPhone` varchar(255) DEFAULT NULL,
  `ownerImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `apartments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartments`
--

LOCK TABLES `apartments` WRITE;
/*!40000 ALTER TABLE `apartments` DISABLE KEYS */;
INSERT INTO `apartments` VALUES (2,'Test ad 2',650,55,1,'undefined','yes',1987,1,'Minsk, Беларусь','long-term','Descr 2','5','Minsk',1,1,'ALIAKSEI','80445166489','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-10-25 11:48:57','2022-11-01 14:53:54'),(3,'Test ad 3',990,65,2,'Nemiga','no',1989,1,'улица Немига 6, Минск, Беларусь','long-term','My test ad','7','Minsk',1,1,'ALIAKSEI','80445166489','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-10-25 19:50:50','2022-10-30 20:04:38'),(4,'Gomel test ad',970,54,1,'-','no',2000,1,'Gomel, Беларусь','long-term','Gomel test ad','2','Gomel',1,1,'ALIAKSEI','80445166489','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-10-27 19:07:52','2022-11-01 05:59:18'),(5,'My apartment',950,43,1,'Nemiga','no',2001,1,'улица Немига 6, Минск, Беларусь','short-term','My description','7','Minsk',5,0,'ALIAKSEI','80445166489','6278e8f3-f1df-477b-a70f-e57ad0a79ae5.jpg','2022-10-31 16:26:09','2022-11-01 14:53:58'),(6,'1-bedroom apartment for rent in St Albans',750,59,2,'Nemiga','no',2001,1,'улица Немига 6, Минск, Беларусь','long-term','Furnished 2-bedroom apartment for rent on Everard Cl. The property is on the 2nd floor of a building with elevator.','2','Minsk',1,0,'ALIAKSEI','80445166488','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-11-01 12:09:35','2022-11-01 12:09:35'),(7,'Sun-drenched 1-bedroom apartment for rent',1200,75,3,'Pobeda Square','no',1977,1,'улица Козлова 2, Минск, Беларусь','long-term','Spotahome\'s opinion\r\nThe landmark retreat\r\n\r\nBecause I want everything at my fingertips\r\n\r\nWill I like it here?\r\n\r\nMaybe. Do you want to be within easy reach of all the main landmarks? Living in this sunny apartment means you’ll be well connected to the rest of the city.\r\n\r\nReally? Tell me more...\r\n\r\nYour open plan living and dining area is awash in natural light. That will help keep those electricity bills down. You also get an equipped modern kitchen with an oven.\r\n\r\nWe think this place is ideal for city workers in need of a little zen. Here you’re pretty much guaranteed a good night’s sleep. The best bit? There’s parking available onsite.\r\n\r\nYour top 3 reasons to live here:\r\n\r\nIt’s worlds away from the hustle and bustle.\r\nNo hunting for a parking space.\r\nStroll to Lord’s Cricket Ground and take in an international test match.\r\nBut you need to know this...\r\n\r\nThere’s no TV – but there’s so much to see and do nearby.\r\nHelp me make up my mind...\r\n\r\nThis is a 3-bedroom apartment in Pobeda Place in Minsk. There’s a bright living and dining area, fully equipped kitchen, and a double bedroom\r\n\r\nIt’s ideal for professionals in need of a little peace and quiet. You’ll get a great night’s sleep. You can even park your car around here.','5','Minsk',1,0,'ALIAKSEI','80445166488','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-11-01 12:14:40','2022-11-01 12:14:40'),(8,'4 bedroom apartment to rent',650,82,4,'Molodejnaya','yes',2009,2,'улица Скрыганова 2б, Минск, Беларусь','long-term','RAM Estate are pleased to offer this newly refurbished, five-bedroom apartment located in a prestigious mansion building offering fabulous views over metro Molodeznaya\r\n\r\nIt comprises a double reception room, kitchen, breakfast room, five bedrooms, and two-family size bathrooms.\r\n\r\nAll of our tenants benefit from a dedicated building manager who is on hand to assist with any property related issues.','9','Minsk',1,0,'ALIAKSEI','80445166488','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-11-01 12:42:47','2022-11-01 12:42:47'),(9,'1 bedroom apartment to rent',390,37,1,'Urucha','no',2015,1,'Уручье 3, Минск, Беларусь','long-term','We\'re pleased to offer this modern one double bedroom first floor flat in a new development. The flat has a large open plan reception with fitted kitchen, modern bathroom, clean, tidy and a brilliant location minutes walk from park.\r\nAvailable 5 Dec 2022','12','Minsk',1,0,'ALIAKSEI','80445166488','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-11-01 12:46:39','2022-11-01 12:46:39'),(10,'luxury apartment for rent',590,76,3,'-','yes',2019,1,'улица Поповича 9, Гродно, Беларусь','long-term','Large partment set on one of Surbiton\'s most sought after roads. The apartment boasts a modern kitchen and bathroom along with direct access onto communal gardens. Located just a 10 minute walk to Surbiton mainline and available now.','4','Grodno',1,0,'ALIAKSEI','80445166488','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-11-01 12:48:47','2022-11-01 12:48:47'),(11,'top apartment in center Grodno',790,76,3,'-','no',2001,1,'улица Карла Маркса 29к1, Гродно, Беларусь','long-term','The property benefits from a separate kitchen and a shared outside space.\r\n\r\nExcellent transport links with local amenities. All bills are included, except the internet.','9','Grodno',1,0,'ALIAKSEI','80445166488','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-11-01 12:51:13','2022-11-01 12:51:13'),(12,'good apartment for good people',550,65,4,'-','yes',1994,1,'Молодежная улица 2, Гродно, Беларусь','long-term','A stunning brand new interior designed, two bedroom, two bathroom first-floor apartment facing the courtyard set within this newly converted, warehouse style, gated development.\r\n\r\nThe apartment boasts a bright open-plan kitchen and living area, two bedrooms with en suite bathrooms and a separate WC. The fully fitted Metris Kitchen is complete with Miele appliances including an integrated dishwasher, washer/dryer, full-height fridge freezer, oven, hob, and integrated extractor fan as well as a wine cooler. The bathrooms comprise complete bathroom suites with underfloor heating, while the bedrooms boast bespoke mirrored wardrobes and automatic lighting. Further benefits of the apartment include a Crestron audio-visual system, a digital video door entry system, and pre-wiring for Sky + TV.','9','Grodno',1,0,'ALIAKSEI','80445166488','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-11-01 12:53:19','2022-11-01 12:53:19'),(13,'Flat to rent',770,65,3,'-','yes',2010,1,'улица Дарвина 26, Гродно, Беларусь','long-term','This flat is located in the heart of Grodno. Even though it is on the ultra trendy and bustling Kings Road it is still very quiet as it has double glazing and placed in the back of the building overlooking the residential Burnsall Street. The flat benefits from a fully fitted kitchen with a dishwasher, washer drier, hob and oven.','6','Grodno',1,0,'ALIAKSEI','80445166488','e7e51f6a-2e7e-4bec-9f71-ff463f224173.jpg','2022-11-01 12:57:06','2022-11-01 12:57:06'),(14,'Test add 123',700,56,1,'-','yes',1999,1,'Mogilev, Беларусь','long-term','Any description 123','6','Mogilev',6,0,'ALIAKSEI','80445166489','0f9e854f-ecb1-443e-b6a0-964bbbc19387.jpg','2022-11-01 14:51:22','2022-11-01 14:52:28');
/*!40000 ALTER TABLE `apartments` ENABLE KEYS */;
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
