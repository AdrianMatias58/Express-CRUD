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