-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2025 at 06:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testoefl`
--

-- --------------------------------------------------------

--
-- Table structure for table `soals`
--

CREATE TABLE `soals` (
  `id` int(11) NOT NULL,
  `soal` varchar(4000) NOT NULL,
  `pilihan_satu` varchar(255) NOT NULL,
  `pilihan_dua` varchar(255) NOT NULL,
  `pilihan_tiga` varchar(255) NOT NULL,
  `pilihan_empat` varchar(255) NOT NULL,
  `jawaban` varchar(255) NOT NULL,
  `page` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `audio` varchar(255) NOT NULL,
  `q_reading` int(11) NOT NULL,
  `no_soal` int(11) NOT NULL,
  `paket_soal_id` int(11) DEFAULT NULL,
  `kategori` varchar(32) NOT NULL DEFAULT 'listening'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `soals`
--

INSERT INTO `soals` (`id`, `soal`, `pilihan_satu`, `pilihan_dua`, `pilihan_tiga`, `pilihan_empat`, `jawaban`, `page`, `createdAt`, `updatedAt`, `audio`, `q_reading`, `no_soal`, `paket_soal_id`, `kategori`) VALUES
(1, '', 'She doesn\'t want to do it', 'It is simple to do', 'She doesn\'t know what it is', 'It is fun to watch', '2', 1, '2024-11-17 01:08:31', '2024-11-17 01:08:31', '/uploads/audioSoal/number-1.mp3', 0, 1, 1, 'listening'),
(2, '', 'editssss', 'edit', 'edit', 'edit', '1', 2, '2024-11-17 01:09:20', '2025-07-02 03:39:29', '/uploads/audioSoal/number-2.mp3', 0, 2, 1, 'listening'),
(3, '', 'Not fighting anymore.', 'Flying in the fall instead.', 'Training the pets.', 'Going by railroad', '4', 3, '2024-11-20 17:03:52', '2024-11-20 17:03:52', '/uploads/audioSoal/number-3.mp3', 0, 3, 1, 'listening'),
(4, '', 'They had some soup', 'They gave her a present.', 'They have been fed.', 'They prepare supper.', '3', 4, '2024-11-20 17:03:52', '2024-11-20 17:03:52', '/uploads/audioSoal/number-4.mp3', 0, 4, 1, 'listening'),
(5, '', 'She was mainly at home.', 'She stayed at school during vacation.', 'She went camping during the holidays.', 'She was captain of the team for the remaining days', '2', 5, '2024-11-24 17:39:05', '2024-11-24 17:39:05', '/uploads/audioSoal/number-5.mp3', 0, 5, 1, 'listening'),
(6, '', 'A doctor.', 'A secretary', 'A waiter', 'A police officer', '1', 6, '2024-11-25 01:40:26', '2024-11-25 01:40:26', '/uploads/audioSoal/number-6.mp3', 0, 6, 1, 'listening'),
(7, '', 'The stereo is chipped.', 'He\'s going to try the system.', 'The stereo\'s too expensive.', 'He decided to buy the system.', '3', 7, '2024-11-25 01:40:26', '2024-11-25 01:40:26', '/uploads/audioSoal/number-7.mp3', 0, 7, 1, 'listening'),
(8, '', 'Sing a little louder.', 'Start the song one more time.', 'Begin studying music.', 'Try to learn to play the game.', '2', 8, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-8.mp3', 0, 8, 1, 'listening'),
(9, '', 'Mail the papers quickly.', 'Send the information to the newspaper office.', 'Wrap a box in tissue paper.', 'Read the papers soon.', '1', 9, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-9.mp3', 0, 9, 1, 'listening'),
(10, '', 'He doesn\'t like to talk about work.', 'He works very hard at school.', 'He goes to the same school as the woman.', 'He agrees with the woman.', '4', 10, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-10.mp3', 0, 10, 1, 'listening'),
(11, '', 'In a department store.', 'In a barber shop.', 'In a flower shop.', ' In a restaurant.', '2', 11, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-11.mp3', 0, 11, 1, 'listening'),
(12, '', 'She\'s not running.', 'Her hat is not ruined.', 'The weather is dry.', 'It\'s going to rain.', '3', 12, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-12.mp3', 0, 12, 1, 'listening'),
(13, '', 'No more money can be spent.', 'The money has to last.', 'An estimation is satisfactory.', 'The numbers must be exact.', '4', 13, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-13.mp3', 0, 13, 1, 'listening'),
(14, '', 'Robin is looking for a new car.', 'She thinks that Robin\'s car is pretty great, too.', 'Robin is certain about the changes.', 'The tire pressure in Robin\'s car is not right', '2', 14, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-14.mp3', 0, 14, 1, 'listening'),
(15, '', 'The desk is disorganized.', 'He needs to measure the desk', 'Wanda\'s dress is a mess.', 'Wanda\'s always at her desk.', '1', 15, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-15.mp3', 0, 15, 1, 'listening'),
(16, '', 'A detective.', ' A store clerk.', 'A librarian.', 'A writer.', '3', 16, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-16.mp3', 0, 16, 1, 'listening'),
(17, '', 'Buying a new computer.', 'Attending a course.', 'Watching a television program.', 'Computing the correct answer.', '2', 17, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-17.mp3', 0, 17, 1, 'listening'),
(18, '', 'He is trying to become a ticket agent.', 'All the tickets have been sold.', 'The ticket agent bought the tickets.', 'He was able to sell his concert tickets', '2', 18, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-18.mp3', 0, 18, 1, 'listening'),
(19, '', 'He dropped out of school.', 'He wanted to know when school ended.', 'He questioned her reasons.', 'He dropped her off at school', '3', 19, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-19.mp3', 0, 19, 1, 'listening'),
(20, '', 'The post office was close by.', 'She was scared of what was in the package', 'The post office was closed when she got there.', 'She was able to send the package', '4', 20, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-20.mp3', 0, 20, 1, 'listening'),
(21, '', 'He was late for the boat.', 'He could have taken the boat to the bank', 'He lost a good oppoturnity', 'He missed seeing his friend at the bank', '3', 21, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-21.mp3', 0, 21, 1, 'listening'),
(22, '', 'Her best guess is that the lecture\'s about to start.', 'She\'s not really sure.', 'The man\'s lecture is as good as hers.', 'She guesses the lecture will be good.', '2', 22, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-22.mp3', 0, 22, 1, 'listening'),
(23, '', 'He\'s heard of a new program for next semester', 'It\'s been done before.', 'Only fools take five courses.', 'He can handle four courses.', '2', 23, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-23.mp3', 0, 23, 1, 'listening'),
(24, '', 'They should visit their new neighbors.', 'The new family called to her.', 'They should move to the apartment across the hall.', 'It would be a good idea to phone the new family.', '1', 24, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-24.mp3', 0, 24, 1, 'listening'),
(25, '', 'The police officer didn\'t really stop him', 'He is quite unhappy about what happened.', 'He\'s not unhappy even though he got a ticket.', 'He didn\'t get a ticket.', '4', 25, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-25.mp3', 0, 25, 1, 'listening'),
(26, '', 'He should have his head examined.', 'He should run in the race, too.', 'He needs to hit the nails harder.', 'He\'s exactly right.', '4', 26, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-26.mp3', 0, 26, 1, 'listening'),
(27, '', 'The scholarship was not a surprise.', 'He was amazed that he won.', 'The music was surprisingly beautiful.', 'The Music Department won a prize.', '2', 27, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-27.mp3', 0, 27, 1, 'listening'),
(28, '', 'He has a date tonight.', 'He needs to brush off his clothes.', 'He knows the date of the history exam.', 'He needs to review a bit.', '4', 28, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-28.mp3', 0, 28, 1, 'listening'),
(29, '', 'He would not attend the wedding.', 'He had already made the decision to go.', 'He was deciding what to wear.', 'He would wear a different suit to the wedding.', '1', 29, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-29.mp3', 0, 29, 1, 'listening'),
(30, '', 'It wasn\'t really his first time skiing.', 'He didn\'t try the steepest slope.', 'He tried to do too much.', 'He didn\'t need to learn how to ski.', '3', 30, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-30.mp3', 0, 30, 1, 'listening'),
(31, '', 'At a museum.', 'In the park.', 'At a shopping center.', 'In an artist\'s studio.', '2', 31, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-31.mp3', 0, 31, 1, 'listening'),
(32, '', 'Every afternoon.', 'Each week.', 'Twice a month.', 'Once a year.', '4', 32, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-32.mp3', 0, 32, 1, 'listening'),
(33, '', 'Paintings.', 'Jewelry.', 'Animals.', 'Pottery.', '3', 33, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-33.mp3', 0, 33, 1, 'listening'),
(34, '', 'Buy something.', 'Lose her wallet.', 'Head for home.', ' Stay away from the fair.', '1', 34, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-34.mp3', 0, 34, 1, 'listening'),
(35, '', 'He\'s attending the same physics lecture as she is.', 'He knows about the physics course.', 'He works in the physics laboratory.', 'They are working on a lab report together.', '2', 35, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-35.mp3', 0, 35, 1, 'listening'),
(36, '', 'One.', 'Two.', 'Three.', 'Four.', '3', 36, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-36.mp3', 0, 36, 1, 'listening'),
(37, '', 'One.', 'Two.', 'Three.', 'Four.', '4', 37, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-37.mp3', 0, 37, 1, 'listening'),
(38, '', 'It is fun.', 'It is interesting.', 'It requires little time.', 'It is difficult to understand.', '2', 38, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-38.mp3', 0, 38, 1, 'listening'),
(39, '', 'Just before the start of the semester.', 'Just before class.', 'At the end of a class.', 'After the end of the semester.', '3', 39, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-39.mp3', 0, 39, 1, 'listening'),
(40, '', 'Two days.', 'Two weeks.', 'Two months.', 'Two semesters.', '3', 40, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-40.mp3', 0, 40, 1, 'listening'),
(41, '', 'By seven o\'clock.', 'By five o\'clock.', 'By ten o\'clock.', 'By twelve o\'clock.', '2', 41, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-41.mp3', 0, 41, 1, 'listening'),
(42, '', 'Ten.', 'Eleven.', 'Twelve.', 'Thirteen.', '4', 42, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-42.mp3', 0, 42, 1, 'listening'),
(43, '', 'They fight fires.', 'They start fires.', 'They smoke.', 'They build roads.', '1', 43, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-43.mp3', 0, 43, 1, 'listening'),
(44, '', 'By walking.', 'By firetruck.', 'By road.', 'By parachute.', '4', 44, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-44.mp3', 0, 44, 1, 'listening'),
(45, '', 'When the fire is small.', 'When there are no roads leading to the fire.', 'When there is a lot of smoke.', 'When there is a lot of time to fight the fire.', '2', 45, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-45.mp3', 0, 45, 1, 'listening'),
(46, '', 'Rest.', 'Return to their airplanes.', 'Walk to a road.', 'Go for a parachute jump.', '3', 46, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-46.mp3', 0, 46, 1, 'listening'),
(47, '', 'Geology.', 'Biology.', 'Art History.', 'Food and Nutrition.', '1', 47, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-47.mp3', 0, 47, 1, 'listening'),
(48, '', 'By drilling into volcanoes.', 'By counting the layers of ice.', 'By studying volcanoes.', 'By dusting the glacier.', '2', 48, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-48.mp3', 0, 48, 1, 'listening'),
(49, '', 'Layers of rust.', 'Active volcanoes.', 'Volcanic dust.', 'Old drills.', '3', 49, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-49.mp3', 0, 49, 1, 'listening'),
(50, '', 'Visit a glacier.', 'Prepare for a test.', 'Learn about volcanoes.', 'Read the next chapter.', '4', 50, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '/uploads/audioSoal/number-50.mp3', 0, 50, 1, 'listening'),
(51, '____ on the first Saturday in May at Churchill Downs.', 'For the running of the Kentucky Derby.', 'The Kentucky Derby is run.', 'To run the Kentucky Derby.', 'When the Kentucky Derby is run.', '2', 52, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 1, 1, 'listening'),
(52, 'According to ____ quantum mechanics, it is normally impossible to pinpoint the orbit of an electron bond to an atom.', 'the related laws.', 'the laws are related.', 'the laws of.', 'the laws are related to.', '3', 53, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 2, 1, 'listening'),
(53, 'Chicago is home to more than 4 million people ____ as many as 54 languages and dialects.', 'speak.', 'they speak.', 'spoke.', 'speaking.', '4', 54, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 3, 1, 'listening'),
(54, 'When Mexico ceded California to the United States in 1848, signers of the treaty did not know ____ had been discovered there.', 'golden.', 'that with gold.', 'that gold.', 'with gold.', '3', 55, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 4, 1, 'listening'),
(55, 'Rubber came to the attention of Europeans ____ found Native Americans using it.', 'explorers.', 'after explorers.', 'when explored.', 'after explorers they.', '2', 56, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 5, 1, 'listening'),
(56, 'Most asteroids are located in ____ called the asteroid belt.', 'what is.', 'what is in.', 'is what.', 'is it.', '1', 57, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 6, 1, 'listening'),
(57, 'About three-fourths of the books published in the United States are put out by publishers ____ in New York City', 'locates.', 'located.', 'they locate.', 'they are located.', '2', 58, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 7, 1, 'listening'),
(58, 'The physical phenomenon ____ use to obtain water from the soil is osmosis.', 'plants have roots.', 'that plant roots.', 'what plant roots.', 'plants are rooted.', '2', 59, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 8, 1, 'listening'),
(59, 'More books have been written about the Civil War ____ any other war in history.', 'that there is.', 'about.', 'of.', 'than about.', '4', 60, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 9, 1, 'listening'),
(60, 'A sheet of clear glass ____ with a film of metal, results in a luminously clear miror.', 'when backed.', 'it is backed.', 'is backed.', 'when it is backed.', '1', 61, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 10, 1, 'listening'),
(61, 'The Liberty Bell ____ its own pavilion on Independence Mall, hung for nearly a century at Independence Hall.', 'that now has.', 'now has.', 'when does it have.', 'which now has.', '4', 62, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 11, 1, 'listening'),
(62, 'Not until about 8.000 years ago ____ come into use.', 'bronze tools for weapons.', 'bronze tools for weapons have.', 'bronze tools for weapons were to.', 'did bronze tools for weapons.', '4', 63, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 12, 1, 'listening'),
(63, 'The state of Michigan can rightfully claim to be a \"Water Wonderland\" ____ has a 3.121-mile shoreline.', 'because.', 'that.', 'in that it.', 'that it.', '3', 64, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 13, 1, 'listening'),
(64, '____ glacial sediment, the moister the surface soil becomes.', 'It is thicker.', 'In the thick.', 'The thicker the.', 'The thick.', '3', 65, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 14, 1, 'listening'),
(65, '____ cut away, the wheel could be strengthened with struts or crossbars.', 'Were large sections of a wheel.', 'Large sections of a wheel.', 'Large sections of a wheel were.', 'Large sections of a wheel to.', '1', 66, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 15, 1, 'listening'),
(66, '<div class=\"flex flex-wrap gap-1\"><p class=\"leading-4\">Various</p><p class=\"leading-4 text-center\"><u>chemical</u><br />A</p><p class=\"leading-4 text-center\"><u>element</u><br />B</p><p class=\"leading-4\">have more than</p><p class=\"leading-4 text-center\"><u>one</u><br />C</p><p class=\"leading-4 text-center\"><u>isotope</u><br />D</p></div>', '', '', '', '', '2', 68, '2024-11-27 05:35:14', '2024-11-27 05:35:14', '', 0, 16, 1, 'listening'),
(67, '<div class=\"flex flex-wrap gap-1\"><p class=\"leading-4\">Top management must</p><p class=\"leading-4 text-center\"><u>took</u><br />A</p><p class=\"leading-4\">a hard</p><p class=\"leading-4 text-center\"><u>look</u><br />B</p><p class=\"leading-4\">at</p><p class=\"leading-4 text-center\"><u>its</u><br />C</p><p class=\"leading-4\">current</p><p class=\"leading-4 text-center\"><u>product</u><br />D</p><p class=\"leading-4\">lines to see if resources can be</p><p class=\"leading-4\">reallocated.</p></div>', '', '', '', '', '1', 69, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 17, 1, 'listening'),
(68, '<div class=\'flex flex-wrap gap-1\'><p class=\'leading-4 text-center\'><u>Today,</u><br/>A</p><p class=\'leading-4\'>the glaciers of the world</p><p class=\'leading-4 text-center\'><u>occupies</u><br/>B</p><p class=\'leading-4 text-center\'><u>about</u><br/>C</p><p class=\'leading-4\'>10</p><p class=\'leading-4 text-center\'><u>percent</u><br/>D</p><p class=\'leading-4\'>of the Earth\'s surface</p></div>', '', '', '', '', '2', 70, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 18, 1, 'listening'),
(69, '<div class=\"flex flex-wrap gap-1\"><p class=\"leading-4\">Polystyrene</p><p class=\"leading-4 text-center\"><u>comes</u><br />A</p><p class=\"leading-4\">in both a</p><p class=\"leading-4 text-center\"><u>hard</u><br />B</p><p class=\"leading-4\">form</p><p class=\"leading-4 text-center\"><u>or</u><br />C</p><p class=\"leading-4\">a lightweight</p><p class=\"leading-4 text-center\"><u>foam.</u><br />D</p></div>', '', '', '', '', '3', 71, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 19, 1, 'listening'),
(70, '<div class=\"flex flex-wrap gap-1\"><p class=\"leading-4\">Although the bow and arrow were</p><p class=\"leading-4 text-center\"><u>first invented</u><br />A</p><p class=\"leading-4\">in the Mesolithic Period,</p><p class=\"leading-4 text-center\"><u>it</u><br />B</p><p class=\"leading-4\">continued to</p><p class=\"leading-4 text-center\"><u>be used</u><br />C</p><p class=\"leading-4\">for</p><p class=\"leading-4 text-center\"><u>hunting</u><br />D</p><p class=\"leading-4\">in the early Neolithic Period.</p></div>', '', '', '', '', '2', 72, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 20, 1, 'listening'),
(71, '<div class=\"flex flex-wrap gap-1\"><p class=\"leading-4 text-center\"><u>An</u><br />A</p><p class=\"leading-4\">understanding of latent heat</p><p class=\"leading-4 text-center\"><u>became</u><br />B</p><p class=\"leading-4 text-center\"><u>importantly</u><br />C</p><p class=\"leading-4\">in the</p><p class=\"leading-4 text-center\"><u>improvement</u><br />D</p><p class=\"leading-4\">of the steam engine.</p></div>', '', '', '', '', '3', 73, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 21, 1, 'listening'),
(72, '<div class=\"flex flex-wrap gap-1\"><p class=\"leading-4 text-center\"><u>Only</u><br />A</p><p class=\"leading-4\">a few</p><p class=\"leading-4 text-center\"><u>mineral</u><br />B</p><p class=\"leading-4\">can</p><p class=\"leading-4 text-center\"><u>resist</u><br />C</p><p class=\"leading-4\">weathering by rain water,</p><p class=\"leading-4 text-center\"><u>which is</u><br />D</p><p class=\"leading-4\">a weak acid.</p></div>', '', '', '', '', '2', 74, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 22, 1, 'listening'),
(73, '<div class=\"flex flex-wrap gap-1 leading-4 text-center\"><p>The Stanley brothers</p><p><u>built</u><br />A</p><p><u>their</u><br />B</p><p class=\"\">first small steam car in 1897, and 200</p><p><u>were</u><br />C</p><p><u>sell</u><br />D</p><p>by the end of the</p><p>first year.</p></div>', '', '', '', '', '4', 75, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 23, 1, 'listening'),
(74, '<div class=\"flex flex-wrap gap-1 leading-4 text-center\"><p>All of the Great Lakes</p><p><u>is</u><br />A</p><p>in the United States and Canada</p><p><u>except</u><br />B</p><p>Lake Michigan,</p><p><u>which</u><br />C</p><p>is</p><p><u>entirely</u><br />D</p><p>in the United States.</p></div>', '', '', '', '', '1', 76, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 24, 1, 'listening'),
(75, '<div class=\"flex flex-wrap gap-1 leading-4 text-center\"><p>Kangaroos sometimes</p><p><u>rest or groom</u><br />A</p><p><u>themselves</u><br />B</p><p>while they are sitting on</p><p><u>them</u><br />C</p><p>hind</p><p><u>legs</u><br />D</p></div>', '', '', '', '', '3', 77, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 25, 1, 'listening'),
(76, '<div class=\"flex flex-wrap gap-1 leading-4 text-center\"><p><u>Despite</u><br />A</p><p>the turmoil of the Civil War, the</p><p><u>relative</u><br />B</p><p>new game of \"base-ball\"</p><p><u>attracted</u><br />C</p><p>great</p><p><u>numbers</u><br />D</p><p>of spectators.</p></div>', '', '', '', '', '2', 78, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 26, 1, 'listening'),
(77, '<div class=\"flex flex-wrap gap-1 leading-4 text-center\"><p>Anyone</p><p><u>who</u><br />A</p><p><u>takes</u><br />B</p><p>the Rorschach test for personality traits</p><p><u>are asked</u><br />C</p><p>to interpret a</p><p><u>series</u><br />D</p><p>of inkblots.</p></div>', '', '', '', '', '3', 79, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 27, 1, 'listening'),
(78, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>Alexander Hamilton\'s financial program</p><p><u>included</u><br />A</p><p>a</p><p><u>central</u><br />B</p><p>bank to serve the Treasury, provide a</p><p>depository for public money, and</p><p><u>regulation of</u><br />C</p><p>the</p><p><u>currency.</u><br />D</p></div>', '', '', '', '', '3', 80, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 28, 1, 'listening'),
(79, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>In 1890, the city of Pasadena</p><p><u>has started</u><br />A</p><p><u>sponsorship</u><br />B</p><p>of the Tournament of Roses Parade</p><p><u>on</u><br />C</p><p>New</p><p>Year\'s</p><p><u>morning.</u><br />D</p></div>', '', '', '', '', '1', 81, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 29, 1, 'listening'),
(80, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>The Louisiana state</p><p><u>legal</u><br />A</p><p>system is based</p><p><u>with</u><br />B</p><p>the</p><p><u>legal</u><br />C</p><p>system</p><p><u>established</u><br />D</p><p>by Napoleon.</p></div>', '', '', '', '', '2', 82, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 30, 1, 'listening'),
(81, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>The White House was</p><p><u>designed</u><br />A</p><p>by James Hobar</p><p><u>an</u><br />B</p><p>Irishman</p><p><u>whom the</u><br />C</p><p>proposal in the designed</p><p>competition</p><p><u>won</u><br />D</p><p>$500.</p></div>', '', '', '', '', '3', 83, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 31, 1, 'listening'),
(82, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>Fuel cells,</p><p><u>alike</u><br />A</p><p>batteries,</p><p><u>generate</u><br />B</p><p><u>electricity</u><br />C</p><p>by</p><p><u>chemical reaction.</u><br />D</p></div>', '', '', '', '', '1', 84, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 32, 1, 'listening'),
(83, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>The Virginia Company,</p><p><u>which</u><br />A</p><p>founded</p><p><u>colony</u><br />B</p><p>at Jamestown, sent over glassmakers from Poland with</p><p>the intention</p><p><u>of developing</u><br />C</p><p>the glass-making</p><p><u>industry</u><br />D</p><p>in the New World.</p></div>', '', '', '', '', '2', 85, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 33, 1, 'listening'),
(84, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>Of the more than 1.300</p><p><u>volcanoes</u><br />A</p><p>in the world,</p><p><u>only</u><br />B</p><p>about 600 can</p><p><u>classify</u><br />C</p><p>as</p><p><u>active.</u><br />D</p></div>', '', '', '', '', '3', 86, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 34, 1, 'listening'),
(85, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>Ben Franklin,</p><p><u>needing</u><br />A</p><p>one set of lenses for</p><p><u>distant vision</u><br />B</p><p>and</p><p><u>other</u><br />C</p><p>for near vision,</p><p><u>devised</u><br />D</p><p>bifocals in 1784.</p></div>', '', '', '', '', '3', 87, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 35, 1, 'listening'),
(86, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>Key West traces</p><p><u>its</u><br />A</p><p>modern</p><p><u>settlement</u><br />B</p><p>to an American</p><p><u>business</u><br />C</p><p>who</p><p><u>purchased</u><br />D</p><p>the island in 1882.</p></div>', '', '', '', '', '3', 88, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 36, 1, 'listening'),
(87, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>The Indianapolis 500 race</p><p><u>is run</u><br />A</p><p><u>each</u><br />B</p><p>Memorial Day weekend on the two-and-a-half-</p><p><u>miles</u><br />C</p><p>Motor</p><p>Speedway track</p><p><u>outside</u><br />D</p><p>of Indianapolis.</p></div>', '', '', '', '', '3', 89, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 37, 1, 'listening'),
(88, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p>The streets of Salt Lake City were</p><p><u>laid</u><br />A</p><p>out</p><p><u>wide enough</u><br />B</p><p>for an ox cart to</p><p><u>do</u><br />C</p><p>a turn</p><p><u>without brushing</u><br />D</p><p>the curb.</p></div>', '', '', '', '', '3', 90, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 38, 1, 'listening'),
(89, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p><u>Most</u><br />A</p><p>of the vertebrae</p><p><u>have</u><br />B</p><p>two flanges, or wings, one on each</p><p><u>side,</u><br />C</p><p><u>calling</u><br />D</p><p>transverse processes.</p></div>', '', '', '', '', '4', 91, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 39, 1, 'listening'),
(90, '<div class=\'flex flex-wrap gap-1 leading-4 text-center\'><p><u>Overlooking</u><br />A</p><p>the Hudson River in New York, the Cloisters</p><p><u>includes</u><br />B</p><p><u>parts</u><br />C</p><p>several medieval monasteries</p><p>and chapels</p><p><u>brought</u><br />D</p><p>from Europe.</p></div>', '', '', '', '', '3', 92, '2024-11-25 01:49:18', '2024-11-25 01:49:18', '', 0, 40, 1, 'listening'),
(91, 'What is the topic of this passage?', 'A famous sign', 'A famous city', 'World landmarks', 'Hollywood versus Hollywoodland', '1', 94, '2024-11-28 09:23:47', '2024-11-28 09:23:47', '', 2, 1, 1, 'listening'),
(92, 'The expression \"the world over\" in line 2 could best be replaced by', 'in the northern parts of the world', 'on top of the world', 'in the entire world\r\n', 'in the skies', '3', 95, '2024-11-28 11:04:35', '2024-11-28 11:04:35', '', 2, 2, 1, 'listening'),
(93, 'It can be inferred from the passage that most people think that the Hollywood sign was first constructed by', 'an advertising company', 'the movie industry', 'a construction company', 'the city of Los Angeles\r\n', '2', 96, '2024-11-28 11:18:29', '2024-11-28 11:18:29', '', 2, 3, 1, 'listening'),
(94, 'The pronoun \"it\" in line 5 refers to', 'the sign', 'the movie business', 'the importance of Hollywood\r\n', 'this industry', '1', 97, '2024-11-28 11:18:29', '2024-11-28 11:18:29', '', 2, 4, 1, 'listening'),
(95, 'According to the passage, the Hollywood sign was first built in', '1923', '1949', '1973', '1978', '1', 98, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 2, 5, 1, 'listening'),
(96, 'Which of the following is NOT mentioned about Hollywoodland?', 'It used to be the name of an area of Los Angeles.', 'It was formerly the name on the sign in the hills.', 'There were houses for sale there.', 'It was the most expensive area of Los Angeles.', '4', 99, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 2, 6, 1, 'listening'),
(97, 'The passage indicates that the sign suffered beacause', 'people damaged it', 'it was not fixed', 'the weather was bad', 'it was poorly constructed', '2', 100, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 2, 7, 1, 'listening'),
(98, 'It can be inferred from the passage that the Hollywood sign was how old when it was necessary to totally replace it?', 'Ten years old', 'Twenty-six years old', 'Fifty years old', 'Fifty-five years old', '3', 101, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 2, 8, 1, 'listening'),
(99, 'The word \"replaced\" in line 10 is closest in meaning to which of the follorwing?', 'Moved to a new location', 'Destroyed', 'Found again', 'Exchanged for a newer one', '4', 102, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 2, 9, 1, 'listening'),
(100, 'According to the passage, how did celebrities help with the new sign?', 'They played instruments', 'They raised the sign', 'They helped get the money', 'They took part in work parties to build the sign', '3', 103, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 2, 10, 1, 'listening'),
(111, 'The passage mainly discusses', 'early pirates', 'a large pirate treasure', 'what really happened to the Whidah\'s pirates', 'Why people go to the beach', '2', 104, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 11, 1, 'listening'),
(112, 'It is NOT mentioned in the passage that pirates did which of the following?', 'They killed lots of people.', 'They robbed other ships.', 'They took things from towns.', 'They gathered big treasures.', '1', 105, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 12, 1, 'listening'),
(113, 'The word \"amassed\" in line 4 is closest in meaning to', 'sold', 'hid', 'transported', 'gathered', '4', 106, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 13, 1, 'listening'),
(114, 'It is implied in the passage that the Whidah\'s crew', 'died', 'went driving', 'searched for the treasure', 'escaped with parts of the treasure', '1', 107, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 14, 1, 'listening'),
(115, 'Which of the following is NOT mentioned as part of the treasure of the Whidah?', 'Art objects', 'Coins', 'Gold and silver', 'Jewels', '1', 108, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 15, 1, 'listening'),
(116, 'The word \"estimated\" in line 8 is closest in meaning to which of the following?', 'Known', 'Sold', 'Approximate', 'Decided', '3', 109, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 16, 1, 'listening'),
(117, 'The passage indicates that the cargo of the Whidah is worth about', '$10,000', '$100,000', '$10,000,000', '$100,000,000', '4', 110, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 17, 1, 'listening'),
(118, 'The work that Barry Clifford did to locate the Whidah was NOT', 'successful', 'effortless', 'detailed', 'lengthy', '2', 111, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 18, 1, 'listening'),
(119, 'It is mentioned in the passage that the treasure of the Whidah', 'is not very valuable', 'is all in museums', 'has not all been found', 'was taken to shore by the pirates', '3', 112, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 19, 1, 'listening'),
(120, 'The paragraph following the passage most likely discusses', 'what Barry Clifford is doing today', 'the fate of the Whidah\'s crew', 'other storms in the area of Cape Cod', 'additional pieces that turn up from the Whidah\'s treasure', '4', 113, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 3, 20, 1, 'listening'),
(121, 'The main idea of the passage is that in America\'s frontier days', 'people combined work with recreation', 'people cleared land by rolling logs', 'it was necessary for early settlers to clear the land', 'a logrolling involved the community', '1', 114, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 21, 1, 'listening'),
(122, 'The expression \"day-to-day\" in line 3 could best be replaced by which of the following?', 'Daytime', 'Everyday', 'Day after day', 'Today\'s', '2', 115, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 22, 1, 'listening'),
(123, 'The word \"survival\" in line 4 is closest in meaning to', 'existence', 'a lifetime', 'physical exercise', 'society', '1', 116, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 23, 1, 'listening'),
(124, 'According to the passage, what did people have to do first to settle an area?', 'Develop recreation ideas', 'Build farms', 'Get rid of the trees', 'Invite neighbors over', '3', 117, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 24, 1, 'listening'),
(125, 'According to the passage, which of the following is NOT true about a logrolling?', 'it involved a lot of people', 'It could be enjoyable.', 'There could be a lot of movement.', 'It was rather quiet.', '4', 118, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 25, 1, 'listening'),
(126, 'The word \"chat\" in line 11 means', 'work', 'talk', 'cook', 'eat', '2', 119, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 26, 1, 'listening'),
(127, 'The word \"exuberantly\" in line 11 is closest in meaning to', 'privately', 'laboriously', 'enthusiastically', 'neatly', '3', 120, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 27, 1, 'listening'),
(128, 'It can be inferred from the passage that competitions were held because', 'it was the only way to move the logs', 'competition made the work fun', 'men refused to help unless there was competition', 'the children could then help move the logs', '2', 121, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 28, 1, 'listening'),
(129, 'Where in the passage does the author indicate what a settler did when he had a number of cut trees?', 'Lines 2-4', 'Line 5', 'Lines 7-8', 'Lines 9-10', '3', 122, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 29, 1, 'listening'),
(130, 'This passage would most probably be assigned reading in which of the following courses?', 'Forestry', 'Environmental Studies', 'Psychology', 'History', '4', 123, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 4, 30, 1, 'listening'),
(131, 'The author\'s main purpose in the passage is to', 'categorize the different kinds of sharks throughout the world', 'warn humans of the dangers posed by sharks', 'describe the characteristics of shark teeth', 'clear up misconceptions about sharks', '4', 124, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 31, 1, 'listening'),
(132, 'The word \"unwary\" in line 2 is closest in meaning to', 'strong', 'combative', 'careless', 'fearful', '3', 125, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 32, 1, 'listening'),
(133, '\"Dwarf\" in line 5 refers to something that is probably', 'large', 'powerful', 'dangerous', 'short', '4', 126, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 33, 1, 'listening'),
(134, 'The longest shark is probably the', 'whale shark', 'great white shark', 'bull shark', 'tiger shark', '1', 127, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 34, 1, 'listening'),
(135, 'Which of the following is NOT true about a shark\'s teeth?', 'All sharks have teeth.', 'A shark can have six rows of teeth.', 'A shark can have hundreds of teeth', 'All sharks have extremely sharp teeth.', '4', 128, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 35, 1, 'listening'),
(136, 'A \"jaw\" in line 9 is', 'a part of the shark\'s tail', 'a part of the stomach', 'a backbone', 'a bone in the mouth', '4', 129, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 36, 1, 'listening'),
(137, '\"Prey\" in line 10 is something that is', 'fierce', 'hunted', 'religious', 'shared', '2', 130, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 37, 1, 'listening'),
(138, 'The passage indicates that a shark attacks a person', 'for no reason', 'every time it sees one', 'only if it is bothered', 'only at night', '3', 131, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 38, 1, 'listening'),
(139, 'It can be inferred from the passage that a person should probably be the least afraid of', 'a dwarf shark', 'a tiger shark', 'a bull shark', 'a great white shark', '1', 132, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 39, 1, 'listening'),
(140, 'Where in the passage does the author give the proportion of shark species that act aggressively toward people?', 'Lines 4-6', 'Lines 9-12', 'Lines 13-14', 'Lines 16-17', '3', 133, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 5, 40, 1, 'listening'),
(141, 'The paragraph preceding this passage most probably discusses', 'tidal waves', 'tides', 'storm surges', 'underwater earthquakes', '3', 134, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 41, 1, 'listening'),
(142, 'According to the passage, all of the following are true about tidal waves EXCEPT that', 'they are the same as tsunamis', 'they are caused by sudden changes in high and low tides', 'this terminology is not used by the scientific community', 'they refer to the same phenomenon as seismic sea waves', '2', 135, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 42, 1, 'listening'),
(143, 'The word \"displaced\" in line 7 is closest in meaning to', 'located', 'not pleased', 'filtered', 'moved', '4', 136, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 43, 1, 'listening'),
(144, 'It can be inferred from the passage that tsunamis', 'cause severe damage in the middle of the ocean', 'generally reach heights greater than 40 meters', 'are far more dangerous on the coast than in the open ocean', 'are often identified by ships on the ocean', '3', 137, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 44, 1, 'listening'),
(145, 'In line 10, water that is \"shallow\" is NOT', 'clear', 'deep', 'tidal', 'coastal', '2', 138, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 45, 1, 'listening'),
(146, 'A main difference between tsunamis in Japan and in Hawaii is that tsunamis in Japan are more likely to', 'arrive without warning', 'come from greater distances', 'be less of a problem', 'originate in Alaska', '1', 139, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 46, 1, 'listening'),
(147, 'The possessive \"their\" in line 18 refers to', 'the Hawaiian Islands', 'thousands of miles', 'these tsunamis', 'the inhabitants of Hawaii', '3', 140, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 47, 1, 'listening'),
(148, 'A \"calamitous\" tsunami, in line 20, is one that is', 'expected', 'extremely calm', 'at fault', 'disastrous', '4', 141, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 48, 1, 'listening'),
(149, 'From the expression \"on record\" in line 22, it can be inferred that the tsunami that accompanied the Krakatoa volcano', 'occurred before efficient records were kept', 'was not as strong as the tsunami in Lisbon', 'was filmed as it was happening', 'might not be the greatest tsunami ever', '4', 142, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 49, 1, 'listening'),
(150, 'The passage suggests that the tsunami resulting from the Krakatoa volcano', 'caused volcanic explosions in the English Channel', 'was far more destructive close to the source than far away', 'was unobserved outside of the Indonesian islands', 'resulted in little damage', '2', 143, '2024-11-28 11:23:08', '2024-11-28 11:23:08', '', 6, 50, 1, 'listening'),
(171, '', 'edit', 'edit', 'edit', 'edit', '1', 2, '2025-07-01 14:15:54', '2025-07-01 14:51:55', '/uploads/audio/1751381515443-number-31.mp3', 0, 2, 2, 'listening'),
(172, '', '1', '2', '34', '4', '2', 2, '2025-07-01 14:18:06', '2025-07-01 14:18:06', '/uploads/audio/1751379486041-number-31.mp3', 0, 2, 2, 'listening'),
(173, '', '1', '2', '3', '4', '2', 2, '2025-07-01 14:18:30', '2025-07-01 14:18:30', '/uploads/audio/1751379510921-number-31.mp3', 0, 2, 2, 'listening');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `soals`
--
ALTER TABLE `soals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `q_reading` (`q_reading`),
  ADD KEY `paket_soal_id` (`paket_soal_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `soals`
--
ALTER TABLE `soals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `soals`
--
ALTER TABLE `soals`
  ADD CONSTRAINT `soals_ibfk_85` FOREIGN KEY (`q_reading`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `soals_ibfk_86` FOREIGN KEY (`paket_soal_id`) REFERENCES `paket_soals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
