/* eslint-disable no-unused-vars */
'use strict';

const { json } = require('express');
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const morgan = require('morgan');
const usersrouter=require('./auth/router.js');
//const notFoundHandler = require('./');
 //const serverErrorHandler = require('./middleware/500');
app.use(express.json());
//app.use(serverErrorHandler);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//======================== Globle Routes ===========================

//app.use('/',(req,res)=>{res.send('Hi')});
app.use('/v1',usersrouter);
//======================== Error Handler ===========================
//app.get('/badrequest', (req, res) => { throw new Error('Bad Request !! '); });
//app.use('*', notFoundHandler);


module.exports = {
  server: app,
  start: port => {
    let PORT = port || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
      // console.log(data)

    });
  },
};