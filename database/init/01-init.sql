
CREATE DATABASE IF NOT EXISTS cv_database
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE cv_database;

CREATE TABLE IF NOT EXISTS persona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    foto VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS formacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    institucion VARCHAR(200) NOT NULL,
    anio VARCHAR(20) NOT NULL,
    persona_id INT NOT NULL,
    CONSTRAINT fk_formacion_persona
        FOREIGN KEY (persona_id)
        REFERENCES persona(id)
        ON DELETE CASCADE
);


INSERT INTO persona (id, nombre, apellido, ciudad, foto)
VALUES (
    1,
    'Jhon Moises',
    'Ramos Hilaya',
    'Cochabamba',
    'https://placehold.co/300x300'
);
    
INSERT INTO formacion (titulo, institucion, anio, persona_id)
VALUES
    (
        'Ingenieria en Informatica',
        'Universidad Mayor de San Simon',
        '2020 - 2026',
        1
    );

