# TESTE FACILITA JURÍDICO

O sistema consiste em permitir o cadastro de clientes com Nome, Email, Telefone, e Coordenadas em eixo X e eixo Y.

## Tecnologias Utilizadas
- Node.js v20
- Typescript v5
- Next v14.1
- React v18
- PostgreSQL
- Docker

## Configuração

Configure as variáveis no arquivo .env

Use o arquivo .env.example para conseguir os nomes das variáveis

```
DB_HOST=postgres.facilitajuridico
DB_PORT=5432
DB_USER=seu_usuario
DB_DATABASE=seu_banco
DB_PASSWORD=sua_senha
```

Recomendo deixar a variável DB_HOST e a variável DB_PORT assim como estão descritas no exemplo por causa do docker.

Para rodar o projeto, basta ter o Docker instalado em sua máquina. E então rodar o comando
```
docker-compose up
```

O docker criará o contâiner do banco de dados, e rodará o script de Create Table da tabela de Clientes.
Para consulta do DDL, o arquivo se encontra em `/src/backend/database/CreateTableScript.sql`.

O PostgresSQL será exposto na porta `5432` e a aplicação será exposta na porta `3000`.

Portanto, para acessar a aplicação após executar os passos previamente mencionados, basta acessar o endereço
`http://localhost:3000`


## API
`[GET] /api/clients` para consulta de clientes. As opções de Query Params `name`, `email` e `phone` são disponibilizadas para uma melhor filtragem dos clients. Retorna um objeto com atributo `clients` que é um array de clientes.

`[POST]/api/clients` para o cadastro de clientes. É necessário informar os seguintes campos para um registro de sucesso

`email` do tipo `string`

`phone` do tipo `string`

`name` do tipo `string`

`coordinate_x` do tipo `number`

`coordinate_y` do tipo `number`

`[GET] /api/clients/better-path` para consulta da rota ideal. Retorna um objeto com atributo `clients` que é um array de clientes.

## Front-end

O front-end consiste de uma única página, onde inicialmente podem-se ver o botão de "Registrar", o botão de "Visualizar Rota Ideal" e uma Tabela.

A tabela permite ao usuário visualizar os dados do cliente, assim como efetuar a paginação via client-side. No topo direito da tabela, há um botão onde ao clicar, serão exibidos os filtros.
Os filtros serão mostrados imediatamente abaixo. Há 3 campos para realizar o filtro, os campos de nome, email e telefone. Para executar o filtro, basta clicar no botão "Filtrar". Se um campo não for preenchido, ele não será utilizado na filtragem.

Ao clicar no botão "Registrar", um modal será aberto com um formulário para preencher os dados do cliente. Os campos são validados no front-end e também no back-end. Caso haja algum erro ocorra no front-end, o campo será marcado com uma borda vermelha e um Tooltip informando o erro referente ao campo. Caso algum erro ocorra no back-end, um toast será disparado no canto superior da tela. Para fehcar o Modal, pode-se apertar "ESC", clicar fora do modal, ou clicar no botão X.


Ao clicar no botão "Visualizar Rota Ideal", um modal será aberto e um cálculo de rota será realizado.
Uma listagem dos clientes será exibida em ordem de percurso. Serão apresentados os nomes dos clientes, suas coordenadas e a distância deste cliente em relação ao último cliente (1 coordenada equivale a 1km). Para fechar o Modal, pode-se apertar "ESC", clicar fora do modal, ou clicar no botão X.