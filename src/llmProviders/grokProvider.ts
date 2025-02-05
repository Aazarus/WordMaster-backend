import axios from 'axios';
import { LLMProvider } from './llmProvider';

class GrokProvider implements LLMProvider {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl: string = 'https://api.x.ai/v1/chat/completions') {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  // Generate a random topic using the LLM
  async generateTopic(): Promise<string> {
    try {
      const prompt = 'Generate a topic for a word search game.';
      const response = await this.makeGrokRequest(prompt);
      return response;
    } catch (error) {
      console.error('Error generating topic from Grok:', error);
      throw error;
    }
  }

  // Generate words based on a given topic and difficulty
  async generateWords(topic: string, difficulty: string): Promise<string[]> {
    try {
      const prompt = `Generate ${this.getWordCount(difficulty)} words related to ${topic} for a word search game. The result should contain only the words, separated by commas.`;
      const response = await this.makeGrokRequest(prompt);
      return response.split(',').map(word => word.trim().toUpperCase());
    } catch (error) {
      console.error('Error generating words from Grok:', error);
      throw error;
    }
  }

  // Helper function to call the Grok API
  private async makeGrokRequest(prompt: string): Promise<string> {
    const response = await axios.post(
      this.apiUrl,
      {
        model: 'grok-2-1212',  // Replace this with the correct model
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return the response text from the LLM
    return response.data.choices[0].message.content;
  }

  // Determine the word count based on difficulty
  private getWordCount(difficulty: string): number {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 10;
      case 'medium': return 15;
      case 'hard': return 30;
      default: return 10;
    }
  }
}

export default GrokProvider;
