import * as React from 'react';
import { css } from 'glamor';
import * as Cookies from 'js-cookie';

import { Button } from '../Buttons/Button';
import {} from 'types/mutationTypes';
import {} from 'types/routeTypes';
import { CREATE_USER } from 'services/graphqlServices/mutations';
import { CreateUserMutation } from 'types/mutationTypes';

export const CreateUserModal = React.memo(
  ({ toggleCurrentModal, switchToLogin }: IProps) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
      <div className={contentsCss.toString()}>
        <div className={modalSectionCss.toString()}>
          <div>
            <Button
              onClick={async () => {
                switchToLogin();
              }}
              text={'Login'}
            />
          </div>
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
          // for some reason the mutation type doesn't know about networkError.result
          onError={(e: any) => {
            if (e.networkError.result.errors[0].message === 'Already a user') {
              // Message of duplicate username
              alert('Username taken');
              toggleCurrentModal();
            }
            console.error('Apollo error with creating user', e);
          }}
          variables={{
            username: username,
            password: password,
          }}
          onCompleted={data => {
            // todo add userId mutation to local state
            var test = Cookies.get('token');
            console.log(test);
            document.cookie = 'token=' + data.userId;
          }}
        >
          {createUser => (
            <Button
              isDisabled={username === '' || password === ''}
              onClick={async () => {
                // Create user
                await createUser();
                //const loginToken = await createUser();
                toggleCurrentModal();

                // Set login token
              }}
              text={'Start'}
            />
          )}
        </CreateUserMutation>
      </div>
    );
  },
);

interface IProps {
  toggleCurrentModal(): void;
  switchToLogin(): void;
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
