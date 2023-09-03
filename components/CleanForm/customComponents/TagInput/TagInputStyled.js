import styled from 'styled-components';

const TagInputStyled = styled.div`
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .input-info-container {
    position: absolute;
    bottom: 2rem;
    right: 2rem;

    @media (max-width: 400px) {
      bottom: 1.8rem;

    }
  }
`;

export default TagInputStyled;
