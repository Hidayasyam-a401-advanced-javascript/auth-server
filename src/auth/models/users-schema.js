// /* eslint-disable indent */
'use strict';
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = mongoose.Schema({


  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // fullname : {type: String, required:true},
  // email:{type: String, required:true, unique: true },
  //role:{enum: ['admin', 'editor', 'writer','user']},

});
Users.plugin(uniqueValidator);
Users.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

Users.methods.authenticateUser = async function () {
  const { username, password } = this;

  const record = await this.constructor.findOne({ username });
  const Valid = await bcrypt.compare(password, record.password);
  return { record, Valid };
};

Users.methods.bearerMiddleware = async function (token) {
  //console.log('bearerMiddleware----> ',token);
  try {
    let obj = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let data = obj.username;
    let getuser = await this.constructor.findOne({ username: data });
    //console.log('bearerMiddleware----> ', getuser.username);
    if (getuser.username) {
      return Promise.resolve({
        obj: obj,
        // eslint-disable-next-line comma-dangle
        user: getuser.username
      });
    }
    else { return Promise.reject(); }
  } catch (error) {
    return Promise.reject();
  }
};
Users.methods.generateToken = async function () {
  const { username } = this;
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = mongoose.model('Users', Users);

