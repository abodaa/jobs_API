const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
// const bcrypt = require('bcryptjs')

// ******** LOGIN *********** //

const register = async (req, res) => {
  // const { username, email, password } = req.body;
  // ******** We use this to hash the password **************//
  // ******** Hashing is done in Mongoose middleware (in mongoose model) **************//
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)
  // const tempUser = {username, email, password: hashedPassword}

  // if (!username || !email || !password) {
  //   return res
  //     .status(StatusCodes.PARTIAL_CONTENT)
  //     .json({ msg: "Please provide username, email and password" });
  // }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.username }, token });
};

// ******** LOGIN *********** //

const login = async (req, res) => {
  const { email, password } = req.body;
  
  // Check if email and password provided
  if (!email || !password) {
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ msg: "Please provide email and password" });
  }
  
  // Check if user exists (if email is already registered)
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid credentials" });
  }

  //  Check if the password is correct
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid Credentials" });
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
};


module.exports = { register, login };
