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
    const data = await mockRequest.post('/v1/signup').send(Obj);
    const record = data.body;
    expect(record.username).toEqual(Obj.username);
    expect(record.password).not.toEqual(Obj.password);

  });



  it('singup ', async () => {
    const Obj = {
      username: 'Waleed Faraj3',
      password: 'wal1e2ed2546',
    };

   // let passwordencrybt = await bcrypt.hash(Obj.password, 10);
    const data = await mockRequest.post('/v1/signup').send(Obj);
    const record = data.body;
    console.log('Data : ', record);
    const data_two = await mockRequest.post('/v1/signup').send(Obj);

    expect(data_two.body).toEqual({});

  });


//   it('singup ', async () => {
//     const Obj = {
//       username: 'Waleed Faraj3',
//       password: 'wal1e2ed2546',
//     };

//    // let passwordencrybt = await bcrypt.hash(Obj.password, 10);
//     const data = await mockRequest.post('/v1/signup').send(Obj);
//     const record = data.body;
//     console.log('Data : ', record);
//     const data_two = await mockRequest.post('/v1/signup').send(Obj);

//     expect(data_two.body).toEqual({});

//   });


});