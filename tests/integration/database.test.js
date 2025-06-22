// File: tests/integration/database.test.js

const request = require('supertest');
const app = require('../../server');
const db = require('../../config/db');

// No beforeAll: we assume the DB/table/data already exist

afterAll(done => {
  db.end(done);
});

describe('Integration Tests: Database CRUD', () => {
  test('GET /api/products returns products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // Assumes you have at least one product in your DB
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });

  test('POST /api/products creates a product', async () => {
    const newProduct = {
      name: 'Integration Test Product',
      description: 'Created during integration testing',
      price: 29.99,
      category: 'Testing'
    };
    const res = await request(app)
      .post('/api/products')
      .send(newProduct);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(newProduct);
    expect(res.body).toHaveProperty('id');
    expect(typeof res.body.id).toBe('number');
  });
});
