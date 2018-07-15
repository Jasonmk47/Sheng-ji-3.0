import { suits } from '../constants/enums';
import { cardIdToPictureDict } from '../constants/cardIdToPicture';
import { cardIdToCardNameDict } from '../constants/cardIdToName';

export const getSuitIdFromCardId = cardId => {
  validateCardId(cardId);
  cardId %= 54;
  if (cardId < 13) return suits.clubs;
  else if (cardId < 26) return suits.diamonds;
  else if (cardId < 39) return suits.hearts;
  else if (cardId < 52) return suits.spades;
  else return suits.jokers;
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
  if (suit === suits.jokers || suit === gameState.boardState.trumpSuit)
    return true;
  else return false;
};

const validateCardId = cardId => {
  if (cardId < 0) throw new Error('CardId was negative: ' + cardId);
};
