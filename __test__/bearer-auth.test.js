require('dotenv').config();

const supergoose = require('@code-fellows/supergoose');

const { server } = require('../src/server');

const mockRequest = supergoose(server);

describe('Test secret Route', async () => {
  const Obj = {
    username: 'Waleed Faraj331',
    password: 'wal1e2ed25426',
    fullname: 'Waleed Faraj',
    email: 'Waleed_Faraj332@gmail.com',
    role: 'editor',
  };
  
  beforeEach(async () => {
    await mockRequest.post('/v1/signup').send(Obj);
  });
    
 
  it('Valid Bearer secret Route', async () => {
    const results = await mockRequest.post('/v1/signin').auth(Obj.username, Obj.password);
    const data = await mockRequest.get('/v1/secret')
      .auth(results.body.token, {
        type: 'bearer',
      });
    expect(data.status).toBe(200);
  });
});