import { Mutation } from 'react-apollo';
import { ModalType } from 'constants/enums';

interface ModalData {}

interface ModalVariables {
  type: ModalType;
}

export class ModalMutation extends Mutation<ModalData, ModalVariables> {}
