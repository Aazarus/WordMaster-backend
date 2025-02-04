export function generateWordList(topic: string, difficulty: string): string[] {
  // Extended mock word sets for demonstration purposes
  const wordSets: Record<string, string[]> = {
    space: [
      'PLANET', 'ASTEROID', 'GALAXY', 'COMET', 'ROCKET', 'MOON', 'STAR', 'ORBIT', 'SPACESHIP', 'SATELLITE',
      'COSMOS', 'ASTRONAUT', 'METEOR', 'BLACKHOLE', 'SUPERNOVA', 'NEBULA', 'GRAVITY', 'QUASAR', 'TELESCOPE', 'UNIVERSE',
      'EXOPLANET', 'SOLAR', 'MARS', 'EARTH', 'JUPITER', 'VENUS', 'PLUTO', 'SATURN', 'URANUS', 'NEPTUNE'
    ],
    animals: [
      'LION', 'TIGER', 'ELEPHANT', 'MONKEY', 'ZEBRA', 'GIRAFFE', 'PENGUIN', 'CROCODILE', 'KANGAROO', 'GORILLA',
      'BEAR', 'FOX', 'WOLF', 'LEOPARD', 'PANDA', 'RHINOCEROS', 'HIPPOPOTAMUS', 'CHEETAH', 'WHALE', 'DOLPHIN',
      'SHARK', 'EAGLE', 'OWL', 'PARROT', 'FLAMINGO', 'PEACOCK', 'CATERPILLAR', 'BUTTERFLY', 'SPIDER', 'OCTOPUS'
    ],
    fruits: [
      'APPLE', 'BANANA', 'ORANGE', 'MANGO', 'GRAPE', 'PINEAPPLE', 'PEACH', 'CHERRY', 'STRAWBERRY', 'BLUEBERRY',
      'WATERMELON', 'PAPAYA', 'LEMON', 'LIME', 'KIWI', 'PLUM', 'PEAR', 'AVOCADO', 'FIG', 'COCONUT',
      'TOMATO', 'RASPBERRY', 'BLACKBERRY', 'GUAVA', 'POMEGRANATE', 'DRAGONFRUIT', 'LYCHEE', 'CRANBERRY', 'APRICOT', 'NECTARINE'
    ]
  };

  // Select the word list for the given topic, or use a default list if the topic is not found
  const selectedWords = wordSets[topic.toLowerCase()] || [
    'DEFAULT', 'WORDS', 'FOR', 'TOPICS', 'NOT', 'FOUND', 'EXAMPLE', 'FILLER', 'CONTENT', 'MISC'
  ];

  // Determine the number of words to return based on difficulty
  let numberOfWords;
  switch (difficulty.toLowerCase()) {
    case 'easy':
      numberOfWords = 10;
      break;
    case 'medium':
      numberOfWords = 15;
      break;
    case 'hard':
      numberOfWords = 30;
      break;
    default:
      numberOfWords = 10;  // Default to easy if difficulty is unknown
  }

  // Randomly shuffle the word list and return the desired number of words
  return shuffleArray(selectedWords).slice(0, numberOfWords);
}

// Helper function to shuffle an array
function shuffleArray(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5);
}
