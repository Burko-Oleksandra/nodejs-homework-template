const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarUrl,
  });
  res.status(201).json({
    name: result.name,
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
