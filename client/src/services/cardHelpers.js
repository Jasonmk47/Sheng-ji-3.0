import suits from '../constants/enums';

export const getSuitIdFromCardId = cardId => {
  cardId %= 54;
  if (cardId < 13) return suits.clubs;
  else if (cardId < 26) return suits.diamonds;
  else if (cardId < 39) return suits.hearts;
  else if (cardId < 52) return suits.spades;
  else return suits.jokers;
};
