import styled from 'styled-components';

const ButtonStyled = styled.button`
  align-items: center;
  border: 3px solid transparent;
  color: ${props => props.theme.buttonText || '#fff'};
  display: flex;
  justify-content: center;
  position: relative;
  text-transform: uppercase;
  transition: background-color .2s, border .2s;

  &:focus {
    border: 3px solid ${props => props.theme.buttonSelectedBorder || '#7a1'};
  }

  background-color: ${({ theme, disabled, danger, warning, color }) => color
    ? color
    : disabled
      ? (theme.buttonDisabled || '#888')
      : danger
        ? (theme.danger || '#600')
        : warning
          ? (theme.warning || '#f0a80c')
          : (theme.button || '#070')
};

  ${({ size }) => `
    font-family: var(--fontBold);
    font-size: ${size === 'full' ? '2.2rem' : size === 'medium' ? '1.6rem' : '1.2rem'};
    padding: ${size === 'full' ? '0 4rem' : size === 'medium' ? '0 2rem' : '0 1.5rem'};
    height: ${size === 'full' ? '5rem' : size === 'medium' ? '4rem' : '2.5rem'};
    min-width: ${size === 'full' ? 'unset' : size === 'medium' ? '7rem' : '5rem'};
    border-radius: ${size === 'full' ? 'var(--borderRadiusBig)' : size === 'medium' ? 'var(--borderRadiusBig)' : '.2rem'};
    ${size === 'full' ? 'width: 100%;' : ''};
  `}

  .button-submitting-loader {
    ${({ size, isSubmitting }) => `
      width: ${!isSubmitting ? '0' : size !== 'small' ? '3rem' : '2.5rem'};
      height: ${size !== 'small' ? '3rem' : '2.5rem'};
      position: ${size === 'full' ? 'relative' : 'absolute'};
      right: ${(size === 'full') ? '1.5rem' : '0'};
      left: ${(size === 'full') ? 'auto' : '0'};
      top: ${(size === 'full') ? 'auto' : '0'};
      bottom: ${(size === 'full') ? 'auto' : '0'};
      opacity: ${isSubmitting ? 1 : 0};
      pointer-events: none;
      transition: opacity 1s;
      margin: ${size === 'full' ? '0 -2rem 0 0 !important' : 'auto'};
      margin-left: ${size === 'full' ? '1rem' : 'unset'};
      rect {
        &:nth-of-type(odd) {
          fill: #eee
        }
        &:nth-of-type(even) {
          fill: #bbb
        }
      }
    `}
  }

  &:not(:disabled):hover {
    background-color: ${({ theme, danger, warning }) => danger
    ? (theme.dangerHover || '#800')
    : warning
      ? theme.warningHover || '#997000'
      : theme.buttonHover || '#090'
};
    cursor: pointer;
  }

  span {
    left: ${({ isSubmitting }) => isSubmitting ? '-2rem' : '0'};
    opacity: ${({ isSubmitting, size }) => isSubmitting && size !== 'full' ? '0' : 1};
    position: relative;
    transition: left .3s;
    pointer-events: none;
  }
`;

export default ButtonStyled;
