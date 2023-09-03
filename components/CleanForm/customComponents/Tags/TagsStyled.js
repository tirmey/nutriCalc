import styled from 'styled-components';

const TagsStyled = styled.span`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.cardContrast};
  margin: .4rem;
  padding: 0 .8rem;
  border-radius: .4rem;

  .tags {
    &__text {
      font-size: 1.6rem;

      @media (max-width: 500px) {
        font-size: 1.4rem;
      }
    }

    &__close {
      font-size: 2.5rem;
      margin-left: .5rem;
      cursor: pointer;

      @media (max-width: 500px) {
        font-size: 2rem;
        margin-left: .25rem
      }
    }
  }
`;

export default TagsStyled;
