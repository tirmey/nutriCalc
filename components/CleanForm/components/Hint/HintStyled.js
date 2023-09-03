import styled from 'styled-components';

const HintStyled = styled.div`
  display: inline-block;
  position: relative;
  z-index: 1;

  .transition-container {
    opacity: 0;
    transition: opacity .25s;

    &.enter-done {
      opacity: 1;
    }
  }

  .hint {
    &__wrapper {
      display: inline-block;
      position: absolute;
      pointer-events: none;
      z-index: 1;
      width: max-content;
      max-width: 35rem;
      filter: drop-shadow(1px 2px 6px rgba(0, 0, 0, 0.3));
      max-width: 0;
      overflow: hidden;
      display: flex;
      padding: 1rem 0;
    }

    &__triangle {
      position: absolute;
      width: 0;
      height: 0;
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
      border-top: 1rem solid  ${props => props.hintColor || props.theme.primaryDark};
      opacity: .95;
      display: ${props => props.hideTriangle ? 'none' : 'initial'};
    }

    &__text {
      font-size: 1.3rem;
      line-height: 1.9rem;
      color: #fff;
      background-color: ${props => props.hintColor || props.theme.primaryDark};
      padding: 1rem;
      border-radius: .25rem;
      opacity: .95;
      width: 100%;
    }
  }
`;

export default HintStyled;
