const mongoReadableErrors = require('../../utils/readable-mongo-errors');

const getGatewayPeripherals = async (req, res) => {
  res.status(200).send(req.gateway.peripherals);
};

const getGatewayPeripheral = async (req, res) => {
  const peripheral = req.gateway.peripherals.find(
      (peripheral) => peripheral.UID === Number(req.params.UID),
  );

  if (!peripheral) {
    res.status(404).send({error: 'Peripheral doesn\'t exist'});
    return;
  }

  res.status(200).send(peripheral);
};

const addGatewayPeripheral = async (req, res) => {
  if (req.body.UID) {
    const peripheral = req.gateway.peripherals.find(
        (peripheral) => peripheral.UID === Number(req.body.UID),
    );
    if (peripheral) {
      res.status(400).send({errors: {UID: 'peripheral UID should be unique'}});
      return;
    }
  }

  req.gateway.peripherals.push({
    UID: req.body.UID && Number(req.body.UID),
    vendor: req.body.vendor,
    status: !['0', 'false'].includes(req.body.status) && Boolean(req.body.status),
  });
  try {
    await req.gateway.save();
    res.status(201).send(req.gateway.peripherals[req.gateway.peripherals.length - 1]);
  } catch (e) {
    res.status(400).send(mongoReadableErrors(e));
  }
};

const updateGatewayPeripheral = async (req, res) => {
  const peripheral = req.gateway.peripherals.find(
      (peripheral) => peripheral.UID === Number(req.params.UID),
  );

  if (!peripheral) {
    res.status(404).send({error: 'Peripheral doesn\'t exist'});
    return;
  }

  if (req.body.UID) {
    peripheral.UID = Number(req.body.UID);
  }

  if (req.body.vendor !== undefined) {
    peripheral.vendor = req.body.vendor;
  }

  if (req.body.status !== undefined) {
    peripheral.status = !['0', 'false'].includes(req.body.status) && Boolean(req.body.status);
  }

  try {
    await req.gateway.save();
    res.status(201).send(peripheral);
  } catch (e) {
    res.status(400).send(mongoReadableErrors(e));
  }
};

const deleteGatewayPeripheral = async (req, res) => {
  const peripheral = req.gateway.peripherals.find(
      (peripheral) => peripheral.UID === Number(req.params.UID),
  );

  if (!peripheral) {
    res.status(404).send({error: 'Peripheral doesn\'t exist'});
    return;
  }

  try {
    peripheral.remove();
    await req.gateway.save();
    res.status(204).send();
  } catch (e) {
    res.status(400).send(mongoReadableErrors(e));
  }
};

module.exports = {
  getGatewayPeripherals,
  getGatewayPeripheral,
  addGatewayPeripheral,
  updateGatewayPeripheral,
  deleteGatewayPeripheral,
};

