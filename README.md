

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
It add modification to the request send in `route.js` files.
It contain 2 middlewares: 
 1. requiring the token
 2. precise the params of the object request
 
- `joiSchemas.js`
- `joiValidate.js`
- `tokenJwt.js`

### `Routes`
It contain all the express routes for POST, PUT, GET, DELETE.
- `agenda.routes.js`
- `comments.routes.js`
- `friends.routes.js`
- `likes.routes.js`
- `locations.routes.js`
- `login.routes.js` this file purpose is to authenticate the user with a form or with the passport of Facebook and Google.
- `messages.routes.js`
- `miniFlora.routes.js`
- `partners.routes.js`
- `plants.routes.js`
- `posts.routes.js`
- `pots.routes.js`
- `seeds.routes.js`
- `stasCity.routes.js`
- `statsOxygene.routes.js`
- `statsTaxons.routes.js`
- `tresaury.routes.js`
- `users.routes.js`

### `Sequelize`

#### `Models`
- `agenda.js`
- `comments.js`
- `friends.js`
- `likes.js`
- `locations.js`
- `messages.js`
- `miniFlora.js`
- `partners.js`
- `plants.js`
- `posts.js`
- `pots.js`
- `seeds.js`
- `stasCity.js`
- `statsOxygene.js`
- `statsTaxons.js`
- `tresaury.js`
- `users.js`
### `Test`
- `agenda.test.js`
- `comments.test.js`
- `friends.test.js`
- `likes.test.js`
- `locations.test.js`
- `messages.test.js`
- `miniFlora.test.js`
- `partners.test.js`
- `plants.test.js`
- `posts.test.js`
- `pots.test.js`
- `seeds.test.js`
- `stasCity.test.js`
- `statsOxygene.test.js`
- `statsTaxons.test.js`
- `tresaury.test.js`
- `users.test.js`

## The team

Student from the Wild Code School

- [Dominic Brice](https://github.com/dominicBrice)
- [Lucas Leproux](https://github.com/lucas240)
- [Jules Bonard](https://github.com/julesbonard)
- [Frédérique Mendy](https://github.com/Superdref)

#### Project bearer: "Ying Wang"
