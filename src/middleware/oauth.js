const users = require('../auth/models/users-schema');
const superagent = require('superagent');


module.exports = async (req, res, next)=> {  
  let code = req.query.code;
  let token = await exchangeCodeWithToken(code);
  let user = await exchangeTokenWithUser(token);  
  let [savedUser, serverToken] = await saveUser(user);
  req.user = savedUser; 
  req.token = serverToken;
  next();

};

const CLIENT_ID = '852c751c14867203239b';
const CLINET_SECRET = 'b45853fd3418a1ede302d7b95fb1f653853e4337';

async function exchangeCodeWithToken(code) {
  const urlToGetToken = 'https://github.com/login/oauth/access_token';
  const response = await superagent.post(urlToGetToken).send({
    client_id: CLIENT_ID,
    client_secret: CLINET_SECRET,
    code: code,
    redirect_uri: 'http://localhost:4000/oauth',
  });
  //console.log('exchangeCodeWithToken response ----> ',response.body);
  return response.body.access_token;
}

async function exchangeTokenWithUser(token) {
  let userResponse = await superagent
    .get('https://api.github.com/user')
    .set('Authorization', `token ${token}`)
    .set('User-Agent', 'user-agent/1.0');
  console.log('userResponse.body: ',userResponse.body);
  return userResponse.body;
}

async function saveUser(user) {
  console.log('user: ', user);
  let record = {
    username: user.login,
    password: 'XXXX',
  };
   
  let saveduser = await users.save(record);
  let myserverToken = users.generateToken(saveduser);
  return [saveduser, myserverToken];
}