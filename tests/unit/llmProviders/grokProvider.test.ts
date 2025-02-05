import GrokProvider from '../../../src/llmProviders/grokProvider';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GrokProvider', () => {
  let grokProvider: GrokProvider;

  beforeEach(() => {
    grokProvider = new GrokProvider('test-grok-api-key', 'https://api.x.ai/v1/completions');
  });

  test('should generate a topic', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        choices: [{ message: { content: 'ocean exploration' } }]
      }
    });

    const topic = await grokProvider.generateTopic();
    expect(topic).toBe('ocean exploration');
  });

  test('should generate words for the given topic and difficulty', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        choices: [{ message: { content: 'coral, wave, reef, ocean' } }]
      }
    });

    const words = await grokProvider.generateWords('ocean', 'easy');
    expect(words).toEqual(['CORAL', 'WAVE', 'REEF', 'OCEAN']);
  });

  test('should use correct prompt for word generation based on difficulty', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        choices: [{ message: { content: 'forest, tree, mountain' } }]
      }
    });

    const words = await grokProvider.generateWords('nature', 'hard');
    expect(words).toEqual(['FOREST', 'TREE', 'MOUNTAIN']);
  });
});
