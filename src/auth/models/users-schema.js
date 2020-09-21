/* eslint-disable indent */
'use strict';
const bcrypt=require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = mongoose.Schema({

 
    username:{type: String, required:true, unique: true },
    password:{type: String,required:true},
    // fullname : {type: String, required:true},
    // email:{type: String, required:true, unique: true },
     //role:{enum: ['admin', 'editor', 'writer','user']},

});
Users.plugin(uniqueValidator);
Users.pre('save',async function (next){
    this.password=await bcrypt.hash(this.password,10);
    next();
});

Users.methods.authenticateUser = async function () {
    const { username, password } = this;
    
    const record = await this.constructor.findOne({ username });
    const Valid = await bcrypt.compare(password, record.password);
    return {record, Valid };
  };
  
  Users.methods.generateToken = async function () {
    const { username } = this;
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
    return token;
  };
  
module.exports = mongoose.model('Users', Users);

