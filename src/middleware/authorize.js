'use strict';
const User = require('../auth/models/users-schema');
// check users roles and of they are allowed to do the action

module.exports = (action) => (req, res, next) => {
  const use = req.user.obj; // comes from decodeToken
  console.log('request ---> ',use);
  const isAllowed = User.can(use.role, action);
  if (isAllowed) {
    next();
  } else {
    console.log('Access Denied!----> ',req.obj);
    next('Access Denied!');
  }
};