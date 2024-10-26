const express = require('express');
const createBook = require('../controllers/createBook');
const getAllBooks = require('../controllers/getAllBooks');

const router = express.Router();

router.post('/add', createBook);
router.get('/all-books', getAllBooks);

module.exports = router;
