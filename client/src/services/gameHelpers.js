export const evaluateWinner = (hands, playType, gameState) => {
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


  /* comparator if all are within same suit */
  return Object.keys(hands).reduce((a, b) => hands[a] > hands[b] ? a : b); 

}


  // // 1: select hands with all trumps
  // const handsWithAllTrump = Object.keys(hands).filter((playerId) => 
  //   hand[playerId].every((cardId) => getIsTrumpFromCardId(cardId, gameState)));

  // // 2: remove hands with any out-of-suit
  // const currentSuit = suitTypes.diamonds;

  // const handsOnlyInSuit = Object.keys(hands).filter((playerId) => 
  //   hand[playerId].every((cardId) => getSuitIdFromCardId(cardId) == currentSuit));

  // // 3: find winner among trumps, else
  // // 4: find winner among starting suit