import { WordGenerationService } from './services/wordGenerationService';

/**
 * Dynamically generate a word list using the given LLM provider or the default.
 * @param topic - The topic to generate the word list around.
 * @param difficulty - The difficulty level ('easy', 'medium', 'hard').
 * @param llmProvider - (Optional) The LLM provider to use ('openai', 'grok').
 * @returns A list of words related to the given topic and difficulty.
 */
export async function generateWordList(topic: string, difficulty: string, llmProvider?: string): Promise<string[]> {
  const wordService = new WordGenerationService(llmProvider);

  // Validate difficulty or fall back to 'easy'
  const validDifficulties = ['easy', 'medium', 'hard'];
  if (!validDifficulties.includes(difficulty)) {
    difficulty = 'easy';
  }

  // Generate topic if none is provided
  if (!topic) {
    topic = await wordService.generateTopic();
  }

  // Generate words based on the topic and difficulty
  return await wordService.generateWords(topic, difficulty);
}
