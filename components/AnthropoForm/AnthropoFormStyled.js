import styled from 'styled-components';

const AnthropoFormStyled = styled.div`
  form {
    .form-section {
      @media (max-width: 768px) {
        padding: 0;
      }
    }

    input[name=aim] {
      max-width: 8rem;
    }

  }

  .anthro-form .header-text {
    h3, p {
      position: static;
    }
  }


`;

export default AnthropoFormStyled;
