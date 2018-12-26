# RESTful API for Node.js using express and MySQL

## Description

This project is an example of a RESTful API for Node.js using express and MySQL with user authentication and sessions by using JWT and RS256 RSA keys.

Don't hesitate to give me feedbacks about my code.

## Installation

* Run **npm install** into API

* Create a MySQL database

* Create a directory to store public and private RSA keys.

To generate RS256 RSA keys : 

```
 ssh-keygen -t rsa -b 2048 -f jwtRS256.key
 //Don't add passphrase
 openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

* Create a .env file by copying the .sample-env file and complete the different fields

For database migrations the project user sequelize : http://docs.sequelizejs.com/manual/tutorial/migrations.html

* Run **node_modules/.bin/sequelize db:migrate** to run migrations

* Run **node_modules/.bin/sequelize db:seed:all** to run seeds

That's all ! now you can start the server with **npm start** 

## Tests

All the tests are in the tests directory, just do **npm test** to run them.

The tests are made with mocha and chai.

## Documentation

The documentation is made with swagger and can be find in the route "/api-documentation"
