import styled from 'styled-components';

const MyTransitionStyled = styled.div`
  transition: opacity .4s;
  opacity: 0;

  ${props => props.animation === 'animZoom' && `
    &.enter-active .animZoom {
      transform: scale(1.3);
    }

    &.exit-active .animZoom {
      transform: scale(1.1);
    }
  `}

  & > div {
    transition: transform .4s;
  }

  &.enter-done {
    opacity: 1;
  }

  &.exit-done {
    opacity: 0;
  }
`;

export default MyTransitionStyled;
