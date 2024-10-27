const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');


const updateBook = async (req, res) => {
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedBook) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Book not found',
        errors: { details: 'No book found with this ID' },
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Book updated successfully',
      data: { book: updatedBook },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
      errors: { details: error.message },
    });
  }
};

module.exports = updateBook;
