import request from 'supertest';
import app from '../src/app';
import path from 'path';

describe('POST /api/analyze', () => {
  it('should return 400 if no image file is provided', async () => {
    const response = await request(app)
      .post('/api/analyze') // o /api/analyze/analyze según cómo tengas la ruta
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Image file is missing');
  });
  it('should accept an image file and return tags', async () => {
    const imagePath = path.join(__dirname, 'fixtures', 'test1.png');

    const response = await request(app)
      .post('/api/analyze')
      .attach('image', imagePath); // 'image' debe coincidir con upload.single('image')

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tags');
    expect(Array.isArray(response.body.tags)).toBe(true);
  });
});
