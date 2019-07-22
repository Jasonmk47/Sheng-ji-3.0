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
        <ModalMutation mutation={TOGGLE_MODAL_MUTATION}>
          {toggleModal => (
            <ReactModal
              isOpen={data.modal.isOpen}
              onRequestClose={() =>
                toggleModal({ variables: { type: ModalType.createGame } })
              }
              shouldCloseOnOverlayClick={true}
              style={modalCss}
            >
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
                      toggleModal={(type: ModalType) =>
                        toggleModal({ variables: { type: type } })
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

const modalCss = css({ width: '100px' });
