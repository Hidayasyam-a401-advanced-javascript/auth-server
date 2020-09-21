'use strict';

const base64 = require('base-64');

const UserSchema = require('../auth/models/users-schema.js');

module.exports = async (req, res, next) => {
  console.log('headers--> ',req.headers);
  console.log('authorization--> ',req.headers.authorization);
  const auth = req.headers.authorization.split(' ');
  console.log('auth--> ',auth);
  if (auth[0] === 'Basic') {
    const [username, password] = base64.decode(auth[1]).split(':');
    const authUser = new UserSchema({ username, password });
    const {record, Valid } = await authUser.authenticateUser();
    req.Valid = Valid;
    req.record = record;
    next();
  } else { next('Invalid Login!! '); }
};