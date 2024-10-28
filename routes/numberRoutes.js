const express = require('express');
const { createNumber, getNumbersByClientId,getAllNumbers, updateNumber, deleteNumber } = require('../controllers/numberController');
const router = express.Router();

router.post('/', createNumber);

router.get('/client/:clientId', getNumbersByClientId);
router.get('/', getAllNumbers);

router.patch('/:id', updateNumber);

router.delete('/:id', deleteNumber);

module.exports = router;
