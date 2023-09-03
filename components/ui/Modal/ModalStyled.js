import styled from 'styled-components';

const ModalStyled = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  z-index: var(--zIndexModalOverlay);
  transition: opacity .4s, transform .3s;
  backdrop-filter: blur(5px) opacity(1);
  animation: anim-backdrop 3.4s ease;

  .modal {
    width: 90%;
    max-width: ${props => props.big ? '80rem' : '50rem'} ;
    color:  ${props => props.theme.textPrimary};
    background: ${props => props.theme.backgroundGradient};
    border-radius: 3px;
    position: relative;
    margin-left: -.75rem;

    &__header {
      color:  ${props => { console.log('props: >>>>>> ', props); return props.theme.textLight}};
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
    }

    &__body {
      position: relative;
      top: .75rem;
      left: .75rem;
      border-radius: 4px;
      color: ${props => props.theme.textPrimary};
      padding: 2rem;
      box-shadow: 0 0 10px -1px rgba(0, 0, 0, .6);
      background-color: ${props => props.theme.card};
      max-height: 90vh;
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
      font-size: 4rem;
      line-height: 3rem;
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
