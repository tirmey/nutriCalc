import styled from 'styled-components';

const MyTransitionStyled = styled.div`
  position: relative;
  transition: opacity .4s, transform .4s;
  opacity: 0;

  & > div > div {
    transition: opacity .4s, transform .4s;
  }

  &[data-animation=animZoom] > div > div {
    transform: scale(.8);
  }

  &.enter-done[data-animation=animZoom] > div > div {
    transform: scale(1);
  }

  &.exit-active[data-animation=animZoom] > div > div {
    transform: scale(.8);
  }

  &.enter-done {
    opacity: 1;
  }

  &.exit-active {
    opacity: 0;
  }
`;

export default MyTransitionStyled;
