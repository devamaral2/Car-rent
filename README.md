# Aplicação de Aluguel de Carros

Esta é uma aplicação de aluguel de carros onde os usuários podem trabalhar com as entidades veiculo e motorista, bem como registrar e finalizar aluguéis de carros.

## Pré-requisitos

- Docker
- pnpm

## Como rodar a aplicação

1. Clone o repositório para a sua máquina local usando `git clone`, para realizar esta operação você deverá ter o `git` instalado no seu computador. Para mais informações: `https://www.git-scm.com/downloads`
2. Navegue até o diretório do projeto com o pnpm já instalado e execute o comando `pnpm install` para instalar todas as dependências do projeto. Caso já tenha o npm instaldo no seu computador basta executar o comando `npm install -g pnpm`
3. Rode o comando `pnpm run app`. Este comando ira criar um container no docker com o servidor do postgres e para que ele funcione você deverá ter o docker instalado na sua máquina. Para mais informações veja a documentação oficial `https://docs.docker.com/get-docker/`
4. Crie um arquivo `.env` nos moldes do arquivo `.env.example`
5. Após isso basta realizar o build da aplicação com o comando `pnpm run build` e depois executar o `pnpm start`, uma vez que você executar este comando a aplicação sozinha irá criar as tabelar e também algumas entidades no banco de dados. No mais é apenas utilizar as rotas pelo dominio `http://localhost:8000`

## Como rodar os testes
Esta aplicação tem testes unitários que garantem a qualidade do código. Para executar os testes basta instalar as dependências com o comando `pnpm install` na raiz do projeto e depois executar o comando com `pnpm test` 

## Estrutura do Banco de Dados

O banco de dados consiste em três tabelas: `Automoveis`, `Motoristas` e `Registros`.

- A tabela `Automoveis` contém informações sobre os carros disponíveis para aluguel. Cada carro tem um `id` único, uma `placa`, uma `marca` e uma `cor`.
- A tabela `Motoristas` contém informações sobre os motoristas. Cada motorista tem um `id` único e um `nome`.
- A tabela `Registros` contém informações sobre os aluguéis de carros. Cada registro tem um `id` único, uma `descricao`, uma `data_inicio`, uma `data_termino`, um `id_automovel` que referencia um carro na tabela `Automoveis` e um `id_motorista` que referencia um motorista na tabela `Motoristas`.

# Descrição das rotas:

- /automovel
  - GET: encotnra todos os automóveis do banco de dados. Você poderá também procurar por query por automóveis com a mesma cor ou marca
  - GET/:id: encontra um automovel pelo identificador único inserido no params da url
  - POST: cria um automóvel passando para o body algum valor em string para as tês propriedades de um automovel
  - PATCH/:id: Atualiza as informações do automóvel com os parámetros passados pelo body
  - DELETE/:id: deleta um automóvel pelo parámetro passado na url

- /motorista
  - GET: encotnra todos os motoristas do banco de dados. Você poderá também procurar por query por motoristas com um nome específico
  - GET/:id: encontra um motorista pelo identificador único inserido no params da url
  - POST: cria um motorista passando para o body algum valor em string para as tês propriedades de um motorista
  - PATCH/:id: Atualiza as informações do motorista com os parámetros passados pelo body
  - DELETE/:id: deleta um motorista pelo parámetro passado na url
 
- /registro
  - GET: exibe uma lista com todos os registros no banco de dados e exibe com as informações dos automoveis e motoristas relacionados
  - POST: cria um registro caso o motorista nem o automovel tenha algum outro registro de aluguel em aberto
  - PATCH/:id: adiciona a data te término do registro de aluguel 
