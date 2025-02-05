import { WordGenerationService } from '../../../src/services/wordGenerationService';
import OpenAIProvider from '../../../src/llmProviders/openaiProvider';
import GrokProvider from '../../../src/llmProviders/grokProvider';

jest.mock('@/llmProviders/openaiProvider');
jest.mock('@/llmProviders/grokProvider');

describe('WordGenerationService', () => {
  test('should use OpenAI by default if no provider is specified', async () => {
    const mockOpenAIProvider = new OpenAIProvider('test-openai-api-key') as jest.Mocked<OpenAIProvider>;
    (OpenAIProvider as jest.Mock).mockReturnValue(mockOpenAIProvider);
    
    mockOpenAIProvider.generateWords.mockResolvedValue(['MOON', 'PLANET', 'ASTEROID']);
    
    const service = new WordGenerationService();  // No LLM provider specified, should default to OpenAI
    const words = await service.generateWords('space', 'easy');
    
    expect(words).toEqual(['MOON', 'PLANET', 'ASTEROID']);
    expect(mockOpenAIProvider.generateWords).toHaveBeenCalledWith('space', 'easy');
  });

  test('should use Grok if specified', async () => {
    const mockGrokProvider = new GrokProvider('test-grok-api-key') as jest.Mocked<GrokProvider>;
    (GrokProvider as jest.Mock).mockReturnValue(mockGrokProvider);
    
    mockGrokProvider.generateWords.mockResolvedValue(['CORAL', 'REEF', 'OCEAN']);
    
    const service = new WordGenerationService('grok');
    const words = await service.generateWords('ocean', 'medium');
    
    expect(words).toEqual(['CORAL', 'REEF', 'OCEAN']);
    expect(mockGrokProvider.generateWords).toHaveBeenCalledWith('ocean', 'medium');
  });

  test('should generate a topic using OpenAI by default', async () => {
    const mockOpenAIProvider = new OpenAIProvider('test-openai-api-key') as jest.Mocked<OpenAIProvider>;
    (OpenAIProvider as jest.Mock).mockReturnValue(mockOpenAIProvider);
    
    mockOpenAIProvider.generateTopic.mockResolvedValue('space exploration');
    
    const service = new WordGenerationService();
    const topic = await service.generateTopic();
    
    expect(topic).toBe('space exploration');
    expect(mockOpenAIProvider.generateTopic).toHaveBeenCalled();
  });
});
