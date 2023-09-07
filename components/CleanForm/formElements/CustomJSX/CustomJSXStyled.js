import styled from 'styled-components';

const CustomJSXStyled = styled.div`
  max-height: 0;
  margin: 0;
  opacity: 1;
  transform: scale(.85);
  transition: opacity .5s, max-height .5s, transform .5s, margin .5s;

  // CSS TRANSITION CONFIG
  &.enter-done:not(:read-only) {
    opacity: 1;
  }

  &.exit-active, &.enter-active {
    opacity: 0;
    max-height: 0;
  }


  &.exit-active, &.exit-done {
    max-height: 0;
    margin: 0;
  }
  &.enter-active, &.enter-done {
    max-height: 50rem;
    margin: 2rem 3rem;
    transform: scale(1);
  }
`;

export default CustomJSXStyled;
