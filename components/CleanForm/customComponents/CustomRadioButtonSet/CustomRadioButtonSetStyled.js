import styled from 'styled-components';

const CustomRadioButtonSetStyled = styled.div`
  transition: max-height .3s;
  max-width: 100vw;
  margin: 4rem 0;

  & ~ .form-error-message {
    right: 2rem;
  }

  .custom-radio-set {
    &__title {
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    &__body {
      border: 1px solid ${props => props.theme.formLines};
      padding: 1rem 2rem;
      margin: .5rem 0 0;
      border-radius: .4rem;
    }

    &__item {
      font-size: 1.6rem;
      display: flex;
      padding: 1rem 0;
      justify-content: space-between;
      align-items: center;

      &:not(:last-of-type) {
        border-bottom: 1px solid ${props => props.theme.formLines || '#eee'};
      }

      @media (max-width: 500px) {
        flex-wrap: wrap;
      }
    }

    &__label {
      width: 30rem;
    }

    &__radio-div .radio-set {
      display: flex;
      margin: 0;
      padding: 0 0 0 2rem;

      @media (max-width: 500px) {
        flex-wrap: wrap;
        padding: 0;
      }

      & > div:not(:last-of-type) {
        margin-right: 1rem;
      }

      & > div label {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: .5rem 1rem;
        border: 2px solid transparent;
        border-radius: .4rem;

        span {
          margin-left: .5rem;
          cursor: pointer;
        }
      }

      input:checked ~ label {
        background-color: ${props => props.theme.overlayLight};
      }

      label:focus {
        border: 2px solid ${props => props.theme.inputBorderFocus};
      }
    }
  }

  .radio-set > div:hover .radio-btn__internal {
    display: unset;
    opacity: .4;
    width: .9rem;
    height: .9rem;
  }

  .radio-set.checked .radio-btn__internal {
    display: unset;
    opacity: 1 !important;
    width: .9rem;
    height: .9rem;
    background-color: ${props => props.theme.primary};
  }

  .required-field-asterisk {
    font-size: 1.3rem;
  }
`;

export default CustomRadioButtonSetStyled;
