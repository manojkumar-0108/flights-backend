const express = require('express');
const { home } = require('../../controllers/');

const router = express.Router();

router.get('/home', home);

module.exports = router;