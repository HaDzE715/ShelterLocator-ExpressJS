require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const sheltersRouter = require('./routes/sheltersRoute');

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

app.use('/shelters', sheltersRouter);

app.listen(port, () => console.log(`Server has started listening on port ${port}`));
