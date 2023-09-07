import styled from 'styled-components';

const HeaderStyled = styled.div`
  background-color: ${props => props.theme.primary};
  padding: 1rem 4rem;
  color: ${props => props.theme.textLight};

  @media (max-width: 500px) {
    padding: 1rem 2rem;
  }

  .brand {
    font-size: 2.5rem;
    font-family: var(--fontBold);
  }
`;

export default HeaderStyled;
