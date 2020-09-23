'use strict';
// check users roles and of they are allowed to do the action
module.exports = (action) => {
  return (req, res, next) => {
    console.log('in acl middleware !!! ');
    console.log(req.user); 
   
    try {
      if (req.user.actions.includes(action)) {
        next();
      } else {
        // you have actions but you are trying 
        // to access a route that you dont have access on.
        next('Habrawi says Invalid Action! ');
      }
    } catch (e) {
      next('Invalid!');
    }
  };
};