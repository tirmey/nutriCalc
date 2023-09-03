import styled from 'styled-components';

const FilesManagerStyled = styled.div`
  margin: .5rem 0 4rem;
  border: 1px solid #eee;
  padding: 2rem;
  border-radius: .4rem;

  .files-container {
    display: ${props => props.isImage ? 'block' : 'flex'};
    flex-wrap: wrap;
  }

  .file-container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: ${props => props.isImage ? '0' : '1rem 1rem 0'};
    padding: ${props => props.isImage ? '0' : '.5rem'};
  }

  .photo-container {
    max-width: 50rem;
    margin: 3rem auto;

    img {
      width: 100%;
      min-width: 30rem;

      @media (max-width: 500px) {
        min-width: unset;
      }
    }
  }

  .file-icon svg {
    height: 8rem;
  }

  .file-name {
    font-size: 1.4rem;
    max-width: 7.5rem;
    display: inline-block;
  }

  .remove-overlay {
    transition: opacity .3s, background-color .3s;
    border-radius: ${props => props.isImage ? '0' : '.5rem'};
    opacity: 0;

    &:hover {
      background-color: ${props => props.theme.overlay};
      opacity: 1;
    }

    svg {
      color:  ${props => props.theme.danger};
      width: ${props => props.isImage ? '5rem' : '3rem'};
      height: ${props => props.isImage ? '5rem' : '3rem'};
      padding: 1rem;
      border-radius: 50%;
      pointer-events: none;

      .fa-secondary {
        opacity: 1;
      }
    }
  }

  .file-description {
    cursor: pointer;

    ${props => props.isImage ? '' : 'margin-top: 0'};

    &:hover {
      text-decoration: underline;
    }
  }

  .metadata-form-wrapper {
    background-color: ${props => props.theme.overlay};
    z-index: var(--zIndexFormOverlay);

    & > div {
      padding: 2rem;
    }
  }
`;

export default FilesManagerStyled;
