import { Card, Suit, Rank, SolitaireState } from '../types';

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, isFaceUp: false });
    }
  }
  return deck;
}

export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function dealGame(): SolitaireState {
  const deck = shuffle(createDeck());
  const piles: Card[][] = Array.from({ length: 7 }, () => []);

  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      const card = deck.pop()!;
      if (i === j) card.isFaceUp = true;
      piles[j].push(card);
    }
  }

  return {
    deck,
    waste: [],
    foundations: [[], [], [], []],
    piles,
    isWin: false,
  };
}

export function isOppositeColor(suit1: Suit, suit2: Suit): boolean {
  const isRed = (s: Suit) => s === 'hearts' || s === 'diamonds';
  return isRed(suit1) !== isRed(suit2);
}

export function getRankValue(rank: Rank): number {
  if (rank === 'A') return 1;
  if (rank === 'J') return 11;
  if (rank === 'Q') return 12;
  if (rank === 'K') return 13;
  return parseInt(rank);
}

export function canMoveToPile(card: Card, targetPile: Card[]): boolean {
  if (targetPile.length === 0) {
    return card.rank === 'K';
  }
  const topCard = targetPile[targetPile.length - 1];
  return (
    isOppositeColor(card.suit, topCard.suit) &&
    getRankValue(card.rank) === getRankValue(topCard.rank) - 1
  );
}

export function canMoveToFoundation(card: Card, foundation: Card[]): boolean {
  if (foundation.length === 0) {
    return card.rank === 'A';
  }
  const topCard = foundation[foundation.length - 1];
  return (
    card.suit === topCard.suit &&
    getRankValue(card.rank) === getRankValue(topCard.rank) + 1
  );
}
