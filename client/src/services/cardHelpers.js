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

export const getIsInSuitFromCardId = (cardId, gameState) => {
  validateCardId(cardId);
  return (getSuitIdFromCardId(cardId) === gameState.boardState.startingSuit);
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
    return playTypes.schaui;
  }
};

export const getHigherHand = (hand1, hand2, playType, gameState) => {
  
  // NOTE: for cards that would not win anyways (e.g., out of suit pairs vs in-suit non-pairs)
  //       the comparator chooses one as a winner, assumed will be beaten by the starting hand 
  
  switch(playType) {
    case playTypes.single:
      
      // If only one person played trump
      if (getIsTrumpFromCardId(hand1[0], gameState) && !getIsTrumpFromCardId(hand2[0], gameState)) return true;
      if (!getIsTrumpFromCardId(hand1[0], gameState) && getIsTrumpFromCardId(hand2[0], gameState)) return false;

      // If only one person played in suit
      if (getIsInSuitFromCardId(hand1[0], gameState) && !getIsInSuitFromCardId(hand2[0], gameState)) return true;
      if (!getIsInSuitFromCardId(hand1[0], gameState) && getIsInSuitFromCardId(hand2[0], gameState)) return false;

      // Otherwise compare cards
      return getHigherCard(hand1[0], hand2[0]);


    case playTypes.pair:
      if (isPair(hand1) && !isPair(hand2)) return true;
      if (!isPair(hand1) && isPair(hand2)) return false;

      if (isPair(hand1) && isPair(hand2)) {
        return true; // TONY NEEDED TO GET DINNER WITH JOE AND WILL FINISH THIS LATER

      } 
      else return true; // order of losing hands unimportant


      // are both pairs?
      //  check trumps
      //  check out-of-suit
      //  compare cards
      // else if not pairs
      //  else true

    case playTypes.consecutivePair:
      // are both consec pairs?
      //  check trumps
      //  check out-of-suit
      //  compare cards
      // else if not pairs
      //  else true
      break;

    case playTypes.shuai:
      throw new Error(`Shuai not supported yet!`)
    default:
      throw new Error(`Invalid playtype: ${playType}`)
  }
}

const isPair = (hand) => {
  if (typeof hand === "undefined") throw new Error(`Hand is undefined; cannot check for pairs`);
  if (hand.length !== 2) return false;
  if (hand[0] === hand[1]) throw new Error(`Cannot have same cardId: ${hand[0]}`);
  hand.forEach((cardId) => validateCardId(cardId))
  
  return hand[0] = hand[1]
}

const getHigherCard = (cardId1, cardId2) => { 
  return cardId1 % 54 > cardId2 % 54; // NOT RIGHT; stub function
}

const checkCardsEqual = (cardId1, cardId2) => {
  return cardId1 % 54 === cardId2 % 54;
};

const validateCardId = cardId => {
  if (cardId < 0) throw new Error(`CardId was negative: ${cardId}`);
};
