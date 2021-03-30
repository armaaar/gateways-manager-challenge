const {Gateway} = require('../models/gateway');

module.exports = async function(req, res, next) {
  const gateway = await Gateway.findOne({serialNumber: req.params.serialNumber});

  if (!gateway) {
    res.status(404).send({error: 'Gateway doesn\'t exist'});
    return;
  }

  req.gateway = gateway;
  next();
};
