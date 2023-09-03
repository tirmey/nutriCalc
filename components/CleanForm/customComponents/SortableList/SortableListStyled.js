import styled from 'styled-components';

const SortableListStyled = styled.div`
  border: 1px solid #eee;
  padding: 2rem;
  border-radius: .4rem;

  .sortable-list-item {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      pointer-events: none;
      font-size: 2rem;
    }

    button {
      &.disabled {
        opacity: .3;
        pointer-events: none;

        svg {
          color: ${props => props.theme.textSecondary};
        }
      }
    }
    button:hover svg {
      color: ${props => props.theme.iconLight};
    }

    &__title {
      display: flex;
      align-items: center;
      
      &.long-words {
        word-break: break-all;
      }
    }

    &__actions {
      min-width: 6rem;
    }

    &__thumbnail {
      height: 5rem;
    }
  }
`;

export default SortableListStyled;
