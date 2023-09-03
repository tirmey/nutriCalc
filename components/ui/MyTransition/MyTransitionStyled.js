import styled from 'styled-components';

const MyTransitionStyled = styled.div`
  position: relative;
  transition: opacity .4s, transform .4s;
  opacity: 0;

  & > div > div {
    transition: opacity .4s, transform .4s;
  }

  &[data-animation=animZoom] > div > div {
    transform: scale(.8) translateY(-90px);
  }

  &.enter-done[data-animation=animZoom] > div > div {
    transform: scale(1) translateY(0);
  }

  &.exit-active[data-animation=animZoom] > div > div {
    transform: scale(.8) translateY(-30px);
  }

  &.enter-done {
    opacity: 1;
  }

  &.exit-active {
    opacity: 0;
  }
`;

export default MyTransitionStyled;
