// required imports //
var express = require('express');
var dotenv = require('dotenv').config();
const mongoose = require('mongoose');

var app = express();
// connect to db //
mongoose.connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// routes //
var indexRouter = require('./routes/index')

app.use('/', indexRouter);

app.listen(process.env.PORT, () => {
    console.log('App is listening on port 5000');
})