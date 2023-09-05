import styled from 'styled-components';

const DynamicSelectStyled = styled.div`
  transition: opacity .5s, max-height .6s, margin .5s, transform .5s;
  position: relative;
  top: -1.5rem;

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
      background-color: ${props => props.theme.coc || '#eee'};
      font-size: 1.4rem;
      max-height: 50vh;
      overflow: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      border-radius: var(--borderRadiusBasic);
      box-shadow: ${props => props.theme.boxShadowLight};
      width: 90%;
      margin: 1rem auto;
    }

    &__option {
      padding: 1.5rem;
      font-family: var(--fontBold);
      display: inline-block;
      width: 100%;
      cursor: pointer;
      font-size: 1.8rem;

      &.option-selected {
        background-color: ${props => props.theme.orange};
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
