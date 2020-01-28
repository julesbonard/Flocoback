
# biarritz_P3_floco_backend

## Packages

- @hapi/joi
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- mysql2
- passport
- passport-facebook
- passport-google
- sequelize
- uuid
- pg
- pg-hstore
- chai
- husky
- mocha
- morgan
- nodemon
- prettier
- pretty-quick

## Getting started

These command need to be executed in the terminal:

### Fork the projet

```
git clone https://github.com/WildCodeSchool/biarritz_P3_floco_backend.git
```

### Install package

```
npm install
```
Before launching the server you should first create a `.env`  file, follow the instruction in `example.env`.

## Available Scripts

These command need to be executed in the terminal:

### Launch the test

```
npm test
```
The test will appear in the terminal.

### Launch the server on port 8000

```
npm start
```
### Launch the server on port 8000 in dev environment

```
npm run dev
```
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.
### Drop the database and recreate it

```
npm run resync
```
this command need to be execute everytime you changed the database.

## File organization

### `Middlewares`
Add modification to the request send in `route.js` files.
It contain 2 middlewares: 
- requiring the token
- precise the params of the object request

### `Routes`
It contain all the express routes for POST, PUT, GET, DELETE.
### `Sequelize`

#### `Models`
### `Test`

## Présentation

### `Fonctionnalités à mettre en place`

#### Page D'acceuil/Map

- La partie stats des plantes locales.

#### Mon Compte

- Faire un tchat.
- Faire un système d'ajout d'amis.
- Développer les sous-menus.
- Ajouter une partie niveau en rapport avec le nombre de plantes de l'utilisateur.

#### Plantes

- Faire une page d'ajout de plantes.

#### Bibliothèque

- Ajouter Des filtres pour rechercher une plante.

### `The team`

Student from the Wild Code School

- [Dominic Brice](https://github.com/dominicBrice)
- [Lucas Leproux](https://github.com/lucas240)
- [Jules Bonard](https://github.com/julesbonard)
- [Frédérique Mendy](https://github.com/Superdref)

#### Project bearer: "Ying Wang"
