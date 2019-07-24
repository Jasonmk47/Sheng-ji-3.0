import * as React from 'react';
import * as ReactModal from 'react-modal';
import { css } from 'glamor';

import { CreateGameModal } from './CreateGameModal';
import { GET_LOCAL_MODAL_STATE } from '../../../services/graphqlServices/localQueries';
import { TOGGLE_MODAL_MUTATION } from '../../../services/graphqlServices/localMutations';
import { ModalQuery } from '../../../types/localQueryTypes';
import { ModalMutation } from '../../../types/localMutationTypes';
import { ModalType } from 'constants/enums';

export const Modal = React.memo(() => (
  <ModalQuery query={GET_LOCAL_MODAL_STATE}>
    {({ loading, error, data }) => {
      if (loading) {
        return null;
      }
      if (error || data === undefined) {
        return `Error with modal state!: ${error}`;
      }

      return (
        <ModalMutation
          mutation={TOGGLE_MODAL_MUTATION}
          variables={{ type: ModalType.createGame }}
        >
          {toggleModal => (
            <ReactModal
              isOpen={data.modal.isOpen}
              onRequestClose={() => toggleModal()}
              shouldCloseOnOverlayClick={true}
              style={modalCss}
            >
              <h2>
                {
                  {
                    [ModalType.none]: <span>Weird</span>,
                    [ModalType.createGame]: <span>Create Game</span>,
                  }[data.modal.type]
                }
              </h2>
              <hr />
              <button
                className={closeCss.toString()}
                onClick={() =>
                  toggleModal({ variables: { type: ModalType.none } })
                }
              />
              {
                {
                  [ModalType.none]: (
                    <span>
                      I'm not sure what modal this is supposed to be. Click
                      outside to close
                    </span>
                  ),
                  [ModalType.createGame]: (
                    <CreateGameModal
                      toggleModal={() =>
                        toggleModal({ variables: { type: ModalType.none } })
                      }
                    />
                  ),
                }[data.modal.type]
              }
            </ReactModal>
          )}
        </ModalMutation>
      );
    }}
  </ModalQuery>
));

const modalCss = { content: { width: '40%', left: '30%', minWidth: '250px' } };

// Styles inspired by https://codepen.io/brissmyr/pen/egidw
const closeCss = css({
  position: 'absolute',
  right: '32px',
  top: '32px',
  width: '32px',
  height: '32px',
  opacity: 0.3,
  '&:hover': {
    opacity: 1,
    cursor: 'pointer',
  },
  '&:before': {
    position: 'absolute',
    left: '12px',
    top: '-2px',
    content: ' ',
    height: '33px',
    width: '4px',
    backgroundColor: '#333',
    transform: 'rotate(45deg)',
  },
  '&:after': {
    position: 'absolute',
    left: '12px',
    top: '-2px',
    content: ' ',
    height: '33px',
    width: '4px',
    backgroundColor: '#333',
    transform: 'rotate(-45deg)',
  },
});
