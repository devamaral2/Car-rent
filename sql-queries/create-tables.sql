CREATE TABLE IF NOT EXISTS Automoveis (
  id SERIAL PRIMARY KEY,
  placa varchar(7) NOT NULL,
  marca varchar(100) NOT NULL,
  cor varchar(100) NOT NULL
); 

CREATE TABLE IF NOT EXISTS Motoristas (
  id SERIAL PRIMARY KEY,
  nome varchar(255) NOT NULL
); 

CREATE TABLE IF NOT EXISTS Registros (
  id SERIAL PRIMARY KEY,
  descricao varchar(255) NOT NULL,
  data_inicio varchar(50) NOT NULL,
  data_termino varchar(50),
  id_automovel integer REFERENCES Automoveis(id),
  id_motorista integer REFERENCES Motoristas(id)
);