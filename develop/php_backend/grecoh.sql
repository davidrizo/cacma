-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 17, 2021 at 06:54 PM
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
-- Table structure for table `grecoh_collaborator`
--

CREATE TABLE `grecoh_collaborator` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_collaborator`
--

INSERT INTO `grecoh_collaborator` (`id`, `name`, `email`) VALUES
(1, 'Mario Rodríguez Ruiz', 'mariorodriguez@easda.es'),
(2, 'David Rizo Valero', 'david.rizo@easda.es');

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_experiment`
--

CREATE TABLE `grecoh_experiment` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `final_comment` varchar(2048) NOT NULL,
  `user_comments_caption` varchar(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_experiment`
--

INSERT INTO `grecoh_experiment` (`id`, `name`, `final_comment`, `user_comments_caption`) VALUES
(1, 'Semejanza de color', 'Hemos elegido estas imágenes porque las personas que las compusieron dispusieron elementos del mismo color estratégicamente. Según la ley de Semejanza de  la Gestalt, tendemos a percibir como conjuntos coherentes los elementos que guardan entre sí algún tipo de similitud.  En las imágenes de la aplicación, podemos ver como elementos de color semejantes definen líneas y polígonos, los cuales les proporcionan simultáneamente unidad y variedad,  equilibrio y movimiento.<br>\r\nTe animamos a que descubras este mecanismo en otras creaciones gráfico-plásticas, y a aplicarlos en tus propios trabajos.<br>\r\nMuchas gracias por tu participación.', 'En la composición de las imágenes que has visto, el color fue utilizado con una estrategia  determinada. ¿Podrías decir cuál es? - TODO: en el nivel 2 es otra');

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_experiment_level`
--

CREATE TABLE `grecoh_experiment_level` (
  `id` int(11) NOT NULL,
  `ordering` int(11) NOT NULL,
  `experiment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_experiment_level`
--

INSERT INTO `grecoh_experiment_level` (`id`, `ordering`, `experiment_id`) VALUES
(1, 1, 1),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_experiment_level_question`
--

CREATE TABLE `grecoh_experiment_level_question` (
  `id` int(11) NOT NULL,
  `ordering` int(11) NOT NULL,
  `question` varchar(512) NOT NULL,
  `level_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_experiment_level_question`
--

INSERT INTO `grecoh_experiment_level_question` (`id`, `ordering`, `question`, `level_id`) VALUES
(1, 1, 'En la composición de las imágenes que has visto, el color fue utilizado con una estrategia  determinada. ¿Podrías decir cuál es?', 1),
(2, 1, 'Observando la estrategia seguida en estas imágenes del nivel 2 ¿Podrías contarnos qué diferencia ves respecto a las del nivel 1?', 2);

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_experiment_level_question_user`
--

CREATE TABLE `grecoh_experiment_level_question_user` (
  `email` varchar(128) NOT NULL,
  `answer` varchar(2048) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_experiment_level_question_user`
--

INSERT INTO `grecoh_experiment_level_question_user` (`email`, `answer`, `question_id`) VALUES
('david.rizo@easda.es', 'Esto es una prueba', 1),
('david.rizo@easda.es', 'Otra prueba', 2),
('drizo@gcloud.ua.es', 'A111', 1),
('drizo@gcloud.ua.es', 'A222', 2);

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
(8, 'Annie Leibovitz', NULL, 'leibovitz'),
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
  `url` varchar(512) DEFAULT NULL,
  `level_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_painting`
--

INSERT INTO `grecoh_painting` (`id`, `title`, `comments`, `painter_id`, `painting_version_id`, `slug`, `url`, `level_id`) VALUES
(2, 'Naturaleza muerta, jarro y fruta en una mesa ', NULL, 2, 3, 'naturaleza_jarro_fruta_mesa', NULL, 1),
(4, 'Palmera Fest', NULL, 4, 12, 'palmera_fest', 'https://anagalvan.com/Palmera-Fest-1', 2),
(5, 'OMD: The punishment of luxury', NULL, 7, 29, 'omd_punishment_of_luxury', 'https://www.johnpetch.com/about1-c1r40', 1),
(6, 'Pablo Neruda: \"Oda a una estrella\"', NULL, 9, 15, 'neruda_oda_a_una_estrella', 'https://elblogdepizcadepapel.blogspot.com/2010/01/recomendacion-album-ilustrado-oda-una.html', 1),
(7, 'El expolio', NULL, 1, 22, 'expolio', 'http://ciudaddelastresculturastoledo.blogspot.com/2014/01/el-expolio-de-el-greco.html', 2),
(8, 'Zoolander No2: Vogue', 'Annie Leibovitz: Fofografía incluida en el reportaje publicado en la revista Vogue, como promoción de la película Zoolander 2, 2016.', 8, 30, 'zoolander2_vogue', NULL, 1);

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
(29, 'fbdc05', NULL, 5),
(30, 'b0332d', NULL, 8),
(31, '30a5b9', NULL, 8),
(32, '907969', NULL, 8),
(33, '4ab52d', NULL, 8),
(34, 'b7bb32', NULL, 8);

-- --------------------------------------------------------

--
-- Table structure for table `grecoh_user_painting_version_score`
--

CREATE TABLE `grecoh_user_painting_version_score` (
  `email` varchar(512) NOT NULL,
  `painting_version_id` bigint(20) NOT NULL,
  `score` int(11) NOT NULL,
  `comments` varchar(4196) DEFAULT NULL,
  `collaborator_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grecoh_user_painting_version_score`
--

INSERT INTO `grecoh_user_painting_version_score` (`email`, `painting_version_id`, `score`, `comments`, `collaborator_id`) VALUES
('david.rizo@easda.es', 3, 5, '', 2),
('david.rizo@easda.es', 4, 4, '', 2),
('david.rizo@easda.es', 5, 3, '', 2),
('david.rizo@easda.es', 6, 2, '', 2),
('david.rizo@easda.es', 7, 1, '', 2),
('david.rizo@easda.es', 8, 3, '', 2),
('david.rizo@easda.es', 9, 1, '', 2),
('david.rizo@easda.es', 10, 4, '', 2),
('david.rizo@easda.es', 11, 2, '', 2),
('david.rizo@easda.es', 12, 5, '', 2),
('david.rizo@easda.es', 13, 3, '', 2),
('david.rizo@easda.es', 14, 3, '', 2),
('david.rizo@easda.es', 15, 3, '', 2),
('david.rizo@easda.es', 16, 3, '', 2),
('david.rizo@easda.es', 17, 3, '', 2),
('david.rizo@easda.es', 18, 3, '', NULL),
('david.rizo@easda.es', 19, 3, '', NULL),
('david.rizo@easda.es', 20, 4, '', NULL),
('david.rizo@easda.es', 21, 4, '', NULL),
('david.rizo@easda.es', 22, 5, '', NULL),
('david.rizo@easda.es', 23, 3, '', NULL),
('david.rizo@easda.es', 24, 1, '', 2),
('david.rizo@easda.es', 25, 2, '', 2),
('david.rizo@easda.es', 26, 3, '', 2),
('david.rizo@easda.es', 27, 4, '', 2),
('david.rizo@easda.es', 28, 5, '', 2),
('david.rizo@easda.es', 29, 5, '', 2),
('david.rizo@easda.es', 30, 1, '', 2),
('david.rizo@easda.es', 31, 3, '', 2),
('david.rizo@easda.es', 32, 4, '', 2),
('david.rizo@easda.es', 33, 2, '', 2),
('david.rizo@easda.es', 34, 4, '', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grecoh_collaborator`
--
ALTER TABLE `grecoh_collaborator`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grecoh_experiment`
--
ALTER TABLE `grecoh_experiment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_experiment_name` (`name`);

--
-- Indexes for table `grecoh_experiment_level`
--
ALTER TABLE `grecoh_experiment_level`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`ordering`,`experiment_id`),
  ADD KEY `IDX_LEVEL_EXPERIMENT` (`experiment_id`);

--
-- Indexes for table `grecoh_experiment_level_question`
--
ALTER TABLE `grecoh_experiment_level_question`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ordering` (`ordering`,`level_id`),
  ADD KEY `IDX_QUESTION_LEVEL` (`level_id`);

--
-- Indexes for table `grecoh_experiment_level_question_user`
--
ALTER TABLE `grecoh_experiment_level_question_user`
  ADD UNIQUE KEY `pk_questions` (`email`,`question_id`) USING BTREE,
  ADD KEY `IDX_LEVEL_USER` (`question_id`);

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
  ADD KEY `correct_version_idx` (`painting_version_id`),
  ADD KEY `level_id` (`level_id`);

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
  ADD KEY `fk_version` (`painting_version_id`),
  ADD KEY `fk_collaborator` (`collaborator_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grecoh_collaborator`
--
ALTER TABLE `grecoh_collaborator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `grecoh_experiment`
--
ALTER TABLE `grecoh_experiment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `grecoh_experiment_level`
--
ALTER TABLE `grecoh_experiment_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `grecoh_experiment_level_question`
--
ALTER TABLE `grecoh_experiment_level_question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `grecoh_painter`
--
ALTER TABLE `grecoh_painter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `grecoh_painting`
--
ALTER TABLE `grecoh_painting`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `grecoh_painting_version`
--
ALTER TABLE `grecoh_painting_version`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grecoh_experiment_level`
--
ALTER TABLE `grecoh_experiment_level`
  ADD CONSTRAINT `FK_LEVEL_EXPERIMENT` FOREIGN KEY (`experiment_id`) REFERENCES `grecoh_experiment` (`id`);

--
-- Constraints for table `grecoh_experiment_level_question_user`
--
ALTER TABLE `grecoh_experiment_level_question_user`
  ADD CONSTRAINT `FK_QUESTION_USER` FOREIGN KEY (`question_id`) REFERENCES `grecoh_experiment_level_question` (`id`);

--
-- Constraints for table `grecoh_painting`
--
ALTER TABLE `grecoh_painting`
  ADD CONSTRAINT `fk_level` FOREIGN KEY (`level_id`) REFERENCES `grecoh_experiment_level` (`id`),
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
