CREATE TABLE IF NOT EXISTS Automoveis (
  id SERIAL PRIMARY KEY AUTO_INCREMENT,
  placa varchar(7) NOT NULL,
  marca varchar(100) NOT NULL,
  cor varchar(100) NOT NULL
) 