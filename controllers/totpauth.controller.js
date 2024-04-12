const { registerTOTPService, validateTOTPService } = require('../services/totpauth.service')

const registerController = async (req, res, next) => {
  try {
    const { user } = req.body;

    const { StatusCode, Status, data: totpURI } = await registerTOTPService(user);

    res.status(StatusCode).json({ StatusCode, Status, totpURI });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  }
}

const validateController = async (req, res, next) => {
  try {
    const { user, token } = req.body;

    const resp = await validateTOTPService(user, token);

    res.status(resp.StatusCode).json(resp);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  }
}


module.exports = {
  registerController,
  validateController
}
