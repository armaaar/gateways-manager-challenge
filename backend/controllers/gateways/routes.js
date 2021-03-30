const express = require('express');
const GatewaysControllers = require('.');

const router = new express.Router();

router.get('/', GatewaysControllers.getGateways);
router.get('/:serialNumber', GatewaysControllers.getGateway);
router.post('/', GatewaysControllers.addGateway);
router.put('/:serialNumber', GatewaysControllers.updateGateway);
router.delete('/:serialNumber', GatewaysControllers.deleteGateway);

module.exports = router;
