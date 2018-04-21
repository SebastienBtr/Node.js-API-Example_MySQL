const express = require('express');
const app = express();
const mysql = require('mysql');
const db = require('./db.js');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const fs = require('fs');

const usersCtrl = require('./controllers/users.ctrl.js');
const authCtrl = require('./controllers/authentification.ctrl.js');

require('dotenv').config();

// Add headers
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'localhost, sharebest.online');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

function dbConnection() {

    const objConn = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    objConn.connect((err) => {

        if (err) {
            console.error('error when connecting to db:', err.code);
            setTimeout(dbConnection, process.env.timeoutBeforeReconnection); // We introduce a delay before attempting to reconnect

        } else {
            db.connection = objConn;
            console.info('Connected to db !');
        }
    });

    objConn.on('error', (err) => {

        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually lost
            dbConnection();
        } else {
            throw err;
        }
    });
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json());


const RSA_PUBLIC_KEY = fs.readFileSync(process.env.RSA_PUBLIC_KEY_PATH);

// Apply authentification middleware
app.use(expressJwt({ secret: RSA_PUBLIC_KEY}).unless({path: ['/login', '/create-user']}));

// Register our routes
app.use([usersCtrl, authCtrl]);

dbConnection();

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = app; // for testing