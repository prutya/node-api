> docker-compose up --build

> psql postgresql://postgres:postgres@localhost:5432/node_api_development -f migrations.sql

> docker exec -it $(docker ps --quiet --filter "label=node-api.service=api") sh

> yarn

> yarn start

check localhost:3000
