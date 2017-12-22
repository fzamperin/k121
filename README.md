## K121 - Projeto de sorteio para amigos ocultos

Este projeto foi concebido para um teste de vaga na Kenoby, o projeto foi feito utilizando Angular 4 com sass, webpack. Na parte do back-end foi utilizado o express em conjunto com o mongoose, para o envio de emails foi utilizado a lib nodemailer, se tiver interesse em mais libs analisar o arquivo package.json.

O Projeto possui um crud em html que possui funcionalidade de cadastro, atualização e remoção dos dados. Os dados consistem em pessoas que irão participar de um amigo secreto sendo assim necessário o nome e o email delas (lembrando que não pode haver email duplicados), após o cadastro poderá ser feito o sorteio, este sorteio envia email para os participantes informando quem tirou quem junto com o nome e o email do mesmo.

## Desenvolvimento

- Para rodar o server localmente em modo de desenvolvimento usar o comando: ng serve, e depois iniciar o arquivo
server/app.js para rodar a API, a porta padrão escolhida é 3000 caso a váriavel port do process env não esteja setada.

- Caso queira buildar em modo de desenvolvimento utilizar o comando ng build

## Produção

- Usar o comando ng build --env=prod para buildar para produção, assim ele utiliza o arquivo environment.prod.ts ao invés do environment.ts.

Desenvolvido por Fernando Augusto Zamperin Penna @ OniQ Tecnologia.
