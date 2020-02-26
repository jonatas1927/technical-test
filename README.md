# Introdução

Este projeto tem como objetivo realizar um teste técnico.

Ambos os desafios foram desenvolvidos utilizando NodeJS em sua versão LTS 8. Porem, a diferença de versão não irá apresentar problemas.

# Desafio 1

Para a resolução do desafio 1, utilizou-se um serviço, o qual é conectado via rede, o que possibilita fazer a utilização de clusters e a validação ocorra sem problemas.

As requisições passam pela api que recebe, esta pode utilizar-se em cluster, e seria a responsável por processar e subir as requests para o banco. Quando a request chega nesta api, ela irá fazer uma requisição para o serviço que irá validar se a request é valida ainda.

Para realizar a instalação de dependências utilizou-se o NPM.JS, e pode ser usado entrando no diretório part-1 e executando o comando ```npm run install``` Este código irá realizar a instalação dos das duas API's desenvolvidas.

Para a execução da solução é necessário entrar no diretório ```part-1/serviceTest``` e executar o comando ```npm start``` isso irá iniciar a api de validação.

Ao mesmo tempo é necessario realizaro mesmo comando no diretório ```/part-1/api```.

Ao iniciar a aplicação do seviceTest ela irá realizar 2 testes, para validar se a geração do hash esta funcionando como o esperado, sem a necessidade de execução dos testes de maeira separada.

# Desafio 2


