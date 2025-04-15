-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 15, 2025 at 01:32 AM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `essentials`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text,
  `image_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `description`, `image_name`) VALUES
(1, 'Adjustable Dog Collar', 12.99, 'Comfortable nylon collar with adjustable size and metal buckle', 'dog_collar.jpg'),
(2, 'Cat Litter Box', 21.50, 'Enclosed litter box with odor control and removable lid', 'cat_litter_box.jpg'),
(3, 'Dog Shampoo - Hypoallergenic', 8.99, 'Gentle formula for sensitive dog skin, 16 oz', 'dog_shampoo.jpg'),
(4, 'Cat Nail Clippers', 6.75, 'Safe and easy-to-use nail clippers for cats', 'cat_nail_clippers.jpg'),
(5, 'Pet Brush', 10.49, 'Dual-sided grooming brush for cats and dogs', 'pet_brush.jpg'),
(6, 'Dog Bed - Medium', 34.99, 'Soft orthopedic bed for medium-sized dogs', 'dog_bed.jpg'),
(7, 'Cat Carrier', 39.95, 'Durable travel carrier with ventilation and padded interior', 'cat_carrier.jpg'),
(8, 'Dog Chew Toy', 7.25, 'Durable rubber toy for aggressive chewers', 'dog_chew_toy.jpg'),
(9, 'Cat Treats - Salmon Flavor', 5.99, 'Crunchy salmon treats with added vitamins, 3 oz', 'cat_treats.jpg'),
(10, 'Dog Leash - Retractable', 18.75, '16ft retractable leash with brake and lock system', 'dog_leash_retractable.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
