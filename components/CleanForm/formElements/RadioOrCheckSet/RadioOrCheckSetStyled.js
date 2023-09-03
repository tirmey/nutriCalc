import styled from 'styled-components';

const RadioOrCheckSetStyled = styled.div`
  transition: opacity .5s, max-height .5s, margin .5s, transform .5s;

  &.checkbox-set, &.radio-set {
    position: relative;

    label {
      border: 2px solid transparent;

      &:focus {
        border-color: ${props => props.theme.inputBorderFocus || '#bbb'};
        border-radius: .4rem;
      }

      &.input-disabled {
        pointer-events: none;
      }

      &.test-answer-wrong, &.test-answer-right {
        &:after {
          position: absolute;
          right: -2rem;
          font-weight: bold;
        }
      }

      &.test-answer-right {
        background-color: #d6f0d6 !important;
        border-radius: var(--borderRadiusBasic);

        &:after {
          content: "✓";
          color: #2e3;
        }
      }

      &.test-answer-wrong {
        background-color: #ffc2c2 !important;
        border-radius: var(--borderRadiusBasic);

        &:after {
          content: '✘';
          color: #e33;
        }
      }
    }

    input:checked + label:focus {
      background-color: ${props => props.theme.overlayLight};
    }

    input[type=radio] {
      display: none;
    }

    .input-checked .radio-btn__internal {
      background-color: ${props => props.theme.primary || '#4b9410'};
      width: .7rem;
      height: .7rem;
      opacity: 1;
    }

    label:hover .radio-btn__internal {
      background-color: ${props => props.theme.primary || '#4b9410'};
      opacity: .5;
    }

    .fieldset-checkbox {
      width: unset;

      input {
        display: none;
      }

      label {
        display: flex;
        align-items: center;
      }

      label .checkbox-toggler {
        border-color: ${props => props.theme.primary || '#4b9410'};
        fill: ${props => props.theme.checkboxTick || '#4b9410'};
      };

      &.fieldset-checked label .checkbox-toggler svg {
        opacity: 1;
      }

      @media (min-width: 1024px) {
        &:not(.fieldset-checked) label:hover .checkbox-toggler svg {
          opacity: .5;
        }
      }

      .input-info-icon {
        width: 2.75rem;

        svg {
          width: 2.75rem;
          height: 2.75rem;
        }
      }
    }

    label {
      // pointer-events: all;
      top: unset;
      margin-left: unset;
    }

    &__error {
      .radio-set__options, .checkbox-set__options {
        border: 2px solid ${props => props.theme.invalidField || '#711'} !important;
      }
    }

    .checkbox-set__title, .radio-set__title {
      display: flex;
      align-items: center;
    }

    .checkbox-set__options, .radio-set__options {
      padding: .5rem 0;
      border-radius: .4rem;
      display: inline-block;
      width: 100%;
      border: 1px solid ${props => props.theme.formLines || '#eee'};
    }

    .checkbox-set__options {
      label:hover {
        border-color: transparent;
      }
    }

    .radio-set__options {
      @media (max-width: 500px) {
        padding: 1rem;
      }
    }

    fieldset {
      margin-top: unset;
      margin-left: 1rem;
      padding: 0;

      @media (max-width: 500px) {
        margin-left: 0;
      }

      label {
        padding: .5rem 1rem .5rem 0;
        transition: background-color .6s;
        min-width: 15rem;
        cursor: pointer;
        border: 2px solid transparent;

        &:hover {
          background-color: ${props => props.theme.listItemLight || '#f9f9f9'};
          border-color: ${props => props.theme.formLines || '#eee'};
        }

        span {
          display: flex;
          align-items: center;
        }
      }

      &.fieldset-radio.fieldset-checked label {
        background-color: ${props => props.theme.listItemLight || '#eee'};
        border-radius: .4rem;
        border-color: transparent;
      }
    }

    .input-wrapper {
      max-height: 5rem;
      margin: .5rem;
      display: inline-block;

      @media (max-width: 500px) {
        margin: 0;
      }
    }

    .required-field-asterisk {
      margin-left: .3rem;
    }

    &__subtitle {
      font-size: 1.3rem;
      color: #888;
    }
  }

  &.radio-set {
    transition: border-color .5s, opacity .5s, max-height .5s, margin .5s, transform .5s;

    & > div {
      justify-items: flex-start;
    }

    .input-info-container {
      position: relative !important;
      top: unset !important;
    }
  }

  .radio-btn__wrapper {
    display: flex;
  }

  .radio-btn__external {
    cursor: pointer;
    position: relative;
    border: 3px solid ${props => props.theme.primary || '#159715'};
    background-color: transparent;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    margin: .5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radio-btn__internal {
    display: inline-block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: transparent;
    opacity: 0;
    transition: background-color .2s, width .2s, height .2s, opacity .4s;
  }

  .checkbox-toggler {
    width: 1.75rem;
    height: 1.75rem;
    min-width: 1.75rem;
    min-height: 1.75rem;
    border: .2rem solid ${props => props.theme.formLines || '#777'};
    border-radius: .3rem;
    position: relative;

    svg {
      opacity: 0;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, .4));
      width: 2.2rem;
      height: 2.2rem;
      position: absolute;
      top: -.6rem;
      left: 0;
      transition: opacity .3s;
    }
  }

  .input-info-div {
    max-width: 20rem;
  }

  // CSS TRANSITION CONFIG
  &.enter-done {
    opacity: 1;
    max-height: 41rem;
    overflow: auto;
    transform: scale(1);
  }

  &.enter:not(.enter-done) {
    opacity: 0;
    max-height: 0;
    margin: 0;
    transform: scale(.85);
  }

  &.exit-active, &.enter-active {
    opacity: 0;
    max-height: 0;
    margin: 0;
    transform: scale(.85);
  }
`;

export default RadioOrCheckSetStyled;
