-- ==========================================================
-- Chloe Beauty Hub Database Schema & Seed Data
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `chloe_beauty_hub` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `chloe_beauty_hub`;

-- ----------------------------------------------------------
-- 1. Services Table
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `icon` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- 2. Products Table (Wigs and Beauty Products)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` ENUM('wig', 'product') NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `image_url` VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- 3. Testimonials Table
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `quote` TEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- 4. Appointments Table
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `service` VARCHAR(100) NOT NULL,
  `preferred_date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================================
-- Seed Data Insertion
-- ==========================================================

-- Services
INSERT INTO `services` (`title`, `icon`, `description`) VALUES
('Luxury Wigs', 'Crown', 'Premium 100% human hair wigs, custom-styled, pre-plucked, and tailored to frame your face with seamless elegance.'),
('Hair Treatment', 'Sparkles', 'Deep conditioning, protein restoration, steaming treatments, and nourishing scalp therapy to revitalize your natural crown.'),
('Manicure', 'HandMetal', 'Luxury nail grooming, cuticle care, custom acrylics, gel extensions, and long-lasting polish finishes.'),
('Pedicure', 'Footprints', 'Rejuvenating foot bath, exfoliation, soothing hot stone massage, and immaculate toe nail grooming for total relaxation.');

-- Popular Wig Collection (category = 'wig')
INSERT INTO `products` (`category`, `name`, `description`, `price`, `image_url`) VALUES
('wig', 'Bone Straight Wig', '100% Raw donor human hair, mirror-gloss sleek texture that stays flawlessly straight all day.', 120000.00, 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80'),
('wig', 'Curly Wig', 'Voluminous, ultra-soft, and bouncy curls engineered for high definition and minimal styling effort.', 95000.00, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'),
('wig', 'Frontal Wig', 'Pre-plucked HD Swiss lace frontal with bleached knots for an undetectable, skin-melting natural hairline.', 140000.00, 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80');

-- Beauty Products (category = 'product')
INSERT INTO `products` (`category`, `name`, `description`, `price`, `image_url`) VALUES
('product', 'Ghana Cream', 'Authentic whipped botanical hair cream that locks in supreme moisture and restores brittle strands.', 5000.00, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'),
('product', 'Hair Oil', 'Cold-pressed elixir infused with rosemary, argan, and castor oils to stimulate follicles and boost shine.', 7500.00, 'https://images.unsplash.com/photo-1608248597358-1f19f187a4bf?auto=format&fit=crop&w=800&q=80'),
('product', 'Hair Serum', 'Weightless anti-frizz silk treatment designed to seal split ends and provide thermal heat protection.', 8000.00, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'),
('product', 'Edge Control', 'Extreme 24-hour edge hold gel with high shine, non-flaking formula for razor-sharp sleek edges.', 5500.00, 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'),
('product', 'Leave-in Conditioner', 'Hydrating detangler milk loaded with hydrolyzed silk and shea butter for effortless comb-throughs.', 15500.00, 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80'),
('product', 'Moisturizer', 'Intense daily moisture cream that prevents dryness, breakage, and keeps curls luscious all day.', 10000.00, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80');

-- Testimonials
INSERT INTO `testimonials` (`name`, `location`, `quote`, `image_url`) VALUES
('Amaka Eze', 'Lekki, Lagos', 'Chloe Beauty Hub gave me the best frontal wig installation I have ever had! The lace melted completely into my skin and the hair has zero shedding after 3 months.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'),
('Zainab Ibrahim', 'Maitama, Abuja', 'Their hair steaming treatment and pedicure are top-tier. My natural hair has never felt this hydrated, and the serene salon ambiance made me feel like royalty.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'),
('Blessing Adeyemi', 'GRA, Port Harcourt', 'Ordered the bone straight wig and the edge control to Port Harcourt. The hair is silky beyond belief and delivery arrived within 24 hours. Customer for life!', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80');

-- Sample Appointments for Initial Demonstration
INSERT INTO `appointments` (`name`, `phone`, `service`, `preferred_date`) VALUES
('Chioma Adeleke', '+234 802 333 4455', 'Luxury Wigs', '2026-09-20'),
('Funke Balogun', '+234 815 678 1234', 'Hair Treatment', '2026-09-22');
