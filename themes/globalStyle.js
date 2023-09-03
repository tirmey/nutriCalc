import { createGlobalStyle } from 'styled-components';
import functionalClasses from './functionalClasses';
import resetStyles from './resetStyles';
import styleVars from './styleVars';

const GlobalStyle = createGlobalStyle`
  ${resetStyles}

  input {
    font-family: 'pgf-regular';
  }

  button {
    border: none;
    background-color: unset;
  }

  hr {
    background-color: ${props => props.theme.horizontalLine};
    border-top: unset;
  }

  sup {
    font-size: 1.3rem;
    position: relative;
    display: inline-block;
    top: -0.7rem;
    margin-left: 0.3rem;
  }

  html {
    font-family: 'carrig', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 62.5%;
    ${styleVars}
  }

  body {
    color: ${props => props.theme.textPrimary};
    font-size: 2rem;
    overflow-x: hidden;
    // font-family: var(--fontTitle);

    -webkit-tap-highlight-color: transparent;

    &::-webkit-scrollbar {
      width: 15px;
      height: 10px;
      background-color: #ddd;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #999;
      border: 3px solid #ddd;
      border-radius: 8px;
    }

    &.fixed.has-scrollbar {
      padding-right: 15px;
      background-color: ${props => props.theme.backgroundContent};
    }

    div, h1, h2, h3, h4, input, textarea, a, p, li, img, span, button, td, th, em {
      &:focus {
        outline: 0;
      }

      &::selection {
        background: ${props => props.theme.icon};
        color: #fff;
      }
    }
  }

  a, a:visited, a:active  {
    color: ${props => props.theme.textLink};
    font-weight: bold;
  }

  a:focus {
    text-decoration: underline;
  }

  a:hover {
    text-decoration: underline;
  }

  strong {
    color: ${props => props.theme.textStrong};
    transition: color 1s;
  }

  // FUNCTIONAL CLASSES
  ${props => functionalClasses(props)}

`;

export default GlobalStyle;
