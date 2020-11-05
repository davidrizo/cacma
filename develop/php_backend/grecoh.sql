-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 05, 2020 at 10:54 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grecoh`
--

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_painter`
--

CREATE TABLE `grecoh_painter` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `comments` varchar(2048) DEFAULT NULL,
  `slug` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_painter`
--

INSERT INTO `grecoh_painter` (`id`, `name`, `comments`, `slug`) VALUES
(1, 'El Greco', NULL, 'greco'),
(2, 'Paul Cézanne', NULL, 'cezanne'),
(3, 'Goya', NULL, 'goya'),
(4, 'Ana Galvañ', NULL, 'ana_galvan'),
(7, 'John Petch', NULL, 'john_petch'),
(8, '', NULL, ''),
(9, 'Elena Odriozola', NULL, 'elena_odriozola');

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_painting`
--

CREATE TABLE `grecoh_painting` (
  `id` bigint(20) NOT NULL,
  `title` varchar(256) NOT NULL,
  `comments` varchar(2048) DEFAULT NULL,
  `painter_id` int(11) NOT NULL,
  `painting_version_id` bigint(20) DEFAULT NULL,
  `slug` varchar(128) NOT NULL COMMENT 'Machine name of the painting',
  `url` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_painting`
--

INSERT INTO `grecoh_painting` (`id`, `title`, `comments`, `painter_id`, `painting_version_id`, `slug`, `url`) VALUES
(2, 'Naturaleza muerta, jarro y fruta en una mesa ', NULL, 2, 3, 'naturaleza_jarro_fruta_mesa', NULL),
(4, 'Palmera Fest', NULL, 4, 12, 'palmera_fest', 'https://anagalvan.com/Palmera-Fest-1'),
(5, 'OMD: The punishment of luxury', NULL, 7, 29, 'omd_punishment_of_luxury', 'https://www.johnpetch.com/about1-c1r40'),
(6, 'Pablo Neruda: \"Oda a una estrella\"', NULL, 9, 15, 'neruda_oda_a_una_estrella', 'https://elblogdepizcadepapel.blogspot.com/2010/01/recomendacion-album-ilustrado-oda-una.html'),
(7, 'El expolio', NULL, 1, 22, 'expolio', 'http://ciudaddelastresculturastoledo.blogspot.com/2014/01/el-expolio-de-el-greco.html');

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_painting_version`
--

CREATE TABLE `grecoh_painting_version` (
  `id` bigint(20) NOT NULL,
  `color_hexa` char(6) NOT NULL COMMENT 'RRGGBB without #',
  `comments` varchar(2048) DEFAULT NULL,
  `painting_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_painting_version`
--

INSERT INTO `grecoh_painting_version` (`id`, `color_hexa`, `comments`, `painting_id`) VALUES
(3, 'fed206', NULL, 2),
(4, 'd13f37', NULL, 2),
(5, 'd4f5d8', NULL, 2),
(6, 'f3726e', NULL, 2),
(7, '75a399', NULL, 2),
(8, '6ff48c', NULL, 4),
(9, '33b7e4', NULL, 4),
(10, 'fa6027', NULL, 4),
(11, 'fecbdc', NULL, 4),
(12, 'fef31f', NULL, 4),
(13, '5b9288', NULL, 6),
(14, '596d78', NULL, 6),
(15, 'a23f25', NULL, 6),
(16, 'b99000', NULL, 6),
(17, 'd7a177', NULL, 6),
(18, '7a8fc1', NULL, 7),
(19, '76a03d', NULL, 7),
(20, '7397a9', NULL, 7),
(21, 'db5257', NULL, 7),
(22, 'dcb147', NULL, 7),
(23, 'de6d58', NULL, 7),
(24, '0eb2ab', NULL, 5),
(25, '2b1635', NULL, 5),
(26, '177bc8', NULL, 5),
(27, 'c5cd08', NULL, 5),
(28, 'e6213c', NULL, 5),
(29, 'fbdc05', NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_user_painting_version_score`
--

CREATE TABLE `grecoh_user_painting_version_score` (
  `email` varchar(512) NOT NULL,
  `painting_version_id` bigint(20) NOT NULL,
  `score` int(11) NOT NULL,
  `comments` varchar(4196) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grecoh_painter`
--
ALTER TABLE `grecoh_painter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `painter_name_uk` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `grecoh_painting`
--
ALTER TABLE `grecoh_painting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `painter_id` (`painter_id`,`slug`),
  ADD KEY `painter_id_idx` (`painter_id`),
  ADD KEY `correct_version_idx` (`painting_version_id`);

--
-- Indexes for table `grecoh_painting_version`
--
ALTER TABLE `grecoh_painting_version`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `color_hexa` (`color_hexa`,`painting_id`),
  ADD KEY `idx_painting_id` (`painting_id`);

--
-- Indexes for table `grecoh_user_painting_version_score`
--
ALTER TABLE `grecoh_user_painting_version_score`
  ADD PRIMARY KEY (`email`,`painting_version_id`),
  ADD KEY `fk_version` (`painting_version_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grecoh_painter`
--
ALTER TABLE `grecoh_painter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `grecoh_painting`
--
ALTER TABLE `grecoh_painting`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `grecoh_painting_version`
--
ALTER TABLE `grecoh_painting_version`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grecoh_painting`
--
ALTER TABLE `grecoh_painting`
  ADD CONSTRAINT `fk_painter` FOREIGN KEY (`painter_id`) REFERENCES `grecoh_painter` (`id`),
  ADD CONSTRAINT `fx_correct_version` FOREIGN KEY (`painting_version_id`) REFERENCES `grecoh_painting_version` (`id`);

--
-- Constraints for table `grecoh_painting_version`
--
ALTER TABLE `grecoh_painting_version`
  ADD CONSTRAINT `fk_painting` FOREIGN KEY (`painting_id`) REFERENCES `grecoh_painting` (`id`);

--
-- Constraints for table `grecoh_user_painting_version_score`
--
ALTER TABLE `grecoh_user_painting_version_score`
  ADD CONSTRAINT `fk_version` FOREIGN KEY (`painting_version_id`) REFERENCES `grecoh_painting_version` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
