const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('404 Not found test', ()=> {

  it('should respond with 404 for routes not found ', ()=>{
    return mockRequest.get('/categories').then(result=>{
      expect(result.status).toBe(404);
    });
  });
});