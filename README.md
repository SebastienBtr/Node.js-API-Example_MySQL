# NodeJs API with user authentification

## Description

This project is an example of a NodeJs API with user authentication and sessions by using JWT and RS256 RSA keys.

Don't hesitate to give me feedbacks about my code.

## Installation

* Run **npm install** into API

* Install db-migrate globally : **npm install -g db-migrate**

* Create a MySQL database

* Create a directory to store public and private RSA keys.

To generate RS256 RSA keys : 

```
 ssh-keygen -t rsa -b 2048 -f jwtRS256.key
 //Don't add passphrase
 openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

* Create a .env file by copying the .sample-env file and complete the different fields

* Run **db-migrate up:create** then **db-migrate up:insert** to initialize the database

That's all ! now you can start the server with **sudo nodemon index.js** if you want auto restart when a file change or simply **node index.js**

## Tests

All the tests are in the tests directory, just do **npm test** to run them.

The tests are made with mocha and chai.
