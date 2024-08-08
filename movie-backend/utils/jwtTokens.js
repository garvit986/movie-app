const statusCodes = require("../validations/statusCodes");

const sendToken = async (user, statusCode, res, message) => {
  try {
    if (!user.getJWTToken) {
      throw new Error('getJWTToken method not available on user');
    }

    const token = await user.getJWTToken(); 

    const expiresIn = parseInt(process.env.COOKIE_EXPIRE, 10) * 24 * 60 * 60 * 1000; // Convert days to milliseconds

    const options = {
      expires: new Date(Date.now() + expiresIn), // Valid Date object
      httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      user,
      message,
    });
  } catch (error) {
    console.error("Error generating or sending token:", error);
    res.status(statusCodes.BAD_REQUEST).json({ success: false, message: 'Error generating token' });
  }
};

module.exports = sendToken;
