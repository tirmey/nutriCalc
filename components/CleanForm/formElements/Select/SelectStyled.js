import styled from 'styled-components';

const SelectStyled = styled.select`
  background-color: ${({ theme }) => theme.formField || '#f2f2f4'};
  font-size: 2rem;
  width: 100%;
  position: relative;
  padding: 1.5rem 2rem;
  border: 2px solid transparent;  
  border-radius: ${({ theme }) => theme.borderRadiusBasic || '2px'};
  color: ${({ theme }) => theme.textPrimary || '#333'};

  &:focus {
    border-color: ${({ theme }) => theme.inputBorderFocus || '#999'};
    border-radius: .4rem;
  }

  option {
    font-size: 1.6rem;
  }

  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

export default SelectStyled;
