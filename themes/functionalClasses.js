export default props => `
  .bold {
    font-weight: bold;
  }

  .title-strong {
    font-family: var(--fontTitleBold)
  }

  .text-link {
    font-family: var(--fontTitleBold);
    color: ${props.theme.textLink};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .no-interactions {
    pointer-events: none;
  }

  .fixed {
    overflow: hidden;
  }

  .hidden {
    display: none;
  }

  .pointer {
    cursor: pointer;
  }

  .transparent {
    opacity: 0;
    pointer-events: none;
  }

  .centered-horizontal {
    margin: 0 auto;
  }

  .fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;

    @media (max-width: 1023px) {
      width: 100%;
    }
  }

  .container-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .flex-centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .centered-wrap {
    flex-flow: row wrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-scrollbar {
    &::-webkit-scrollbar {
      width: var(--scrollbarWidth);
      height: 10px;
      background-color: rgba(0, 0, 0, 0.05);

      @media (max-width: 500px) {
        background-color: transparent;
      }
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${props.theme.primary};

      @media (max-width: 500px) {
        background-color: transparent;
      }
    }

    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.05) ${props.theme.primary};
  }

  .break-word {
    word-break: break-all;
  }

  .button-div {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1rem;

    & > div, & > button {
      margin-right: 2rem;

      &:last-of-type {
        margin-right: 0;
      }
    }

    @media (max-width: 600px) {
      width: 100%;

      button {
        width: 100%;
        margin-right: unset;
        margin: 1rem auto;
      }
    }
  }
`;
