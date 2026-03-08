CREATE DATABASE IF NOT EXISTS `dbsystemaentrega` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `dbsystemaentrega`;

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE `vehiculo` (
  `id_vehiculo` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nro_identificacion` varchar(17) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Disponible',
  `id_categoria` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_vehiculo`),
  UNIQUE KEY `nro_identificacion` (`nro_identificacion`),
  KEY `fk_vehiculo_categoria` (`id_categoria`),
  CONSTRAINT `fk_vehiculo_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `paquete`;
CREATE TABLE `paquete` (
  `id_paquete` int NOT NULL AUTO_INCREMENT,
  `peso` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `destino` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contenido` varchar(225) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `estado` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `id_vehiculo` int DEFAULT NULL,
  `id_categoria` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_paquete`),
  KEY `fk_paquete_vehiculo` (`id_vehiculo`),
  KEY `fk_paquete_categoria` (`id_categoria`),
  CONSTRAINT `fk_paquete_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `fk_paquete_vehiculo` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP PROCEDURE IF EXISTS `get_vehiculos_por_estado`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_vehiculos_por_estado`()
BEGIN
  SELECT estado, COUNT(*) AS total
  FROM vehiculo
  GROUP BY estado
  ORDER BY total DESC;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `P_ELIMINAR_VEH_COMPLETO`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_ELIMINAR_VEH_COMPLETO`(IN p_id_vehiculo INT)
BEGIN
    UPDATE paquete 
    SET id_vehiculo = NULL 
    WHERE id_vehiculo = p_id_vehiculo 
      AND estado NOT IN ('Remitido', 'Almacenado');

    DELETE FROM vehiculo 
    WHERE id_vehiculo = p_id_vehiculo
      AND estado = 'Descontinuado';

    SELECT ROW_COUNT() AS filas_afectadas;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `P_V_actualizado`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_V_actualizado`()
BEGIN
  SELECT * FROM vehiculo
  ORDER BY updated_at DESC
  LIMIT 1;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `P_V_ACTULIZADO`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_V_ACTULIZADO`()
BEGIN
  SELECT v.id_vehiculo, v.modelo, v.nro_identificacion, v.estado, c.nombre AS nombre_categoria
  FROM vehiculo AS v
  JOIN categoria AS c ON v.id_categoria = c.id_categoria
  ORDER BY v.updated_at DESC
  LIMIT 1;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `P_V_CANT_STDO`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_V_CANT_STDO`()
BEGIN
  SELECT estado, COUNT(*) AS total
  FROM vehiculo
  GROUP BY estado
  ORDER BY total DESC;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `P_V_DATOS_GENERALS`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_V_DATOS_GENERALS`()
BEGIN
    SELECT v.id_vehiculo, v.modelo, v.nro_identificacion, v.estado, g.nombre AS nombre_categoria
    FROM vehiculo AS v 
    INNER JOIN categoria AS g ON v.id_categoria = g.id_categoria;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `P_V_DISPONIBLE`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_V_DISPONIBLE`()
BEGIN
    SELECT v.id_vehiculo, v.modelo, v.nro_identificacion, g.nombre
    FROM vehiculo AS v 
    INNER JOIN categoria AS g ON v.id_categoria = g.id_categoria
    WHERE v.estado = 'Disponible';
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `P_V_LAST_ESTADO`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_V_LAST_ESTADO`(
    IN p_estado VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
)
BEGIN
    SELECT 
        v.id_vehiculo,
        v.modelo,
        v.nro_identificacion,
        v.estado,
        v.created_at,
        DATE_FORMAT(COALESCE(v.updated_at, v.created_at), '%d/%m/%Y') AS fecha_actualizacion,
        g.nombre AS nombre_categoria
    FROM vehiculo AS v
    INNER JOIN categoria AS g ON v.id_categoria = g.id_categoria
    WHERE v.estado = p_estado
    ORDER BY COALESCE(v.updated_at, v.created_at) DESC
    LIMIT 1;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `P_V_RECIENTE`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_V_RECIENTE`()
BEGIN
  SELECT v.id_vehiculo, v.modelo, v.nro_identificacion, v.estado, c.nombre AS nombre_categoria
  FROM vehiculo AS v
  JOIN categoria AS c ON v.id_categoria = c.id_categoria
  ORDER BY v.created_at DESC
  LIMIT 1;
END ;;
DELIMITER ;