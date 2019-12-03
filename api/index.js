const mongoose = require('mongoose');
// routes
const cars = require('./routes/carRoute');

const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/fantastic-bassoon')
    .then( () => console.log('Connected to MongoDB...'))
    .catch( err => console.log('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/cars', cars);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listning on port ${port}`));
