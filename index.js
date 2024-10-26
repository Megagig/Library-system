const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

//middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

//setup simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});