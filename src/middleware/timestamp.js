module.exports = {requestTime: (req, res, next) => {
  var currentDate = new Date();
  req.requestTime = 'Timestamp: ' + currentDate.getDate() + '-' +(currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
  next();
},
};