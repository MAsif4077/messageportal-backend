// routes/messageLogRoutes.js
const express = require('express');
const router = express.Router();
const messageLogController = require('../controllers/messageLogController');

router.post('/', messageLogController.createMessageLog);

router.get('/client/:clientId', messageLogController.getClientMessageLogs);

router.get('/:id', messageLogController.getMessageLog);
router.get('/', messageLogController.getAllMessageLogs);

router.delete('/:id', messageLogController.deleteMessageLog);

module.exports = router;
