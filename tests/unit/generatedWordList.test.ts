import { generateWordList } from '../../src/generateWordList';

describe('generateWordList', () => {
  test('should return 10 words for easy difficulty', () => {
    const words = generateWordList('space', 'easy');
    expect(words).toHaveLength(10);
  });

  test('should return 15 words for medium difficulty', () => {
    const words = generateWordList('space', 'medium');
    expect(words).toHaveLength(15);
  });

  test('should return 30 words for hard difficulty', () => {
    const words = generateWordList('space', 'hard');
    expect(words).toHaveLength(30);
  });

  test('should return a default list of words if the topic is unknown', () => {
    const words = generateWordList('unknown_topic', 'easy');
    expect(words).toHaveLength(10); // Default behavior for unknown topics
  });

  test('should randomly shuffle the word list', () => {
    const firstCall = generateWordList('space', 'easy');
    const secondCall = generateWordList('space', 'easy');
    expect(firstCall).not.toEqual(secondCall); // Check that two calls return different orders
  });
});
