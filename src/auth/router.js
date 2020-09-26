'use strict';

/* eslint-disable no-undef */
const express = require('express');
const Users = require('./models/users-schema.js');
const router = express.Router();
const basicAuth = require('../middleware/basic.js');


//=========================== Router ========================================

router.post('/signup', postuser);
router.post('/signin', basicAuth, postuserAuth);
router.get('/users', getuser);
//=========================== Functionlity ==================================

function postuser(req, res) {
  let newUser= new Users(req.body);
  newUser.save().then(()=>res.status(200).send(newUser)).catch(err=>res.send(err.errors));
}


async function postuserAuth(req, res) {
  const { record, Valid } = req;
  if (Valid) {
    const authUser = new Users({ username: record.username , role:record.role});
    const token = await authUser.generateToken();
    res.cookie('token ', token, { maxAge: 500000, httpOnly: true });
    res.status(200).send({ record, token });
    //console.log(authUser.role);
  } else {
    res.status(401).send( 'invalid login data ...!');
  }
}


async function getuser(req, res) {

  let v = await Users.find();
  res.send(v);
}



module.exports = router;