# MEN - Ecommerce
MEN Stack application to authenticate users made in Mongo-Express-Nodejs

## Usage

```sh
$ npm install
```

Create an .env file in your root with
- PORT
- MONGO_URI
- SECRET
- STORAGE

```sh
$ npm start
```

## Testing

Testing done with Postman & Newman

```sh
$ newman run MEN-Ecommerce.json -e MEN-Ecommerce.environment.json
```