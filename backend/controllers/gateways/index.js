const {Gateway} = require('../../models/gateway');
const mongoReadableErrors = require('../../utils/readable-mongo-errors');

const getGateways = async (req, res) => {
  res.status(200).send(await Gateway.find());
};

const getGateway = async (req, res) => {
  const gateway = await Gateway.findOne({serialNumber: req.params.serialNumber});

  if (!gateway) {
    res.status(404).send({error: 'gateway doesn\'t exist'});
    return;
  }

  res.status(200).send(gateway);
};

const addGateway = async (req, res) => {
  const gateway = new Gateway({
    serialNumber: req.body.serialNumber,
    readableName: req.body.readableName,
    ipv4: req.body.ipv4,
  });

  try {
    await gateway.save();
    res.status(201).send(gateway);
  } catch (e) {
    res.status(400).send(mongoReadableErrors(e));
  }
};

const updateGateway = async (req, res) => {
  const gateway = await Gateway.findOne({serialNumber: req.params.serialNumber});

  if (!gateway) {
    res.status(404).send({error: 'Gateway doesn\'t exist'});
    return;
  }

  try {
    Object.entries(req.body).forEach(([fieldName, newValue]) => {
      gateway[fieldName] = newValue;
    });
    await gateway.save();
    res.status(201).send(gateway);
  } catch (e) {
    res.status(400).send(mongoReadableErrors(e));
  }
};

const deleteGateway = async (req, res) => {
  await Gateway.deleteOne({serialNumber: req.params.serialNumber});
  res.status(204).send();
};

module.exports = {
  getGateways,
  getGateway,
  addGateway,
  updateGateway,
  deleteGateway,
};

