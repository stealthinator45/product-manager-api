// File: tests/api/products.api.test.js

const request = require('supertest');
const app = require('../../server');        // Exported Express app
const db = require('../../config/db');      // MySQL connection

// No beforeAll block: assumes your DB/table/data already exist

afterAll(done => {
  // Close database connection to prevent open-handle warnings
  db.end(done);
});

describe('API Tests: Endpoints', () => {
  let createdId;

  test('POST /api/products creates product', async () => {
    const payload = {
      name: 'API Test',
      description: 'D',
      price: 5,
      category: 'Cat'
    };
    const res = await request(app)
      .post('/api/products')
      .send(payload);
    expect(res.status).toBe(200);                   
    expect(res.body).toHaveProperty('id');         
    createdId = res.body.id;                       
  });

  test('GET /api/products/:id returns created product', async () => {
    const res = await request(app).get(`/api/products/${createdId}`);
    expect(res.status).toBe(200);                   
    expect(res.body.id).toBe(createdId);            
  });

  test('PUT /api/products/:id updates product', async () => {
    const updatePayload = {
      name: 'API Test Updated',
      description: 'D2',
      price: 6,
      category: 'Cat2'
    };
    const res = await request(app)
      .put(`/api/products/${createdId}`)
      .send(updatePayload);
    expect(res.status).toBe(200);                   
    expect(res.body.name).toBe(updatePayload.name);
  });

  test('DELETE /api/products/:id removes product', async () => {
    const res = await request(app).delete(`/api/products/${createdId}`);
    expect(res.status).toBe(200);                   
    expect(res.body.message).toMatch(/deleted/i);   
  });
});
