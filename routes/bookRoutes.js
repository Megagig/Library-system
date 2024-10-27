const express = require('express');
const createBook = require('../controllers/createBook');
const getAllBooks = require('../controllers/getAllBooks');
const getBookById = require('../controllers/getBookById');

const router = express.Router();

router.post('/add', createBook);
router.get('/all-books', getAllBooks);
router.get('/:id', getBookById);

module.exports = router;
