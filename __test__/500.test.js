const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('500 bad Request', ()=> {

  it('should respond with 500 for bad', ()=>{
    return mockRequest.get('/badrequest').then(result=>{
      expect(result.status).toBe(500);
    });
  });
});