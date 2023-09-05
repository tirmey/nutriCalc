import styled from 'styled-components';

const CleanFormStyled = styled.div`
  background-color: ${props => props.theme.card || '#fff'};
  color: ${props => props.theme.textPrimary || '#333'};
  max-width: 97rem;
  position: relative;
  margin: 0 auto;
  border-radius: var(--borderRadiusBasic);
  box-shadow: ${props => props.theme.boxShadowBasic || '0 0 20px -10px rgba(0, 0, 0, 0.35)'};
  transition: background-color .5s;
  pointer-events: ${props => props.submitting ? 'none' : 'all'};
  display: flex;

  @media (max-width: 360px) {
    max-width: unset;
    min-width: 30rem;
  }

  form {
    padding: 2.5rem 2.5rem 5rem;
    width: 100%;

    @media (max-width: 500px) {
      padding: 2.5rem 1.5rem;
    }
  }

  /* .invalid-field {
    input, select, textarea {
      ${props => `
        border-bottom: 2px solid ${props.theme.invalidField || '#900'};
      `};
    }
  } */

  &.no-label {
    label {
      display: none;
    }

    input::placeholder {
      opacity: 1;
    }
  }

  .header-text {
    background-color: #6B7B99;
    padding: 3rem 2rem;
    border-radius: var(--borderRadiusBasic) 0 0 var(--borderRadiusBasic);
    width: 45rem;

    h3, p {
      position: sticky;
    }

    h3 {
      top: 3rem;
      font-size: 2.5rem;
      color: #fff;
      font-family: var(--fontBold);
      margin-bottom: 1rem;
    }

    p {
      top: 5rem;
      font-size: 1.5rem;
      color: #ddd;
    }
  }

  hr {
    background-color: ${props => props.theme.formLines || '#ddd'};
    margin: 0;
    height: 0;
  }

  .form-section {
    padding: 4rem 0;

    &:not(:last-of-type) {
      border-bottom: 1px solid ${props => props.theme.formLines || '#ddd'};
    }
  }

  .form-section__title {
    font-size: 2.5rem;
    font-weight: bold;

    @media (max-width: 500px) {
      font-size: 2rem;
      padding: 1rem;
    }
  }

  .form-main-error-message {
    padding-right: 2.5rem;
    bottom: 1rem;
  }

  .submit-div {
    display: flex;
    justify-content: flex-end;

    .btn-submit:disabled {
      cursor: not-allowed;
    }

    button {
      &:not(:last-of-type) {
        margin-right: .5rem;
      }
    }

    @media (max-width: 500px) {
      &.multiple-buttons {
        button {
          width: 100%;
          margin-bottom: 2rem;
       }
      }
    }
  }

  .container-centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fullscreen-overlay {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }

  form > .cleanform__error-message {
    bottom: 3rem;
    right: 2rem;
  }

  .required-field-asterisk {
    color: ${props => props.theme.invalidField || '#900'};
    font-size: 1.5rem;
    position: relative;
    pointer-events: all;
    cursor: default;
  }

  .component-transition-wrapper {
    transition: opacity .5s, max-height .5s, margin .5s, transform .5s;

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
  }
`;

export default CleanFormStyled;
