const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
  // Check for the header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "unauthenticated User" });
  }

  // Split the header file to get the exact token (exclude Bearer)
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the job routes
    // Creates user property in the req object which contains
    // userID and name from the signed jwt token in the mongoose middleware
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Anauthenticated User from Catch" });
  }
};

module.exports = auth;
