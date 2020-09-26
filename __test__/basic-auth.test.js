/* eslint-disable indent */
'use strict';
const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('Users ', () => {
  it('singup ', async () => {
    const Obj = {
      username: 'Waleed Faraj33',
      password: 'wal1e2ed2546',
      fullname: 'Waleed Faraj',
      email:'Waleed3@gmail.com',
      role:'editor',
    };

    //let passwordencrybt = await bcrypt.hash(Obj.password, 10);
    const data = await mockRequest.post('/v1/signup').send(Obj);
    const record = data.body;
    expect(record.username).toEqual(Obj.username);
    expect(record.password).not.toEqual(Obj.password);

  });

  it('test signin', async () => {
    const Obj = {
      username: 'Waleed Faraj33',
      password: 'wal1e2ed2546',
      fullname: 'Waleed Faraj',
      email:'Waleessd3@gmail.com',
      role:'editor',
    };

    await mockRequest.post('/v1/signup').send(Obj);
    const results = await mockRequest.post('/v1/signin').auth(Obj.username, Obj.password);
    const decoded = jwt.verify(results.body.token, process.env.JWT_SECRET_KEY);
    expect(decoded).toBeDefined();
  });

  


});