import styled from 'styled-components';

const DynamicSelectStyled = styled.div`
  transition: opacity .5s, max-height .6s, margin .5s, transform .5s;
  position: relative;
  top: 1.5rem;

  .transition-container {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: opacity .8s, max-height .3s;

    &.enter-done {
      max-height: 50rem;
      opacity: 1;
    }
  }

  .dynamic-select {
    &__options-div {
      margin: 1rem 0 2rem;
      background-color: ${props => props.theme.coc || '#eee'};
      font-size: 1.4rem;
      max-height: 50vh;
      overflow: auto;
      position: relative;
    }

    &__option {
      padding: 1.6rem 2rem;
      display: inline-block;
      width: 100%;
      cursor: pointer;

      &.option-selected {
        background-color: ${props => props.theme.primary || '#2c550c'};
        color: #fff;
        box-shadow: 0 0 25px -10px rgba(0, 0, 0, 0.3);
      }
    }
  }

  input {
    &::placeholder {
      opacity: 1;
    }
  }
`;

export default DynamicSelectStyled;
