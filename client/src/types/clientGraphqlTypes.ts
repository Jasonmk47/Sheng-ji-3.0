import { Query } from 'react-apollo';
import { CardGroup } from './cardTypes';

interface FieldData {
  game: {
    display: {
      cardGroupsVisible: CardGroup[];
    };
  };
}

export class FieldQuery extends Query<FieldData> {}
