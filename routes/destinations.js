const express = require('express');
const router = express.Router();

const destinationsCtrl = require('../controllers/destinations.js');

router.post('/flights/:id/destinations', destinationsCtrl.create);
router.delete('/flights/:dest/:flight', destinationsCtrl.delete);

module.exports = router;