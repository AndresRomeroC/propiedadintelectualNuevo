require('dotenv').config();
const mongoose = require('mongoose');

//const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/AdminBro';

const DB_URI = process.env.MONGODB_URI || 'mongodb+srv://user_lex_valor:vhNa1tZxsOM7nXiz@clusterlexvalor.t4vih.mongodb.net/AdminBro';
//Database connection
mongoose.connect(DB_URI,
{useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection

module.exports = connection