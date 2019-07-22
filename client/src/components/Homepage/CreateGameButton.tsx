import * as React from 'react';
import { css } from 'glamor';

import { Button } from '../Utilities/Buttons/Button';
import { TOGGLE_MODAL_MUTATION } from '../../services/graphqlServices/localMutations';
import { ModalType } from '../../constants/enums';
import { ModalMutation } from '../../types/localMutationTypes';

export const CreateGameButton = React.memo(() => (
  <div className={wrapperCss.toString()}>
    <ModalMutation mutation={TOGGLE_MODAL_MUTATION}>
      {toggleModal => (
        <Button
          text={'Create Game'}
          onClick={() =>
            toggleModal({ variables: { type: ModalType.createGame } })
          }
        />
      )}
    </ModalMutation>
  </div>
));

const wrapperCss = css({ flexDirection: 'column', flex: '1 1 auto' });
