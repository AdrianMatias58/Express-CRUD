DROP TABLE IF EXISTS `carga`;
CREATE TABLE `carga` (
  `id_carga` int NOT NULL AUTO_INCREMENT,
  `peso` varchar(100) NOT NULL,
  `destino` varchar(50) DEFAULT NULL,
  `contenido` varchar(225) DEFAULT NULL,
  `id_vehiculo` int DEFAULT NULL,
  PRIMARY KEY (`id_carga`),
  KEY `id_vehiculo` (`id_vehiculo`),
  CONSTRAINT `carga_ibfk_1` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `carga` VALUES (1,'512','Liam','jdasda',NULL),(7,'512','otocons',NULL,NULL);

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE `vehiculo` (
  `id_vehiculo` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(100) NOT NULL,
  `nro_identificacion` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_vehiculo`),
  UNIQUE KEY `nro_identificacion` (`nro_identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
