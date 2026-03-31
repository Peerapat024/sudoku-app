export interface PuzzleData {
  id: string;
  theme: string;
  size: number;
  cells: [number, number, string, number | null][];
  clues: {
    across: { number: number, clue: string, row: number, col: number, answer: string }[];
    down: { number: number, clue: string, row: number, col: number, answer: string }[];
  }
}

export const PUZZLE_LIBRARY: PuzzleData[] = [
  {
    id: 'p1',
    theme: 'Animal Kingdom',
    size: 5,
    cells: [
      [0, 0, 'H', 1], [0, 1, 'O', null], [0, 2, 'R', null], [0, 3, 'S', null], [0, 4, 'E', null],
      [1, 0, 'A', 2], [1, 1, 'P', null], [1, 2, 'E', null],
      [2, 0, 'R', 5], [2, 1, 'A', null], [2, 2, 'T', null],
      [0, 0, 'H', 1], [1, 0, 'A', null], [2, 0, 'R', null], [3, 0, 'E', null],
      [0, 4, 'E', null], [1, 4, 'M', 4], [2, 4, 'U', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Majestic farm animal', row: 0, col: 0, answer: 'HORSE' },
        { number: 2, clue: 'Closest primate relative', row: 1, col: 0, answer: 'APE' },
        { number: 5, clue: 'Small rodent', row: 2, col: 0, answer: 'RAT' }
      ],
      down: [
        { number: 1, clue: 'Fast woodland hopper', row: 0, col: 0, answer: 'HARE' },
        { number: 4, clue: 'Large flightless bird', row: 0, col: 4, answer: 'EMU' }
      ]
    }
  },
  {
    id: 'p2',
    theme: 'Fruit Salad',
    size: 5,
    cells: [
      [0, 0, 'A', 1], [0, 1, 'P', null], [0, 2, 'P', null], [0, 3, 'L', null], [0, 4, 'E', null],
      [2, 0, 'O', 5], [2, 1, 'R', null], [2, 2, 'A', null], [2, 3, 'L', null],
      [4, 1, 'B', 6], [4, 2, 'E', null], [4, 3, 'R', null], [4, 4, 'R', null], [4, 5, 'Y', null],
      [0, 0, 'A', 1], [1, 0, 'L', null], [2, 0, 'O', null], [3, 0, 'E', null],
      [0, 2, 'P', null], [1, 2, 'L', 3], [2, 2, 'U', null], [3, 2, 'M', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Keeps the doctor away', row: 0, col: 0, answer: 'APPLE' },
        { number: 5, clue: 'Spoken, not written', row: 2, col: 0, answer: 'ORAL' },
        { number: 6, clue: 'Strawberry or Rasp—', row: 4, col: 1, answer: 'BERRY' }
      ],
      down: [
        { number: 1, clue: 'Succulent plant', row: 0, col: 0, answer: 'ALOE' },
        { number: 3, clue: 'Stone fruit', row: 0, col: 2, answer: 'PLUM' }
      ]
    }
  },
  {
    id: 'p3',
    theme: 'Colors',
    size: 5,
    cells: [
      [0, 0, 'B', 1], [0, 1, 'L', null], [0, 2, 'U', null], [0, 3, 'E', null],
      [1, 0, 'L', 2], [1, 1, 'I', null], [1, 2, 'M', null], [1, 3, 'E', null],
      [2, 0, 'A', 5], [2, 1, 'Q', null], [2, 2, 'U', null], [2, 3, 'A', null],
      [0, 0, 'B', 1], [1, 0, 'L', null], [2, 0, 'A', null], [3, 0, 'C', null], [4, 0, 'K', null],
      [0, 2, 'U', null], [1, 2, 'M', null], [2, 2, 'B', 4], [3, 2, 'E', null], [4, 2, 'R', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Sky shade', row: 0, col: 0, answer: 'BLUE' },
        { number: 2, clue: 'Tart citrus', row: 1, col: 0, answer: 'LIME' },
        { number: 5, clue: 'Water-themed prefix', row: 2, col: 0, answer: 'AQUA' }
      ],
      down: [
        { number: 1, clue: 'Darkest shade', row: 0, col: 0, answer: 'BLACK' },
        { number: 4, clue: 'Earth pigment', row: 0, col: 2, answer: 'UMBER' }
      ]
    }
  },
  {
    id: 'p4',
    theme: 'Space',
    size: 5,
    cells: [
      [0, 0, 'M', 1], [0, 1, 'A', null], [0, 2, 'R', null], [0, 3, 'S', null],
      [1, 0, 'O', 2], [1, 1, 'R', null], [1, 2, 'B', null], [1, 3, 'I', null], [1, 4, 'T', null],
      [0, 0, 'M', 1], [1, 0, 'O', null], [2, 0, 'O', null], [3, 0, 'N', null],
      [0, 2, 'R', null], [1, 2, 'B', null], [2, 2, 'O', 4], [3, 2, 'C', null], [4, 2, 'K', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Red planet', row: 0, col: 0, answer: 'MARS' },
        { number: 2, clue: 'Orbital path', row: 1, col: 0, answer: 'ORBIT' }
      ],
      down: [
        { number: 1, clue: 'Earth satellite', row: 0, col: 0, answer: 'MOON' },
        { number: 4, clue: 'Solid stone', row: 0, col: 2, answer: 'ROCK' }
      ]
    }
  },
  {
    id: 'p5',
    theme: 'Geography',
    size: 5,
    cells: [
      [0, 0, 'P', 1], [0, 1, 'A', null], [0, 2, 'R', null], [0, 3, 'I', null], [0, 4, 'S', null],
      [2, 0, 'R', 5], [2, 1, 'O', null], [2, 2, 'A', null], [2, 3, 'D', null],
      [4, 0, 'A', 6], [4, 1, 'S', null], [4, 2, 'I', null], [4, 3, 'A', null],
      [0, 0, 'P', 1], [1, 0, 'E', null], [2, 0, 'R', null], [3, 0, 'U', null],
      [0, 4, 'S', null], [1, 4, 'E', 4], [2, 4, 'A', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'City of light', row: 0, col: 0, answer: 'PARIS' },
        { number: 5, clue: 'Paved way', row: 2, col: 0, answer: 'ROAD' },
        { number: 6, clue: 'Largest continent', row: 4, col: 0, answer: 'ASIA' }
      ],
      down: [
        { number: 1, clue: 'Lima country', row: 0, col: 0, answer: 'PERU' },
        { number: 4, clue: 'Great body of water', row: 0, col: 4, answer: 'SEA' }
      ]
    }
  },
  {
    id: 'p6',
    theme: 'Music',
    size: 5,
    cells: [
      [0, 0, 'P', 1], [0, 1, 'I', null], [0, 2, 'A', null], [0, 3, 'N', null], [0, 4, 'O', null],
      [2, 0, 'C', 3], [2, 1, 'H', null], [2, 2, 'O', null], [2, 3, 'R', null], [2, 4, 'D', null],
      [4, 1, 'B', 5], [4, 2, 'E', null], [4, 3, 'A', null], [4, 4, 'T', null],
      [0, 0, 'P', 1], [1, 0, 'I', null], [2, 0, 'C', null], [3, 0, 'K', null],
      [0, 2, 'A', null], [1, 2, 'L', 4], [2, 2, 'O', null], [3, 2, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Keys instrument', row: 0, col: 0, answer: 'PIANO' },
        { number: 3, clue: 'Group of notes', row: 2, col: 0, answer: 'CHORD' },
        { number: 5, clue: 'Musical pulse', row: 4, col: 1, answer: 'BEAT' }
      ],
      down: [
        { number: 1, clue: 'Guitar tool', row: 0, col: 0, answer: 'PICK' },
        { number: 4, clue: 'Soothing plant', row: 0, col: 2, answer: 'ALOE' }
      ]
    }
  },
  {
    id: 'p7',
    theme: 'Food',
    size: 5,
    cells: [
      [0, 0, 'B', 1], [0, 1, 'A', null], [0, 2, 'K', null], [0, 3, 'E', null],
      [1, 0, 'E', 2], [1, 1, 'M', null], [1, 2, 'U', null],
      [3, 1, 'F', 6], [3, 2, 'I', null], [3, 3, 'S', null], [3, 4, 'H', null],
      [0, 0, 'B', 1], [1, 0, 'E', null], [2, 0, 'E', null], [3, 0, 'F', null],
      [0, 2, 'K', null], [1, 2, 'U', null], [2, 2, 'L', 4], [3, 2, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Oven cook', row: 0, col: 0, answer: 'BAKE' },
        { number: 2, clue: 'Ozzy bird', row: 1, col: 0, answer: 'EMU' },
        { number: 6, clue: 'Swimmer on a plate', row: 3, col: 1, answer: 'FISH' }
      ],
      down: [
        { number: 1, clue: 'Cow meat', row: 0, col: 0, answer: 'BEEF' },
        { number: 4, clue: 'French school (homophone)', row: 0, col: 2, answer: 'KULE' }
      ]
    }
  },
  {
    id: 'p8',
    theme: 'Sports',
    size: 5,
    cells: [
      [0, 0, 'G', 1], [0, 1, 'O', null], [0, 2, 'A', null], [0, 3, 'L', null],
      [2, 0, 'L', 3], [2, 1, 'A', null], [2, 2, 'P', null],
      [3, 1, 'F', 5], [3, 2, 'A', null], [3, 3, 'S', null], [3, 4, 'T', null],
      [0, 0, 'G', 1], [1, 0, 'O', null], [2, 0, 'L', null], [3, 0, 'F', null],
      [0, 3, 'L', null], [1, 3, 'I', 4], [2, 3, 'N', null], [3, 3, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Soccer score', row: 0, col: 0, answer: 'GOAL' },
        { number: 3, clue: 'Track circuit', row: 2, col: 0, answer: 'LAP' },
        { number: 5, clue: 'Quick moving', row: 3, col: 1, answer: 'FAST' }
      ],
      down: [
        { number: 1, clue: 'Club sport', row: 0, col: 0, answer: 'GOLF' },
        { number: 4, clue: 'Straight boundary', row: 0, col: 3, answer: 'LINE' }
      ]
    }
  },
  {
    id: 'p9',
    theme: 'Time',
    size: 5,
    cells: [
      [0, 0, 'H', 1], [0, 1, 'O', null], [0, 2, 'U', null], [0, 3, 'R', null],
      [1, 0, 'A', 2], [1, 1, 'G', null], [1, 2, 'O', null],
      [3, 1, 'F', 5], [3, 2, 'A', null], [3, 3, 'S', null], [3, 4, 'T', null],
      [0, 0, 'H', 1], [1, 0, 'A', null], [2, 0, 'L', null], [3, 0, 'F', null],
      [0, 2, 'U', null], [1, 2, 'O', null], [2, 2, 'R', 4], [3, 2, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Sixty mins', row: 0, col: 0, answer: 'HOUR' },
        { number: 2, clue: 'In the past', row: 1, col: 0, answer: 'AGO' },
        { number: 5, clue: 'Opposite of slow', row: 3, col: 1, answer: 'FAST' }
      ],
      down: [
        { number: 1, clue: 'Divided by two', row: 0, col: 0, answer: 'HALF' },
        { number: 4, clue: 'Stone found in core', row: 0, col: 2, answer: 'UORE' }
      ]
    }
  },
  {
    id: 'p10',
    theme: 'Weather',
    size: 5,
    cells: [
      [0, 0, 'R', 1], [0, 1, 'A', null], [0, 2, 'I', null], [0, 3, 'N', null], [0, 4, 'Y', null],
      [1, 0, 'A', 2], [1, 1, 'V', null], [1, 2, 'I', null], [1, 3, 'D', null],
      [4, 1, 'S', 6], [4, 2, 'N', null], [4, 3, 'O', null], [4, 4, 'W', null],
      [0, 0, 'R', 1], [1, 0, 'A', null], [2, 0, 'R', null], [3, 0, 'E', null],
      [0, 4, 'Y', null], [1, 4, 'E', 4], [2, 4, 'T', null], [3, 4, 'I', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Wet day desc', row: 0, col: 0, answer: 'RAINY' },
        { number: 2, clue: 'Intense interest', row: 1, col: 0, answer: 'AVID' },
        { number: 6, clue: 'White fall', row: 4, col: 1, answer: 'SNOW' }
      ],
      down: [
        { number: 1, clue: 'Steak choice', row: 0, col: 0, answer: 'RARE' },
        { number: 4, clue: 'Snow monster', row: 0, col: 4, answer: 'YETI' }
      ]
    }
  },
  {
    id: 'p11',
    theme: 'Ocean',
    size: 5,
    cells: [
      [0, 0, 'S', 1], [0, 1, 'H', null], [0, 2, 'A', null], [0, 3, 'R', null], [0, 4, 'K', null],
      [2, 0, 'S', 3], [2, 1, 'E', null], [2, 2, 'A', null], [2, 3, 'L', null],
      [4, 1, 'F', 5], [4, 2, 'I', null], [4, 3, 'S', null], [4, 4, 'H', null],
      [0, 0, 'S', 1], [1, 0, 'T', null], [2, 0, 'S', null], [3, 0, 'U', null],
      [0, 2, 'A', null], [1, 2, 'B', 4], [2, 2, 'A', null], [3, 2, 'S', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Deep sea predator', row: 0, col: 0, answer: 'SHARK' },
        { number: 3, clue: 'Barking mammal', row: 2, col: 0, answer: 'SEAL' },
        { number: 5, clue: 'Gill breather', row: 4, col: 1, answer: 'FISH' }
      ],
      down: [
        { number: 1, clue: 'Medical knife', row: 0, col: 0, answer: 'STSU' },
        { number: 4, clue: 'Deep voice singer', row: 0, col: 2, answer: 'ABAS' }
      ]
    }
  },
  {
    id: 'p12',
    theme: 'Literature',
    size: 5,
    cells: [
      [0, 0, 'B', 1], [0, 1, 'O', null], [0, 2, 'O', null], [0, 3, 'K', null],
      [1, 0, 'P', 2], [1, 1, 'A', null], [1, 2, 'G', null], [1, 3, 'E', null],
      [3, 0, 'R', 5], [3, 1, 'E', null], [3, 2, 'A', null], [3, 3, 'D', null],
      [0, 0, 'B', 1], [1, 0, 'P', null], [2, 0, 'I', null], [3, 0, 'R', null], [4, 0, 'S', null],
      [0, 3, 'K', null], [1, 3, 'E', null], [2, 3, 'L', 4], [3, 3, 'D', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Cover to cover', row: 0, col: 0, answer: 'BOOK' },
        { number: 2, clue: 'One sheet', row: 1, col: 0, answer: 'PAGE' },
        { number: 5, clue: 'Scan text', row: 3, col: 0, answer: 'READ' }
      ],
      down: [
        { number: 1, clue: 'Spin-off (abbr)', row: 0, col: 0, answer: 'BPIRS' },
        { number: 4, clue: 'Small measure', row: 2, col: 3, answer: 'LD' }
      ]
    }
  },
  {
    id: 'p13',
    theme: 'Art',
    size: 5,
    cells: [
      [0, 0, 'P', 1], [0, 1, 'A', null], [0, 2, 'I', null], [0, 3, 'N', null], [0, 4, 'T', null],
      [2, 0, 'E', 3], [2, 1, 'A', null], [2, 2, 'S', null], [2, 3, 'E', null], [2, 4, 'L', null],
      [4, 0, 'L', 5], [4, 1, 'I', null], [4, 2, 'N', null], [4, 3, 'E', null],
      [0, 0, 'P', 1], [1, 0, 'E', null], [2, 0, 'E', null], [3, 0, 'L', null],
      [0, 4, 'T', null], [1, 4, 'O', 2], [2, 4, 'L', null], [3, 4, 'D', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Color tool', row: 0, col: 0, answer: 'PAINT' },
        { number: 3, clue: 'Canvas stand', row: 2, col: 0, answer: 'EASEL' },
        { number: 5, clue: 'Long mark', row: 4, col: 0, answer: 'LINE' }
      ],
      down: [
        { number: 1, clue: 'Skin layer', row: 0, col: 0, answer: 'PEEL' },
        { number: 2, clue: 'Past tense of tell', row: 1, col: 4, answer: 'TOLD' }
      ]
    }
  },
  {
    id: 'p14',
    theme: 'Cinema',
    size: 5,
    cells: [
      [0, 0, 'F', 1], [0, 1, 'I', null], [0, 2, 'L', null], [0, 3, 'M', null],
      [1, 0, 'A', 2], [1, 1, 'C', null], [1, 2, 'T', null], [1, 3, 'O', null], [1, 4, 'R', null],
      [3, 0, 'S', 5], [3, 1, 'T', null], [3, 2, 'A', null], [3, 3, 'R', null],
      [0, 0, 'F', 1], [1, 0, 'A', null], [2, 0, 'S', null], [3, 0, 'S', null],
      [0, 3, 'M', null], [1, 3, 'O', null], [2, 3, 'V', 4], [3, 3, 'R', null], [4, 3, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Roll of pictures', row: 0, col: 0, answer: 'FILM' },
        { number: 2, clue: 'Movie player', row: 1, col: 0, answer: 'ACTOR' },
        { number: 5, clue: 'Main lead', row: 3, col: 0, answer: 'STAR' }
      ],
      down: [
        { number: 1, clue: 'Quick (abbr)', row: 0, col: 0, answer: 'FASS' },
        { number: 4, clue: 'More active', row: 2, col: 3, answer: 'MVRE' }
      ]
    }
  },
  {
    id: 'p15',
    theme: 'History',
    size: 5,
    cells: [
      [0, 0, 'K', 1], [0, 1, 'I', null], [0, 2, 'N', null], [0, 3, 'G', null],
      [2, 0, 'E', 3], [2, 1, 'M', null], [2, 2, 'P', null], [2, 3, 'I', null], [2, 4, 'R', null],
      [4, 0, 'W', 5], [4, 1, 'A', null], [4, 2, 'R', null], [4, 3, 'S', null],
      [0, 0, 'K', 1], [1, 0, 'H', 2], [2, 0, 'E', null], [3, 0, 'R', null],
      [0, 3, 'G', null], [1, 3, 'O', null], [2, 3, 'I', null], [3, 3, 'N', null], [4, 3, 'S', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Monarch', row: 0, col: 0, answer: 'KING' },
        { number: 3, clue: 'Large territory', row: 2, col: 0, answer: 'EMPIR' },
        { number: 5, clue: 'Struggles', row: 4, col: 0, answer: 'WARS' }
      ],
      down: [
        { number: 1, clue: 'Ancient name', row: 0, col: 0, answer: 'KHER' },
        { number: 3, clue: 'Goes in', row: 0, col: 3, answer: 'GOINS' }
      ]
    }
  },
  {
    id: 'p16',
    theme: 'Mythology',
    size: 5,
    cells: [
      [0, 0, 'Z', 1], [0, 1, 'E', null], [0, 2, 'U', null], [0, 3, 'S', null],
      [1, 0, 'O', 2], [1, 1, 'D', null], [1, 2, 'I', null], [1, 3, 'N', null],
      [3, 0, 'T', 5], [3, 1, 'H', null], [3, 2, 'O', null], [3, 3, 'R', null],
      [0, 0, 'Z', 1], [1, 0, 'O', null], [2, 0, 'M', null], [3, 0, 'T', null],
      [0, 3, 'S', null], [1, 3, 'N', null], [2, 3, 'A', 4], [3, 3, 'R', null], [4, 3, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Thunder god (Greek)', row: 0, col: 0, answer: 'ZEUS' },
        { number: 2, clue: 'Father god (Norse)', row: 1, col: 0, answer: 'ODIN' },
        { number: 5, clue: 'Hammer god (Norse)', row: 3, col: 0, answer: 'THOR' }
      ],
      down: [
        { number: 1, clue: 'Go fast', row: 0, col: 0, answer: 'ZOMT' },
        { number: 4, clue: 'Lesser bird', row: 2, col: 3, answer: 'ARE' }
      ]
    }
  },
  {
    id: 'p17',
    theme: 'Birds',
    size: 5,
    cells: [
      [0, 0, 'E', 1], [0, 1, 'A', null], [0, 2, 'G', null], [0, 3, 'L', null], [0, 4, 'E', null],
      [2, 0, 'S', 3], [2, 1, 'W', null], [2, 2, 'A', null], [2, 3, 'N', null],
      [4, 1, 'O', 5], [4, 2, 'W', null], [4, 3, 'L', null],
      [0, 0, 'E', 1], [1, 0, 'G', null], [2, 0, 'S', null], [3, 0, 'K', null],
      [0, 4, 'E', null], [1, 4, 'M', 2], [2, 4, 'U', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Bird of prey', row: 0, col: 0, answer: 'EAGLE' },
        { number: 3, clue: 'Graceful water bird', row: 2, col: 0, answer: 'SWAN' },
        { number: 5, clue: 'Wise night bird', row: 4, col: 1, answer: 'OWL' }
      ],
      down: [
        { number: 1, clue: 'Ancient bird (abbr)', row: 0, col: 0, answer: 'EGSK' },
        { number: 2, clue: 'Aussie bird', row: 1, col: 4, answer: 'EMU' }
      ]
    }
  },
  {
    id: 'p18',
    theme: 'Insects',
    size: 5,
    cells: [
      [0, 1, 'B', 1], [0, 2, 'E', null], [0, 3, 'E', null],
      [2, 0, 'W', 3], [2, 1, 'A', null], [2, 2, 'S', null], [2, 3, 'P', null],
      [4, 0, 'A', 5], [4, 1, 'N', null], [4, 2, 'T', null],
      [1, 1, 'A', null], [2, 1, 'A', null], [3, 1, 'R', 4], [4, 1, 'N', null],
      [0, 3, 'E', null], [1, 3, 'L', 2], [2, 3, 'P', null], [3, 3, 'Y', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Honey maker', row: 0, col: 1, answer: 'BEE' },
        { number: 3, clue: 'Stinging yellow insect', row: 2, col: 0, answer: 'WASP' },
        { number: 5, clue: 'Colony builder', row: 4, col: 0, answer: 'ANT' }
      ],
      down: [
        { number: 4, clue: 'Prefix for nose', row: 3, col: 1, answer: 'RN' },
        { number: 2, clue: 'To grow up', row: 1, col: 3, answer: 'LPY' }
      ]
    }
  },
  {
    id: 'p19',
    theme: 'Metals',
    size: 5,
    cells: [
      [0, 0, 'G', 1], [0, 1, 'O', null], [0, 2, 'L', null], [0, 3, 'D', null],
      [2, 0, 'I', 3], [2, 1, 'R', null], [2, 2, 'O', null], [2, 3, 'N', null],
      [4, 1, 'L', 5], [4, 2, 'E', null], [4, 3, 'A', null], [4, 4, 'D', null],
      [0, 0, 'G', 1], [1, 0, 'E', null], [2, 0, 'I', null], [3, 0, 'N', null],
      [0, 3, 'D', null], [1, 3, 'U', 2], [2, 3, 'N', null], [3, 3, 'E', null], [4, 3, 'D', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Yellow metal', row: 0, col: 0, answer: 'GOLD' },
        { number: 3, clue: 'Strong metal', row: 2, col: 0, answer: 'IRON' },
        { number: 5, clue: 'Heavy metal', row: 4, col: 1, answer: 'LEAD' }
      ],
      down: [
        { number: 1, clue: 'Gene (abbr)', row: 0, col: 0, answer: 'GEIN' },
        { number: 2, clue: 'Sand hill', row: 1, col: 3, answer: 'DUNED' }
      ]
    }
  },
  {
    id: 'p20',
    theme: 'Clothing',
    size: 5,
    cells: [
      [0, 0, 'S', 1], [0, 1, 'H', null], [0, 2, 'I', null], [0, 3, 'R', null], [0, 4, 'T', null],
      [2, 0, 'S', 3], [2, 1, 'H', null], [2, 2, 'O', null], [2, 3, 'E', null],
      [4, 1, 'P', 5], [4, 2, 'A', null], [4, 3, 'N', null], [4, 4, 'T', null],
      [0, 0, 'S', 1], [1, 0, 'O', null], [2, 0, 'S', null], [3, 0, 'O', null],
      [0, 4, 'T', null], [1, 4, 'O', 2], [2, 4, 'P', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Torso wear', row: 0, col: 0, answer: 'SHIRT' },
        { number: 3, clue: 'Footwear (one)', row: 2, col: 0, answer: 'SHOE' },
        { number: 5, clue: 'Trousers part', row: 4, col: 1, answer: 'PANT' }
      ],
      down: [
        { number: 1, clue: 'SOS (misspelled)', row: 0, col: 0, answer: 'SOSO' },
        { number: 2, clue: 'Maximum head (abbr)', row: 1, col: 4, answer: 'TOP' }
      ]
    }
  },
  {
    id: 'p21',
    theme: 'Emotions',
    size: 5,
    cells: [
      [0, 0, 'H', 1], [0, 1, 'A', null], [0, 2, 'P', null], [0, 3, 'P', null], [0, 4, 'Y', null],
      [2, 1, 'A', 3], [2, 2, 'N', null], [2, 3, 'G', null], [2, 4, 'R', null], [2, 5, 'Y', null],
      [4, 0, 'C', 5], [4, 1, 'A', null], [4, 2, 'L', null], [4, 3, 'M', null],
      [0, 0, 'H', 1], [1, 0, 'O', null], [2, 0, 'T', null], [3, 0, 'E', null],
      [0, 4, 'Y', null], [1, 4, 'E', 2], [2, 4, 'R', null], [3, 4, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Joyful', row: 0, col: 0, answer: 'HAPPY' },
        { number: 3, clue: 'Irate', row: 2, col: 1, answer: 'ANGRY' },
        { number: 5, clue: 'Peaceful', row: 4, col: 0, answer: 'CALM' }
      ],
      down: [
        { number: 1, clue: 'Home (archaic)', row: 0, col: 0, answer: 'HOTE' },
        { number: 2, clue: 'Always (abbr)', row: 1, col: 4, answer: 'YERE' }
      ]
    }
  },
  {
    id: 'p22',
    theme: 'Mathematics',
    size: 5,
    cells: [
      [0, 0, 'P', 1], [0, 1, 'L', null], [0, 2, 'U', null], [0, 3, 'S', null],
      [1, 0, 'M', 2], [1, 1, 'A', null], [1, 2, 'T', null], [1, 3, 'H', null],
      [3, 0, 'Z', 5], [3, 1, 'E', null], [3, 2, 'R', null], [3, 3, 'O', null],
      [0, 0, 'P', 1], [1, 0, 'M', null], [2, 0, 'E', null], [3, 0, 'Z', null],
      [0, 3, 'S', null], [1, 3, 'H', null], [2, 3, 'A', 4], [3, 3, 'O', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Addition sign', row: 0, col: 0, answer: 'PLUS' },
        { number: 2, clue: 'Subject of numbers', row: 1, col: 0, answer: 'MATH' },
        { number: 5, clue: 'Nil', row: 3, col: 0, answer: 'ZERO' }
      ],
      down: [
        { number: 1, clue: 'Point (abbr)', row: 0, col: 0, answer: 'PMEZ' },
        { number: 4, clue: 'He (obj case, abbr)', row: 2, col: 3, answer: 'AO' }
      ]
    }
  },
  {
    id: 'p23',
    theme: 'Body Parts',
    size: 5,
    cells: [
      [0, 0, 'H', 1], [0, 1, 'E', null], [0, 2, 'A', null], [0, 3, 'D', null],
      [1, 0, 'H', 2], [1, 1, 'A', null], [1, 2, 'N', null], [1, 3, 'D', null],
      [3, 1, 'F', 5], [3, 2, 'O', null], [3, 3, 'O', null], [3, 4, 'T', null],
      [0, 0, 'H', 1], [1, 0, 'H', null], [2, 0, 'A', null], [3, 0, 'B', null],
      [0, 3, 'D', null], [1, 3, 'D', null], [2, 3, 'S', 4], [3, 3, 'O', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Top of the body', row: 0, col: 0, answer: 'HEAD' },
        { number: 2, clue: 'End of arm', row: 1, col: 0, answer: 'HAND' },
        { number: 5, clue: 'Walking base', row: 3, col: 1, answer: 'FOOT' }
      ],
      down: [
        { number: 1, clue: 'Body (archaic)', row: 0, col: 0, answer: 'HHAB' },
        { number: 4, clue: 'Double (abbr)', row: 2, col: 3, answer: 'SO' }
      ]
    }
  },
  {
    id: 'p24',
    theme: 'Computing',
    size: 5,
    cells: [
      [0, 0, 'D', 1], [0, 1, 'I', null], [0, 2, 'S', null], [0, 3, 'K', null],
      [1, 0, 'C', 2], [1, 1, 'H', null], [1, 2, 'I', null], [1, 3, 'P', null],
      [3, 0, 'B', 5], [3, 1, 'Y', null], [3, 2, 'T', null], [3, 3, 'E', null],
      [0, 0, 'D', 1], [1, 0, 'C', null], [2, 0, 'O', null], [3, 0, 'B', null],
      [0, 3, 'K', null], [1, 3, 'P', null], [2, 3, 'U', 4], [3, 3, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Storage drive', row: 0, col: 0, answer: 'DISK' },
        { number: 2, clue: 'Small processor', row: 1, col: 0, answer: 'CHIP' },
        { number: 5, clue: '8 bits', row: 3, col: 0, answer: 'BYTE' }
      ],
      down: [
        { number: 1, clue: 'Code (abbr)', row: 0, col: 0, answer: 'DCOB' },
        { number: 4, clue: 'Up (abbr)', row: 2, col: 3, answer: 'UE' }
      ]
    }
  },
  {
    id: 'p25',
    theme: 'Seasons',
    size: 5,
    cells: [
      [0, 0, 'S', 1], [0, 1, 'N', null], [0, 2, 'O', null], [0, 3, 'W', null],
      [1, 1, 'R', 2], [1, 2, 'A', null], [1, 3, 'I', null], [1, 4, 'N', null],
      [3, 0, 'F', 5], [3, 1, 'A', null], [3, 2, 'L', null], [3, 3, 'L', null],
      [0, 0, 'S', 1], [1, 0, 'E', null], [2, 0, 'R', null], [3, 0, 'F', null],
      [0, 3, 'W', null], [1, 3, 'I', null], [2, 3, 'N', 4], [3, 3, 'L', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Winter fall', row: 0, col: 0, answer: 'SNOW' },
        { number: 2, clue: 'April showers', row: 1, col: 1, answer: 'RAIN' },
        { number: 5, clue: 'Autumn season', row: 3, col: 0, answer: 'FALL' }
      ],
      down: [
        { number: 1, clue: 'Surf (mistype)', row: 0, col: 0, answer: 'SERF' },
        { number: 4, clue: 'Winning (abbr)', row: 2, col: 3, answer: 'NL' }
      ]
    }
  },
  {
    id: 'p26',
    theme: 'Kitchen',
    size: 5,
    cells: [
      [0, 0, 'F', 1], [0, 1, 'O', null], [0, 2, 'R', null], [0, 3, 'K', null],
      [1, 1, 'D', 2], [1, 2, 'I', null], [1, 3, 'S', null], [1, 4, 'H', null],
      [3, 0, 'C', 5], [3, 1, 'O', null], [3, 2, 'O', null], [3, 3, 'K', null],
      [0, 0, 'F', 1], [1, 0, 'A', null], [2, 0, 'I', null], [3, 0, 'C', null],
      [0, 3, 'K', null], [1, 3, 'S', null], [2, 3, 'E', 4], [3, 3, 'K', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Eating utensil', row: 0, col: 0, answer: 'FORK' },
        { number: 2, clue: 'Plate or bowl', row: 1, col: 1, answer: 'DISH' },
        { number: 5, clue: 'Prepare food', row: 3, col: 0, answer: 'COOK' }
      ],
      down: [
        { number: 1, clue: 'Face (archaic)', row: 0, col: 0, answer: 'FAIC' },
        { number: 4, clue: 'Large container', row: 2, col: 3, answer: 'EK' }
      ]
    }
  },
  {
    id: 'p27',
    theme: 'Furniture',
    size: 5,
    cells: [
      [0, 0, 'D', 1], [0, 1, 'E', null], [0, 2, 'S', null], [0, 3, 'K', null],
      [1, 0, 'S', 2], [1, 1, 'O', null], [1, 2, 'F', null], [1, 3, 'A', null],
      [3, 0, 'B', 5], [3, 1, 'E', null], [3, 2, 'D', null],
      [0, 0, 'D', 1], [1, 0, 'S', null], [2, 0, 'A', null], [3, 0, 'B', null],
      [0, 3, 'K', null], [1, 3, 'A', null], [2, 3, 'P', 4], [3, 3, 'I', null], [4, 3, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Office table', row: 0, col: 0, answer: 'DESK' },
        { number: 2, clue: 'Couch', row: 1, col: 0, answer: 'SOFA' },
        { number: 5, clue: 'Sleeping spot', row: 3, col: 0, answer: 'BED' }
      ],
      down: [
        { number: 1, clue: 'Ancient road (abbr)', row: 0, col: 0, answer: 'DSAB' },
        { number: 4, clue: 'Pointed end', row: 2, col: 3, answer: 'PIE' }
      ]
    }
  },
  {
    id: 'p28',
    theme: 'Vehicles',
    size: 5,
    cells: [
      [0, 0, 'B', 1], [0, 1, 'I', null], [0, 2, 'K', null], [0, 3, 'E', null],
      [1, 1, 'B', 2], [1, 2, 'O', null], [1, 3, 'A', null], [1, 4, 'T', null],
      [3, 0, 'J', 5], [3, 1, 'E', null], [3, 2, 'E', null], [3, 3, 'P', null],
      [0, 0, 'B', 1], [1, 0, 'O', null], [2, 0, 'A', null], [3, 0, 'J', null],
      [0, 3, 'E', null], [1, 3, 'A', null], [2, 3, 'R', 4], [3, 3, 'P', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Two-wheeler', row: 0, col: 0, answer: 'BIKE' },
        { number: 2, clue: 'Water craft', row: 1, col: 1, answer: 'BOAT' },
        { number: 5, clue: 'Rugged car', row: 3, col: 0, answer: 'JEEP' }
      ],
      down: [
        { number: 1, clue: 'Boat (misspelled)', row: 0, col: 0, answer: 'BOAJ' },
        { number: 4, clue: 'Specialized (abbr)', row: 2, col: 3, answer: 'RP' }
      ]
    }
  },
  {
    id: 'p29',
    theme: 'Flowers',
    size: 5,
    cells: [
      [0, 0, 'R', 1], [0, 1, 'O', null], [0, 2, 'S', null], [0, 3, 'E', null],
      [1, 0, 'I', 2], [1, 1, 'R', null], [1, 2, 'I', null], [1, 3, 'S', null],
      [3, 0, 'L', 5], [3, 1, 'I', null], [3, 2, 'L', null], [3, 3, 'Y', null],
      [0, 0, 'R', 1], [1, 0, 'I', null], [2, 0, 'M', null], [3, 0, 'L', null],
      [0, 3, 'E', null], [1, 3, 'S', null], [2, 3, 'A', 4], [3, 3, 'Y', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Thorny red flower', row: 0, col: 0, answer: 'ROSE' },
        { number: 2, clue: 'Colorful eye part (name)', row: 1, col: 0, answer: 'IRIS' },
        { number: 5, clue: 'White funnel flower', row: 3, col: 0, answer: 'LILY' }
      ],
      down: [
        { number: 1, clue: 'Rim (archaic)', row: 0, col: 0, answer: 'RIML' },
        { number: 4, clue: 'Confirmed (abbr)', row: 2, col: 3, answer: 'AY' }
      ]
    }
  },
  {
    id: 'p30',
    theme: 'Trees',
    size: 5,
    cells: [
      [0, 0, 'P', 1], [0, 1, 'I', null], [0, 2, 'N', null], [0, 3, 'E', null],
      [2, 0, 'O', 3], [2, 1, 'A', null], [2, 2, 'K', null],
      [4, 0, 'B', 5], [4, 1, 'A', null], [4, 2, 'R', null], [4, 3, 'K', null],
      [0, 0, 'P', 1], [1, 0, 'O', null], [2, 0, 'O', null], [3, 0, 'T', null],
      [0, 3, 'E', null], [1, 3, 'L', 2], [2, 3, 'M', null], [3, 3, 'I', null], [4, 3, 'K', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Conifer tree', row: 0, col: 0, answer: 'PINE' },
        { number: 3, clue: 'Strong wood tree', row: 2, col: 0, answer: 'OAK' },
        { number: 5, clue: 'Outer tree layer', row: 4, col: 0, answer: 'BARK' }
      ],
      down: [
        { number: 1, clue: 'Port (archaic)', row: 0, col: 0, answer: 'POOT' },
        { number: 2, clue: 'Small measure', row: 1, col: 3, answer: 'LMIK' }
      ]
    }
  },
  {
    id: 'p31',
    theme: 'Weather 2',
    size: 5,
    cells: [
      [0, 0, 'W', 1], [0, 1, 'I', null], [0, 2, 'N', null], [0, 3, 'D', null],
      [1, 1, 'M', 2], [1, 2, 'I', null], [1, 3, 'S', null], [1, 4, 'T', null],
      [3, 0, 'H', 5], [3, 1, 'A', null], [3, 2, 'I', null], [3, 3, 'L', null],
      [0, 0, 'W', 1], [1, 0, 'A', null], [2, 0, 'R', null], [3, 0, 'H', null],
      [0, 3, 'D', null], [1, 3, 'S', null], [2, 3, 'N', 4], [3, 3, 'L', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Blowing air', row: 0, col: 0, answer: 'WIND' },
        { number: 2, clue: 'Light fog', row: 1, col: 1, answer: 'MIST' },
        { number: 5, clue: 'Frozen rain', row: 3, col: 0, answer: 'HAIL' }
      ],
      down: [
        { number: 1, clue: 'War (archaic)', row: 0, col: 0, answer: 'WARH' },
        { number: 4, clue: 'No (abbr)', row: 2, col: 3, answer: 'NL' }
      ]
    }
  },
  {
    id: 'p32',
    theme: 'Deep Space',
    size: 5,
    cells: [
      [0, 0, 'C', 1], [0, 1, 'O', null], [0, 2, 'M', null], [0, 3, 'E', null], [0, 4, 'T', null],
      [2, 0, 'N', 3], [2, 1, 'O', null], [2, 2, 'V', null], [2, 3, 'A', null],
      [4, 1, 'D', 5], [4, 2, 'A', null], [4, 3, 'T', null], [4, 4, 'A', null],
      [0, 0, 'C', 1], [1, 0, 'O', null], [2, 0, 'N', null], [3, 0, 'I', null],
      [0, 4, 'T', null], [1, 4, 'O', 2], [2, 4, 'X', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Icy space traveler', row: 0, col: 0, answer: 'COMET' },
        { number: 3, clue: 'Star explosion', row: 2, col: 0, answer: 'NOVA' },
        { number: 5, clue: 'System info', row: 4, col: 1, answer: 'DATA' }
      ],
      down: [
        { number: 1, clue: 'Cone (misspelled)', row: 0, col: 0, answer: 'CONI' },
        { number: 2, clue: 'Toxic gas (abbr)', row: 1, col: 4, answer: 'TOX' }
      ]
    }
  },
  {
    id: 'p33',
    theme: 'Music 2',
    size: 5,
    cells: [
      [0, 0, 'D', 1], [0, 1, 'R', null], [0, 2, 'U', null], [0, 3, 'M', null],
      [1, 1, 'H', 2], [1, 2, 'A', null], [1, 3, 'R', null], [1, 4, 'P', null],
      [3, 0, 'S', 5], [3, 1, 'O', null], [3, 2, 'N', null], [3, 3, 'G', null],
      [0, 0, 'D', 1], [1, 0, 'O', null], [2, 0, 'R', null], [3, 0, 'S', null],
      [0, 3, 'M', null], [1, 3, 'R', null], [2, 3, 'E', 4], [3, 3, 'G', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Beat instrument', row: 0, col: 0, answer: 'DRUM' },
        { number: 2, clue: 'Angel instrument', row: 1, col: 1, answer: 'HARP' },
        { number: 5, clue: 'Vocal music', row: 3, col: 0, answer: 'SONG' }
      ],
      down: [
        { number: 1, clue: 'Door (archaic)', row: 0, col: 0, answer: 'DORS' },
        { number: 4, clue: 'Egg (Latin abbr)', row: 2, col: 3, answer: 'EG' }
      ]
    }
  },
  {
    id: 'p34',
    theme: 'Art Techniques',
    size: 5,
    cells: [
      [0, 0, 'S', 1], [0, 1, 'K', null], [0, 2, 'E', null], [0, 3, 'T', null], [0, 4, 'C', null],
      [2, 0, 'D', 3], [2, 1, 'R', null], [2, 2, 'A', null], [2, 3, 'W', null],
      [4, 1, 'C', 5], [4, 2, 'L', null], [4, 3, 'A', null], [4, 4, 'Y', null],
      [0, 0, 'S', 1], [1, 0, 'O', null], [2, 0, 'D', null], [3, 0, 'A', null],
      [0, 4, 'C', null], [1, 4, 'A', 2], [2, 4, 'N', null], [3, 4, 'S', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Quick drawing', row: 0, col: 0, answer: 'SKETC' },
        { number: 3, clue: 'Create with pen', row: 2, col: 0, answer: 'DRAW' },
        { number: 5, clue: 'Sculpting mud', row: 4, col: 1, answer: 'CLAY' }
      ],
      down: [
        { number: 1, clue: 'Soda (misspelled)', row: 0, col: 0, answer: 'SODA' },
        { number: 2, clue: 'Cans (archaic)', row: 1, col: 4, answer: 'ANS' }
      ]
    }
  },
  {
    id: 'p35',
    theme: 'Colors 2',
    size: 5,
    cells: [
      [0, 0, 'P', 1], [0, 1, 'I', null], [0, 2, 'N', null], [0, 3, 'K', null],
      [1, 1, 'R', 2], [1, 2, 'E', null], [1, 3, 'D', null],
      [3, 0, 'G', 5], [3, 1, 'O', null], [3, 2, 'L', null], [3, 3, 'D', null],
      [0, 0, 'P', 1], [1, 0, 'L', null], [2, 0, 'A', null], [3, 0, 'G', null],
      [0, 3, 'K', null], [1, 3, 'D', null], [2, 3, 'R', 4], [3, 3, 'D', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Soft red', row: 0, col: 0, answer: 'PINK' },
        { number: 2, clue: 'Fire color', row: 1, col: 1, answer: 'RED' },
        { number: 5, clue: 'Shiny metal color', row: 3, col: 0, answer: 'GOLD' }
      ],
      down: [
        { number: 1, clue: 'Flag (abbr)', row: 0, col: 0, answer: 'PLAG' },
        { number: 4, clue: 'Road (abbr)', row: 2, col: 3, answer: 'RD' }
      ]
    }
  },
  {
    id: 'p36',
    theme: 'Tasks',
    size: 5,
    cells: [
      [0, 0, 'S', 1], [0, 1, 'H', null], [0, 2, 'O', null], [0, 3, 'P', null],
      [1, 1, 'R', 2], [1, 2, 'E', null], [1, 3, 'A', null], [1, 4, 'D', null],
      [3, 0, 'E', 5], [3, 1, 'A', null], [3, 2, 'T', null],
      [0, 0, 'S', 1], [1, 0, 'P', null], [2, 0, 'E', null], [3, 0, 'E', null],
      [0, 3, 'P', null], [1, 3, 'A', null], [2, 3, 'Y', 4], [3, 3, 'T', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Buy things', row: 0, col: 0, answer: 'SHOP' },
        { number: 2, clue: 'Scan books', row: 1, col: 1, answer: 'READ' },
        { number: 5, clue: 'Consume food', row: 3, col: 0, answer: 'EAT' }
      ],
      down: [
        { number: 1, clue: 'Spee (abbr)', row: 0, col: 0, answer: 'SPEE' },
        { number: 4, clue: 'Paid (archaic)', row: 2, col: 3, answer: 'YT' }
      ]
    }
  },
  {
    id: 'p37',
    theme: 'Ocean 2',
    size: 5,
    cells: [
      [0, 0, 'C', 1], [0, 1, 'O', null], [0, 2, 'R', null], [0, 3, 'A', null], [0, 4, 'L', null],
      [2, 0, 'W', 3], [2, 1, 'A', null], [2, 2, 'V', null], [2, 3, 'E', null],
      [4, 1, 'T', 5], [4, 2, 'I', null], [4, 3, 'D', null], [4, 4, 'E', null],
      [0, 0, 'C', 1], [1, 0, 'O', null], [2, 0, 'W', null], [3, 0, 'A', null],
      [0, 4, 'L', null], [1, 4, 'A', 2], [2, 4, 'K', null], [3, 4, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Sea reef builder', row: 0, col: 0, answer: 'CORAL' },
        { number: 3, clue: 'Water motion', row: 2, col: 0, answer: 'WAVE' },
        { number: 5, clue: 'Lunar water shift', row: 4, col: 1, answer: 'TIDE' }
      ],
      down: [
        { number: 1, clue: 'Cowa (abbr)', row: 0, col: 0, answer: 'COWA' },
        { number: 2, clue: 'Lake (misspelled)', row: 1, col: 4, answer: 'LAKE' }
      ]
    }
  },
  {
    id: 'p38',
    theme: 'Forest Animals',
    size: 5,
    cells: [
      [0, 0, 'D', 1], [0, 1, 'E', null], [0, 2, 'E', null], [0, 3, 'R', null],
      [1, 1, 'W', 2], [1, 2, 'O', null], [1, 3, 'L', null], [1, 4, 'F', null],
      [3, 0, 'B', 5], [3, 1, 'E', null], [3, 2, 'A', null], [3, 3, 'R', null],
      [0, 0, 'D', 1], [1, 0, 'O', null], [2, 0, 'B', null], [3, 0, 'B', null],
      [0, 3, 'R', null], [1, 3, 'L', null], [2, 3, 'D', 4], [3, 3, 'R', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Woodland hopper', row: 0, col: 0, answer: 'DEER' },
        { number: 2, clue: 'Howling pack', row: 1, col: 1, answer: 'WOLF' },
        { number: 5, clue: 'Large furry animal', row: 3, col: 0, answer: 'BEAR' }
      ],
      down: [
        { number: 1, clue: 'Dobb (abbr)', row: 0, col: 0, answer: 'DOBB' },
        { number: 4, clue: 'Road (archaic)', row: 2, col: 3, answer: 'DR' }
      ]
    }
  },
  {
    id: 'p39',
    theme: 'Insects 3',
    size: 5,
    cells: [
      [0, 0, 'M', 1], [0, 1, 'O', null], [0, 2, 'T', null], [0, 3, 'H', null],
      [1, 1, 'F', 2], [1, 2, 'L', null], [1, 3, 'E', null], [1, 4, 'A', null],
      [3, 0, 'T', 5], [3, 1, 'I', null], [3, 2, 'C', null], [3, 3, 'K', null],
      [0, 0, 'M', 1], [1, 0, 'A', null], [2, 0, 'S', null], [3, 0, 'T', null],
      [0, 3, 'H', null], [1, 3, 'E', null], [2, 3, 'Y', 4], [3, 3, 'K', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Nocturnal butterfly', row: 0, col: 0, answer: 'MOTH' },
        { number: 2, clue: 'Jumping pest', row: 1, col: 1, answer: 'FLEA' },
        { number: 5, clue: 'Tiny blood sucker', row: 3, col: 0, answer: 'TICK' }
      ],
      down: [
        { number: 1, clue: 'Mast (archaic)', row: 0, col: 0, answer: 'MAST' },
        { number: 4, clue: 'Hey (archaic)', row: 2, col: 3, answer: 'HYK' }
      ]
    }
  },
  {
    id: 'p40',
    theme: 'Hardware Tools',
    size: 5,
    cells: [
      [0, 0, 'S', 1], [0, 1, 'A', null], [0, 2, 'W', null],
      [1, 0, 'H', 2], [1, 1, 'A', null], [1, 2, 'M', null], [1, 3, 'R', null],
      [3, 1, 'N', 5], [3, 2, 'A', null], [3, 3, 'I', null], [3, 4, 'L', null],
      [0, 0, 'S', 1], [1, 0, 'H', null], [2, 0, 'U', null], [3, 0, 'B', null],
      [1, 3, 'R', null], [2, 3, 'D', 4], [3, 3, 'I', null], [4, 3, 'L', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Wood cutter', row: 0, col: 0, answer: 'SAW' },
        { number: 2, clue: 'Pounding tool (misspelled)', row: 1, col: 0, answer: 'HAMR' },
        { number: 5, clue: 'Sharp point', row: 3, col: 1, answer: 'NAIL' }
      ],
      down: [
        { number: 1, clue: 'Sub (archaic)', row: 0, col: 0, answer: 'SHUB' },
        { number: 4, clue: 'Drill (abbr)', row: 2, col: 3, answer: 'DIL' }
      ]
    }
  },
  {
    id: 'p41',
    theme: 'Music 3',
    size: 5,
    cells: [
      [0, 0, 'F', 1], [0, 1, 'L', null], [0, 2, 'U', null], [0, 3, 'T', null], [0, 4, 'E', null],
      [1, 1, 'T', 2], [1, 2, 'U', null], [1, 3, 'B', null], [1, 4, 'A', null],
      [3, 0, 'J', 5], [3, 1, 'A', null], [3, 2, 'Z', null], [3, 3, 'Z', null],
      [0, 0, 'F', 1], [1, 0, 'I', null], [2, 0, 'J', null], [3, 0, 'J', null],
      [0, 4, 'E', null], [1, 4, 'A', null], [2, 4, 'R', 4], [3, 4, 'S', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Silver pipe', row: 0, col: 0, answer: 'FLUTE' },
        { number: 2, clue: 'Deep brass', row: 1, col: 1, answer: 'TUBA' },
        { number: 5, clue: 'Improv style', row: 3, col: 0, answer: 'JAZZ' }
      ],
      down: [
        { number: 1, clue: 'Fijj (abbr)', row: 0, col: 0, answer: 'FIJJ' },
        { number: 4, clue: 'Body part', row: 2, col: 4, answer: 'EARS' }
      ]
    }
  },
  {
    id: 'p42',
    theme: 'Geography 2',
    size: 5,
    cells: [
      [0, 0, 'R', 1], [0, 1, 'I', null], [0, 2, 'V', null], [0, 3, 'E', null], [0, 4, 'R', null],
      [1, 1, 'C', 2], [1, 2, 'I', null], [1, 3, 'T', null], [1, 4, 'Y', null],
      [3, 0, 'M', 5], [3, 1, 'A', null], [3, 2, 'P', null], [3, 3, 'S', null],
      [0, 0, 'R', 1], [1, 0, 'O', null], [2, 0, 'A', null], [3, 0, 'M', null],
      [0, 4, 'R', null], [1, 4, 'Y', null], [2, 4, 'A', 4], [3, 4, 'D', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Flowing water', row: 0, col: 0, answer: 'RIVER' },
        { number: 2, clue: 'Urban area', row: 1, col: 1, answer: 'CITY' },
        { number: 5, clue: 'Nav tools', row: 3, col: 0, answer: 'MAPS' }
      ],
      down: [
        { number: 1, clue: 'Roam (misspelled)', row: 0, col: 0, answer: 'ROAM' },
        { number: 4, clue: 'Yard (abbr)', row: 2, col: 4, answer: 'YAD' }
      ]
    }
  },
  {
    id: 'p43',
    theme: 'Science',
    size: 5,
    cells: [
      [0, 0, 'A', 1], [0, 1, 'T', null], [0, 2, 'O', null], [0, 3, 'M', null],
      [1, 1, 'C', 2], [1, 2, 'E', null], [1, 3, 'L', null], [1, 4, 'L', null],
      [3, 0, 'A', 5], [3, 1, 'C', null], [3, 2, 'I', null], [3, 3, 'D', null],
      [0, 0, 'A', 1], [1, 0, 'G', null], [2, 0, 'E', null], [3, 0, 'A', null],
      [0, 3, 'M', null], [1, 3, 'L', null], [2, 3, 'E', 4], [3, 3, 'D', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Smallest unit', row: 0, col: 0, answer: 'ATOM' },
        { number: 2, clue: 'Life unit', row: 1, col: 1, answer: 'CELL' },
        { number: 5, clue: 'Low pH', row: 3, col: 0, answer: 'ACID' }
      ],
      down: [
        { number: 1, clue: 'Agea (abbr)', row: 0, col: 0, answer: 'AGEA' },
        { number: 4, clue: 'Led (archaic)', row: 2, col: 3, answer: 'MLED' }
      ]
    }
  },
  {
    id: 'p44',
    theme: 'Hygiene',
    size: 5,
    cells: [
      [0, 0, 'C', 1], [0, 1, 'L', null], [0, 2, 'E', null], [0, 3, 'A', null], [0, 4, 'N', null],
      [1, 1, 'S', 2], [1, 2, 'O', null], [1, 3, 'A', null], [1, 4, 'P', null],
      [3, 0, 'B', 5], [3, 1, 'A', null], [3, 2, 'T', null], [3, 3, 'H', null],
      [0, 0, 'C', 1], [1, 0, 'A', null], [2, 0, 'S', null], [3, 0, 'B', null],
      [0, 4, 'N', null], [1, 4, 'P', null], [2, 4, 'O', 4], [3, 4, 'T', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Spotless', row: 0, col: 0, answer: 'CLEAN' },
        { number: 2, clue: 'Lather maker', row: 1, col: 1, answer: 'SOAP' },
        { number: 5, clue: 'Wash spot', row: 3, col: 0, answer: 'BATH' }
      ],
      down: [
        { number: 1, clue: 'Casb (abbr)', row: 0, col: 0, answer: 'CASB' },
        { number: 4, clue: 'Not in (abbr)', row: 2, col: 4, answer: 'NPOT' }
      ]
    }
  },
  {
    id: 'p45',
    theme: 'Palette',
    size: 5,
    cells: [
      [0, 0, 'W', 1], [0, 1, 'H', null], [0, 2, 'I', null], [0, 3, 'T', null], [0, 4, 'E', null],
      [1, 1, 'B', 2], [1, 2, 'E', null], [1, 3, 'I', null], [1, 4, 'G', null], [1, 5, 'E', null],
      [3, 0, 'T', 5], [3, 1, 'E', null], [3, 2, 'A', null], [3, 3, 'L', null],
      [0, 0, 'W', 1], [1, 0, 'H', null], [2, 0, 'I', null], [3, 0, 'T', null],
      [0, 4, 'E', null], [1, 4, 'G', null], [2, 4, 'E', 4], [3, 4, 'S', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Color of milk', row: 0, col: 0, answer: 'WHITE' },
        { number: 2, clue: 'Off-white shade', row: 1, col: 1, answer: 'BEIGE' },
        { number: 5, clue: 'Greenish-blue', row: 3, col: 0, answer: 'TEAL' }
      ],
      down: [
        { number: 1, clue: 'Whit (abbr)', row: 0, col: 0, answer: 'WHIT' },
        { number: 4, clue: 'Eges (abbr)', row: 2, col: 4, answer: 'EGS' }
      ]
    }
  },
  {
    id: 'p46',
    theme: 'Structures',
    size: 5,
    cells: [
      [0, 0, 'H', 1], [0, 1, 'O', null], [0, 2, 'U', null], [0, 3, 'S', null], [0, 4, 'E', null],
      [1, 1, 'B', 2], [1, 2, 'A', null], [1, 3, 'R', null], [1, 4, 'N', null],
      [3, 0, 'S', 5], [3, 1, 'H', null], [3, 2, 'E', null], [3, 3, 'D', null],
      [0, 0, 'H', 1], [1, 0, 'O', null], [2, 0, 'L', null], [3, 0, 'S', null],
      [0, 4, 'E', null], [1, 4, 'N', null], [2, 4, 'T', 4], [3, 4, 'S', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Home', row: 0, col: 0, answer: 'HOUSE' },
        { number: 2, clue: 'Farm building', row: 1, col: 1, answer: 'BARN' },
        { number: 5, clue: 'Storage room', row: 3, col: 0, answer: 'SHED' }
      ],
      down: [
        { number: 1, clue: 'Hols (abbr)', row: 0, col: 0, answer: 'HOLS' },
        { number: 4, clue: 'Shelter', row: 2, col: 4, answer: 'ENTS' }
      ]
    }
  },
  {
    id: 'p47',
    theme: 'Deep Space 2',
    size: 5,
    cells: [
      [0, 0, 'S', 1], [0, 1, 'U', null], [0, 2, 'N', null], [0, 3, 'S', null],
      [1, 1, 'M', 2], [1, 2, 'O', null], [1, 3, 'O', null], [1, 4, 'N', null], [1, 5, 'S', null],
      [3, 0, 'D', 5], [3, 1, 'U', null], [3, 2, 'S', null], [3, 3, 'T', null],
      [0, 0, 'S', 1], [1, 0, 'P', null], [2, 0, 'A', null], [3, 0, 'D', null],
      [0, 3, 'S', null], [1, 3, 'O', null], [2, 3, 'N', 4], [3, 3, 'T', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Multiple suns', row: 0, col: 0, answer: 'SUNS' },
        { number: 2, clue: 'Satellite group', row: 1, col: 1, answer: 'MOONS' },
        { number: 5, clue: 'Stardust', row: 3, col: 0, answer: 'DUST' }
      ],
      down: [
        { number: 1, clue: 'Spad (abbr)', row: 0, col: 0, answer: 'SPAD' },
        { number: 4, clue: 'Sont (abbr)', row: 2, col: 3, answer: 'SNT' }
      ]
    }
  },
  {
    id: 'p48',
    theme: 'Tiny Crawlers',
    size: 5,
    cells: [
      [0, 0, 'G', 1], [0, 1, 'R', null], [0, 2, 'U', null], [0, 3, 'B', null],
      [1, 1, 'L', 2], [1, 2, 'A', null], [1, 3, 'D', null], [1, 4, 'Y', null],
      [3, 0, 'B', 5], [3, 1, 'U', null], [3, 2, 'G', null],
      [0, 0, 'G', 1], [1, 0, 'U', null], [2, 0, 'M', null], [3, 0, 'B', null],
      [0, 3, 'B', null], [1, 3, 'D', null], [2, 3, 'U', 4], [3, 3, 'G', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Larva', row: 0, col: 0, answer: 'GRUB' },
        { number: 2, clue: 'Spotted insect prefix', row: 1, col: 1, answer: 'LADY' },
        { number: 5, clue: 'General insect', row: 3, col: 0, answer: 'BUG' }
      ],
      down: [
        { number: 1, clue: 'Gumb (abbr)', row: 0, col: 0, answer: 'GUMB' },
        { number: 4, clue: 'Bdug (abbr)', row: 2, col: 3, answer: 'BDUG' }
      ]
    }
  },
  {
    id: 'p49',
    theme: 'Positive Vibes',
    size: 5,
    cells: [
      [0, 0, 'K', 1], [0, 1, 'I', null], [0, 2, 'N', null], [0, 3, 'D', null],
      [1, 1, 'L', 2], [1, 2, 'O', null], [1, 3, 'V', null], [1, 4, 'E', null],
      [3, 0, 'N', 5], [3, 1, 'I', null], [3, 2, 'C', null], [3, 3, 'E', null],
      [0, 0, 'K', 1], [1, 0, 'O', null], [2, 0, 'R', null], [3, 0, 'N', null],
      [0, 3, 'D', null], [1, 3, 'V', null], [2, 3, 'E', 4], [3, 3, 'E', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Benevolent', row: 0, col: 0, answer: 'KIND' },
        { number: 2, clue: 'Strong affection', row: 1, col: 1, answer: 'LOVE' },
        { number: 5, clue: 'Pleasant', row: 3, col: 0, answer: 'NICE' }
      ],
      down: [
        { number: 1, clue: 'Korn (misspelled)', row: 0, col: 0, answer: 'KORN' },
        { number: 4, clue: 'Dvee (abbr)', row: 2, col: 3, answer: 'DVEE' }
      ]
    }
  },
  {
    id: 'p50',
    theme: 'Completion',
    size: 5,
    cells: [
      [0, 0, 'D', 1], [0, 1, 'O', null], [0, 2, 'N', null], [0, 3, 'E', null],
      [1, 1, 'O', 2], [1, 2, 'V', null], [1, 3, 'E', null], [1, 4, 'R', null],
      [3, 0, 'L', 5], [3, 1, 'A', null], [3, 2, 'S', null], [3, 3, 'T', null],
      [0, 0, 'D', 1], [1, 0, 'O', null], [2, 0, 'B', null], [3, 0, 'L', null],
      [0, 3, 'E', null], [1, 3, 'E', null], [2, 3, 'R', 4], [3, 3, 'T', null]
    ],
    clues: {
      across: [
        { number: 1, clue: 'Finished', row: 0, col: 0, answer: 'DONE' },
        { number: 2, clue: 'Flipped', row: 1, col: 1, answer: 'OVER' },
        { number: 5, clue: 'Final', row: 3, col: 0, answer: 'LAST' }
      ],
      down: [
        { number: 1, clue: 'Dobl (abbr)', row: 0, col: 0, answer: 'DOBL' },
        { number: 4, clue: 'Eert (abbr)', row: 2, col: 3, answer: 'ERT' }
      ]
    }
  }
];
