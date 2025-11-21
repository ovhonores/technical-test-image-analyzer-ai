import request from 'supertest';
import app from '../src/app';
import path from 'path';

// Mock the imageAnalysisService to avoid real API calls during tests
jest.mock('../src/services/analyze.service', () => ({
  analyzeService: {
    analyzeImage: jest.fn().mockResolvedValue({
      tags: [
        { label: 'mock-tag', confidence: 0.99 }
      ],
    }),
  },
}));
describe('POST /api/analyze', () => {
  it('should return 400 if no image file is provided', async () => {
    const response = await request(app)
      .post('/api/analyze') 
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Image file is missing');
  });
  it('should accept an image file and return tags', async () => {
    const imagePath = path.join(__dirname, 'fixtures', 'test1.png');

    const response = await request(app)
      .post('/api/analyze')
      .attach('file', imagePath); // 'file' debe coincidir con upload.single('file')

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tags');
    expect(Array.isArray(response.body.tags)).toBe(true);
  });
});
