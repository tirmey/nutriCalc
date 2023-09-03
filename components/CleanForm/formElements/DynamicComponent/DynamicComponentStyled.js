import styled from 'styled-components';

const DynamicComponentStyled = styled.div`
  position: relative;
  margin: 3rem 0;
  padding: 2rem;
  border: 1px solid ${props => props.theme.formLines || '#eee'};
  border-radius: 4px;

  .transition-container {
    opacity: 0;
    transition: opacity .3s;

    &.enter-done {
      opacity: 1;
    }
  }

  .dynamic-object {
    &__overlay {
      background-color: ${props => props.theme.overlay || 'rgba(0, 0, 0, 0.8)'};
      z-index: 1/* var(--zIndexModal) */;
    }

    &__object-name {
      font-size: 2rem;
      font-weight: bold;
    }

    &__add-object {
      margin-top: 1rem;
      padding: revert;

      &:hover svg {
        transform: rotateZ(90deg);
      }

      & > div > span {
        display: flex;
        align-items: center;
      }

      svg {
        fill: #fff;
        margin-right: .5rem;
        transition: transform .3s cubic-bezier(.47,.08,.75,.48);
        height: 1.5rem;
      }
    }

    &__list-title {
        font-weight: bold;
        margin-top: 2rem;
      }

    &__form-new-window {
      background-color: ${props => props.theme.card || '#fff'};
      border-radius: 4px;
      overflow: hidden;
      width: 95%;
      max-width: 60rem;

      fieldset {
        margin-top: 5rem;
      }

      &__header {
        background-color: ${props => props.theme.headerForm || '#16a81b'};
        color: #fff;
        padding: 1rem 2rem;
        font-size: 2.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &__close {
        font-weight: bold;
        cursor: pointer;
        font-size: 3rem;
      }

      &__body {
        padding: 0 2rem 2rem;
        max-height: 65vh !important;
        overflow: auto !important;
      }

      &__submit-div {
        display: flex;
        justify-content: flex-end;
        margin: 6rem 0 1rem;

        button:last-of-type {
          margin-left: 1rem;
        }

        @media (max-width: 600px) {
          flex-wrap: wrap;
          margin: 3rem 0 1rem;

          button {
            width: 100%;
            margin: 1rem 0;

            &:last-of-type {
              margin-left: unset;
            }
          }

        }
      }

      &__validation-error {
        color: ${props => props.theme.invalidField || '#5aa'};
        text-align: right;
        pointer-events: none;
        font-size: 1.2rem;
      }
    }

    &__nested-level {
      padding: 1rem 1rem 0.5rem;
      position: relative;
      background-color: ${props => props.theme.overlayLight || 'rgba(35, 81, 199, 0.05)'};
      margin: .5rem 0;

      &.first-level {
        margin: 2rem 0;
      }

      &__title {
        font-weight: bold;
      }

      &__property {
        margin-left: 1rem;
        padding: .5rem;
        margin: 1rem;
        font-size: 1.3rem;

        @media (max-width: 500px) {
          margin: 1rem 0;
        }

        span {
          display: inline-block;
        }

        &__key {
          font-family: var(--fontTitleBold);
          width: 100%;
        }

        &__value {
          font-style: italic;
          font-weight: 100;
          padding: .3rem 1rem;
        }
      }

      &__object-actions-div.submit-div {
        padding: 0;
        position: absolute;
        top: 1rem;
        right: 1rem;

        svg {
          fill: ${props => props.theme.danger || '#911'};
          cursor: pointer;
          padding: .5rem;

          @media (max-width: 1023px) {
            padding: .75rem;
            margin: 0 .25rem;
          }

          path {
            pointer-events: none;
          }
        }

        .icon-action-edit svg {
          height: 1.5rem;
          fill: ${props => props.theme.icon || '#107010'};
        }

        .icon-action-delete svg {
          height: 1.5rem;
          fill: ${props => props.theme.icon || '#45a'};
        }
      }
    }
  }

  .required-field-asterisk {
    margin-left: .5rem;
  }
`;

export default DynamicComponentStyled;
