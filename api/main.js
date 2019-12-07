const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.port || 3000;

const express = require('express');

const app = express();
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/fantastic-bassoon', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(err => {
    console.log('Not Connected to Database ERROR! ', err);
  });

const reservationRouter = require('./routes/reservationRoute');
// const reservationRouter = require('./routes/reservationRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');

const reservationRouter = require('./routes/reservationRoute');
const carRouter = require('./routes/carRoute');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/reservation', reservationRouter);
app.use('/cars', carRouter);

app.listen(port, hostname, err => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
