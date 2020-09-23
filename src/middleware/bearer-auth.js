/* eslint-disable indent */

'use strict';

const users = require('../auth/models/users-schema');
module.exports  = (req, res, next) => {
    //console.log('authorization');
    if (!req.headers.authorization) {
        return 'Error authorization not exist .. !';
    }
    let newuser=new users();
    const auth = req.headers.authorization.split(' ');
    if (auth[0] === 'Bearer') {
        console.log('req.headers.authorization ---> ', req.headers.authorization);
        const token = auth[1];
        newuser.bearerMiddleware(token).then(validuser => {
            //console.log('bearerMiddleware ---> valid : ', validuser);
            req.user = validuser;
            next();
        }).catch(err => next('Invalid Token!'));

    } else {
        return next('Invalid Bearer!!');
    }


};