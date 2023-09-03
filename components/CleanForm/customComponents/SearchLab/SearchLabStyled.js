import styled from 'styled-components';

const SearchLabStyled = styled.div`
  & > fieldset {
    margin: unset;
  }

  fieldset {
    & > div {
      display: flex;
      align-items: flex-end;

      @media (max-width: 600px) {
        flex-wrap: wrap;
      }

      input {
        height: 4rem;
        margin-right: 1rem;

        @media (max-width: 600px) {
          margin-right: unset;
        }
      }
    }
  }

  .remove-lab-div {
    margin-top: 4rem;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: ${props => props.theme.formField};
    border-radius: 0.2rem;

    .lab-name {
      font-size: 1.6rem;
    }

    svg {
      margin: .5rem;
      color: #fff;
      font-size: 2.4rem;

      .fa-secondary {
        color: ${props => props.theme.danger};
        opacity: 1;
      }
    }
  }
`;

export default SearchLabStyled;
