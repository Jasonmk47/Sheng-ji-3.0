import * as React from 'react';
import { css } from 'glamor';

import { ModalType } from 'constants/enums';

export const CreateGameModal = React.memo(({ toggleModal }: Props) => {
  return (
    <>
      <h2>Create Game</h2>
      <hr />
      <div className={modalSectionCss.toString()}>
        <span>Number of Players</span>
      </div>
      <div className={modalSectionCss.toString()}>
        <span>Number of Decks</span>
      </div>
      <button
        className={closeCss.toString()}
        onClick={() => toggleModal(ModalType.createGame)}
      />
    </>
  );
});

interface Props {
  toggleModal(type: ModalType): void;
}

const modalSectionCss = css({ margin: '15px' });

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
    left: '13px',
    top: '-2px',
    content: ' ',
    height: '33px',
    width: '4px',
    backgroundColor: '#333',
    transform: 'rotate(45deg)',
  },
  '&:after': {
    position: 'absolute',
    left: '13px',
    top: '-2px',
    content: ' ',
    height: '33px',
    width: '4px',
    backgroundColor: '#333',
    transform: 'rotate(-45deg)',
  },
});
