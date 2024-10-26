const express = require('express');
const createBook = require("../controllers/createBook");







const router = express.Router();

router.post("/add", createBook);

module.exports = router;