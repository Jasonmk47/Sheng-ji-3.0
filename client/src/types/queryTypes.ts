import { Query } from 'react-apollo';
import { CardGroup } from './cardTypes';
import { GameInfo } from './gameInfo';

interface HandData {
  activeGame: {
    hand: number[];
  };
}

interface HandVariables {
  matchId: number;
  userId: string;
}

export class HandQuery extends Query<HandData, HandVariables> {}

interface FieldData {
  game: {
    display: {
      cardGroupsVisible: CardGroup[];
    };
  };
}

export class FieldQuery extends Query<FieldData> {}

interface GameListData {
  allGames: GameInfo[];
}

interface GameListVariables {
  userId: string;
}

export class GameListQuery extends Query<GameListData, GameListVariables> {}
