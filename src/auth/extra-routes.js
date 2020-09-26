/* eslint-disable quotes */
'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../middleware/bearer-auth.js');
const  accesroute=require('../middleware/authorize.js');

router.get('/secret', bearerMiddleware, (req,res)=>{
  res.status(200).json(req.user);
});
router.get("/read", bearerMiddleware, accesroute("read"),(req,res)=>{
  console.log('read');
  res.status(200).send(" read working ");
});
router.post("/create", bearerMiddleware, accesroute("create"),(req,res)=>{
  res.status(200).send(" create working ");
});
router.put("/update", bearerMiddleware, accesroute("update"),(req,res)=>{
  res.status(200).send("update working ");
});
router.delete("/delete", bearerMiddleware, accesroute("delete"),(req,res)=>{
  res.status(200).send(" delete working ");
});

module.exports = router;



