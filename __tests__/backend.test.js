require('dotenv').config();
const request = require('supertest');
const server = 'http://localhost:5001';

  test('testing 123', () => {
    let x = 4;
    expect(x).toBe(4);
  });

  describe('Test internal APIs', () => {
    describe('Get song lyric #1', () => {
      describe('GET', () => {
        // Note that we return the evaluation of `request` here! It evaluates to
        // a promise, so Jest knows not to say this test passes until that
        // promise resolves. See https://jestjs.io/docs/en/asynchronous
        it('responds with 200 status and application/json content type', () => {
          return request(server)
            .get('/api/1')
            .expect('Content-Type', /application\/json/)
            .expect(200);
        });
      });
    });

    describe('Test login API', () => {
      describe('POST', () => {
        it('responds with 200 status', () => {
          return request(server)
            .post('/users/login')
            .send([{ username: process.env.TEST_LOGIN_EMAIL, password: process.env.TEST_LOGIN_PASSWORD }])
            .expect(200);
        });
      });
    });

    describe('Test create user API', () => {
      describe('POST', () => {
        it('responds with 200 status', () => {
          return request(server)
            .post('/users/createusers')
            .send({ name: 'user'+(Math.floor(Math.random()*1000)), email: ('email'+Math.floor(Math.random()*1000))+'@noreply.com', password: 'testing123' })
            .expect(200);
        });
      });
    });

  });



