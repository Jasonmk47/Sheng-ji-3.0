import * as React from 'react';
import { css } from 'glamor';

import { Button } from '../Buttons/Button';
import {} from 'types/mutationTypes';
import {} from 'types/routeTypes';

export const LoginModal = React.memo(
  ({ toggleCurrentModal: toggleModalClose, switchToCreate }: IProps) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
      <div className={contentsCss.toString()}>
        <div className={modalSectionCss.toString()}>
          <div>
            <Button
              onClick={async () => {
                switchToCreate();
              }}
              text={'Create User'}
            />
          </div>
        </div>
        <form>
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

          <Button
            isDisabled={username === '' || password === ''}
            onClick={async () => {
              // Login
              const options = {
                method: 'post',
                headers: {
                  'Content-type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
                },
                body: `username=${username}&password=${password}`,
              };

              const url = 'http://localhost:3000/login';

              fetch(url, options)
                .then(response => {
                  if (!response.ok) {
                    if (response.status === 404) {
                      alert('Username not found, please retry');
                      toggleModalClose();
                    }
                    if (response.status === 401) {
                      alert('Username and password do not match, please retry');
                      toggleModalClose();
                    }
                  }
                  return response;
                })
                .then(response => response.json())
                .then(data => {
                  if (data.success) {
                    document.cookie = 'token=' + data.token;
                  }
                });
              toggleModalClose();
            }}
            text={'Login'}
          />
        </form>
      </div>
    );
  },
);

interface IProps {
  toggleCurrentModal(): void;
  switchToCreate(): void;
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
