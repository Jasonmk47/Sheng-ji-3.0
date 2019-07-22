import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { GameMatchParams } from '../../../types/routeTypes';
import {
  SupportedNumPlayers,
  SupportedNumDecks,
} from '../../../constants/enums';
import { gameRouteBase } from 'constants/routes';

export const CreateGameModal = React.memo(
  withRouter(({ history, toggleModal }: IProps) => {
    const [numPlayers, setNumPlayers] = React.useState(SupportedNumPlayers[0]);
    const [numDecks, setNumDecks] = React.useState(SupportedNumDecks[0]);
    return (
      <div className={contentsCss.toString()}>
        <div className={modalSectionCss.toString()}>
          <span>Number of Players</span>
          <div className={optionsListCss.toString()}>
            {SupportedNumPlayers.map(p => (
              <div
                id={p.toString()}
                onClick={() => setNumPlayers(p)}
                className={css(
                  optionCss,
                  numPlayers === p ? selectedOptionCss : undefined,
                ).toString()}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className={modalSectionCss.toString()}>
          <span>Number of Decks</span>
          <div className={optionsListCss.toString()}>
            {SupportedNumDecks.map(d => (
              <div
                id={d.toString()}
                onClick={() => setNumDecks(d)}
                className={css(
                  optionCss,
                  numDecks === d ? selectedOptionCss : undefined,
                ).toString()}
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            toggleModal();
            history.push(gameRouteBase);
          }}
        >
          Start
        </button>
      </div>
    );
  }),
);

interface IProps extends RouteComponentProps<GameMatchParams> {
  toggleModal(): void;
}

const contentsCss = css({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
});

const modalSectionCss = css({ margin: '15px' });

const optionsListCss = css({ display: 'flex' });

const optionCss = css({
  marginTop: '5px',
  border: 'solid',
  padding: '5px',
  cursor: 'pointer',
});

const selectedOptionCss = css({ color: 'red', cursor: 'context-menu' });
