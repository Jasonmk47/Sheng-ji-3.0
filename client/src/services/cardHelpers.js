import { suitTypes, playTypes } from '../constants/enums';
import { cardIdToPictureDict } from '../constants/cardIdToPicture';
import { cardIdToCardNameDict } from '../constants/cardIdToName';

export const getSuitIdFromCardId = cardId => {
  validateCardId(cardId);
  cardId %= 54;
  if (cardId < 13) return suitTypes.clubs;
  else if (cardId < 26) return suitTypes.diamonds;
  else if (cardId < 39) return suitTypes.hearts;
  else if (cardId < 52) return suitTypes.spades;
  else return suitTypes.jokers;
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
  if (suit === suitTypes.jokers || suit === gameState.boardState.trumpSuit)
    return true;
  else return false;
};

export const getPlayTypeFromCardIds = cardIds => {
  cardIds.forEach(cardId => validateCardId(cardId));
  const sortedCardIds = cardIds.sort((a, b) => a - b);
  const numCards = sortedCardIds.length;

  /*
   * One card must be single
   * Two cards must be paired else schuai
   * Even numered hands could be consecutive pairs
   * Odd numbered hands must be schaui
  */
  if (numCards === 1) {
    return playTypes.single;
  } else if (numCards === 2) {
    return checkCardsEqual(sortedCardIds[0], sortedCardIds[1])
      ? playTypes.pair
      : playTypes.schuai;
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
        return playTypes.schuai;
      }
      prevValue = sortedCardIds[i];
    }
    return playTypes.consecutivePair;
  } else {
    return playTypes.schaui;
  }
};

const checkCardsEqual = (cardId1, cardId2) => {
  return cardId1 % 54 === cardId2 % 54;
};

const validateCardId = cardId => {
  if (cardId < 0) throw new Error(`CardId was negative: ${cardId}`);
};
