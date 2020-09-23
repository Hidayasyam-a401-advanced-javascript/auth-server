/* eslint-disable indent */
'use strict';
const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
//const bcrypt = require('bcrypt');


describe('Users ', () => {
  it('singup ', async () => {
    const Obj = {
      username: 'Waleed Faraj',
      password: 'waleed2546',
    };
    
    //let passwordencrybt = await bcrypt.hash(Obj.password, 10);
    const results = await mockRequest.post('/v1/signup').send(Obj);
    const response = await mockRequest.get('/secret').auth(results.body.token, {
        type: 'bearer',
      });
      console.log(response);
      expect(response.status).toBe(200);
  });
/**it('should allow entry with good token', async () => {
  const userData = {
    username: 'waleed111',
    password: '1234',
  };
  const results = await mockRequest.post('/signup').send(userData);
  const response = await mockRequest.get('/secret').auth(results.body.token, {
    type: 'bearer',
  });
  expect(response.status).toBe(200);
});
 */
/**it('test signin ', async () => {
    const userData = {
      username: 'waleed',
      password: '1234',
    };
    await mockRequest.post('/signup').send(userData);
    const results = await mockRequest.post('/signin').auth('waleed', '1234');
    // console.log(results);
    const token = jwt.verify(results.body.token, process.env.SECRET);
    expect(token).toBeDefined();
  });
 */

});