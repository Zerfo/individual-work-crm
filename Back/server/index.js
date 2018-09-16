/* @flow */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const app = express();
const port = '5000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    store: new SQLiteStore,
    secret: 'ahfds',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
    })
);

require('./routes')(app);

app.listen(port, () => {
    console.log(`Server started on localhost:5000`);
    require('../database');
});
