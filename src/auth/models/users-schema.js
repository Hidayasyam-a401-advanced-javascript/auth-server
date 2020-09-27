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
  fullname : {type: String, required:false},
  email:{type: String, required:false, unique: true },
  role: {type: String,enum: ['admin', 'editor', 'writer','user']},
  
});


Users.plugin(uniqueValidator);
Users.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

Users.methods.authenticateUser = async function () {
  const { username, password} = this;

  const record = await this.constructor.findOne({ username });
  console.log('record--> ',record);
  const Valid = await bcrypt.compare(password, record.password);
  return { record, Valid };
};

Users.methods.bearerMiddleware = async function (token) {
  //console.log('bearerMiddleware----> ',token);
  try {
    let obj = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Obj -- >', obj);
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
  const { username , role } = this;
  console.log('this ----> ',{ username , role });
  const token = jwt.sign({ username , role}, process.env.JWT_SECRET_KEY);
  return token;
};
let roles = {
  user: ['read'],
  editor: ['read', 'create', 'update'],
  admin: ['read','read-submisi' , 'create', 'update', 'delete'],
  writer: ['read', 'create'],
};

Users.statics.can = function (user_role, permission) {
  console.log('user_role : ',user_role, 'permission : ', permission );
  return roles[user_role].includes(permission);
};

module.exports = mongoose.model('Users', Users);

