require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const url = process.env.DATABASE_URL.replace('{{DATABASE_USERNAME}}', username).replace('{{DATABASE_PASSWORD}}', password);
mongoose.connect(url)
.then(() =>{
    console.log('Connected to the Database.');
})
.catch((error) => {
    console.error('Error connecting to the MongoDB:', error);
})

app.use(express.json());

const sheltersRouter = require('./routes/shelters');
app.use('/shelters', sheltersRouter);

app.listen(3000, () => console.log(`Server has started`));
