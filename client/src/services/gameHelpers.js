export const evaluateWinner = (hands, playType, gameState) => {
  hands.forEach(playerId =>
    hands[playerId].forEach(cardId => validateCardId(cardId)),
  );

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
  return Object.keys(hands).reduce(
    (a, b) => (getHigherHand(hands[a], hands[b], playType, gameState) ? a : b),
  );
};

export const getHigherHand = (hand1, hand2, playType, gameState) => {
  // NOTE: For cards that would not win anyways (e.g., out of suit
  //       pairs vs in-suit non-pairs the comparator chooses one as
  //       a winner, assumed will be beaten by the starting hand

  switch (playType) {
    case playTypes.single:
      return getHigherCard(hand1[0], hand2[0], gameState);

    case playTypes.pair:
      if (isPair(hand1) && !isPair(hand2)) {
        return true;
      }
      if (!isPair(hand1) && isPair(hand2)) {
        return false;
      }

      if (isPair(hand1) && isPair(hand2)) {
        return getHigherCard(hand1[0], hand2[0], gameState);
      } else {
        return true; // order of losing hands unimportant
      }

    case playTypes.consecutivePair:
      const sortedHand1 = hand1.sort((a, b) => a - b); // will sort by cardId not #
      const sortedHand2 = hand2.sort((a, b) => a - b);

      const isHand1ConsecutivePair = isConsecutivePair(sortedHand1);
      const isHand2ConsecutivePair = isConsecutivePair(sortedHand2);

      if (isHand1ConsecutivePair && !isHand2ConsecutivePair) {
        return true;
      }
      if (!isHand1ConsecutivePair && isHand2ConsecutivePair) {
        return false;
      }

      if (isHand1ConsecutivePair && isHand2ConsecutivePair) {
        return getHigherCard(hand1[0], hand2[0], gameState);
      } else {
        return true; // order of losing hands unimportant
      }

    case playTypes.shuai:
      throw new Error(`Shuai not supported yet!`);

    default:
      throw new Error(`Invalid playtype: ${playType}`);
  }
};
