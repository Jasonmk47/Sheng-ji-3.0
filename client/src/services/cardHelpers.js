import { suitTypes, playTypes } from '../constants/enums';
import { cardIdToPictureDict } from '../constants/cardIdToPicture';
import { cardIdToCardNameDict } from '../constants/cardIdToName';

export const getSuitIdFromCardId = cardId => {
  validateCardId(cardId);
  cardId %= 54;
  if (cardId < 13) {
    return suitTypes.clubs;
  } else if (cardId < 26) {
    return suitTypes.diamonds;
  } else if (cardId < 39) {
    return suitTypes.hearts;
  } else if (cardId < 52) {
    return suitTypes.spades;
  } else {
    return suitTypes.jokers;
  }
};

export const getNumberFromCardId = cardId => {
  if (getSuitIdFromCardId(cardId) === suitTypes.jokers) {
    return cardId % 54;
  }
  // 52, 53
  else if (cardId % 13 === 1) {
    return 14;
  }
  //force ace to be higher
  else {
    return cardId % 13; // return card numbers
  }
};

export const getPictureUrlFromCardId = cardId => {
  validateCardId(cardId);
  return cardIdToPictureDict[cardId % 54];
};

export const getCardNameFromCardId = cardId => {
  validateCardId(cardId);
  return cardIdToCardNameDict[cardId % 54];
};

export const getIsTrumpFromCardId = (cardId, gameState) => {
  validateCardId(cardId);
  const suit = getSuitIdFromCardId(cardId);
  if (suit === suitTypes.jokers || suit === gameState.boardState.trumpSuit) {
    return true;
  } else {
    return false;
  }
};

export const getIsInSuitFromCardId = (cardId, gameState) => {
  validateCardId(cardId);
  return getSuitIdFromCardId(cardId) === gameState.boardState.startingSuit;
};

export const getPlayTypeFromCardIds = cardIds => {
  cardIds.forEach(cardId => validateCardId(cardId));
  const sortedCardIds = cardIds.sort((a, b) => a - b);
  const numCards = sortedCardIds.length;

  /*
   * One card must be single
   * Two cards must be paired else shuai
   * Even numered hands could be consecutive pairs
   * Odd numbered hands must be schaui
  */

  if (numCards === 1) {
    return playTypes.single;
  } else if (numCards === 2) {
    return checkCardsEqual(sortedCardIds[0], sortedCardIds[1])
      ? playTypes.pair
      : playTypes.shuai;
  } else if (numCards % 2 === 0) {
    let prevValue = -1;
    for (let i = 0; i < numCards; i += 2) {
      if (
        !(
          checkCardsEqual(sortedCardIds[i], sortedCardIds[i + 1]) &&
          (prevValue < 0 ||
            (checkCardsEqual(sortedCardIds[i], prevValue + 1) &&
              getSuitIdFromCardId(sortedCardIds[i]) !==
                getSuitIdFromCardId(prevValue)))
        )
      ) {
        return playTypes.shuai;
      }
      prevValue = sortedCardIds[i];
    }
    return playTypes.consecutivePair;
  } else {
    return playTypes.shaui;
  }
};

export const isPair = hand => {
  if (typeof hand === 'undefined') {
    throw new Error(`Hand is undefined; cannot check for pairs`);
  }
  if (hand.length !== 2) {
    return false;
  }
  if (hand[0] === hand[1]) {
    throw new Error(`Cannot have same cardId: ${hand[0]}`);
  }
  hand.forEach(cardId => validateCardId(cardId));

  return (hand[0] = hand[1]);
};

export const isConsecutivePair = sortedHand => {
  const suit = getSuitIdFromCardId(sortedHand[0]);

  // NEED TO CAPTURE EDGE CASES (e.g., jokers, skipping trump number)
  return (
    sortedHand.every(cardId => getSuitIdFromCardId(cardId) === suit) && // same suit
    isPair([sortedHand[0], sortedHand[2]]) && // lower pair
    isPair([sortedHand[1], sortedHand[3]]) && // higher pair
    getNumberFromCardId(sortedHand[1]) - getNumberFromCardId(sortedHand[0]) ===
      1
  ); // consecutive
};

export const getHigherCard = (cardId1, cardId2, gameState) => {
  // If only one person played trump
  if (
    getIsTrumpFromCardId(cardId1, gameState) &&
    !getIsTrumpFromCardId(cardId2, gameState)
  ) {
    return true;
  }
  if (
    !getIsTrumpFromCardId(cardId1, gameState) &&
    getIsTrumpFromCardId(cardId2, gameState)
  ) {
    return false;
  }

  // If only one person played in suit
  if (
    getIsInSuitFromCardId(cardId1, gameState) &&
    !getIsInSuitFromCardId(cardId2, gameState)
  ) {
    return true;
  }
  if (
    !getIsInSuitFromCardId(cardId1, gameState) &&
    getIsInSuitFromCardId(cardId2, gameState)
  ) {
    return false;
  }

  // Otherwise compare cards
  return getNumberFromCardId(cardId1) >= getNumberFromCardId(cardId2);
};

const checkCardsEqual = (cardId1, cardId2) => {
  return cardId1 % 54 === cardId2 % 54;
};

// -1 is for a card back
// % is the remainder operation in js not mod so this works
const validateCardId = cardId => {
  if (cardId < -1) {
    throw new Error('CardId was negative: ' + cardId);
  }
};
