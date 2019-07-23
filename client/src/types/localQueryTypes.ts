import { Query } from 'react-apollo';
import { CardGroup } from './cardTypes';
import { ModalType } from '../constants/enums';

interface FieldData {
  game: {
    display: {
      cardGroupsVisible: CardGroup[];
    };
  };
}

export class FieldQuery extends Query<FieldData> {}

export interface ModalData {
  modal: {
    isOpen: boolean;
    type: ModalType;
  };
}

export class ModalQuery extends Query<ModalData> {}
