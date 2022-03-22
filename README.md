# WA Order Service Backend

Backend do projeto WA Order Service.
Utiliza NestJS em sua composição.

## Rodando aplicação local

### Instalação:

Este projeto utiliza docker como dependência obrigatória.

1. Renomeie o arquivo .env.example para .env
2. Execute `docker-compose up` para instalar as dependências fora do container
3. Execute: `docker-compose up`

A aplicação estará rodando em [http://localhost:5000](http://localhost:5000) no ambiente local.

### Documentação:

A documentação pode ser acessada em [http://localhost:5000/swagger](http://localhost:5000/swagger) no ambiente local.

## Testes unitários:

Para executar os testes unitários:

1. Execute `yarn test`
