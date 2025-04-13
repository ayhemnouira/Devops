CREATE TABLE IF NOT EXISTS Employe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    poste VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Tarif (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_jour VARCHAR(20),
    tarif FLOAT
);

CREATE TABLE IF NOT EXISTS HeuresSup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employe_id INT,
    date DATE,
    nb_heures FLOAT,
    FOREIGN KEY (employe_id) REFERENCES Employe(id)
);
