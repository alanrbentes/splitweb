##### A aplicação usa containers docker e necessita que todos os containes estejam up:

- sudo docker run --name db_postgres -e POSTGRES_PASSWORD=xxxxx -p xxxx:xxxx -d -t postgres;
- sudo docker run --name db_redis -p xxxx:xxxx -d -t redis:alpine;

#### comandos básicos do projeto:

- yarn sequelize migration:create --name=nome-tabela;
- yarn sequelize db:migrate

-Finalizando crud teste API nodejs - 31-08-2020
