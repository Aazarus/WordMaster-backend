import OpenAI from 'openai';
import { LLMProvider } from './llmProvider';

export default class OpenAIProvider implements LLMProvider {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateTopic(): Promise<string> {    
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
          {
              role: "user",
              content: 'Suggest a random topic for a word search game.'
          },
      ],
      store: true,
  });

    return response.choices[0]?.message?.content || 'general';
  }

  async generateWords(topic: string, difficulty: string): Promise<string[]> {
    const wordCount = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 30;

    try {
      console.log("Requesting words from OpenAI for topic:", topic);
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: `Generate ${wordCount} words related to ${topic} for a word search game. The result should contain only the words, separated by commas.`
            },
        ],
        store: true,
    });

      const words = response.choices[0]?.message?.content
        ?.split(',')
        .map(word => word.trim().toUpperCase()) || [];
      console.log("Received words from OpenAI:", words);

      return words.slice(0, wordCount);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
