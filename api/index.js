const mongoose = require('mongoose');
const express = require('express');
const app = express();

// routes
const cars = require('./routes/carRoute');

mongoose.connect('mongodb://localhost/fantastic-bassoon')
    .then( () => console.log('Connected to MongoDB...'))
    .catch( err => console.log('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/cars', cars);

// Set env.PORT or use default port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listning on port ${port}`));
