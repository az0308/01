-- --------------------------------------------------------
-- 主機:                           127.0.0.1
-- 伺服器版本:                        5.7.33 - MySQL Community Server (GPL)
-- 伺服器作業系統:                      Win64
-- HeidiSQL 版本:                  11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 傾印  資料表 web101.users 結構
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '代號',
  `name` varchar(30) NOT NULL COMMENT '姓名',
  `email` varchar(50) NOT NULL COMMENT 'email',
  `status` varchar(10) DEFAULT NULL COMMENT '狀態：active/in-active',
  `password` varchar(40) DEFAULT NULL COMMENT '明碼',
  `hashed_password` varchar(256) DEFAULT NULL COMMENT '密碼',
  `roles` varchar(256) DEFAULT NULL COMMENT '角色：member,admin,manager,accounting,it,hr',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

-- 正在傾印表格  web101.users 的資料：~5 rows (近似值)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` ( `name`, `email`, `status`, `password`, `hashed_password`, `roles`) VALUES
	('David', 'david@gmail.com', 'active', '1234', NULL, 'member,admin,manager,accounting,it,hr'),
	('Brown', 'brown@gmail.com', 'in-active', '2234', NULL, 'manager,accounting'),
	('Merry11', 'merry@gmail.com', 'active', '3234', NULL, 'it'),
	('李四44', 'lee@gmail.com', 'in-active', '4234', NULL, 'hr'),
	('趙五55', 'chou@gmail.com', 'active', '5234', NULL, 'manager,hr');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
