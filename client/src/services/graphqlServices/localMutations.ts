import gql from 'graphql-tag';

export const TOGGLE_MODAL_MUTATION = gql`
  mutation toggleModal($type: ModalType!) {
    toggleModal(type: $type) @client
  }
`;
