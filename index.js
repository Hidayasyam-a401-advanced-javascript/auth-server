'use strict';


let server=require('./src/server');
const mongoose = require('mongoose');

require('dotenv').config();

let PORT= process.env.PORT;
const MONGOOSE_URL=process.env.MONGOOSE_URL;
mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(()=>
  console.log('connect'),
);

server.start(PORT);