import ButtonImageActive from '@images/button-down.png';
import ButtonImageHover from '@images/button-hover.png';
import ButtonImage from '@images/button.png';
import HrImage from '@images/hr-golden.png';
import { createMuiTheme } from '@material-ui/core';
import * as React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const textStyle: React.CSSProperties = {
  textShadow: '-2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000',
  color: '#fff',
};

const buttonStyle: React.CSSProperties = {
  backgroundSize: '100% 100%',
  border: 'none',
  paddingLeft: '35px !important',
  paddingRight: '35px !important',
  height: 60,
  imageRendering: 'pixelated',
  ...textStyle,
  fontSize: '1.07em',
};

const DefaultTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      main: '#D27D2C',
    },
    secondary: {
      main: '#388e3c',
    },
    background: {
      default: '#222',
      paper: '#4E4A4E',
    },
  },
  typography: {
    allVariants: textStyle,
  },
  overrides: {
    MuiDivider: {
      root: {
        backgroundImage: `url(${HrImage})`,
        backgroundSize: '100% 100%',
        margin: '0 10px 0 10px',
        height: 10,
        border: 0,
      },
    },
    MuiButton: {
      text: {
        color: '#fff',
      },
      root: {
        'background': `url(${ButtonImage}) center no-repeat no-repeat`,
        ...buttonStyle as CSSProperties,
        '&:hover': {
          background: `url(${ButtonImageHover}) center no-repeat no-repeat`,
          ...buttonStyle,
        },
        '&:active': {
          background: `url(${ButtonImageActive}) center no-repeat no-repeat`,
          ...buttonStyle,
        },
      },
    },
    MuiTextField: {
      root: {},
    },
  },
});

export default DefaultTheme;
