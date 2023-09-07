import styled from 'styled-components';

const ResultSyled = styled.div`
  border-radius: var(--borderRadiusBasic);
  border: 1px solid ${props => props.theme.formLines};
  text-align: center;
  overflow: hidden;
  width: 13rem;
  margin: 2rem;

  @media (max-width: 768px) {
    margin: 1rem;
    max-width: calc((100vw / 3) - 3rem);
  }

  h3 {
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.textLight};
    font-size: 2.3rem;
    font-family: var(--fontBold);
    padding: .25rem 0;

    @media (max-width: 500px) {
      font-size: 1.8rem;
    }
  }

  h4 {
    font-family: var(--fontBold);
    font-size: 3rem;
    padding: .75rem 0;

    @media (max-width: 500px) {
      font-size: 2.4rem;
    }
  }

`;

export default ResultSyled;
