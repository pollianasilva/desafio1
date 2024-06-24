CREATE DATABASE clinica;
USE clinica;

CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS especialidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO especialidades (nome) VALUES
('Cardiologia'),
('Dermatologia'),
('Endocrinologia'),
('Gastroenterologia'),
('Neurologia'),
('Oftalmologia'),
('Ortopedia'),
('Pediatria'),
('Psiquiatria'),
('Urologia');

CREATE TABLE IF NOT EXISTS consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    data DATE,
    hora TIME,
    especialidade_id INT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (especialidade_id) REFERENCES especialidades(id)
);