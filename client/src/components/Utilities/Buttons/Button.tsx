import * as React from 'react';
import { css } from 'glamor';

export const Button = React.memo(({ onClick, text, isDisabled }: IProps) => (
  <div className={buttonWrapperCss.toString()}>
    <button
      className={buttonCss.toString()}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  </div>
));

interface IProps {
  text: string;
  onClick(): void;
  isDisabled?: boolean;
}

const buttonWrapperCss = css({
  display: 'block',
  margin: '0 auto',
  marginTop: '20px',
});

// https://codepen.io/scottpdawson/pen/Dqrck
const buttonCss = css({
  ':disabled': {
    opacity: 0.65,
    cursor: 'not-allowed',
  },
  marginBottom: '20px',
  textDecoration: 'none',
  border: '1px solid #25729a',
  WebkitBorderRadius: '3px',
  MozBorderRadius: '3px',
  borderRadius: '3px',
  fontFamily: 'arial, helvetica, sans-serif',
  padding: '10px 10px 10px 10px',
  textShadow: '-1px -1px 0 rgba(0,0,0,0.3)',
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: '#3093c7',
  backgroundImage:
    '-webkit-gradient(linear, left top, left bottom, color-stop(0%, #3093c7), color-stop(100%, #1c5a85)), -webkit-linear-gradient(top, #3093c7, #1c5a85)',
  ':hover': {
    border: '1px solid #1c5675',
    backgroundColor: '#26759e',
    backgroundImage:
      '-webkit-gradient(linear, left top, left bottom, color-stop(0%,#26759e), color-stop(100%, #133d5b)), -webkit-linear-gradient(top, #26759e, #133d5b)',
  },
});
