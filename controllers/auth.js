const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
// const bcrypt = require('bcryptjs')

const register = async (req, res) => {
  // ******** We use this to hash the password **************//
  // ******** Hashing is done in Mongoose middleware (in mongoose model) **************//

  // const {username, email, password} = req.body
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)
  // const tempUser = {username, email, password: hashedPassword}

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(user);
};
const login = (req, res) => {
  res.send(`Login`);
};

module.exports = { register, login };
