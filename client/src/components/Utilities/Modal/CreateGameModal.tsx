import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button } from '../Buttons/Button';
import { SupportedNumPlayers, SupportedNumDecks } from 'constants/enums';
import { gameRouteBase } from 'constants/routes';
import { fonts } from 'constants/fonts';
import { CREATE_MATCH } from 'services/graphqlServices/mutations';
import { CreateMatchMutation } from 'types/mutationTypes';
import { GameMatchParams } from 'types/routeTypes';

export const CreateGameModal = React.memo(
  withRouter(({ history, toggleModalClose }: IProps) => {
    const [numPlayers, setNumPlayers] = React.useState(SupportedNumPlayers[0]);
    const [numDecks, setNumDecks] = React.useState(SupportedNumDecks[0]);
    const [matchName, setMatchName] = React.useState('');

    return (
      <div className={contentsCss.toString()}>
        <div className={modalSectionCss.toString()}>
          <h3>Name</h3>
          <input
            type="text"
            value={matchName}
            onChange={e => setMatchName(e.currentTarget.value)}
          ></input>
        </div>
        <div className={modalSectionCss.toString()}>
          <h3>Number of Players</h3>
          <div className={optionsListCss.toString()}>
            {SupportedNumPlayers.sort().map(p => (
              <div
                key={p}
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
            {SupportedNumDecks.sort().map(d => (
              <div
                key={d}
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
        <CreateMatchMutation
          mutation={CREATE_MATCH}
          onError={e => {
            console.error('Apollo error with creating match', e);
          }}
          variables={{
            //TODO change to real user
            userId: '11111111-1111-1111-1111-111111111111',
            numPlayers: numPlayers,
            numDecks: numDecks,
            matchName: matchName,
          }}
        >
          {createMatch => (
            <Button
              onClick={async () => {
                // Create game
                const newMatch = await createMatch();
                toggleModalClose();

                // Route to it
                // Known typescript issue with void
                // https://github.com/apollographql/react-apollo/issues/2095
                history.push(
                  gameRouteBase + (newMatch as any).data.createMatch.matchId,
                );
              }}
              text={'Start'}
            />
          )}
        </CreateMatchMutation>
      </div>
    );
  }),
);

interface IProps extends RouteComponentProps<GameMatchParams> {
  toggleModalClose(): void;
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
