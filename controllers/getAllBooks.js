const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Invalid input',
      errors: { details: error.message },
    });
  }
};
module.exports = getAllBooks;
