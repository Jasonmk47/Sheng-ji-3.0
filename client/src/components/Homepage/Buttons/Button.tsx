import * as React from 'react';
import { css } from 'glamor';

import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

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
  WebkitBorderRadius: '3px',
  MozBorderRadius: '3px',
  borderRadius: '3px',
  fontFamily: fonts.buttonFont,
  padding: '10px',
  textShadow: '-1px -1px 0 rgba(0,0,0,0.3)',
  textAlign: 'center',
  color: colors.white,
  backgroundColor: colors.buttonColor,
  backgroundImage: `-webkit-gradient(linear, left top, left bottom, color-stop(0%, ${
    colors.buttonColor
  }), color-stop(100%, ${
    colors.buttonGradient
  })), -webkit-linear-gradient(top, ${colors.buttonColor}, ${
    colors.buttonGradient
  })`,
  ':hover': {
    border: '1px solid',
    backgroundColor: colors.buttonHover,
    backgroundImage: `-webkit-gradient(linear, left top, left bottom, color-stop(0%,${
      colors.buttonHover
    }), color-stop(100%, ${
      colors.buttonHoverGradient
    })), -webkit-linear-gradient(top, ${colors.buttonHover}, ${
      colors.buttonHoverGradient
    })`,
  },
});
