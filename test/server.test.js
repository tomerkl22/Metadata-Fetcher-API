const request = require('supertest');
const app = require('../server'); // Adjust the path if necessary


describe('POST /fetch-metadata', () => {
  it('should fetch metadata for valid URLs', async () => {
    const urls = [
      'https://www.linkedin.com/',
      'https://github.com/',
      'https://react.dev/'
    ];

    const res = await request(app)
      .post('/fetch-metadata')
      .send({ urls });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).toHaveProperty('description');
    expect(res.body[0]).toHaveProperty('image');
  });

  it('should return error metadata when URL is invalid', async () => {
    const urls = [
      'https://invalidurl.com',
      'A',
      'B'
    ];

    const res = await request(app)
      .post('/fetch-metadata')
      .send({ urls });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toMatch(/Error to fetch/);
    expect(res.body[0].description).toBe('Failed to retrieve metadata');
  });


});
