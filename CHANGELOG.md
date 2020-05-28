##### A aplicação usa containers docker e necessita que todos os containes estejam up:

- sudo docker run --name db_postgres -e POSTGRES_PASSWORD=Db@209101215 -p 5432:5432 -d -t postgres;
- sudo docker run --name db_mongo -p 27017:27017 -d -t mongo;
- sudo docker run --name db_redis -p 6379:6379 -d -t redis:alpine;

#### comandos básicos do projeto:

- yarn sequelize migration:create --name=nome-tabela;
- yarn sequelize db:migrate
