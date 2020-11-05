<h1 align="center">
  <img alt="Cyan Agroanalytics" title="Cyan Agroanalytics" src=".github/cyan-logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio: Cyan Agroanalytics
</h3>

<blockquote align="center">“O clima corresponde por até 50% da sua produtividade.”!</blockquote>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mlg404/challenge-cyan-agroanalytics.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/mlg404/challenge-cyan-agroanalytics.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/mlg404/challenge-cyan-agroanalytics.svg">
  <a href="https://github.com/mlg404/challenge-cyan-agroanalytics/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mlg404/challenge-cyan-agroanalytics.svg">
  </a>

  <a href="https://github.com/mlg404/challenge-cyan-agroanalytics/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/mlg404/challenge-cyan-agroanalytics.svg">
  </a>

</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## :rocket: Sobre o desafio

O backend da aplicação fica responsável por todas operações de criação, alteração, remoção e listagem das informações das Mills, Harvests, Farms e Fields. Utilizei o Sucrase para ter acesso ao JS mais moderno.



## :computer: Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

-  [Yup](https://github.com/jquense/yup)
-  [Express](https://expressjs.com/)
-  [Node.js](https://nodejs.org/)
-  [Sucrase](https://github.com/alangpierce/sucrase)
-  [Nodemon](https://nodemon.io/)
-  [Socket io](https://socket.io/docs/)
-  [Sequelize](https://sequelize.org/)
-  [VS Code][vc] com [EditorConfig][vceditconfig],  [ESLint][vceslint] e [Prettier][vcprettier]

## :information_source: Como usar

Para clonar e usar esta aplicação, você precisará do [Git](https://git-scm.com), [Node.js v13.0.1][nodejs] ou superior + [Yarn v1.19.1][yarn] ou superior instalados no seu computador.

Você precisa ter um banco de dados Postgres (com a extensão do Postgis) previamente instalados.

Após isso, configure as credenciais no arquivo `example.env` e renomeie-o para apenas `.env`

```bash
# Clonar este repositório
$ git clone https://github.com/mlg404/challenge-cyan-agroanalytics.git

# Aceder a este repositório
$ cd challenge-cyan-agroanalytics/backend

# Instalar dependências
$ yarn install

# Rodar a aplicação
$ yarn start
```

---

Feito com 💙 por Victor Eyer :wave: [Entre em contato!](https://www.linkedin.com/in/victoreyer/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vcprettier]: https://prettier.io/
