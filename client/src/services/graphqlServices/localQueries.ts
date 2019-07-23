import gql from 'graphql-tag';

export const GET_LOCAL_MODAL_STATE = gql`
  query {
    modal @client {
      isOpen
      type
    }
  }
`;
