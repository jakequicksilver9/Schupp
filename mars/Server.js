const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./classes/user')
const routes = require('./routes/routes.js');
 
require("dotenv").config({
 path: path.join(__dirname, "../.env")
});
 
const app = express();
 
mongoose
 .connect('mongodb://schuppdb:dE2Vwf5W4OaTyE0eGJxUUFDPxQpAkoq7CJt2nQEQv9JLNrkuKy5bl0UmWpTkphP9BSFPSlG39jcJZlRHGhuXjA==@schuppdb.mongo.cosmos.azure.com:10255/?ssl=true&appName=@schuppdb@', { useNewUrlParser:true, useUnifiedTopology: true})
 .then(() => {
  console.log('Connected to the Database successfully');
 });
 
 app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
 
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(userId); next(); 
 } else { 
  next(); 
 } 
});
 
app.use('/', routes)

app.listen(process.env.PORT || 3001,() => {
    console.log(`App Started on PORT ${process.env.PORT || 3001}`)
})