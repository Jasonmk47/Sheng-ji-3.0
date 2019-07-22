import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button } from '../Utilities/Buttons/Button';
import { TOGGLE_MODAL_MUTATION } from '../../services/graphqlServices/localMutations';
import { ModalType } from '../../constants/enums';
import { ModalMutation } from '../../types/localMutationTypes';
import { GameMatchParams } from '../../types/routeTypes';

export const CreateGameButton = React.memo(
  withRouter(({ history }: IProps) => (
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
  )),
);

interface IProps extends RouteComponentProps<GameMatchParams> {}

const wrapperCss = css({ flexDirection: 'column', flex: '1 1 auto' });
