'use strict'

/* eslint-disable no-undef */
const express = require('express');
const Users = require('./models/users-schema.js');
const router = express.Router();
const basicAuth = require("../middleware/basic.js");


//=========================== Router ========================================

router.post('/signup', postuser);
router.post('/signin', basicAuth, postuserAuth);
router.get('/users', getuser);

//=========================== Functionlity ==================================

function postuser(req, res) {
let newUser= new Users(req.body);
newUser.save().then(()=>res.send(newUser)).catch(err=>res.send(err.errors.username.message));
}


function postuserAuth(req, res) {
    const { record, Valid } = req;
    if (Valid) {
      const authUser = new UserSchema({ username: record.username });
      const token = await authUser.generateToken();
      res.status(200).send({ user, token });
    } else {
      res.status(401).send({ msg: "username/password is incorrect" });
    }
}


async function getuser(req, res) {

    let v = await Users.find();
    res.send(v);
}


module.exports = router;