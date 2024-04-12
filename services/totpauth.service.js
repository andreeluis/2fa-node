const speakeasy = require("speakeasy")

const totpOpts = {
  issuer: process.env.APP_NAME,
  algorithm: 'sha1'
}

const registerTOTPService = async (user) => {
  return new Promise((resp, rejp) => {
    _registerTOTP(user, resp, rejp)
  });
}

const validateTOTPService = async (user, token) => {
  return new Promise((resp, rejp) => {
    _validateTOTP(user, token, resp, rejp)
  });
}


const _registerTOTP = async (user, resp, rejp) => {
  try {
    let totp = speakeasy.otpauthURL({
      secret: process.env.TOTP_SECRET + user.toUpperCase(),
      label: user,
      ...totpOpts
    });

    let data = totp.toString();

    resp({
      StatusCode: 200,
      Status: "Success",
      data
    })

  } catch (error) {
    rejp({
      StatusCode: 500,
      Status: "Internal server error",
      error
    })
  }
}

const _validateTOTP = async (user, token, resp, rejp) => {
  try {

    let delta = speakeasy.totp.verifyDelta({
      secret: process.env.TOTP_SECRET + user.toUpperCase(),
      token: token,
      ...totpOpts
    });

    if (delta === null || typeof delta === 'undefined') {
      resp({
        StatusCode: 401,
        Status: "Invalid",
        delta
      })
    }

    resp({
      StatusCode: 200,
      Status: "Success",
      delta
    })


  } catch (error) {
    rejp({
      StatusCode: 500,
      Status: "Internal server error",
      error
    })
  }
}


module.exports = {
  registerTOTPService,
  validateTOTPService
}
