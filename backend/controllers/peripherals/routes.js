const express = require('express');
const withGateway = require('../../middlewares/with-gateway');
const PeripheralsControllers = require('.');

const router = new express.Router();

const rootRoute = '/gateways/:serialNumber/peripherals';

router.get(rootRoute, withGateway, PeripheralsControllers.getGatewayPeripherals);
router.get(`${rootRoute}/:UID`, withGateway, PeripheralsControllers.getGatewayPeripheral);
router.post(rootRoute, withGateway, PeripheralsControllers.addGatewayPeripheral);
router.put(`${rootRoute}/:UID`, withGateway, PeripheralsControllers.updateGatewayPeripheral);
router.delete(`${rootRoute}/:UID`, withGateway, PeripheralsControllers.deleteGatewayPeripheral);

module.exports = router;
