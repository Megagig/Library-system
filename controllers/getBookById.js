const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Book retrieved successfully',
      data: book,
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

module.exports = getBookById;
