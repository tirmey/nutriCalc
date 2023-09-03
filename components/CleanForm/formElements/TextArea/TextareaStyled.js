import styled from 'styled-components';

const TextareaStyled = styled.textarea`
  background-color: ${props => props.theme.formField || '#f2f2f4'};
  color: ${props => props.theme.textPrimary || '#333'};
  font-size: 2rem;
  padding: 2rem;
  resize: vertical;
  width: 100%;
  border: 2px solid transparent;
  border-radius: ${props => props.theme.borderRadiusBasic || '2px'};
  ${({ readOnly }) => readOnly && 'cursor: not-allowed;'}

  &:focus::not(:readonly) {
    border-color: ${({ theme }) => theme.inputBorderFocus || '#999'};
    border-radius: .4rem;
  }

  label {
    position: relative;
  }  
`;

export default TextareaStyled;
