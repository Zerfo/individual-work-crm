const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const config = require('./config');

//import routes
const authModule = require('./routes/v1/auth');
const userModule = require('./routes/v1/user');
const adminModule = require('./routes/v1/user');

const app = express();
const port = '5000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(session({
    store: new SQLiteStore,
    secret: config.secret, //Your secret key
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false
    }));

app.use('/api/v1', authModule);
app.use('/api/v1/user', userModule);
app.use('/api/v1/admin', adminModule);

app.listen(port, () => {
    console.log(`Server started on localhost:5000`);
    require('../database');
});
