import styled from 'styled-components';

const ErrorMessageStyled = styled.div`
  position: absolute;
  right: 0;
  bottom: -1.75rem;
  align-items: center;
  justify-content: flex-end;

  ${({ theme, warning }) => `
    width: 100%;
    text-align: right;
    color: ${warning ? (theme.textSecondary || '#666') : (theme.invalidField || '#911')};
    display: ${warning ? 'flex' : 'inline-block'};
    font-size: 1.2rem;
    font-family: var(--fontTitleBold);
    pointer-events: none;

    ${warning
    ? `
      span {
        display: flex;
        margin-right: .5rem;
      }

      svg {
        height: 1.5rem;
        fill: ${theme.warning || '#f9ad02'};
      }
    `
    : ''}
  `}
`;

export default ErrorMessageStyled;
