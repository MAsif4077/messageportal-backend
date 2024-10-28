const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/', clientController.createClient);
router.post('/admin', clientController.createSuperAdmin);
router.post('/adminLogin', clientController.superAdminLogin);
router.get('/:id', clientController.getClient);
router.get('/', clientController.getAllClients);
router.patch('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
router.put('/ban/:id', clientController.banClient);

module.exports = router;
