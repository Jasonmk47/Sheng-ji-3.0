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

export const evaluateWinner = (hands, playType) => {
  hands.forEach(playerId => 
    hands[playerId].forEach(cardId => validateCardId(cardId)));

  /* 
   * hands schema expected (can be changed) (assumed in order of play?):
   * {
   *    playerID1: [cardId1, cardId2],
   *    playerID2: [cardId1, cardId2], 
   *    playerID3: [cardId1, cardId2],
   *    playerID4: [cardId1, cardId2],
   * } 
   */

  // lay out steps for rules 
  // 1: select hands with all trumps    
  // 2: remove hands with any out-of-suit
  // 3: find winner among trumps, else
  // 4: find winner among starting suit
  

  switch(playType) {
    case playTypes.single:
      

      /* comparator if all are within same suit */
      return Object.keys(hands).reduce((a, b) => hands[a] > hands[b] ? a : b); 
    case playTypes.pair:
      return Object.keys(hands).reduce((a, b) => hands[a][0] > hands[b][0] ? a : b);
    case playTypes.consecutivePair:
      break;
    case playTypes.schuai:
      break;
    default:
      throw new Error(`Invalid playtype: ${playType}`)
  }
}

const checkCardsEqual = (cardId1, cardId2) => {
  return cardId1 % 54 === cardId2 % 54;
};

const validateCardId = cardId => {
  if (cardId < 0) throw new Error(`CardId was negative: ${cardId}`);
};
