import styled from 'styled-components';

const DynamicSelectWrapperStyled = styled.div`

  input {
    padding-right: 3rem;;
  }

  .open-icon {
    position: absolute;
    fill: ${props => props.theme.formFieldUnit};
    width: 1.2rem;
    right: 2rem;
    pointer-events: none;
  }
`;

export default DynamicSelectWrapperStyled;
