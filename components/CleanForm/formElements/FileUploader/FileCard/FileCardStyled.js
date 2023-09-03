import styled from 'styled-components';

const FileCardStyled = styled.span`
    display: flex;
    flex-direction: column;
    width: 8rem;
    margin: 1rem;
    cursor: pointer;
    border-radius: .4rem;
    position: relative;
    transition: background-color .2s;
    overflow: hidden;

    &:hover {
      background-color: #115c9934;

      .file-card__file-action {
        opacity: .7;
        pointer-events: all;
      }
    }

  .file-card {
    &__icon {
      height: 10rem;
      fill: ${props => props.theme.textPrimary};
    }

    &__icon-container {
      position: relative;
      height: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: ${props => props.isImage ? '0 0 20px -6px rgb(0 0 0 / 50%)' : 'unset'};
    }

    &__icon-extension {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      font-size: 2rem;
      font-weight: bold;
    }

    &__image {
      max-width: 8rem;
      max-height: 10rem;
    }

    &__file-name {
      font-size: 1.1rem;
      margin-top: .4rem;
      padding: .3rem;

      &.long-name {
        word-break: break-all;
      }
    }

    &__delete-file {
      position: absolute;
      bottom: 0;
      right: 0;
      height: ${props => props.hasDescription ? '50%' : '100%'};
      width: 100%;
      background-color: ${props => props.theme.danger};
      z-index: 1;
      opacity: 0;
      pointer-events: none;
      transition: opacity .4s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
          opacity: 1
        }

      &:after {
        content: '×';
        color: #fff;
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 4px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;

      }
    }

    &__add-description {
      position: absolute;
      top: 0;
      right: 0;
      height: 50%;
      width: 100%;
      background-color: #666;
      z-index: 1;
      opacity: 0;
      pointer-events: none;
      transition: opacity .4s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
          opacity: 1
        }

      &:after {
        content: '✎';
        color: #fff;
        font-size: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 4px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export default FileCardStyled;
