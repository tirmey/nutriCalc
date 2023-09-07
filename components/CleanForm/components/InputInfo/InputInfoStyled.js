import styled from 'styled-components';

const InputInfoStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: ${({ withClickHandler }) => withClickHandler ? 'pointer' : 'default'};
  pointer-events: none;

  &:hover > .input-info-div {
    opacity: .95;
  }

  &:hover .input-info-icon {
     fill: #e67a2d;
;
  }

  .input-info-hint {
    pointer-events: all;
  }

  .input-info-icon {
    height: 2.1rem;
    width: 2.1rem;
    pointer-events: all;
    cursor: pointer;
    pointer-events: none;
    fill: #f08639;
    display: flex;
    margin: 0 .5rem;


    @media (max-width: 500px) {
      height: 2rem;
      width: 2rem;
    }

    svg {
      height: 2.1rem;
      width: 2.1rem;
    }
  }

  input:not([type=checkbox]) ~ .input-info-div {
    position: absolute;
    right: 0;
    top: 1.75rem;
  }
`;

export default InputInfoStyled;
