const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routers = require('@/routes/index');

const app = express();

// Configuración de Morgan
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use('/', routers);

// Iniciar el servidor
module.exports = app;
