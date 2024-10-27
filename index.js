const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const path = require('path'); // Import the path module

// Load environment variables
dotenv.config();

const app = express();

// connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

//middleware
app.use(express.json());
// Routes
app.use('/api/v1/books', bookRoutes);
const PORT = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
