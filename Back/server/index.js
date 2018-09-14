const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = '5000';
const dbPath = path.resolve(__dirname, '../database/test.db');
app.use(bodyParser.urlencoded({ extended: true }));

new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err, db) => {
  err ? console.error(err.message) : (() => {
    require('./routes')(app, db);
    app.listen(port, () => {
      console.log(`Server started on localhost:5000`);
      console.log('Connected to the SQlite database.');
    });
  })();
});


