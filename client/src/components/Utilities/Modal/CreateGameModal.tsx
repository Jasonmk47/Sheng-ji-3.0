import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { GameMatchParams } from '../../../types/routeTypes';
import { SupportedNumPlayers, SupportedNumDecks } from 'constants/enums';
import { Button } from '../Buttons/Button';
import { gameRouteBase } from 'constants/routes';
import { fonts } from 'constants/fonts';

export const CreateGameModal = React.memo(
  withRouter(({ history, toggleModal }: IProps) => {
    const [numPlayers, setNumPlayers] = React.useState(SupportedNumPlayers[0]);
    const [numDecks, setNumDecks] = React.useState(SupportedNumDecks[0]);
    return (
      <div className={contentsCss.toString()}>
        <div className={modalSectionCss.toString()}>
          <h3>Number of Players</h3>
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
          <h3>Number of Decks</h3>
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

        <Button
          onClick={() => {
            toggleModal();
            history.push(gameRouteBase);
          }}
          text={'Start'}
        />
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
  justifyContent: 'center',
  alignItems: 'center',
});

const modalSectionCss = css({
  display: 'flex',
  flexDirection: 'column',
  margin: '15px',
  justifyContent: 'center',
  alignItems: 'center',
});

const optionsListCss = css({ display: 'flex' });

const optionCss = css({
  marginTop: '5px',
  border: 'solid',
  padding: '5px 15px 5px 15px',
  cursor: 'pointer',
  fontSize: '2em',
  fontFamily: fonts.buttonFont.toString(),
});

const selectedOptionCss = css({ color: 'red', cursor: 'context-menu' });
