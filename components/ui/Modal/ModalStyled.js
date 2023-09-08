import styled from 'styled-components';

const ModalStyled = styled.div`
  background-color: rgba(0, 0, 0, 0.65);
  z-index: var(--zIndexModalOverlay);
  transition: opacity .4s, transform .3s;
  backdrop-filter: blur(5px) opacity(1);
  animation: anim-backdrop 3.4s ease;

  .modal {
    width: 90%;
    max-width: ${props => props.big ? '80rem' : '50rem'} ;
    color:  ${props => props.theme.textPrimary};
    background: ${props => props.theme.primary};
    border-radius: 3px;
    position: relative;
    margin-left: -.75rem;
    border-radius: var(--borderRadiusBasic);
    box-shadow: 0 0 90px 0 rgba(0, 0, 0, .6);
    border: 5px solid #639489;

    &__header {
      color:  ${props =>  props.theme.textLight};
      font-family: var(--fontBold);
      padding: .5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__body {
      color: ${props => props.theme.textPrimary};
      padding: 2rem;
      border-radius: var(--borderRadiusBasic);
      background-color: ${props => props.theme.card};
      box-shadow: 0 0 7px -2px #000;
      max-height: 90vh;
      min-height: 10rem;
      overflow: auto;

      h1, h2, h3, h4, h5, h6 {
        font-family: var(--fontTitle);
        font-size: 2.6rem;
        margin: 3rem 0 1.5rem;
      }

      p {
        margin: 2rem 0;
        line-height: 3rem;
      }
    }

    &__help-message {
      text-align: center;
      margin-top: 1rem;
      border-top: 1px solid #ccc;
      padding-top: 2rem;
    }

    &__close {
      font-weight: bold;
      cursor: pointer;
      font-size: 3rem;
    }
  }

  .button-div {
    margin: 2rem 0 0;

    button > div {
      pointer-events: none;
    }
  }

  @keyframes anim-backdrop {
    0% {
      backdrop-filter: blur(0) opacity(1);
    }

    100% {
      backdrop-filter: blur(5px) opacity(1);
    }
  }
`;

export default ModalStyled;
