// require node modules

const path = require('path')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./database')
const passport = require('passport');
const session = require('express-session');
const routes = require('./routes/index')
const PORT = 4000;

// express app config

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, '../views'));
app.use('/', express.static('assets'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'bfmedvfVuQSVhCWRAsSVsOGj',
  resave: true,
  saveUninitialized: false
}));

// passport config to server
app.use(passport.initialize());
app.use(passport.session())
require('./utils/passport');

app.use('/', routes);


// testing 

// app.post('/', (req,res)=>{
//   res.sendFile(path.resolve(__dirname,'../client/home.html'));
// })

// app.get('/sign-in', (req,res)=>{
//   res.sendFile(path.resolve(__dirname,'../client/sign_in.html'));
// })





app.listen(PORT, ()=>console.log(`Listening on PORT ${PORT}`));