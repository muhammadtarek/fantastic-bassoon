const mongoose = require('mongoose');
const express = require('express');
const app = express();

const MONGO_DB = process.env.MONGODB_NAME || 'fantastic-bassoon';

// routes
const cars = require('./routes/carRoute');

mongoose.connect(`mongodb://localhost/${MONGO_DB}`)
    .then( () => console.log('Connected to MongoDB...'))
    .catch( err => console.log('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/cars', cars);

// Set env.PORT or use default port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listning on port ${port}`));
