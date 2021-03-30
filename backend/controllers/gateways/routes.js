const express = require('express');
const GatewaysControllers = require('.');

const router = new express.Router();

const rootRoute = '/gateways';

router.get(rootRoute, GatewaysControllers.getGateways);
router.get(`${rootRoute}/:serialNumber`, GatewaysControllers.getGateway);
router.post(rootRoute, GatewaysControllers.addGateway);
router.put(`${rootRoute}/:serialNumber`, GatewaysControllers.updateGateway);
router.delete(`${rootRoute}/:serialNumber`, GatewaysControllers.deleteGateway);

module.exports = router;
