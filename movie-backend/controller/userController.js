const User = require('../models/userSchema'); // Import Mongoose model
const sendToken = require('../utils/jwtTokens');
const statusCodes = require('../validations/statusCodes');
const messages = require('../validations/messageDefault');

const register = async (req, res) => {
  const { username, password, email, name } = req.body;
  
  if (!username || !password || !email || !name) {
    return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.PROVIDE_VALUES });
  }

  try {
    const isUser = await User.findOne({ username: username });
    if (isUser) {
      return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.USER_EXISTS });
    }

    const user = await User.create({ username, password, email, name });
    sendToken(user, statusCodes.CREATED, res, messages.REGISTER_SUCCESS);

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.PROVIDE_VALUES });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.INVALID_CREDENTIALS });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.INVALID_CREDENTIALS });
    }

    sendToken(user, statusCodes.OK, res, messages.LOGIN_SUCCESS);

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
  }
};

const logout = (req, res) => {
  res.status(statusCodes.OK).cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: messages.LOGOUT_SUCCESS,
  });
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(statusCodes.OK).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser
};
