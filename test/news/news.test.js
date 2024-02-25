const request = require('supertest');
const { app } = require('../../index');

// haven't mocked database, database should be running for tests to work
describe('News tests', () => {


  it('should return a 201 response while sending a POST request to /news endpoint', async () => {

    

    const res = await request(app).post('/news?matchId=1').send({title: "random title", description: "random description"})
    expect(res.status).toBe(201);
  })


  it('should return bad response 400, if none or both of matchId and tourId are sent as query params', async () => {
    const res = await request(app).post('/news').send({title: "random title", description: "random description"})
    expect(res.status).toBe(400)

    const res2 = await request(app).post('/news?matchId=1&tourId=2').send({title: "random title", description: "random description"})
    expect(res2.status).toBe(400)

  })

  it('should return bad response 400, if no title or an empty title is provided', async () => {
    const res = await request(app).post('/news').send({description: "random description"})
    expect(res.status).toBe(400)
  })

  it('the news created for a match, should be available when news of that match, corresponding tour, or corresponding sport is fetched', async () => {
    const res = await request(app).post('/news?matchId=1').send({title: "random title", description: "random description"})
    expect(res.status).toBe(201);

    const res2 = await request(app).get('/news?matchId=1')
    expect(res2.status).toBe(200)
    expect(res2.body.length).toBe(1)

    const res3 = await request(app).get('/news?tourId=1')
    expect(res3.status).toBe(200)
    expect(res3.body.length).toBe(1)

    const res4 = await request(app).get('/news?sportId=1')
    expect(res4.status).toBe(200)
    expect(res4.body.length).toBe(1)
  })


});