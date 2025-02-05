import { LLMProvider } from '../llmProviders/llmProvider';
import OpenAIProvider from '../llmProviders/openaiProvider';
import GrokProvider from '../llmProviders/grokProvider';

export class WordGenerationService {
  private provider: LLMProvider;

  constructor(llmProvider?: string) {
    // Use the provided LLM provider or fall back to the default from environment variables
    const providerName = llmProvider || process.env.LLM_PROVIDER || 'openai';

    if (providerName === 'grok') {
      this.provider = new GrokProvider(process.env.GROK_API_KEY || '', process.env.GROK_API_URL);
    } else {
      this.provider = new OpenAIProvider(process.env.OPENAI_API_KEY || '');
    }
  }

  async generateTopic(): Promise<string> {
    return this.provider.generateTopic();
  }

  async generateWords(topic: string, difficulty: string): Promise<string[]> {
    return this.provider.generateWords(topic, difficulty);
  }
}
