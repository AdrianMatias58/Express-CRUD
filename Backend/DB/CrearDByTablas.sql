-- 1. Crear la base de datos
CREATE DATABASE dbVehiculo;
USE dbVehiculo;

--tablas base 
CREATE TABLE vehiculo (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    nro_identificacion VARCHAR(50) UNIQUE NOT NULL, 
);
CREATE TABLE carga(
	id_carga INT AUTO_INCREMENT PRIMARY KEY,
    peso VARCHAR(100) NOT NULL,
    destino VARCHAR(50),
    contenido VARCHAR(225),
    id_vehiculo INT,    
    -- Relación con la tabla vehiculo
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(id_vehiculo)

);
-- inserccion de datos a vehiculos
INSERT INTO vehiculo (modelo, nro_identificacion) VALUES 
('Volvo FH16', 'ABC-123'),
('Scania R500', 'XYZ-789'),
('Mercedes-Benz Actros', 'LMN-456');
-- inserccion de datos a carga
INSERT INTO carga (peso, destino, contenido, id_vehiculo) VALUES 
-- Cargas para el Vehículo 1 (Volvo)
('500kg', 'Lima', 'Electrónicos', 1),
('1200kg', 'Cusco', 'Material de construcción', 1),
('300kg', 'Arequipa', 'Repuestos', 1),

-- Cargas para el Vehículo 2 (Scania)
('2000kg', 'Trujillo', 'Frutas y verduras', 2),
('800kg', 'Chiclayo', 'Textiles', 2),

-- Carga para el Vehículo 3 (Mercedes)
('1500kg', 'Iquitos', 'Maquinaria pesada', 3);