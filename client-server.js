'use strict';

const express = require('express');
const clientServer = express();

clientServer.use(express.static(`${__dirname}/public`));
clientServer.use('/images', express.static(`${__dirname}/app/images`));
clientServer.use('/views', express.static(`${__dirname}/app/views`));
clientServer.use('/vendor', express.static(`${__dirname}/app/vendor`));


clientServer.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

clientServer.listen(9000, (err) => {
  if (err) return console.log(err);
  console.log('client-server up on 9000');
});
