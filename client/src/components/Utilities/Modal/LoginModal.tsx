import * as React from 'react';
import { css } from 'glamor';

import { Button } from '../Buttons/Button';
import {} from 'types/mutationTypes';
import {} from 'types/routeTypes';
import { CREATE_USER } from 'services/graphqlServices/mutations';
import { CreateUserMutation } from 'types/mutationTypes';

export const LoginModal = React.memo(({ toggleModal }: IProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className={contentsCss.toString()}>
      <div className={modalSectionCss.toString()}>
        <h3>Username</h3>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.currentTarget.value)}
        ></input>
      </div>
      <div className={modalSectionCss.toString()}>
        <h3>Password</h3>
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        ></input>
      </div>
      <CreateUserMutation
        mutation={CREATE_USER}
        onError={e => {
          console.error('Apollo error with creating user', e);
        }}
        variables={{
          username: username,
          password: password,
        }}
      >
        {createUser => (
          <Button
            onClick={async () => {
              // Create user
              await createUser();
              //const loginToken = await createUser();
              toggleModal();

              // Set login token
            }}
            text={'Start'}
          />
        )}
      </CreateUserMutation>
    </div>
  );
});

interface IProps {
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
