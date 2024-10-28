const express = require('express');
const router = express.Router();
const rateCardController = require('../controllers/rateCardController');

router.post('/', rateCardController.createRateCard);
router.get('/', rateCardController.getRateCards);
router.get('/:id', rateCardController.getRateCardById);
router.put('/:id', rateCardController.updateRateCard);
router.delete('/:id', rateCardController.deleteRateCard);

module.exports = router;
