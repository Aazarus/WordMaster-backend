export interface LLMProvider {
    generateTopic(): Promise<string>;
    generateWords(topic: string, difficulty: string): Promise<string[]>;
  }
  