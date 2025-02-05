import request from 'supertest';
import app from '../../src/server';
import { WordGenerationService } from '../../src/services/wordGenerationService';

// Mock rate limiting to bypass during tests
jest.mock('express-rate-limit', () => {
  return () => (req: any, res: any, next: any) => next();
});

// Mock the WordGenerationService
jest.mock('@/services/wordGenerationService');

describe('POST /generate-word-list with LLM provider switching', () => {
  let mockService: jest.Mocked<WordGenerationService>;

  beforeEach(() => {
    mockService = new WordGenerationService() as jest.Mocked<WordGenerationService>;
    (WordGenerationService as jest.Mock).mockReturnValue(mockService);
  });

  test('should generate words using the default LLM provider', async () => {
    mockService.generateWords.mockResolvedValue(['MOON', 'PLANET', 'ASTEROID']);

    const response = await request(app)
      .post('/generate-word-list')
      .send({ topic: 'space', difficulty: 'easy' })
      .expect(200);

    expect(response.body.words).toEqual(['MOON', 'PLANET', 'ASTEROID']);
  });

  test('should generate words using the provided LLM provider', async () => {
    mockService.generateWords.mockResolvedValue(['WAVE', 'REEF', 'CORAL']);

    const response = await request(app)
      .post('/generate-word-list')
      .send({ topic: 'ocean', difficulty: 'medium', llmProvider: 'grok' })
      .expect(200);

    expect(response.body.words).toEqual(['WAVE', 'REEF', 'CORAL']);
  });

  test('should return 400 for missing request body', async () => {
    const response = await request(app)
      .post('/generate-word-list')
      .send({})
      .expect(400);

    expect(response.body.error).toBe('Invalid request. Please provide a topic or difficulty.');
  });
});
