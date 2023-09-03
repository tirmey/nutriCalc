import styled from 'styled-components';

const FileUploaderStyled = styled.div`
  .files-input {
    display: none;
  }

  .files-list-container {
    display: flex;
    flex-flow: row wrap;
  }

  .invalid-field .drop-area {
    border-color: ${props => props.theme.invalidField};
  }
`;

export default FileUploaderStyled;
