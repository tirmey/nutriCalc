import React from 'react';
import { CSSTransition } from 'react-transition-group';
import MyTransitionStyled from './MyTransitionStyled';

const MyTransition = ({
  classes,
  children,
  showElement,
  enter = 100,
  exit = 800,
  transitionStyles = {},
  onExited = () => {},
  animation = 'animZoom',
}) => (
  <CSSTransition
    in={showElement}
    timeout={{
      enter,
      exit,
    }}
    mountOnEnter
    appear
    enter
    exit
    unmountOnExit
    onExited={onExited}
  >
    <MyTransitionStyled data-animation={animation} className={`my-transition ${classes || ''}`} style={transitionStyles}>
      {React.cloneElement(children, { 'data-animation': animation })}
    </MyTransitionStyled>
  </CSSTransition>
);

export default MyTransition;
