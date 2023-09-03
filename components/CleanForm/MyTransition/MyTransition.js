import React from 'react';
import { CSSTransition } from 'react-transition-group';
import MyTransitionStyled from './MyTransitionStyled';

const MyTransition = ({
  classes = '',
  children,
  showElement,
  enter = 100,
  exit = 500,
  transitionStyles = {},
}) => (
  <CSSTransition
    in={!!showElement}
    timeout={{
      enter,
      exit,
    }}
    mountOnEnter
    appear
    enter
    exit
    unmountOnExit
  >
    <MyTransitionStyled className={`transition-container ${classes}`} style={transitionStyles}>
      {children}
    </MyTransitionStyled>
  </CSSTransition>
);

export default MyTransition;
