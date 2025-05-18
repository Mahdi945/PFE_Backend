-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 18 mai 2025 à 08:56
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `station_service`
--

-- --------------------------------------------------------

--
-- Structure de la table `affectations`
--

CREATE TABLE `affectations` (
  `id` int(11) NOT NULL,
  `pompiste_id` int(11) NOT NULL,
  `poste_id` int(11) NOT NULL,
  `pompe_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `affectations`
--

INSERT INTO `affectations` (`id`, `pompiste_id`, `poste_id`, `pompe_id`, `date`) VALUES
(4074, 20, 3, 35, '2025-05-01'),
(4075, 19, 1, 35, '2025-05-01'),
(4076, 16, 1, 34, '2025-05-01'),
(4077, 22, 2, 34, '2025-05-01'),
(4078, 15, 2, 35, '2025-05-01'),
(4079, 23, 2, 36, '2025-05-01'),
(4080, 25, 3, 34, '2025-05-01'),
(4081, 21, 3, 35, '2025-05-01'),
(4082, 24, 3, 36, '2025-05-01'),
(4083, 23, 1, 34, '2025-05-02'),
(4084, 20, 1, 35, '2025-05-02'),
(4085, 19, 1, 36, '2025-05-02'),
(4086, 25, 2, 34, '2025-05-02'),
(4087, 16, 2, 35, '2025-05-02'),
(4088, 22, 2, 36, '2025-05-02'),
(4089, 24, 3, 34, '2025-05-02'),
(4090, 15, 3, 35, '2025-05-02'),
(4091, 21, 3, 36, '2025-05-02'),
(4092, 19, 1, 34, '2025-05-03'),
(4093, 16, 1, 35, '2025-05-03'),
(4094, 25, 1, 36, '2025-05-03'),
(4095, 20, 2, 34, '2025-05-03'),
(4096, 22, 2, 35, '2025-05-03'),
(4097, 15, 2, 36, '2025-05-03'),
(4098, 23, 3, 34, '2025-05-03'),
(4099, 24, 3, 35, '2025-05-03'),
(4100, 21, 3, 36, '2025-05-03'),
(4101, 19, 1, 34, '2025-05-04'),
(4102, 24, 1, 35, '2025-05-04'),
(4103, 20, 1, 36, '2025-05-04'),
(4104, 23, 2, 34, '2025-05-04'),
(4105, 16, 2, 35, '2025-05-04'),
(4106, 15, 2, 36, '2025-05-04'),
(4107, 25, 3, 34, '2025-05-04'),
(4108, 22, 3, 35, '2025-05-04'),
(4109, 21, 3, 36, '2025-05-04'),
(4110, 25, 1, 34, '2025-05-05'),
(4111, 19, 1, 35, '2025-05-05'),
(4112, 23, 1, 36, '2025-05-05'),
(4113, 22, 2, 34, '2025-05-05'),
(4114, 20, 2, 35, '2025-05-05'),
(4115, 24, 2, 36, '2025-05-05'),
(4116, 21, 3, 34, '2025-05-05'),
(4117, 15, 3, 35, '2025-05-05'),
(4118, 16, 3, 36, '2025-05-05'),
(4119, 16, 1, 34, '2025-05-06'),
(4120, 20, 1, 35, '2025-05-06'),
(4121, 25, 1, 36, '2025-05-06'),
(4122, 24, 2, 34, '2025-05-06'),
(4123, 22, 2, 35, '2025-05-06'),
(4124, 19, 2, 36, '2025-05-06'),
(4125, 21, 3, 34, '2025-05-06'),
(4126, 15, 3, 35, '2025-05-06'),
(4127, 23, 3, 36, '2025-05-06'),
(4128, 23, 1, 34, '2025-05-07'),
(4129, 22, 1, 35, '2025-05-07'),
(4130, 20, 1, 36, '2025-05-07'),
(4131, 16, 2, 34, '2025-05-07'),
(4132, 15, 2, 35, '2025-05-07'),
(4133, 25, 2, 36, '2025-05-07'),
(4134, 19, 3, 34, '2025-05-07'),
(4135, 21, 3, 35, '2025-05-07'),
(4136, 24, 3, 36, '2025-05-07'),
(4137, 15, 1, 34, '2025-05-08'),
(4138, 16, 1, 35, '2025-05-08'),
(4139, 24, 1, 36, '2025-05-08'),
(4140, 19, 2, 34, '2025-05-08'),
(4141, 23, 2, 35, '2025-05-08'),
(4142, 20, 2, 36, '2025-05-08'),
(4143, 21, 3, 34, '2025-05-08'),
(4144, 25, 3, 35, '2025-05-08'),
(4145, 22, 3, 36, '2025-05-08'),
(4146, 16, 1, 34, '2025-05-09'),
(4147, 15, 1, 35, '2025-05-09'),
(4148, 20, 1, 36, '2025-05-09'),
(4149, 24, 2, 34, '2025-05-09'),
(4150, 22, 2, 35, '2025-05-09'),
(4151, 25, 2, 36, '2025-05-09'),
(4152, 21, 3, 34, '2025-05-09'),
(4153, 19, 3, 35, '2025-05-09'),
(4154, 23, 3, 36, '2025-05-09'),
(4155, 15, 1, 34, '2025-05-10'),
(4156, 16, 1, 35, '2025-05-10'),
(4157, 19, 1, 36, '2025-05-10'),
(4158, 24, 2, 34, '2025-05-10'),
(4159, 20, 2, 35, '2025-05-10'),
(4160, 22, 2, 36, '2025-05-10'),
(4161, 23, 3, 34, '2025-05-10'),
(4162, 25, 3, 35, '2025-05-10'),
(4163, 21, 3, 36, '2025-05-10'),
(4164, 20, 1, 34, '2025-05-11'),
(4165, 15, 1, 35, '2025-05-11'),
(4166, 19, 1, 36, '2025-05-11'),
(4167, 24, 2, 34, '2025-05-11'),
(4168, 16, 2, 35, '2025-05-11'),
(4169, 25, 2, 36, '2025-05-11'),
(4170, 23, 3, 34, '2025-05-11'),
(4171, 22, 3, 35, '2025-05-11'),
(4172, 21, 3, 36, '2025-05-11'),
(4173, 16, 1, 34, '2025-05-12'),
(4174, 15, 1, 35, '2025-05-12'),
(4175, 19, 1, 36, '2025-05-12'),
(4176, 24, 2, 34, '2025-05-12'),
(4177, 23, 2, 35, '2025-05-12'),
(4178, 25, 2, 36, '2025-05-12'),
(4179, 20, 3, 34, '2025-05-12'),
(4180, 21, 3, 35, '2025-05-12'),
(4181, 22, 3, 36, '2025-05-12'),
(4182, 16, 1, 34, '2025-05-13'),
(4183, 15, 1, 35, '2025-05-13'),
(4184, 22, 1, 36, '2025-05-13'),
(4185, 24, 2, 34, '2025-05-13'),
(4186, 19, 2, 35, '2025-05-13'),
(4187, 21, 2, 36, '2025-05-13'),
(4188, 25, 3, 34, '2025-05-13'),
(4189, 20, 3, 35, '2025-05-13'),
(4190, 23, 3, 36, '2025-05-13'),
(4191, 21, 1, 34, '2025-05-14'),
(4192, 22, 1, 35, '2025-05-14'),
(4193, 25, 1, 36, '2025-05-14'),
(4194, 15, 2, 34, '2025-05-14'),
(4195, 16, 2, 35, '2025-05-14'),
(4196, 20, 2, 36, '2025-05-14'),
(4197, 19, 3, 34, '2025-05-14'),
(4198, 24, 3, 35, '2025-05-14'),
(4199, 23, 3, 36, '2025-05-14'),
(4200, 21, 1, 34, '2025-05-15'),
(4201, 15, 1, 35, '2025-05-15'),
(4202, 22, 1, 36, '2025-05-15'),
(4203, 23, 2, 34, '2025-05-15'),
(4204, 20, 2, 35, '2025-05-15'),
(4205, 19, 2, 36, '2025-05-15'),
(4206, 16, 3, 34, '2025-05-15'),
(4207, 24, 3, 35, '2025-05-15'),
(4208, 25, 3, 36, '2025-05-15'),
(4209, 21, 1, 34, '2025-05-16'),
(4210, 25, 1, 35, '2025-05-16'),
(4211, 24, 1, 36, '2025-05-16'),
(4212, 22, 2, 34, '2025-05-16'),
(4213, 20, 2, 35, '2025-05-16'),
(4214, 19, 2, 36, '2025-05-16'),
(4215, 15, 3, 34, '2025-05-16'),
(4216, 16, 3, 35, '2025-05-16'),
(4217, 23, 3, 36, '2025-05-16'),
(4218, 20, 1, 34, '2025-05-17'),
(4219, 16, 1, 35, '2025-05-17'),
(4220, 24, 1, 36, '2025-05-17'),
(4221, 21, 2, 34, '2025-05-17'),
(4222, 19, 2, 35, '2025-05-17'),
(4223, 15, 2, 36, '2025-05-17'),
(4224, 22, 3, 34, '2025-05-17'),
(4225, 23, 3, 35, '2025-05-17'),
(4226, 25, 3, 36, '2025-05-17'),
(4227, 22, 1, 34, '2025-05-18'),
(4228, 25, 1, 35, '2025-05-18'),
(4229, 24, 1, 36, '2025-05-18'),
(4230, 21, 2, 34, '2025-05-18'),
(4231, 19, 2, 35, '2025-05-18'),
(4232, 23, 2, 36, '2025-05-18'),
(4233, 15, 3, 34, '2025-05-18'),
(4234, 16, 3, 35, '2025-05-18'),
(4235, 20, 3, 36, '2025-05-18'),
(4236, 22, 1, 34, '2025-05-19'),
(4237, 25, 1, 35, '2025-05-19'),
(4238, 23, 1, 36, '2025-05-19'),
(4239, 20, 2, 34, '2025-05-19'),
(4240, 16, 2, 35, '2025-05-19'),
(4241, 19, 2, 36, '2025-05-19'),
(4242, 24, 3, 34, '2025-05-19'),
(4243, 21, 3, 35, '2025-05-19'),
(4244, 15, 3, 36, '2025-05-19'),
(4245, 19, 1, 34, '2025-05-20'),
(4246, 22, 1, 35, '2025-05-20'),
(4247, 23, 1, 36, '2025-05-20'),
(4248, 15, 2, 34, '2025-05-20'),
(4249, 20, 2, 35, '2025-05-20'),
(4250, 21, 2, 36, '2025-05-20'),
(4251, 25, 3, 34, '2025-05-20'),
(4252, 24, 3, 35, '2025-05-20'),
(4253, 16, 3, 36, '2025-05-20'),
(4254, 25, 1, 34, '2025-05-21'),
(4255, 24, 1, 35, '2025-05-21'),
(4256, 23, 1, 36, '2025-05-21'),
(4257, 22, 2, 34, '2025-05-21'),
(4258, 21, 2, 35, '2025-05-21'),
(4259, 20, 2, 36, '2025-05-21'),
(4260, 19, 3, 34, '2025-05-21'),
(4261, 16, 3, 35, '2025-05-21'),
(4262, 15, 3, 36, '2025-05-21'),
(4263, 19, 1, 34, '2025-05-22'),
(4264, 22, 1, 35, '2025-05-22'),
(4265, 20, 1, 36, '2025-05-22'),
(4266, 15, 2, 34, '2025-05-22'),
(4267, 16, 2, 35, '2025-05-22'),
(4268, 21, 2, 36, '2025-05-22'),
(4269, 25, 3, 34, '2025-05-22'),
(4270, 23, 3, 35, '2025-05-22'),
(4271, 24, 3, 36, '2025-05-22'),
(4272, 19, 1, 34, '2025-05-23'),
(4273, 15, 1, 35, '2025-05-23'),
(4274, 21, 1, 36, '2025-05-23'),
(4275, 24, 2, 34, '2025-05-23'),
(4276, 23, 2, 35, '2025-05-23'),
(4277, 25, 2, 36, '2025-05-23'),
(4278, 16, 3, 34, '2025-05-23'),
(4279, 20, 3, 35, '2025-05-23'),
(4280, 22, 3, 36, '2025-05-23'),
(4281, 22, 1, 34, '2025-05-24'),
(4282, 20, 1, 35, '2025-05-24'),
(4283, 23, 1, 36, '2025-05-24'),
(4284, 21, 2, 34, '2025-05-24'),
(4285, 19, 2, 35, '2025-05-24'),
(4286, 25, 2, 36, '2025-05-24'),
(4287, 24, 3, 34, '2025-05-24'),
(4288, 16, 3, 35, '2025-05-24'),
(4289, 15, 3, 36, '2025-05-24'),
(4290, 15, 1, 34, '2025-05-25'),
(4291, 16, 1, 35, '2025-05-25'),
(4292, 24, 1, 36, '2025-05-25'),
(4293, 25, 2, 34, '2025-05-25'),
(4294, 19, 2, 35, '2025-05-25'),
(4295, 21, 2, 36, '2025-05-25'),
(4296, 22, 3, 34, '2025-05-25'),
(4297, 20, 3, 35, '2025-05-25'),
(4298, 23, 3, 36, '2025-05-25'),
(4299, 20, 1, 34, '2025-05-26'),
(4300, 24, 1, 35, '2025-05-26'),
(4301, 19, 1, 36, '2025-05-26'),
(4302, 23, 2, 34, '2025-05-26'),
(4303, 25, 2, 35, '2025-05-26'),
(4304, 22, 2, 36, '2025-05-26'),
(4305, 16, 3, 34, '2025-05-26'),
(4306, 21, 3, 35, '2025-05-26'),
(4307, 15, 3, 36, '2025-05-26'),
(4308, 15, 1, 34, '2025-05-27'),
(4309, 16, 1, 35, '2025-05-27'),
(4310, 22, 1, 36, '2025-05-27'),
(4311, 21, 2, 34, '2025-05-27'),
(4312, 25, 2, 35, '2025-05-27'),
(4313, 24, 2, 36, '2025-05-27'),
(4314, 20, 3, 34, '2025-05-27'),
(4315, 19, 3, 35, '2025-05-27'),
(4316, 23, 3, 36, '2025-05-27'),
(4317, 15, 1, 34, '2025-05-28'),
(4318, 16, 1, 35, '2025-05-28'),
(4319, 22, 1, 36, '2025-05-28'),
(4320, 24, 2, 34, '2025-05-28'),
(4321, 23, 2, 35, '2025-05-28'),
(4322, 20, 2, 36, '2025-05-28'),
(4323, 19, 3, 34, '2025-05-28'),
(4324, 25, 3, 35, '2025-05-28'),
(4325, 21, 3, 36, '2025-05-28'),
(4326, 16, 1, 34, '2025-05-29'),
(4327, 19, 1, 35, '2025-05-29'),
(4328, 23, 1, 36, '2025-05-29'),
(4329, 20, 2, 34, '2025-05-29'),
(4330, 25, 2, 35, '2025-05-29'),
(4331, 21, 2, 36, '2025-05-29'),
(4332, 15, 3, 34, '2025-05-29'),
(4333, 22, 3, 35, '2025-05-29'),
(4334, 24, 3, 36, '2025-05-29'),
(4335, 19, 1, 34, '2025-05-30'),
(4336, 16, 1, 35, '2025-05-30'),
(4337, 24, 1, 36, '2025-05-30'),
(4338, 23, 2, 34, '2025-05-30'),
(4339, 15, 2, 35, '2025-05-30'),
(4340, 21, 2, 36, '2025-05-30'),
(4341, 22, 3, 34, '2025-05-30'),
(4342, 25, 3, 35, '2025-05-30'),
(4343, 20, 3, 36, '2025-05-30'),
(4344, 19, 1, 34, '2025-05-31'),
(4345, 24, 1, 35, '2025-05-31'),
(4346, 16, 1, 36, '2025-05-31'),
(4347, 23, 2, 34, '2025-05-31'),
(4348, 20, 2, 35, '2025-05-31'),
(4349, 25, 2, 36, '2025-05-31'),
(4350, 21, 3, 34, '2025-05-31'),
(4351, 15, 3, 35, '2025-05-31'),
(4352, 22, 3, 36, '2025-05-31'),
(4353, 22, 1, 34, '2025-06-01'),
(4354, 21, 1, 35, '2025-06-01'),
(4355, 15, 1, 36, '2025-06-01'),
(4356, 24, 2, 34, '2025-06-01'),
(4357, 20, 2, 35, '2025-06-01'),
(4358, 16, 2, 36, '2025-06-01'),
(4359, 23, 3, 34, '2025-06-01'),
(4360, 25, 3, 35, '2025-06-01'),
(4361, 19, 3, 36, '2025-06-01'),
(4362, 23, 1, 34, '2025-06-02'),
(4363, 22, 1, 35, '2025-06-02'),
(4364, 16, 1, 36, '2025-06-02'),
(4365, 15, 2, 34, '2025-06-02'),
(4366, 21, 2, 35, '2025-06-02'),
(4367, 25, 2, 36, '2025-06-02'),
(4368, 19, 3, 34, '2025-06-02'),
(4369, 20, 3, 35, '2025-06-02'),
(4370, 24, 3, 36, '2025-06-02'),
(4371, 20, 1, 34, '2025-06-03'),
(4372, 21, 1, 35, '2025-06-03'),
(4373, 19, 1, 36, '2025-06-03'),
(4374, 24, 2, 34, '2025-06-03'),
(4375, 22, 2, 35, '2025-06-03'),
(4376, 25, 2, 36, '2025-06-03'),
(4377, 16, 3, 34, '2025-06-03'),
(4378, 15, 3, 35, '2025-06-03'),
(4379, 23, 3, 36, '2025-06-03'),
(4380, 25, 1, 34, '2025-06-04'),
(4381, 15, 1, 35, '2025-06-04'),
(4382, 16, 1, 36, '2025-06-04'),
(4383, 20, 2, 34, '2025-06-04'),
(4384, 21, 2, 35, '2025-06-04'),
(4385, 19, 2, 36, '2025-06-04'),
(4386, 23, 3, 34, '2025-06-04'),
(4387, 24, 3, 35, '2025-06-04'),
(4388, 22, 3, 36, '2025-06-04'),
(4389, 15, 1, 34, '2025-06-05'),
(4390, 16, 1, 35, '2025-06-05'),
(4391, 19, 1, 36, '2025-06-05'),
(4392, 22, 2, 34, '2025-06-05'),
(4393, 25, 2, 35, '2025-06-05'),
(4394, 23, 2, 36, '2025-06-05'),
(4395, 24, 3, 34, '2025-06-05'),
(4396, 20, 3, 35, '2025-06-05'),
(4397, 21, 3, 36, '2025-06-05'),
(4398, 16, 1, 34, '2025-06-06'),
(4399, 21, 1, 35, '2025-06-06'),
(4400, 22, 1, 36, '2025-06-06'),
(4401, 19, 2, 34, '2025-06-06'),
(4402, 24, 2, 35, '2025-06-06'),
(4403, 23, 2, 36, '2025-06-06'),
(4404, 15, 3, 34, '2025-06-06'),
(4405, 20, 3, 35, '2025-06-06'),
(4406, 25, 3, 36, '2025-06-06'),
(4407, 25, 1, 34, '2025-06-07'),
(4408, 23, 1, 35, '2025-06-07'),
(4409, 20, 1, 36, '2025-06-07'),
(4410, 15, 2, 34, '2025-06-07'),
(4411, 24, 2, 35, '2025-06-07'),
(4412, 16, 2, 36, '2025-06-07'),
(4413, 22, 3, 34, '2025-06-07'),
(4414, 21, 3, 35, '2025-06-07'),
(4415, 19, 3, 36, '2025-06-07'),
(4416, 25, 1, 34, '2025-06-08'),
(4417, 24, 1, 35, '2025-06-08'),
(4418, 21, 1, 36, '2025-06-08'),
(4419, 22, 2, 34, '2025-06-08'),
(4420, 19, 2, 35, '2025-06-08'),
(4421, 15, 2, 36, '2025-06-08'),
(4422, 20, 3, 34, '2025-06-08'),
(4423, 16, 3, 35, '2025-06-08'),
(4424, 23, 3, 36, '2025-06-08'),
(4425, 22, 1, 34, '2025-06-09'),
(4426, 24, 1, 35, '2025-06-09'),
(4427, 16, 1, 36, '2025-06-09'),
(4428, 19, 2, 34, '2025-06-09'),
(4429, 21, 2, 35, '2025-06-09'),
(4430, 15, 2, 36, '2025-06-09'),
(4431, 20, 3, 34, '2025-06-09'),
(4432, 25, 3, 35, '2025-06-09'),
(4433, 23, 3, 36, '2025-06-09'),
(4434, 19, 1, 34, '2025-06-10'),
(4435, 16, 1, 35, '2025-06-10'),
(4436, 20, 1, 36, '2025-06-10'),
(4437, 23, 2, 34, '2025-06-10'),
(4438, 22, 2, 35, '2025-06-10'),
(4439, 24, 2, 36, '2025-06-10'),
(4440, 25, 3, 34, '2025-06-10'),
(4441, 21, 3, 35, '2025-06-10'),
(4442, 15, 3, 36, '2025-06-10'),
(4443, 15, 1, 34, '2025-06-11'),
(4444, 16, 1, 35, '2025-06-11'),
(4445, 19, 1, 36, '2025-06-11'),
(4446, 23, 2, 34, '2025-06-11'),
(4447, 21, 2, 35, '2025-06-11'),
(4448, 22, 2, 36, '2025-06-11'),
(4449, 24, 3, 34, '2025-06-11'),
(4450, 25, 3, 35, '2025-06-11'),
(4451, 20, 3, 36, '2025-06-11'),
(4452, 25, 1, 34, '2025-06-12'),
(4453, 20, 1, 35, '2025-06-12'),
(4454, 19, 1, 36, '2025-06-12'),
(4455, 15, 2, 34, '2025-06-12'),
(4456, 21, 2, 35, '2025-06-12'),
(4457, 22, 2, 36, '2025-06-12'),
(4458, 23, 3, 34, '2025-06-12'),
(4459, 16, 3, 35, '2025-06-12'),
(4460, 24, 3, 36, '2025-06-12'),
(4461, 20, 1, 34, '2025-06-13'),
(4462, 19, 1, 35, '2025-06-13'),
(4463, 21, 1, 36, '2025-06-13'),
(4464, 24, 2, 34, '2025-06-13'),
(4465, 16, 2, 35, '2025-06-13'),
(4466, 15, 2, 36, '2025-06-13'),
(4467, 25, 3, 34, '2025-06-13'),
(4468, 22, 3, 35, '2025-06-13'),
(4469, 23, 3, 36, '2025-06-13'),
(4470, 23, 1, 34, '2025-06-14'),
(4471, 15, 1, 35, '2025-06-14'),
(4472, 24, 1, 36, '2025-06-14'),
(4473, 19, 2, 34, '2025-06-14'),
(4474, 25, 2, 35, '2025-06-14'),
(4475, 16, 2, 36, '2025-06-14'),
(4476, 22, 3, 34, '2025-06-14'),
(4477, 21, 3, 35, '2025-06-14'),
(4478, 20, 3, 36, '2025-06-14'),
(4479, 23, 1, 34, '2025-06-15'),
(4480, 19, 1, 35, '2025-06-15'),
(4481, 20, 1, 36, '2025-06-15'),
(4482, 15, 2, 34, '2025-06-15'),
(4483, 16, 2, 35, '2025-06-15'),
(4484, 24, 2, 36, '2025-06-15'),
(4485, 21, 3, 34, '2025-06-15'),
(4486, 22, 3, 35, '2025-06-15'),
(4487, 25, 3, 36, '2025-06-15'),
(4488, 23, 1, 34, '2025-06-16'),
(4489, 15, 1, 35, '2025-06-16'),
(4490, 25, 1, 36, '2025-06-16'),
(4491, 22, 2, 34, '2025-06-16'),
(4492, 24, 2, 35, '2025-06-16'),
(4493, 21, 2, 36, '2025-06-16'),
(4494, 16, 3, 34, '2025-06-16'),
(4495, 20, 3, 35, '2025-06-16'),
(4496, 19, 3, 36, '2025-06-16'),
(4497, 15, 1, 34, '2025-06-17'),
(4498, 22, 1, 35, '2025-06-17'),
(4499, 16, 1, 36, '2025-06-17'),
(4500, 24, 2, 34, '2025-06-17'),
(4501, 21, 2, 35, '2025-06-17'),
(4502, 20, 2, 36, '2025-06-17'),
(4503, 23, 3, 34, '2025-06-17'),
(4504, 19, 3, 35, '2025-06-17'),
(4505, 25, 3, 36, '2025-06-17'),
(4506, 22, 1, 34, '2025-06-18'),
(4507, 24, 1, 35, '2025-06-18'),
(4508, 20, 1, 36, '2025-06-18'),
(4509, 15, 2, 34, '2025-06-18'),
(4510, 21, 2, 35, '2025-06-18'),
(4511, 16, 2, 36, '2025-06-18'),
(4512, 19, 3, 34, '2025-06-18'),
(4513, 25, 3, 35, '2025-06-18'),
(4514, 23, 3, 36, '2025-06-18'),
(4515, 25, 1, 34, '2025-06-19'),
(4516, 20, 1, 35, '2025-06-19'),
(4517, 24, 1, 36, '2025-06-19'),
(4518, 22, 2, 34, '2025-06-19'),
(4519, 16, 2, 35, '2025-06-19'),
(4520, 15, 2, 36, '2025-06-19'),
(4521, 23, 3, 34, '2025-06-19'),
(4522, 19, 3, 35, '2025-06-19'),
(4523, 21, 3, 36, '2025-06-19'),
(4524, 16, 1, 34, '2025-06-20'),
(4525, 15, 1, 35, '2025-06-20'),
(4526, 23, 1, 36, '2025-06-20'),
(4527, 24, 2, 34, '2025-06-20'),
(4528, 19, 2, 35, '2025-06-20'),
(4529, 21, 2, 36, '2025-06-20'),
(4530, 25, 3, 34, '2025-06-20'),
(4531, 22, 3, 35, '2025-06-20'),
(4532, 20, 3, 36, '2025-06-20'),
(4533, 19, 1, 34, '2025-06-21'),
(4534, 16, 1, 35, '2025-06-21'),
(4535, 15, 1, 36, '2025-06-21'),
(4536, 24, 2, 34, '2025-06-21'),
(4537, 23, 2, 35, '2025-06-21'),
(4538, 22, 2, 36, '2025-06-21'),
(4539, 21, 3, 34, '2025-06-21'),
(4540, 25, 3, 35, '2025-06-21'),
(4541, 20, 3, 36, '2025-06-21'),
(4542, 23, 1, 34, '2025-06-22'),
(4543, 15, 1, 35, '2025-06-22'),
(4544, 16, 1, 36, '2025-06-22'),
(4545, 20, 2, 34, '2025-06-22'),
(4546, 22, 2, 35, '2025-06-22'),
(4547, 25, 2, 36, '2025-06-22'),
(4548, 24, 3, 34, '2025-06-22'),
(4549, 19, 3, 35, '2025-06-22'),
(4550, 21, 3, 36, '2025-06-22'),
(4551, 20, 1, 34, '2025-06-23'),
(4552, 15, 1, 35, '2025-06-23'),
(4553, 25, 1, 36, '2025-06-23'),
(4554, 19, 2, 34, '2025-06-23'),
(4555, 21, 2, 35, '2025-06-23'),
(4556, 23, 2, 36, '2025-06-23'),
(4557, 16, 3, 34, '2025-06-23'),
(4558, 22, 3, 35, '2025-06-23'),
(4559, 24, 3, 36, '2025-06-23'),
(4560, 23, 1, 34, '2025-06-24'),
(4561, 25, 1, 35, '2025-06-24'),
(4562, 22, 1, 36, '2025-06-24'),
(4563, 24, 2, 34, '2025-06-24'),
(4564, 19, 2, 35, '2025-06-24'),
(4565, 21, 2, 36, '2025-06-24'),
(4566, 15, 3, 34, '2025-06-24'),
(4567, 20, 3, 35, '2025-06-24'),
(4568, 16, 3, 36, '2025-06-24'),
(4569, 20, 1, 34, '2025-06-25'),
(4570, 22, 1, 35, '2025-06-25'),
(4571, 25, 1, 36, '2025-06-25'),
(4572, 16, 2, 34, '2025-06-25'),
(4573, 24, 2, 35, '2025-06-25'),
(4574, 23, 2, 36, '2025-06-25'),
(4575, 15, 3, 34, '2025-06-25'),
(4576, 21, 3, 35, '2025-06-25'),
(4577, 19, 3, 36, '2025-06-25'),
(4578, 22, 1, 34, '2025-06-26'),
(4579, 15, 1, 35, '2025-06-26'),
(4580, 20, 1, 36, '2025-06-26'),
(4581, 19, 2, 34, '2025-06-26'),
(4582, 16, 2, 35, '2025-06-26'),
(4583, 23, 2, 36, '2025-06-26'),
(4584, 21, 3, 34, '2025-06-26'),
(4585, 25, 3, 35, '2025-06-26'),
(4586, 24, 3, 36, '2025-06-26'),
(4587, 15, 1, 34, '2025-06-27'),
(4588, 20, 1, 35, '2025-06-27'),
(4589, 21, 1, 36, '2025-06-27'),
(4590, 19, 2, 34, '2025-06-27'),
(4591, 22, 2, 35, '2025-06-27'),
(4592, 16, 2, 36, '2025-06-27'),
(4593, 25, 3, 34, '2025-06-27'),
(4594, 23, 3, 35, '2025-06-27'),
(4595, 24, 3, 36, '2025-06-27'),
(4596, 21, 1, 34, '2025-06-28'),
(4597, 16, 1, 35, '2025-06-28'),
(4598, 24, 1, 36, '2025-06-28'),
(4599, 22, 2, 34, '2025-06-28'),
(4600, 20, 2, 35, '2025-06-28'),
(4601, 25, 2, 36, '2025-06-28'),
(4602, 15, 3, 34, '2025-06-28'),
(4603, 19, 3, 35, '2025-06-28'),
(4604, 23, 3, 36, '2025-06-28'),
(4605, 23, 1, 34, '2025-06-29'),
(4606, 25, 1, 35, '2025-06-29'),
(4607, 15, 1, 36, '2025-06-29'),
(4608, 21, 2, 34, '2025-06-29'),
(4609, 24, 2, 35, '2025-06-29'),
(4610, 22, 2, 36, '2025-06-29'),
(4611, 20, 3, 34, '2025-06-29'),
(4612, 19, 3, 35, '2025-06-29'),
(4613, 16, 3, 36, '2025-06-29');

--
-- Déclencheurs `affectations`
--
DELIMITER $$
CREATE TRIGGER `before_affectations_insert` BEFORE INSERT ON `affectations` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    -- Récupérer le rôle de l'utilisateur
    SELECT role INTO user_role 
    FROM utilisateurs 
    WHERE id = NEW.pompiste_id;
    
    -- Vérifier si le rôle est différent de 'pompiste'
    IF user_role != 'pompiste' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Seuls les utilisateurs avec le rôle "pompiste" peuvent être affectés';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_affectations_update` BEFORE UPDATE ON `affectations` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    -- Récupérer le rôle de l'utilisateur
    SELECT role INTO user_role 
    FROM utilisateurs 
    WHERE id = NEW.pompiste_id;
    
    -- Vérifier si le rôle est différent de 'pompiste'
    IF user_role != 'pompiste' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Seuls les utilisateurs avec le rôle "pompiste" peuvent être affectés';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `description`, `parent_id`, `date_creation`) VALUES
(1, 'Magasin', 'Catégorie principale pour tous les produits en vente', NULL, '2025-05-15 20:47:25'),
(3, 'Produits', NULL, 1, '2025-05-16 19:46:10'),
(4, 'Produits Alimentaires', NULL, 1, '2025-05-16 23:10:45'),
(5, 'Accessoires voitures', NULL, 1, '2025-05-17 21:42:41');

-- --------------------------------------------------------

--
-- Structure de la table `details_credits`
--

CREATE TABLE `details_credits` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  `type_credit` enum('individuelle','organisationnelle') NOT NULL,
  `solde_credit` decimal(10,2) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `duree_credit` int(11) DEFAULT NULL,
  `credit_utilise` decimal(10,2) DEFAULT NULL,
  `etat` enum('actif','expiré','annulé','remboursé') DEFAULT 'actif',
  `montant_restant` decimal(10,2) DEFAULT NULL,
  `date_dernier_paiement` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `details_credits`
--

INSERT INTO `details_credits` (`id`, `id_utilisateur`, `type_credit`, `solde_credit`, `date_debut`, `duree_credit`, `credit_utilise`, `etat`, `montant_restant`, `date_dernier_paiement`) VALUES
(2, 13, 'organisationnelle', 500.00, '2025-04-10', 30, 500.00, 'remboursé', 0.00, '2025-04-16 19:06:03'),
(3, 10, 'organisationnelle', 500.00, '2025-04-10', 30, 500.00, 'expiré', 0.00, '2025-04-18 03:43:13'),
(4, 13, 'individuelle', 300.00, '2025-04-10', 1, NULL, 'expiré', NULL, NULL),
(5, 9, 'individuelle', 300.00, '2025-04-25', 30, 120.00, 'remboursé', 0.00, '2025-04-21 18:17:28'),
(6, 10, 'individuelle', 500.00, '2025-04-24', 30, NULL, 'remboursé', 0.00, '2025-04-21 18:25:07'),
(7, 13, 'individuelle', 1000.00, '2025-04-29', 1, 750.00, 'expiré', 660.00, '2025-04-29 05:40:13'),
(8, 9, 'individuelle', 500.00, '2025-04-30', 2, 500.00, 'expiré', 500.00, '2025-04-30 14:07:06'),
(9, 10, 'individuelle', 500.00, '2025-05-02', 30, NULL, 'actif', 500.00, NULL),
(10, 9, 'individuelle', 200.00, '2025-05-02', 30, NULL, 'actif', 200.00, NULL),
(11, 9, 'individuelle', 300.00, '2025-05-29', 30, 300.00, 'expiré', 300.00, '2025-05-02 22:29:05'),
(12, 9, 'individuelle', 300.00, '2025-05-02', 30, NULL, 'actif', 300.00, NULL),
(13, 10, 'individuelle', 500.00, '2025-05-02', 30, NULL, 'remboursé', 0.00, '2025-05-02 19:30:18'),
(14, 10, 'individuelle', 500.00, '2025-05-02', 30, NULL, 'actif', 500.00, NULL),
(15, 9, 'organisationnelle', 400.00, '2025-05-02', 30, NULL, 'actif', 400.00, NULL),
(16, 10, 'individuelle', 500.00, '2025-05-02', 30, 500.00, 'expiré', 500.00, '2025-05-02 23:20:01'),
(17, 10, 'organisationnelle', 500.00, '2025-05-02', 30, 498.00, 'actif', 100.00, '2025-05-13 20:25:47'),
(18, 13, 'individuelle', 200.00, '2025-05-16', 30, NULL, 'actif', 100.00, '2025-05-16 02:28:08');

--
-- Déclencheurs `details_credits`
--
DELIMITER $$
CREATE TRIGGER `before_details_credits_insert` BEFORE INSERT ON `details_credits` FOR EACH ROW BEGIN
    IF NEW.montant_restant IS NULL THEN
        SET NEW.montant_restant = NEW.solde_credit;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_details_credits_insert_update` BEFORE INSERT ON `details_credits` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    -- Récupérer le rôle de l'utilisateur
    SELECT role INTO user_role 
    FROM utilisateurs 
    WHERE id = NEW.id_utilisateur;
    
    -- Vérifier si le rôle est différent de 'client'
    IF user_role != 'client' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Seuls les utilisateurs avec le rôle "client" peuvent avoir des crédits';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_details_credits_update` BEFORE UPDATE ON `details_credits` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    -- Récupérer le rôle de l'utilisateur
    SELECT role INTO user_role 
    FROM utilisateurs 
    WHERE id = NEW.id_utilisateur;
    
    -- Vérifier si le rôle est différent de 'client'
    IF user_role != 'client' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Seuls les utilisateurs avec le rôle "client" peuvent avoir des crédits';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `ligne_vente`
--

CREATE TABLE `ligne_vente` (
  `id` int(11) NOT NULL,
  `vente_id` int(11) NOT NULL,
  `produit_id` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ligne_vente`
--

INSERT INTO `ligne_vente` (`id`, `vente_id`, `produit_id`, `quantite`, `prix_unitaire`, `created_at`) VALUES
(1, 2, 4, 3, 2.00, '2025-05-17 11:13:53'),
(2, 2, 5, 2, 2.00, '2025-05-17 11:13:53'),
(3, 2, 14, 1, 2.00, '2025-05-17 11:13:53'),
(4, 3, 17, 3, 2.00, '2025-05-18 00:16:50'),
(5, 3, 16, 2, 2.00, '2025-05-18 00:16:50'),
(6, 4, 16, 1, 2.00, '2025-05-18 00:33:24');

--
-- Déclencheurs `ligne_vente`
--
DELIMITER $$
CREATE TRIGGER `after_ligne_vente_insert` AFTER INSERT ON `ligne_vente` FOR EACH ROW BEGIN
    -- Diminuer le stock du produit vendu
    UPDATE produits 
    SET quantite_stock = quantite_stock - NEW.quantite,
        date_modification = NOW()
    WHERE id = NEW.produit_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_ligne_vente_insert` BEFORE INSERT ON `ligne_vente` FOR EACH ROW BEGIN
    DECLARE stock_actuel INT;
    
    -- Récupérer le stock actuel
    SELECT quantite_stock INTO stock_actuel 
    FROM produits 
    WHERE id = NEW.produit_id;
    
    -- Vérifier si le stock serait négatif après la vente
    IF (stock_actuel - NEW.quantite) < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Stock insuffisant pour ce produit';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `mouvements_stock`
--

CREATE TABLE `mouvements_stock` (
  `id` int(11) NOT NULL,
  `produit_id` int(11) NOT NULL,
  `type` enum('ENTREE','SORTIE','AJUSTEMENT') NOT NULL,
  `quantite` int(11) NOT NULL,
  `date_mouvement` datetime DEFAULT current_timestamp(),
  `agent_id` int(11) DEFAULT NULL,
  `raison` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mouvements_stock`
--

INSERT INTO `mouvements_stock` (`id`, `produit_id`, `type`, `quantite`, `date_mouvement`, `agent_id`, `raison`) VALUES
(1, 2, 'SORTIE', 2, '2025-05-15 21:51:41', 27, 'Vente N°1'),
(2, 4, 'ENTREE', 1, '2025-05-16 19:46:25', NULL, 'hh'),
(3, 10, 'ENTREE', 50, '2025-05-16 23:11:07', NULL, 's'),
(4, 13, 'ENTREE', 1, '2025-05-17 00:40:55', NULL, 's'),
(5, 5, 'SORTIE', 20, '2025-05-17 00:43:23', NULL, NULL),
(6, 5, 'ENTREE', 10, '2025-05-17 00:52:44', NULL, NULL),
(7, 5, 'ENTREE', 1, '2025-05-17 00:52:51', NULL, NULL),
(8, 16, 'ENTREE', 1, '2025-05-17 01:02:51', 14, 'z'),
(9, 5, 'ENTREE', 1, '2025-05-17 01:26:32', 14, 'r'),
(10, 4, 'SORTIE', 40, '2025-05-17 15:40:17', 14, NULL),
(11, 16, 'ENTREE', 30, '2025-05-17 15:40:37', 14, NULL),
(12, 16, 'SORTIE', 30, '2025-05-17 15:41:03', 14, NULL),
(13, 16, 'AJUSTEMENT', 30, '2025-05-17 15:42:34', 14, NULL),
(14, 16, 'ENTREE', 10, '2025-05-17 15:44:52', 14, NULL),
(15, 16, 'ENTREE', 20, '2025-05-17 15:45:15', 14, NULL),
(16, 16, 'AJUSTEMENT', 30, '2025-05-17 15:58:44', 14, NULL),
(17, 16, 'ENTREE', 10, '2025-05-17 15:58:59', 14, NULL),
(18, 16, 'SORTIE', 20, '2025-05-17 15:59:27', 14, NULL),
(19, 16, 'ENTREE', 50, '2025-05-17 15:59:47', 14, NULL),
(20, 16, 'ENTREE', 10, '2025-05-17 16:03:11', 14, NULL),
(21, 5, 'AJUSTEMENT', 10, '2025-05-17 16:05:14', 14, NULL),
(22, 5, 'ENTREE', 22, '2025-05-17 16:08:04', 14, NULL),
(23, 5, 'ENTREE', 1, '2025-05-17 16:08:19', 14, NULL),
(24, 5, 'ENTREE', 10, '2025-05-17 21:42:00', 14, NULL),
(25, 5, 'ENTREE', 4, '2025-05-17 21:42:17', 14, NULL),
(26, 5, 'ENTREE', 1, '2025-05-17 23:22:44', 14, NULL),
(27, 17, 'SORTIE', 3, '2025-05-18 01:16:50', NULL, 'Vente #3'),
(28, 16, 'SORTIE', 2, '2025-05-18 01:16:50', NULL, 'Vente #3'),
(29, 16, 'SORTIE', 1, '2025-05-18 01:33:24', 27, 'Vente #4');

--
-- Déclencheurs `mouvements_stock`
--
DELIMITER $$
CREATE TRIGGER `after_mouvement_delete` AFTER DELETE ON `mouvements_stock` FOR EACH ROW BEGIN
    -- Annuler l'effet du mouvement supprimé
    IF OLD.type = 'ENTREE' THEN
        UPDATE produits 
        SET quantite_stock = quantite_stock - OLD.quantite,
            date_modification = NOW()
        WHERE id = OLD.produit_id;
    ELSEIF OLD.type = 'SORTIE' THEN
        UPDATE produits 
        SET quantite_stock = quantite_stock + OLD.quantite,
            date_modification = NOW()
        WHERE id = OLD.produit_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_mouvement_insert` AFTER INSERT ON `mouvements_stock` FOR EACH ROW BEGIN
    -- Mise à jour du stock selon le type de mouvement
    IF NEW.type = 'ENTREE' THEN
        UPDATE produits 
        SET quantite_stock = quantite_stock + NEW.quantite,
            date_modification = NOW()
        WHERE id = NEW.produit_id;
    ELSEIF NEW.type = 'SORTIE' THEN
        UPDATE produits 
        SET quantite_stock = quantite_stock - NEW.quantite,
            date_modification = NOW()
        WHERE id = NEW.produit_id;
    ELSEIF NEW.type = 'AJUSTEMENT' THEN
        UPDATE produits 
        SET quantite_stock = NEW.quantite,
            date_modification = NOW()
        WHERE id = NEW.produit_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_mouvement_update` AFTER UPDATE ON `mouvements_stock` FOR EACH ROW BEGIN
    -- Si le type ou la quantité a changé, mettre à jour le stock
    IF (NEW.type != OLD.type OR NEW.quantite != OLD.quantite) THEN
        -- D'abord annuler l'effet de l'ancien mouvement
        IF OLD.type = 'ENTREE' THEN
            UPDATE produits 
            SET quantite_stock = quantite_stock - OLD.quantite,
                date_modification = NOW()
            WHERE id = OLD.produit_id;
        ELSEIF OLD.type = 'SORTIE' THEN
            UPDATE produits 
            SET quantite_stock = quantite_stock + OLD.quantite,
                date_modification = NOW()
            WHERE id = OLD.produit_id;
        END IF;
        
        -- Puis appliquer le nouveau mouvement
        IF NEW.type = 'ENTREE' THEN
            UPDATE produits 
            SET quantite_stock = quantite_stock + NEW.quantite,
                date_modification = NOW()
            WHERE id = NEW.produit_id;
        ELSEIF NEW.type = 'SORTIE' THEN
            UPDATE produits 
            SET quantite_stock = quantite_stock - NEW.quantite,
                date_modification = NOW()
            WHERE id = NEW.produit_id;
        ELSEIF NEW.type = 'AJUSTEMENT' THEN
            UPDATE produits 
            SET quantite_stock = NEW.quantite,
                date_modification = NOW()
            WHERE id = NEW.produit_id;
        END IF;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_mouvement_insert` BEFORE INSERT ON `mouvements_stock` FOR EACH ROW BEGIN
    DECLARE current_stock DECIMAL(10,2);
    
    -- Récupérer le stock actuel du produit
    SELECT quantite_stock INTO current_stock FROM produits WHERE id = NEW.produit_id;
    
    -- Vérifier si c'est une sortie et si le stock serait négatif après l'opération
    IF NEW.type = 'SORTIE' AND (current_stock - NEW.quantite) < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Stock insuffisant pour cette sortie';
    END IF;
    
    -- Vérifier si c'est un ajustement qui rendrait le stock négatif
    IF NEW.type = 'AJUSTEMENT' AND NEW.quantite < 0 AND (current_stock + NEW.quantite) < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ajustement impossible : stock deviendrait négatif';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_mouvement_update` BEFORE UPDATE ON `mouvements_stock` FOR EACH ROW BEGIN
    DECLARE current_stock DECIMAL(10,2);
    
    -- Si le type ou la quantité change, vérifier la nouvelle valeur
    IF (NEW.type != OLD.type OR NEW.quantite != OLD.quantite) THEN
        -- Récupérer le stock actuel du produit
        SELECT quantite_stock INTO current_stock FROM produits WHERE id = NEW.produit_id;
        
        -- Annuler l'effet de l'ancien mouvement
        IF OLD.type = 'ENTREE' THEN
            SET current_stock = current_stock - OLD.quantite;
        ELSEIF OLD.type = 'SORTIE' THEN
            SET current_stock = current_stock + OLD.quantite;
        END IF;
        
        -- Appliquer le nouveau mouvement et vérifier
        IF NEW.type = 'SORTIE' AND (current_stock - NEW.quantite) < 0 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Modification impossible : stock insuffisant';
        ELSEIF NEW.type = 'AJUSTEMENT' AND NEW.quantite < 0 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Ajustement impossible : valeur négative';
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `entity_type` enum('paiement','transaction','credit','vehicule','utilisateur','reclamation','stock') NOT NULL,
  `entity_id` int(11) NOT NULL,
  `type` enum('paiement_reussi','remboursement','transaction_reussie','expiration','expiration_proche','systeme','autre','reclamation_created','reclamation_closed','reclamation_updated','reclamation_resolved','alerte_stock') NOT NULL,
  `message` varchar(255) NOT NULL,
  `vue` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `id_utilisateur`, `entity_type`, `entity_id`, `type`, `message`, `vue`, `created_at`) VALUES
(1, 13, 'credit', 7, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 800 DT', 1, '2025-04-29 00:54:51'),
(2, 13, 'credit', 7, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 700 DT', 1, '2025-04-29 04:10:55'),
(3, 13, 'credit', 7, 'paiement_reussi', 'Paiement de 10 DT enregistré. Reste: 690 DT', 1, '2025-04-29 04:16:55'),
(4, 13, 'credit', 7, 'paiement_reussi', 'Paiement de 30 DT enregistré. Reste: 660 DT', 1, '2025-04-29 04:40:13'),
(5, 13, 'credit', 7, 'expiration', 'Votre crédit #7 a expiré', 1, '2025-05-01 23:00:00'),
(6, 10, 'credit', 13, 'remboursement', 'Crédit #13 complètement remboursé (500 DT)', 0, '2025-05-02 18:30:18'),
(7, 10, 'credit', 13, 'remboursement', 'Votre crédit #13 a été complètement remboursé', 0, '2025-05-02 19:00:00'),
(8, 10, 'credit', 17, 'paiement_reussi', 'Paiement de 200 DT enregistré. Reste: 300 DT', 0, '2025-05-04 10:39:51'),
(9, 10, 'credit', 17, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 200 DT', 0, '2025-05-13 18:58:49'),
(10, 10, 'credit', 17, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 100 DT', 0, '2025-05-13 19:25:47'),
(11, 13, 'credit', 18, 'paiement_reussi', 'Paiement de 100 DT enregistré. Reste: 100 DT', 1, '2025-05-16 01:28:08'),
(12, 13, 'reclamation', 7, '', 'Votre réclamation #REC-712859-866 a été marquée comme résolue', 1, '2025-05-16 16:50:12'),
(13, 13, 'reclamation', 5, '', 'Le statut de votre réclamation #REC-069248-224 a été mis à jour: en_cours', 1, '2025-05-16 16:51:28'),
(14, 13, 'reclamation', 7, '', 'Votre réclamation #REC-712859-866 a été fermée', 1, '2025-05-16 17:06:52'),
(15, 13, 'reclamation', 5, 'reclamation_resolved', 'Votre réclamation #REC-069248-224 a été marquée comme résolue', 1, '2025-05-16 17:13:33'),
(19, 13, 'reclamation', 4, 'reclamation_updated', 'Le statut de votre réclamation #REC-553193-986 a été mis à jour: en_cours', 1, '2025-05-17 20:27:23');

-- --------------------------------------------------------

--
-- Structure de la table `paiements_credits`
--

CREATE TABLE `paiements_credits` (
  `id` int(11) NOT NULL,
  `reference_paiement` varchar(50) DEFAULT NULL,
  `id_credit` int(11) NOT NULL,
  `montant_paye` decimal(10,2) NOT NULL,
  `montant_restant` decimal(10,2) DEFAULT NULL,
  `date_paiement` datetime DEFAULT current_timestamp(),
  `mode_paiement` enum('especes','carte','virement','cheque') NOT NULL,
  `description` text DEFAULT NULL,
  `id_caissier` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `paiements_credits`
--

INSERT INTO `paiements_credits` (`id`, `reference_paiement`, `id_credit`, `montant_paye`, `montant_restant`, `date_paiement`, `mode_paiement`, `description`, `id_caissier`) VALUES
(1, 'PAY-713926-205', 2, 50.00, 450.00, '2025-04-16 18:48:33', 'especes', 'hyt', NULL),
(2, 'PAY-763060-263', 2, 50.00, 400.00, '2025-04-16 19:06:03', 'especes', 'aa', NULL),
(3, 'PAY-678268-410', 3, 20.00, 480.00, '2025-04-16 19:21:18', 'especes', 'uu', NULL),
(4, 'PAY-011405-645', 5, 20.00, 220.00, '2025-04-21 18:03:31', 'especes', 'ZZ', NULL),
(5, 'PAY-082920-520', 5, 20.00, 200.00, '2025-04-21 18:04:42', 'carte', 'a', NULL),
(6, 'PAY-137335-971', 5, 20.00, 180.00, '2025-04-21 18:05:37', 'especes', 'Z', NULL),
(8, 'PAY-808660-435', 5, 50.00, 130.00, '2025-04-21 18:16:48', 'especes', 'zz', NULL),
(9, 'PAY-848827-537', 5, 20.00, 110.00, '2025-04-21 18:17:28', 'especes', 'S', NULL),
(10, 'PAY-307091-330', 6, 500.00, 0.00, '2025-04-21 18:25:07', 'virement', 'J', NULL),
(11, 'PAY-492094-669', 7, 100.00, 900.00, '2025-04-29 01:44:52', 'especes', 'Il a payé a la station', NULL),
(12, 'PAY-091324-877', 7, 100.00, 800.00, '2025-04-29 01:54:51', 'especes', 'z', NULL),
(13, 'PAY-855100-120', 7, 100.00, 700.00, '2025-04-29 05:10:55', 'especes', 'Z', NULL),
(14, 'PAY-215215-658', 7, 10.00, 690.00, '2025-04-29 05:16:55', 'especes', 'q', NULL),
(15, 'PAY-613554-300', 7, 30.00, 660.00, '2025-04-29 05:40:13', 'carte', 'YU', NULL),
(16, 'PAY-618916-407', 13, 500.00, 0.00, '2025-05-02 19:30:18', 'especes', 'q', NULL),
(17, 'PAY-191350-441', 17, 200.00, 300.00, '2025-05-04 11:39:51', 'especes', 'Z', NULL),
(18, 'PAY-729454-802', 17, 100.00, 200.00, '2025-05-13 19:58:49', 'especes', 'HH', NULL),
(19, 'PAY-347402-760', 17, 100.00, 100.00, '2025-05-13 20:25:47', 'especes', 'GG', 27),
(20, 'PAY-888513-183', 18, 100.00, 100.00, '2025-05-16 02:28:08', 'especes', '', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `element_name` varchar(100) DEFAULT NULL,
  `parent_element` varchar(100) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`id`, `role`, `element_name`, `parent_element`, `is_visible`) VALUES
(6, 'gerant', 'Utilisateurs', NULL, 1),
(7, 'cogerant', 'Utilisateurs', NULL, 1),
(11, 'gerant', 'Affecter pompistes', NULL, 1),
(12, 'cogerant', 'Affecter pompistes', NULL, 1),
(16, 'gerant', 'Crédits', NULL, 1),
(17, 'cogerant', 'Crédits', NULL, 1),
(21, 'gerant', 'Pompes', NULL, 1),
(22, 'cogerant', 'Pompes', NULL, 1),
(26, 'gerant', 'Stock', NULL, 1),
(27, 'cogerant', 'Stock', NULL, 1),
(36, 'gerant', 'Saisie vente credit', NULL, 0),
(37, 'cogerant', 'Saisie vente credit', NULL, 0),
(38, 'caissier', 'Saisie vente credit', NULL, 0),
(39, 'pompiste', 'Saisie vente credit', NULL, 1),
(41, 'gerant', 'Saisie Index fermeture', 'Pompes', 0),
(42, 'cogerant', 'Saisie Index fermeture', NULL, 0),
(43, 'caissier', 'Saisie Index fermeture', NULL, 0),
(44, 'pompiste', 'Saisie Index fermeture', NULL, 1),
(69, 'gerant', 'Créer compte', 'Utilisateurs', 1),
(70, 'cogerant', 'Créer compte', 'Utilisateurs', 0),
(74, 'gerant', 'Liste utilisateurs', 'Utilisateurs', 1),
(75, 'cogerant', 'Liste utilisateurs', 'Utilisateurs', 1),
(79, 'gerant', 'Enregistrer crédit', 'Crédits', 1),
(80, 'cogerant', 'Enregistrer crédit', 'Crédits', 1),
(84, 'gerant', 'Enregistrer Véhicules', 'Crédits', 1),
(85, 'cogerant', 'Enregistrer Véhicules', 'Crédits', 1),
(89, 'gerant', 'Historique des Paiements', 'Crédits', 1),
(90, 'cogerant', 'Historique des Paiements', 'Crédits', 0),
(94, 'gerant', 'Historique des Transactions', 'Crédits', 1),
(95, 'cogerant', 'Historique des Transactions', 'Crédits', 0),
(99, 'gerant', 'Enregistrer pompe', 'Pompes', 1),
(100, 'cogerant', 'Enregistrer pompe', 'Pompes', 1),
(104, 'gerant', 'Liste pompes', 'Pompes', 1),
(105, 'cogerant', 'Liste pompes', 'Pompes', 1),
(109, 'caissier', 'Saisie Paiements', NULL, 1),
(110, 'cogerant', 'Saisie Paiements', 'Crédits', 1),
(111, 'gerant', 'Saisie Paiements', 'Crédits', 1),
(112, 'gerant', 'Visualiser Revenues', NULL, 1),
(113, 'cogerant', 'Visualiser Revenues', NULL, 1),
(114, 'gerant', 'Dashboard', NULL, 1),
(115, 'cogerant', 'Dashboard', NULL, 1),
(116, 'caissier', 'Dashboard', NULL, 1),
(117, 'pompiste', 'Dashboard', NULL, 1),
(118, 'client', 'Dashboard', NULL, 1),
(119, 'gerant', 'Gérer le Stock', 'Stock', 1),
(120, 'cogerant', 'Gérer le Stock', 'Stock', 1),
(121, 'client', 'Réclamer', NULL, 1),
(122, 'pompiste', 'Réclamer', NULL, 0),
(123, 'caissier', 'Réclamer', NULL, 0),
(124, 'gerant', 'Réclamer', NULL, 0),
(125, 'cogerant', 'Réclamer', NULL, 0),
(126, 'cogerant', 'Traiter les réclamations', NULL, 1),
(127, 'gerant', 'Traiter les réclamations', NULL, 1),
(128, 'gerant', 'Point de vente', 'Stock', 0),
(129, 'cogerant', 'Point de vente', 'Stock', 0),
(130, 'pompiste', 'Point de vente', NULL, 0),
(131, 'caissier ', 'Point de vente', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `pistolets`
--

CREATE TABLE `pistolets` (
  `id` int(11) NOT NULL,
  `pompe_id` int(11) NOT NULL,
  `numero_pistolet` varchar(50) NOT NULL,
  `statut` enum('disponible','indisponible','maintenance') DEFAULT 'disponible',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nom_produit` varchar(50) NOT NULL DEFAULT 'Sans nom',
  `prix_unitaire` decimal(10,2) NOT NULL DEFAULT 0.00,
  `unite_mesure` varchar(10) DEFAULT 'Litre',
  `date_dernier_index` date DEFAULT NULL,
  `dernier_index` decimal(12,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pistolets`
--

INSERT INTO `pistolets` (`id`, `pompe_id`, `numero_pistolet`, `statut`, `created_at`, `updated_at`, `nom_produit`, `prix_unitaire`, `unite_mesure`, `date_dernier_index`, `dernier_index`) VALUES
(4, 34, 'PIII1', 'disponible', '2025-04-21 19:28:39', '2025-05-08 19:37:27', 'SP95', 2.50, 'Litre', '2025-05-08', 400.00),
(5, 35, 'PI01', 'maintenance', '2025-04-22 00:34:53', '2025-05-08 19:26:49', 'SP95', 2.50, 'Litre', '2025-04-24', NULL),
(6, 35, 'PI03', 'disponible', '2025-04-22 00:34:53', '2025-05-08 19:27:10', 'GPL', 2.70, 'Litre', '2025-04-24', NULL),
(7, 35, 'PI02', 'disponible', '2025-04-22 00:34:53', '2025-05-08 19:27:33', 'GAZOLE', 2.30, 'Litre', '2025-04-30', NULL),
(8, 36, 'PI04', 'disponible', '2025-04-22 00:39:26', '2025-05-13 16:30:18', 'SP95', 2.50, 'Litre', '2025-05-13', 200.00);

-- --------------------------------------------------------

--
-- Structure de la table `pompes`
--

CREATE TABLE `pompes` (
  `id` int(11) NOT NULL,
  `numero_pompe` varchar(50) NOT NULL,
  `type_pompe` enum('sans plomb','gasoil','multi-produits') NOT NULL,
  `statut` enum('en_service','hors_service_temporaire','reserve','maintenance','hors_service_definitif') DEFAULT 'reserve',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pompes`
--

INSERT INTO `pompes` (`id`, `numero_pompe`, `type_pompe`, `statut`, `created_at`) VALUES
(34, 'P020', 'gasoil', 'reserve', '2025-04-21 18:28:39'),
(35, 'P021', 'multi-produits', 'reserve', '2025-04-22 00:34:52'),
(36, 'P022', 'sans plomb', 'reserve', '2025-04-22 00:39:26');

-- --------------------------------------------------------

--
-- Structure de la table `postes`
--

CREATE TABLE `postes` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `postes`
--

INSERT INTO `postes` (`id`, `nom`, `heure_debut`, `heure_fin`) VALUES
(1, 'Matin', '06:00:00', '14:00:00'),
(2, 'Après-midi', '14:00:00', '22:00:00'),
(3, 'Nuit', '22:00:00', '06:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` int(11) NOT NULL,
  `code_barre` varchar(50) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `categorie_id` int(11) NOT NULL,
  `prix_achat` decimal(10,2) NOT NULL,
  `prix_vente` decimal(10,2) NOT NULL,
  `quantite_stock` int(11) NOT NULL DEFAULT 0,
  `seuil_alerte` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  `date_modification` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `code_barre`, `nom`, `description`, `categorie_id`, `prix_achat`, `prix_vente`, `quantite_stock`, `seuil_alerte`, `image_url`, `date_creation`, `date_modification`) VALUES
(2, '1234567890123', 'Produit Exemple', 'Ceci est un produit exemple pour illustrer une insertion.', 1, 10.50, 15.00, 98, 10, 'http://localhost:3000/public/transactions/transaction_1746466704645.png', '2025-05-15 20:47:40', '2025-05-15 21:51:41'),
(4, '5449000000995', 'Gaufrettes', NULL, 1, 1.00, 2.00, 40, 5, NULL, '2025-05-16 12:16:27', '2025-05-17 21:36:09'),
(5, '3017620422003', 'Coca Cola Boycott', NULL, 1, 1.00, 2.00, 85, 20, NULL, '2025-05-16 12:35:19', '2025-05-17 23:22:44'),
(10, '123444444444444442', 'Sablito', NULL, 3, 200.00, 300.00, 150, 5, NULL, '2025-05-16 19:51:33', '2025-05-16 23:11:07'),
(13, '2222229999', 'mahdeeeen', NULL, 3, 1.00, 2.00, 52, 10, 'http://localhost:3000/images_produits/produit_1747433401088.jpeg', '2025-05-16 22:46:25', '2025-05-17 00:40:55'),
(14, '3332222222222222', 'HUILE', NULL, 3, 1.00, 2.00, 50, 10, 'http://localhost:3000/images_produits/produit_1747433378757.jpg', '2025-05-16 22:54:43', '2025-05-16 23:09:38'),
(15, '6666666666666666666666', 'Monoo', 'YHY', 4, 1.00, 2.00, 50, 30, 'http://localhost:3000/images_produits/produit_1747437711442.jpg', '2025-05-17 00:21:51', NULL),
(16, 'CB2080557356', 'ghuuuuu', 'HHHH', 4, 1.00, 2.00, 121, 2, 'http://localhost:3000/images_produits/produit_1747438679148.jpeg', '2025-05-17 00:37:59', '2025-05-18 01:33:24'),
(17, 'CB3508654297', 'zhéugzé', NULL, 3, 1.00, 2.00, 41, 20, NULL, '2025-05-17 15:07:37', '2025-05-18 01:16:50'),
(18, 'CB8750034039', 'Yaoughrt', NULL, 4, 0.30, 0.50, 200, 50, NULL, '2025-05-18 05:04:19', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `rapports_journaliers`
--

CREATE TABLE `rapports_journaliers` (
  `id` int(11) NOT NULL,
  `date_rapport` date NOT NULL,
  `pistolet_id` int(11) NOT NULL,
  `total_quantite` decimal(10,2) NOT NULL,
  `total_montant` decimal(10,2) NOT NULL,
  `nombre_postes` int(11) NOT NULL,
  `date_generation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rapports_journaliers`
--

INSERT INTO `rapports_journaliers` (`id`, `date_rapport`, `pistolet_id`, `total_quantite`, `total_montant`, `nombre_postes`, `date_generation`) VALUES
(17, '2025-05-02', 4, 200.00, 500.00, 1, '2025-05-02 16:15:58'),
(21, '2025-05-04', 4, 200.00, 500.00, 1, '2025-05-04 16:10:33'),
(22, '2025-05-04', 8, 100.00, 400.00, 1, '2025-05-04 18:29:45');

-- --------------------------------------------------------

--
-- Structure de la table `reclamations`
--

CREATE TABLE `reclamations` (
  `id` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `objet` varchar(255) NOT NULL,
  `raison` enum('service','produit','facturation','autre') NOT NULL,
  `description` text NOT NULL,
  `reference` varchar(50) NOT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  `statut` enum('nouveau','en_cours','resolu','fermer') DEFAULT 'nouveau'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reclamations`
--

INSERT INTO `reclamations` (`id`, `id_client`, `objet`, `raison`, `description`, `reference`, `date_creation`, `statut`) VALUES
(4, 13, 'credit pas incrementé', 'service', 'ghegudgdeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'REC-553193-986', '2025-05-16 13:29:13', 'en_cours'),
(5, 13, 'credit pas incrementé', 'service', 'gfddjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjg', 'REC-069248-224', '2025-05-16 13:37:49', 'resolu'),
(6, 13, 'credit pas incrementé', 'produit', 'zzzzzzzzzzzzzzzzzzzzzzz', 'REC-218998-520', '2025-05-16 13:40:19', 'resolu'),
(7, 13, 'credit pas incrementé', 'produit', 'sssssssssssssssssssssssss', 'REC-712859-866', '2025-05-16 14:05:12', 'fermer');

-- --------------------------------------------------------

--
-- Structure de la table `releves_postes`
--

CREATE TABLE `releves_postes` (
  `id` int(11) NOT NULL,
  `affectation_id` int(11) NOT NULL,
  `pistolet_id` int(11) NOT NULL,
  `index_ouverture` decimal(12,2) NOT NULL CHECK (`index_ouverture` >= 0),
  `index_fermeture` decimal(12,2) NOT NULL CHECK (`index_fermeture` >= `index_ouverture`),
  `date_heure_saisie` datetime DEFAULT current_timestamp(),
  `statut` enum('saisie','valide','annule') DEFAULT 'saisie',
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `releves_postes`
--

INSERT INTO `releves_postes` (`id`, `affectation_id`, `pistolet_id`, `index_ouverture`, `index_fermeture`, `date_heure_saisie`, `statut`, `updated_at`) VALUES
(17, 4086, 4, 0.00, 200.00, '2025-05-02 16:13:31', 'valide', '2025-05-08 19:35:06'),
(18, 4104, 4, 200.00, 400.00, '2025-05-08 20:23:32', 'valide', '2025-05-08 19:37:27'),
(19, 4187, 8, 0.00, 200.00, '2025-05-13 17:30:17', 'saisie', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `id_vehicule` int(11) DEFAULT NULL,
  `quantite` decimal(10,2) DEFAULT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `date_transaction` datetime DEFAULT NULL,
  `id_credit` int(11) DEFAULT NULL,
  `preuve` varchar(255) DEFAULT NULL COMMENT 'Chemin vers la preuve photo de la transaction',
  `id_pompiste` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `id_vehicule`, `quantite`, `montant`, `date_transaction`, `id_credit`, `preuve`, `id_pompiste`) VALUES
(1, 18, 30.00, 315.00, '2025-04-17 20:23:15', 2, NULL, NULL),
(2, 18, 7.62, 80.00, '2025-04-17 21:09:03', 2, NULL, NULL),
(3, 18, 2.86, 30.00, '2025-04-17 21:09:16', 2, NULL, NULL),
(4, 18, 0.95, 10.00, '2025-04-17 21:09:24', 2, NULL, NULL),
(5, 18, 1.90, 20.00, '2025-04-17 21:11:53', 2, NULL, NULL),
(6, 18, 0.95, 10.00, '2025-04-17 21:17:05', 2, NULL, NULL),
(7, 18, 1.90, 20.00, '2025-04-17 21:28:36', 2, NULL, NULL),
(8, 18, 1.90, 20.00, '2025-04-17 21:30:20', 2, NULL, NULL),
(9, 19, 37.04, 100.00, '2025-04-18 00:28:45', 3, NULL, NULL),
(10, 19, 111.11, 300.00, '2025-04-18 01:00:21', 3, NULL, NULL),
(11, 19, 74.07, 200.00, '2025-04-18 01:04:04', 3, NULL, NULL),
(12, 19, 80.00, 200.00, '2025-04-18 01:14:36', 3, NULL, NULL),
(13, 19, 80.00, 200.00, '2025-04-18 01:17:54', 3, NULL, NULL),
(14, 19, 9.52, 100.00, '2025-04-18 01:24:24', 3, NULL, NULL),
(15, 19, 7.41, 20.00, '2025-04-18 01:27:17', 3, NULL, NULL),
(16, 19, 1.90, 20.00, '2025-04-18 01:31:09', 3, NULL, NULL),
(17, 19, 7.41, 20.00, '2025-04-18 01:42:32', 3, NULL, NULL),
(18, 19, 1.90, 20.00, '2025-04-18 01:52:08', 3, NULL, NULL),
(19, 19, 19.05, 200.00, '2025-04-18 01:52:25', 3, NULL, NULL),
(20, 19, 19.05, 200.00, '2025-04-18 01:55:39', 3, NULL, NULL),
(21, 19, 19.05, 200.00, '2025-04-18 01:59:39', 3, NULL, NULL),
(22, 19, 1.90, 20.00, '2025-04-18 02:01:32', 3, NULL, NULL),
(23, 19, 19.05, 200.00, '2025-04-18 03:02:56', 3, NULL, NULL),
(24, 19, 1.90, 20.00, '2025-04-18 03:43:13', 3, NULL, NULL),
(25, 20, 1.90, 20.00, '2025-04-18 13:35:28', 5, NULL, NULL),
(26, 20, 1.90, 20.00, '2025-04-18 14:27:58', 5, NULL, NULL),
(27, 20, 1.90, 20.00, '2025-04-18 14:53:17', 5, NULL, NULL),
(28, 21, 9.52, 100.00, '2025-04-29 03:00:45', 7, NULL, NULL),
(29, 21, 9.52, 100.00, '2025-04-29 03:09:55', 7, NULL, NULL),
(30, 21, 18.52, 50.00, '2025-04-29 03:27:35', 7, NULL, NULL),
(31, 21, 20.00, 50.00, '2025-04-29 03:35:42', 7, NULL, NULL),
(32, 21, 20.00, 50.00, '2025-04-29 03:38:35', 7, NULL, NULL),
(33, 21, 20.00, 50.00, '2025-04-29 03:39:45', 7, NULL, NULL),
(34, 21, 16.00, 40.00, '2025-04-29 03:51:25', 7, NULL, NULL),
(35, 21, 16.00, 40.00, '2025-04-29 04:01:54', 7, NULL, NULL),
(36, 21, 3.81, 40.00, '2025-04-29 04:03:10', 7, NULL, NULL),
(37, 21, 1.90, 20.00, '2025-04-29 04:06:52', 7, NULL, NULL),
(38, 21, 1.90, 20.00, '2025-04-29 04:18:23', 7, NULL, NULL),
(39, 21, 1.90, 20.00, '2025-04-29 04:29:37', 7, NULL, NULL),
(40, 21, 1.90, 20.00, '2025-04-29 04:49:42', 7, NULL, NULL),
(41, 21, 9.52, 100.00, '2025-04-29 05:19:36', 7, NULL, NULL),
(42, 21, 9.52, 100.00, '2025-04-29 05:25:24', 7, NULL, NULL),
(43, 21, 4.76, 50.00, '2025-04-29 05:32:05', 7, NULL, NULL),
(44, 21, 20.00, 50.00, '2025-04-29 05:33:25', 7, NULL, NULL),
(45, 21, 4.76, 50.00, '2025-04-29 05:38:26', 7, NULL, NULL),
(46, 22, 38.10, 400.00, '2025-04-30 14:05:07', 8, NULL, NULL),
(47, 22, 9.52, 100.00, '2025-04-30 14:07:06', 8, NULL, NULL),
(48, 26, 9.52, 100.00, '2025-05-02 22:27:06', 11, NULL, NULL),
(49, 26, 9.52, 100.00, '2025-05-02 22:28:27', 11, NULL, NULL),
(50, 26, 9.52, 100.00, '2025-05-02 22:29:05', 11, NULL, NULL),
(51, 27, 9.52, 100.00, '2025-05-02 23:15:26', 16, NULL, NULL),
(52, 27, 9.52, 100.00, '2025-05-02 23:16:18', 16, NULL, NULL),
(53, 27, 9.52, 100.00, '2025-05-02 23:19:06', 16, NULL, NULL),
(54, 27, 9.52, 100.00, '2025-05-02 23:19:51', 16, NULL, NULL),
(55, 27, 9.52, 100.00, '2025-05-02 23:20:01', 16, NULL, NULL),
(56, 28, 9.52, 100.00, '2025-05-05 16:22:08', 17, NULL, NULL),
(57, 28, 9.52, 100.00, '2025-05-05 16:24:48', 17, NULL, NULL),
(58, 28, 9.52, 100.00, '2025-05-05 16:27:14', 17, NULL, NULL),
(59, 28, 9.52, 100.00, '2025-05-05 16:43:38', 17, NULL, NULL),
(60, 28, 1.90, 20.00, '2025-05-05 16:47:15', 17, NULL, NULL),
(61, 28, 1.90, 20.00, '2025-05-05 16:53:24', 17, NULL, NULL),
(62, 28, 0.95, 10.00, '2025-05-05 17:02:15', 17, 'uploads\\transactions\\transaction_1746460935280.png', NULL),
(63, 28, 0.95, 10.00, '2025-05-05 17:04:46', 17, 'transactions\\transaction_1746461085648.jpg', NULL),
(64, 28, 0.95, 10.00, '2025-05-05 17:09:05', 17, 'http://localhost:3000/transactions/transaction_1746461345466.png', NULL),
(65, 28, 0.95, 10.00, '2025-05-05 18:38:24', 17, 'http://localhost:3000/public/transactions/transaction_1746466704645.png', 25),
(70, 28, 0.95, 10.00, '2025-05-13 19:22:00', 17, '25', NULL),
(72, 28, 0.48, 5.00, '2025-05-13 19:26:34', 17, '25', NULL),
(73, 28, 0.19, 2.00, '2025-05-13 19:30:16', 17, '25', NULL),
(75, 28, 0.10, 1.00, '2025-05-13 19:36:22', 17, 'http://localhost:3000/transactions/transaction_1747161382077.png', 25);

--
-- Déclencheurs `transactions`
--
DELIMITER $$
CREATE TRIGGER `verify_pompiste_role_before_insert` BEFORE INSERT ON `transactions` FOR EACH ROW BEGIN
    DECLARE user_role VARCHAR(20);
    
    IF NEW.id_pompiste IS NOT NULL THEN
        SELECT role INTO user_role 
        FROM utilisateurs 
        WHERE id = NEW.id_pompiste;
        
        IF user_role != 'pompiste' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'L''utilisateur assigné comme pompiste doit avoir le rôle "pompiste"';
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `numero_telephone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('gerant','Cogerant','caissier','pompiste','client') NOT NULL DEFAULT 'client',
  `temps_de_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active',
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `username`, `email`, `numero_telephone`, `password`, `role`, `temps_de_creation`, `status`, `photo`) VALUES
(9, 'john', 'johndoe@example.com', '1234567898', '$2b$10$ZTs0/GYkUz4R3c6.fqQbQuOaWbmaH0CJa9NCIlADeiDvF7e.urmFO', 'client', '2025-03-14 14:42:46', 'active', NULL),
(10, 'mahdov', 'jo@example.com', '1267898883', '$2b$10$r78JXVlJc7FO6ST/HS.o8ubQhjyFERrn/GfTlQzmvxcazkfl.pvWO', 'client', '2025-03-14 15:26:28', 'active', NULL),
(13, 'Mahdi Bey', 'cncservice2018@gmail.com', '56327280', '$2b$10$I.ack14P/JALNplUd9i3NuR6w/fys71k9DVysmRUSxk9QrDIOGWGi', 'client', '2025-03-14 16:45:22', 'active', '/images/nbg.png'),
(14, 'Ahmed Zamma', 'mahdibeyy@gmail.com', '56327237', '$2b$10$3CWPvFBhxga1s4jGx88YjeUI0CRAKEBm1I/1Lbp0Jn/ipokbW18r.', 'gerant', '2025-03-17 13:43:35', 'active', '/images/nbg.png'),
(15, 'Ahmed Bey', 'mahdibey2002@gmail.com', '56327210', '$2b$10$0NjolxaLuID7fcKfLy8sOOYShGEjARg3L9BQN9spbEcnv8RkyrWZq', 'pompiste', '2025-03-17 20:55:51', 'active', NULL),
(16, 'mahdi', 'newuser@example.com', '12345678', '$2b$10$1d0Yfs65TEqFFE5acBSGb.QP7xQWQv6RcKzFGJFLVytMV8i5Pdhzm', 'pompiste', '2025-03-29 10:18:29', 'active', NULL),
(19, 'Mariem Baccouche', 'baccouche.mariem.iset@gmail.com', '98830579', '$2b$10$OVCe4SOpRX94g4aE7AyFC.XJbOaw8A3InOVVy5AyLJ.lVyPqJ0wlm', 'pompiste', '2025-04-14 13:37:31', 'active', NULL),
(20, 'Mario Balotelli', 'SuperMario45@gmail.com', '1234567890', '$2b$10$IMKRHiru0FvkPr72Uv2D1efDlfNfkLfmsswC9bnTLtizCbK.O.9W2', 'pompiste', '2025-04-22 00:40:25', 'active', NULL),
(21, 'Edin Dzeko', 'Edindzeko9@gmail.com', '54209180', '$2b$10$asZ.b8ntHVVZNyhQNdaFzusc/jPtNhD1S1EzdDdQHNPYqorcaXjzu', 'pompiste', '2025-04-22 00:41:20', 'active', NULL),
(22, 'Lautaro Martinez', 'LautaroMartinez9@gmail.com', '54209183', '$2b$10$jEz5RXNjm7Pc/75TjMV0yO5O0mj0ijKc1uaNnTs/rPfacGOQsz6Vi', 'pompiste', '2025-04-22 00:41:55', 'active', NULL),
(23, 'Nicolo Barella', 'NicoloBarella9@gmail.com', '54209187', '$2b$10$Jxx6.XusstHPy8I3DS.uB.dGpxuOvwC8jSZpeo26JSUpCjodHCA5.', 'pompiste', '2025-04-22 00:42:26', 'active', NULL),
(24, 'Hannibal Mejbri', 'HannibalMejbri9@gmail.com', '54209182', '$2b$10$Q.7O5BjpJbkHDwDI.z8KwOepeNpmjeVLAPMNL8k1m4O.lW6ZGyWty', 'pompiste', '2025-04-22 00:43:11', 'active', NULL),
(25, 'Radhouane Falhi', 'RadhouaneFalhi9@gmail.com', '54209181', '$2b$10$hdhts5/ARh4RjGADK/FUjONFaBrpnJdeD.Gm0N/D/5lCemMrWEOAK', 'pompiste', '2025-04-22 00:44:07', 'active', '/images/radhouane.png'),
(26, 'Davide Fratessi', 'DavideFratessi@gmail.com', '12345678908', '$2b$10$5sO016NlCVTYgMAe3RI...CxiJ22e3NwRVYVg7/glNXjzr5AZivgS', 'Cogerant', '2025-04-27 15:37:03', 'active', NULL),
(27, 'Frank kessie', 'FrankKessie@gmail.com', '126789888322', '$2b$10$CAMtYtYp6Cx/kA1vQVvWPuTG8ERoFeUr6QRIolbr509CJzJuu/Qn2', 'caissier', '2025-05-13 17:49:29', 'active', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `vehicules`
--

CREATE TABLE `vehicules` (
  `id` int(11) NOT NULL,
  `immatriculation` varchar(20) NOT NULL,
  `marque` varchar(50) DEFAULT NULL,
  `type_vehicule` enum('voiture','camion','bus','moto') DEFAULT 'voiture',
  `qr_code` varchar(255) DEFAULT NULL,
  `id_credit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vehicules`
--

INSERT INTO `vehicules` (`id`, `immatriculation`, `marque`, `type_vehicule`, `qr_code`, `id_credit`) VALUES
(8, '22TU2002', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/22TU2002.png', 2),
(11, '23TU2002', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/23TU2002.png', 3),
(12, '22TU2004', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2004.png', 4),
(13, '22TU2003', 'GOLF', 'voiture', 'http://localhost:3000/qrcodes/22TU2003.png', 2),
(14, '22TU2006', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2006.png', 2),
(15, '22TU2025', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2025.png', 3),
(17, '22TU2026', 'GOLF', 'camion', 'http://localhost:3000/qrcodes/22TU2026.png', 4),
(18, '22TU2027', 'GOLF', 'moto', 'http://localhost:3000/qrcodes/22TU2027.png', 2),
(19, '22TU2030', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2030.png', 3),
(20, '22TU2050', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2050.png', 5),
(21, '250TU2022', 'SEAT', 'voiture', 'http://localhost:3000/qrcodes/250TU2022.png', 7),
(22, '22TU2005', 'SEAT', 'voiture', 'http://localhost:3000/qrcodes/22TU2005.png', 8),
(23, '22TU2066', 'SEAT ', 'voiture', 'undefined/qrcodes/22TU2066.png', 9),
(24, '22TU2044', 'BMW', 'voiture', 'undefined/qrcodes/22TU2044.png', 14),
(25, '23TU255', 'BMW', 'voiture', 'undefined/qrcodes/23TU255.png', 12),
(26, '22TU2033', 'Mercedes', 'camion', 'http://localhost:3000/qrcodes/22TU2033.png', 11),
(27, '22TU2099', 'BMW', 'voiture', 'http://localhost:3000/qrcodes/22TU2099.png', 16),
(28, '22TU2012', 'Semi', 'camion', 'http://localhost:3000/qrcodes/22TU2012.png', 17),
(29, '22TU2054', 'Mercedes', 'voiture', 'http://localhost:3000/qrcodes/22TU2054.png', 18);

-- --------------------------------------------------------

--
-- Structure de la table `ventes`
--

CREATE TABLE `ventes` (
  `id` int(11) NOT NULL,
  `date_vente` datetime DEFAULT current_timestamp(),
  `montant_total` decimal(12,2) NOT NULL,
  `montant_paye` decimal(12,2) NOT NULL,
  `monnaie_rendue` decimal(10,2) GENERATED ALWAYS AS (`montant_paye` - `montant_total`) VIRTUAL,
  `mode_paiement` enum('ESPECES','CARTE','CHEQUE') NOT NULL DEFAULT 'ESPECES',
  `id_caissier` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ventes`
--

INSERT INTO `ventes` (`id`, `date_vente`, `montant_total`, `montant_paye`, `mode_paiement`, `id_caissier`) VALUES
(1, '2025-05-15 21:51:41', 20.00, 50.00, 'ESPECES', 27),
(2, '2025-05-17 10:30:00', 12.00, 20.00, 'ESPECES', 27),
(3, '2025-05-18 01:16:50', 10.00, 12.00, 'ESPECES', NULL),
(4, '2025-05-18 01:33:24', 2.00, 2.00, 'ESPECES', 27);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `affectations`
--
ALTER TABLE `affectations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pompiste_id` (`pompiste_id`),
  ADD KEY `poste_id` (`poste_id`),
  ADD KEY `pompe_id` (`pompe_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Index pour la table `details_credits`
--
ALTER TABLE `details_credits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `ligne_vente`
--
ALTER TABLE `ligne_vente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vente_id` (`vente_id`),
  ADD KEY `produit_id` (`produit_id`);

--
-- Index pour la table `mouvements_stock`
--
ALTER TABLE `mouvements_stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produit_id` (`produit_id`),
  ADD KEY `utilisateur_id` (`agent_id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference_paiement` (`reference_paiement`),
  ADD KEY `id_credit` (`id_credit`),
  ADD KEY `fk_caissier` (`id_caissier`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pistolets`
--
ALTER TABLE `pistolets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pompe_id` (`pompe_id`);

--
-- Index pour la table `pompes`
--
ALTER TABLE `pompes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_pompe` (`numero_pompe`);

--
-- Index pour la table `postes`
--
ALTER TABLE `postes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_barre` (`code_barre`),
  ADD KEY `categorie_id` (`categorie_id`);

--
-- Index pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pistolet_id` (`pistolet_id`),
  ADD KEY `date_rapport` (`date_rapport`);

--
-- Index pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference` (`reference`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `releves_postes`
--
ALTER TABLE `releves_postes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `affectation_id` (`affectation_id`),
  ADD KEY `pistolet_id` (`pistolet_id`);

--
-- Index pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_vehicule` (`id_vehicule`),
  ADD KEY `id_credit` (`id_credit`),
  ADD KEY `fk_pompiste` (`id_pompiste`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `immatriculation` (`immatriculation`),
  ADD UNIQUE KEY `qr_code` (`qr_code`),
  ADD KEY `id_credit` (`id_credit`);

--
-- Index pour la table `ventes`
--
ALTER TABLE `ventes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_caissier` (`id_caissier`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `affectations`
--
ALTER TABLE `affectations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4614;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `details_credits`
--
ALTER TABLE `details_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `ligne_vente`
--
ALTER TABLE `ligne_vente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `mouvements_stock`
--
ALTER TABLE `mouvements_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT pour la table `pistolets`
--
ALTER TABLE `pistolets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `pompes`
--
ALTER TABLE `pompes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT pour la table `postes`
--
ALTER TABLE `postes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `reclamations`
--
ALTER TABLE `reclamations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `releves_postes`
--
ALTER TABLE `releves_postes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `vehicules`
--
ALTER TABLE `vehicules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `ventes`
--
ALTER TABLE `ventes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `affectations`
--
ALTER TABLE `affectations`
  ADD CONSTRAINT `affectations_ibfk_1` FOREIGN KEY (`pompiste_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `affectations_ibfk_2` FOREIGN KEY (`poste_id`) REFERENCES `postes` (`id`),
  ADD CONSTRAINT `affectations_ibfk_3` FOREIGN KEY (`pompe_id`) REFERENCES `pompes` (`id`);

--
-- Contraintes pour la table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `details_credits`
--
ALTER TABLE `details_credits`
  ADD CONSTRAINT `details_credits_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `ligne_vente`
--
ALTER TABLE `ligne_vente`
  ADD CONSTRAINT `ligne_vente_ibfk_1` FOREIGN KEY (`vente_id`) REFERENCES `ventes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ligne_vente_ibfk_2` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`);

--
-- Contraintes pour la table `mouvements_stock`
--
ALTER TABLE `mouvements_stock`
  ADD CONSTRAINT `mouvements_stock_ibfk_1` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`),
  ADD CONSTRAINT `mouvements_stock_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `paiements_credits`
--
ALTER TABLE `paiements_credits`
  ADD CONSTRAINT `fk_caissier` FOREIGN KEY (`id_caissier`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `paiements_credits_ibfk_1` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`);

--
-- Contraintes pour la table `pistolets`
--
ALTER TABLE `pistolets`
  ADD CONSTRAINT `pistolets_ibfk_1` FOREIGN KEY (`pompe_id`) REFERENCES `pompes` (`id`);

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `rapports_journaliers`
--
ALTER TABLE `rapports_journaliers`
  ADD CONSTRAINT `rapports_journaliers_ibfk_1` FOREIGN KEY (`pistolet_id`) REFERENCES `pistolets` (`id`);

--
-- Contraintes pour la table `reclamations`
--
ALTER TABLE `reclamations`
  ADD CONSTRAINT `reclamations_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `releves_postes`
--
ALTER TABLE `releves_postes`
  ADD CONSTRAINT `releves_postes_ibfk_1` FOREIGN KEY (`affectation_id`) REFERENCES `affectations` (`id`),
  ADD CONSTRAINT `releves_postes_ibfk_2` FOREIGN KEY (`pistolet_id`) REFERENCES `pistolets` (`id`);

--
-- Contraintes pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_pompiste` FOREIGN KEY (`id_pompiste`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_vehicule`) REFERENCES `vehicules` (`id`),
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`);

--
-- Contraintes pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD CONSTRAINT `vehicules_ibfk_2` FOREIGN KEY (`id_credit`) REFERENCES `details_credits` (`id`);

--
-- Contraintes pour la table `ventes`
--
ALTER TABLE `ventes`
  ADD CONSTRAINT `ventes_ibfk_1` FOREIGN KEY (`id_caissier`) REFERENCES `utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
