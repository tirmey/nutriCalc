import styled from 'styled-components';

export default styled.fieldset`
  margin-top: 4rem;
  width: 100%;
  max-height: 30rem;
  position: relative;

  ${({ readOnly }) => readOnly && 'opacity: .4;'}

  .input-wrapper {
    width: unset;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
  }

  &.fieldset-hidden {
    display: none;
  }

  .fieldset-subtitle {
    width: 100%;
    margin: .5rem 0;
    font-size: 1.5rem;
    color: #888;
  }

  &.fieldset-file {
    max-height: 60rem;
  }

  &.fieldset-text, &.fieldset-number, &.fieldset-email {
    .input-info-container {
      position: absolute;
      right: 1rem;
      bottom: 2rem;

      & ~ label {
        padding-right: 1.5rem;
      }
    }
  }

  &.fieldset-checkbox, &.fieldset-radio {
    font-size: 1.4rem;

    .input-wrapper {
      flex-wrap: nowrap;
    }

    label span {
      padding-left: 1rem;

      @media (max-width: 768px) {
        font-size: 1.3rem;
      }
    }


    @media (max-width: 500px) {
      .input-info-div {
        min-width: 25rem;
        padding: 1rem;
      }
    }

    @media (max-width: 350px) {
      .input-info-div {
        min-width: 20rem;
      }
    }
  }

  &.fieldset-radio {
    &:hover .radio-btn__internal {
      display: unset;
      opacity: .4;
      width: .9rem;
      height: .9rem;
    }

    .input-info-container {
      margin-left: .5rem;
    }
  }

  &.fieldset-number {
    @media (max-width: 500px) {
      max-width: unset;
    }
  }

  &.fieldset-date {
    .input-info-container {
      right: 1rem;
      position: absolute;
      top: 1.5rem;
    }

    .input-info-div {
      @media (max-width: 1024px) {
        min-width: 16rem;
      }
    }
  }

  &.fieldset-textarea {
    &:not(.invalid-field) textarea:not(.empty-field) {
      border-width: 2px;
    }

    label {
      position: relative;
    }

    .input-info-container {
      right: .5rem;
      bottom: -2.5rem;
      position: absolute;
    }
  }

  &.fieldset-password {
    .input-info-container {
      position: absolute;
      right: -1.6rem;
      bottom: 2.1rem;
      right: .5rem;

      @media (max-width: 400px) {
        bottom: 1.9rem;
      }
    }

    input {
      padding-right: 6rem;
    }
  }

  .form-password-eye {
    fill: ${props => props.theme.icon || '#1c71c7'};
    height: 2.5rem;
    width: 2.5rem;
    position: absolute;
    bottom: 1.75rem;
    right: 1rem;
    z-index: 1;
    cursor: pointer;
    transition: fill .3s;

    &.input-has-info {
      right: 3.5rem;
    }

    @media (max-width: 500px) {
      bottom: 1.6rem;
    }

    @media (max-width: 400px) {
      bottom: 1.4rem;
    }

    &:hover {
      fill: ${props => props.theme.iconDark || '#135aa1'};
    }
  }

  &.fieldset-select {
    margin-top: 5rem;

    select {
      cursor: ${({ readOnly }) => readOnly ? 'not-allowed' : 'default'};
    }

    .input-info-container {
     position: absolute;
     right: 4rem;
     bottom: 1.7rem;
     z-index: 1;
    }
  }

  label {
    display: flex;
    align-items: center;
  }

  ${({ invalidField, theme }) => invalidField && `
    input, select, textarea {
      border-bottom: 2px solid ${theme.invalidField || '#900'};
    }
  `}

  // CSS TRANSITION CONFIG
  &.enter-done:not(:read-only) {
    opacity: 1;
    max-height: 30rem;
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

  &.enter-active, &.enter-done, &.exit-active, &.exit-done {
    transition: opacity .5s, max-height .5s, margin .5s, transform .5s;
  }
`;
