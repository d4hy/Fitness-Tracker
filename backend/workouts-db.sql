DROP DATABASE IF EXISTS `workouts-db`;

CREATE DATABASE IF NOT EXISTS `workouts-db`;

USE `workouts-db`;

CREATE TABLE `set_details` (
  `set_details_id` INT AUTO_INCREMENT PRIMARY KEY,
  `exercise_name` VARCHAR(256) NOT NULL,
  `date` DATE NOT NULL,
  `sets` INT NOT NULL,
  `reps` INT NOT NULL,
  `weight` DOUBLE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `set_details` (`exercise_name`, `date`, `sets`, `reps`, `weight`) VALUES
('Squats', '2024-01-01', 1, 10, 100),
('Squats', '2024-01-15', 2, 8, 110),
('Leg Curl', '2024-02-01', 1, 12, 50),
('Leg Curl', '2024-02-15', 2, 10, 55),
('Leg Extensions', '2024-03-01', 1, 15, 30),
('Leg Extensions', '2024-03-15', 2, 12, 35),
('Pendulum Squat', '2024-04-01', 1, 10, 60),
('Pendulum Squat', '2024-04-15', 2, 8, 65),
('Calf Raises', '2024-05-01', 1, 20, 30),
('Calf Raises', '2024-05-15', 2, 18, 35),
('Shoulder Press', '2024-06-01', 1, 10, 20),
('Shoulder Press', '2024-06-15', 2, 8, 22),
('Incline Bench Press', '2024-07-01', 1, 12, 30),
('Incline Bench Press', '2024-07-15', 2, 10, 32),
('Lateral Raise', '2024-08-01', 1, 15, 10),
('Lateral Raise', '2024-08-15', 2, 12, 12),
('Rear Delt Fly', '2024-09-01', 1, 15, 10),
('Rear Delt Fly', '2024-09-15', 2, 12, 12),
('Tricep Extensions', '2024-10-01', 1, 12, 20),
('Tricep Extensions', '2024-10-15', 2, 10, 22),
('Lat Pulldown', '2024-11-01', 1, 15, 40),
('Lat Pulldown', '2024-11-15', 2, 12, 45),
('Wide Row', '2024-12-01', 1, 15, 40),
('Wide Row', '2024-12-15', 2, 12, 45),
('Seated Row', '2024-01-01', 1, 15, 60),
('Seated Row', '2024-01-15', 2, 12, 65),
('Chest Fly', '2024-02-01', 1, 15, 60),
('Chest Fly', '2024-02-15', 2, 12, 65),
('Bench Press', '2024-03-01', 1, 12, 100),
('Bench Press', '2024-03-15', 2, 10, 110),
('Deadlift', '2024-04-01', 1, 8, 150),
('Deadlift', '2024-04-15', 2, 6, 160);

COMMIT;
