import OpenAIProvider from "../../../src/llmProviders/openaiProvider";
import OpenAI from 'openai';

// Mock the OpenAI class
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn(),
        },
      },
    })),
  };
});

describe('OpenAIProvider', () => {
  let openAIProvider: OpenAIProvider;
  let mockCreateCompletion: jest.Mock;

  beforeEach(() => {
    openAIProvider = new OpenAIProvider('test-openai-api-key');
    mockCreateCompletion = (openAIProvider as any).openai.chat.completions.create;
  });

  test('should generate a topic', async () => {
    mockCreateCompletion.mockResolvedValue({
      choices: [{ message: { content: 'space exploration' } }],
    });

    const topic = await openAIProvider.generateTopic();
    expect(topic).toBe('space exploration');
    expect(mockCreateCompletion).toHaveBeenCalledWith({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: 'Suggest a random topic for a word search game.',
        },
      ],
      store: true,
    });
  });

  test('should generate words for the given topic and difficulty', async () => {
    mockCreateCompletion.mockResolvedValue({
      choices: [{ message: { content: 'moon, planet, asteroid, rocket, star' } }],
    });

    const words = await openAIProvider.generateWords('space', 'easy');
    expect(words).toEqual(['MOON', 'PLANET', 'ASTEROID', 'ROCKET', 'STAR']);
    expect(mockCreateCompletion).toHaveBeenCalledWith({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: 'Generate 10 words related to space for a word search game. The result should contain only the words, separated by commas.',
        },
      ],
      store: true,
    });
  });

  test('should use correct word count based on difficulty', async () => {
    mockCreateCompletion.mockResolvedValue({
      choices: [{ message: { content: 'tree, mountain, river' } }],
    });

    const words = await openAIProvider.generateWords('nature', 'medium');
    expect(words).toEqual(['TREE', 'MOUNTAIN', 'RIVER']);
    expect(mockCreateCompletion).toHaveBeenCalledWith({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: 'Generate 15 words related to nature for a word search game. The result should contain only the words, separated by commas.',
        },
      ],
      store: true,
    });
  });
});
