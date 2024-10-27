const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await bookModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Book not found',
        errors: { details: 'No book found with this ID' },
      });
    }
    res.status(204).json({
      status: 'success',
      code: 204,
      message: 'Book deleted successfully',
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

module.exports = deleteBook;
