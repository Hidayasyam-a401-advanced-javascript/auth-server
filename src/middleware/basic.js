'use strict';

const base64 = require("base-64");

const UserSchema = require("../auth/models/users-schema.js");

module.exports = async (req, res, next) => {
 
  const auth = req.headers.authorization.split(" ");
  if (auth[0] === "Basic") {
    const [username, password] = base64.decode(auth[1]).split(":");
    const authUser = new UserSchema({ username, password });
    const { isValid, user } = await authUser.authenticateUser();
    req.isValid = isValid;
    req.user = user;
    next();
  } else { next('Invalid Login!! '); }
 }