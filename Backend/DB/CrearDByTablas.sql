CREATE TABLE categoria (
  id_categoria int(11) NOT NULL,
  nombre char(100) NOT NULL,
  created_at timestamp DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT  categoria (id_categoria, nombre) VALUES 
(1,'Terrestre'),(2,'Marítimo'),(3,'Aéreo'),
(4,'Estándar'),(5,'Frágil'),(6,'Extra Frágil');

CREATE TABLE vehiculo (
  id_vehiculo int(11) NOT NULL,
  modelo char(100) NOT NULL,
  nro_identificacion char(17) NOT NULL,
  estado char(20) NOT NULL DEFAULT 'Disponible',
  id_categoria int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (id_vehiculo),
  UNIQUE KEY nro_identificacion (nro_identificacion),
  KEY fk_vehiculo_categoria (id_categoria),
  CONSTRAINT fk_vehiculo_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE paquete (
  id_paquete int(11) NOT NULL,
  peso char(50) NOT NULL,
  destino char(100) DEFAULT NULL,
  contenido char(225) DEFAULT NULL,
  estado char(15) NOT NULL,
  id_vehiculo int(11) DEFAULT NULL,
  id_categoria int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (id_paquete),
  KEY fk_paquete_vehiculo (id_vehiculo),
  KEY fk_paquete_categoria (id_categoria),
  CONSTRAINT fk_paquete_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria),
  CONSTRAINT fk_paquete_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculo (id_vehiculo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER ;;
CREATE PROCEDURE P_ELIMINAR_VEH_COMPLETO(IN p_id_vehiculo INT)
BEGIN
    UPDATE paquete 
    SET id_vehiculo = NULL 
    WHERE id_vehiculo = p_id_vehiculo 
      AND estado NOT IN ('Remitido', 'Almacenado');

    DELETE FROM vehiculo 
    WHERE id_vehiculo = p_id_vehiculo
    AND estado = 'Descontinuado';

    IF ROW_COUNT() > 0 THEN
        SELECT 'Vehículo eliminado y paquetes desvinculados' AS resultado;
    ELSE
        SELECT 'No se pudo eliminar: El vehículo no existe o no está "Descontinuado"' AS resultado;
    END IF;
END ;;

CREATE PROCEDURE P_V_DATOS_GENERALS()
BEGIN
    SELECT v.modelo, v.nro_identificacion, v.estado, g.nombre AS nombre_categoria
    FROM vehiculo AS v 
    INNER JOIN categoria AS g ON v.id_categoria = g.id_categoria;
END ;;

CREATE PROCEDURE P_V_DISPONIBLE()
BEGIN
    SELECT v.modelo, v.nro_identificacion, g.nombre
    FROM vehiculo AS v 
    INNER JOIN categoria AS g ON v.id_categoria = g.id_categoria;
END ;;
DELIMITER ;

INSERT vehiculo (id_vehiculo, modelo, nro_identificacion, estado, id_categoria) VALUES 
(1, 'Camión Volvo FH16', 'VIN-99234-X1', 'Disponible', 1),
(2, 'Furgoneta Mercedes Sprinter', 'VIN-11223-Y2', 'Entregando', 1),
(3, 'Buque de Carga Maersk', 'VIN-44556-Z3', 'Descontinuado', 2),
(4, 'Avión Airbus A330F', 'VIN-77889-W4', 'Disponible', 3),
(5, 'Remolque Utilitario', 'VIN-00112-Q5', 'Descontinuado', 1);

INSERT paquete (id_paquete, peso, destino, contenido, estado, id_vehiculo, id_categoria) VALUES 
(1, '45 kg', 'Almacén Norte', 'Componentes Electrónicos', 'Almacenado', NULL, 4),
(2, '120 kg', 'Puerto Principal', 'Repuestos Industriales', 'Remitido', 2, 4),
(3, '5 kg', 'Centro Médico Junín', 'Insumos Hospitalarios', 'Almacenado', NULL, 5),
(4, '500 kg', 'Zona Franca', 'Material de Construcción', 'Remitido', 1, 4),
(5, '2 kg', 'Galería Central', 'Esculturas de Cerámica', 'Almacenado', NULL, 6);