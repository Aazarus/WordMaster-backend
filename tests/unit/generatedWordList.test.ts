import { generateWordList } from '../../src/generateWordList';
import { WordGenerationService } from '../../src/services/wordGenerationService';

jest.mock('@/services/wordGenerationService');

describe('generateWordList', () => {
  let mockService: jest.Mocked<WordGenerationService>;

  beforeEach(() => {
    mockService = new WordGenerationService() as jest.Mocked<WordGenerationService>;
    (WordGenerationService as jest.Mock).mockReturnValue(mockService);
  });

  test('should generate words when a topic is provided', async () => {
    mockService.generateWords.mockResolvedValue(['ROCKET', 'PLANET', 'ASTRONAUT']);
    const words = await generateWordList('space', 'easy');
    expect(words).toEqual(['ROCKET', 'PLANET', 'ASTRONAUT']);
  });

  test('should generate a topic if none is provided', async () => {
    mockService.generateTopic.mockResolvedValue('space');
    mockService.generateWords.mockResolvedValue(['ROCKET', 'PLANET', 'ASTRONAUT']);
    const words = await generateWordList('', 'easy');
    expect(mockService.generateTopic).toHaveBeenCalled();
    expect(words).toEqual(['ROCKET', 'PLANET', 'ASTRONAUT']);
  });
});
