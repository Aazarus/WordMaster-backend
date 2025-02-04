import request from 'supertest';
import app from '../../src/server'; // Ensure the server is properly exported

describe('POST /generate-word-list', () => {
  test('should return 10 words for easy difficulty', async () => {
    const response = await request(app)
      .post('/generate-word-list')
      .send({ topic: 'space', difficulty: 'easy' })
      .expect(200);

    expect(response.body.words).toHaveLength(10);
  });

  test('should return 15 words for medium difficulty', async () => {
    const response = await request(app)
      .post('/generate-word-list')
      .send({ topic: 'space', difficulty: 'medium' })
      .expect(200);

    expect(response.body.words).toHaveLength(15);
  });

  test('should return 30 words for hard difficulty', async () => {
    const response = await request(app)
      .post('/generate-word-list')
      .send({ topic: 'space', difficulty: 'hard' })
      .expect(200);

    expect(response.body.words).toHaveLength(30);
  });

  test('should handle unknown topics by returning a default word list', async () => {
    const response = await request(app)
      .post('/generate-word-list')
      .send({ topic: 'unknown_topic', difficulty: 'easy' })
      .expect(200);

    expect(response.body.words).toHaveLength(10);
  });
});

