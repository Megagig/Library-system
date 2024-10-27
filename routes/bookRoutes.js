const express = require('express');
const createBook = require('../controllers/createBook');
const getAllBooks = require('../controllers/getAllBooks');
const getBookById = require('../controllers/getBookById');
const updateBook = require('../controllers/updateBook');
const deleteBook = require('../controllers/deleteBook');

const router = express.Router();

router.post('/add', createBook);
router.get('/all-books', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
