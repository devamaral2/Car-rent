INSERT INTO Automoveis (placa, marca, cor) VALUES
(LOWER('ABC1234'), LOWER('Toyota'), LOWER('Azul')),
(LOWER('DEF5678'), LOWER('Honda'), LOWER('Vermelho')),
(LOWER('GHI9012'), LOWER('Ford'), LOWER('Preto')),
(LOWER('JKL3456'), LOWER('Chevrolet'), LOWER('Branco')),
(LOWER('MNO7890'), LOWER('Hyundai'), LOWER('Prata')),
(LOWER('PQR1234'), LOWER('BMW'), LOWER('Preto')),
(LOWER('STU5678'), LOWER('Mercedes'), LOWER('Azul')),
(LOWER('VWX9012'), LOWER('Audi'), LOWER('Vermelho')),
(LOWER('YZA3456'), LOWER('Porsche'), LOWER('Branco')),
(LOWER('BCD7890'), LOWER('Lamborghini'), LOWER('Amarelo')),
(LOWER('EFG1234'), LOWER('Ferrari'), LOWER('Vermelho')),
(LOWER('HIJ5678'), LOWER('Maserati'), LOWER('Azul')),
(LOWER('KLM9012'), LOWER('Aston Martin'), LOWER('Preto')),
(LOWER('NOP3456'), LOWER('Bugatti'), LOWER('Branco')),
(LOWER('QRS7890'), LOWER('McLaren'), LOWER('Prata')),
(LOWER('TUV1234'), LOWER('Bentley'), LOWER('Azul')),
(LOWER('WXY5678'), LOWER('Rolls-Royce'), LOWER('Preto')),
(LOWER('ZAB9012'), LOWER('Jaguar'), LOWER('Vermelho')),
(LOWER('CDE3456'), LOWER('Land Rover'), LOWER('Branco')),
(LOWER('FGH7890'), LOWER('Jeep'), LOWER('Prata'));

INSERT INTO Motoristas (nome) VALUES 
('João'),
('Maria'),
('Carlos'),
('Ana'),
('Pedro'),
('Julia'),
('Paulo'),
('Fernanda'),
('Lucas'),
('Camila'),
('Mateus'),
('Gabriela'),
('Rafael'),
('Amanda'),
('Felipe'),
('Beatriz'),
('Guilherme'),
('Leticia'),
('Leonardo'),
('Isabela');

INSERT INTO Registros (descricao, data_inicio, data_termino, id_automovel, id_motorista) VALUES 
('Aluguel 1', '2022-01-01', '2022-01-10', 1, 1),
('Aluguel 2', '2022-02-01', '2022-02-10', 2, 2),
('Aluguel 3', '2022-03-01', '2022-03-10', 3, 3),
('Aluguel 4', '2022-04-01', '2022-04-10', 4, 4),
('Aluguel 5', '2022-05-01', '2022-05-10', 5, 5),
('Aluguel 6', '2022-06-01', '2022-06-10', 6, 6),
('Aluguel 7', '2022-07-01', '2022-07-10', 7, 7),
('Aluguel 8', '2022-08-01', '2022-08-10', 8, 8),
('Aluguel 9', '2022-09-01', '2022-09-10', 9, 9),
('Aluguel 10', '2022-10-01', '2022-10-10', 10, 10);