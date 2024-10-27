const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');

// Create a new book

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publication_date,
      isbn,
      edition,
      summary,
      copies,
    } = req.body;

    //create new book
    const newBook = await bookModel.create({
      title,
      author,
      genre,
      publication_date,
      isbn,
      edition,
      summary,
      copies,
    });
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Book created successfully',
      data: { book: newBook },
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
module.exports = createBook;
