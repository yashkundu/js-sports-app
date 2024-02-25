const request = require('supertest');
const { app } = require('../../index');

describe('Integration Tests', () => {

  it('should return a 200 OK status code for GET request to /health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });
});