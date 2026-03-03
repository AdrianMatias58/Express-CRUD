CREATE DATABASE IF NOT EXISTS dbSystemaEntrega;
-- Seleccionar la base de datos para trabajar
USE dbSystemaEntrega;
-- 1. Tabla de Categoría
DROP TABLE IF EXISTS categoria;
CREATE TABLE categoria (
  id_categoria int NOT NULL AUTO_INCREMENT,
  nombre char(100) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL,
  PRIMARY KEY (id_categoria)
);

-- 2. Tabla de Vehículo
DROP TABLE IF EXISTS vehiculo;
CREATE TABLE vehiculo (
  id_vehiculo int NOT NULL AUTO_INCREMENT,
  modelo char(100) NOT NULL,
  nro_identificacion char(17) NOT NULL, 
  estado char(20) NOT NULL, 
  id_categoria int NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL,
  PRIMARY KEY (id_vehiculo),
  UNIQUE (nro_identificacion),
  CONSTRAINT fk_vehiculo_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria)
);

-- 3. Tabla de Paquete
DROP TABLE IF EXISTS paquete;
CREATE TABLE paquete (
  id_paquete int NOT NULL AUTO_INCREMENT,
  peso char(50) NOT NULL,
  destino char(100),
  contenido char(225),
  estado char(15) NOT NULL,
  id_vehiculo int,
  id_categoria int NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL,
  PRIMARY KEY (id_paquete),
  CONSTRAINT fk_paquete_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculo (id_vehiculo),
  CONSTRAINT fk_paquete_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria)
);
-- =============================================
-- 1. INSERT PARA LA TABLA: categoria
-- =============================================
INSERT INTO categoria (nombre) VALUES 
('Terrestre'),    -- ID 1
('Marítimo'),     -- ID 2
('Aéreo'),        -- ID 3
('Estándar'),     -- ID 4
('Frágil'),       -- ID 5
('Extra Frágil'); -- ID 6

-- =============================================
-- 2. TABLA: vehiculo (Usa categorías 1, 2 y 3)
-- =============================================
INSERT INTO vehiculo (modelo, nro_identificacion, estado, id_categoria) VALUES 
('Trailer Volvo FH', 'VIN-TR-001-XYZAB', 'Disponible', 1), -- Terrestre
('Buque Portacontenedores', 'VIN-MA-002-BCDEF', 'En Alta Mar', 2), -- Marítimo
('Avión Boeing 777F', 'VIN-AE-003-GHIJK', 'Mantenimiento', 3), -- Aéreo
('Furgoneta Delivery', 'VIN-TR-004-LMNOP', 'En Ruta', 1), -- Terrestre
('Helicóptero de Carga', 'VIN-AE-005-QRSTU', 'Disponible', 3); -- Aéreo

-- =============================================
-- 3. TABLA: paquete (Uso de categorías 4, 5 y 6)
-- =============================================
INSERT INTO paquete (peso, destino, contenido, estado, id_vehiculo, id_categoria) VALUES 
('1200 kg', 'Puerto del Callao', 'Maquinaria Pesada', 'Enviado', 2, 4), -- Estándar
('5 kg', 'Miraflores, Lima', 'Vajilla de Cristal', 'En Ruta', 4, 5),   -- Frágil
('0.8 kg', 'Clínica Delgado', 'Lentes de Laboratorio', 'Urgente', 5, 6), -- Extra Frágil
('50 kg', 'Almacén Central', 'Repuestos de Motor', 'Pendiente', 1, 4), -- Estándar
('2 kg', 'Museo de Arte', 'Óleo sobre Lienzo', 'En Tránsito', 3, 5);   -- Frágil