import styled from 'styled-components';

export default styled.input`
  background-color: ${props => props.theme.formField || '#F2F2F2'};
  font-size: 2rem;
  max-width: 70%;
  min-width: 20%;
  position: relative;
  padding: ${({ unit }) => unit ? '.5rem 0 .5rem 2rem' : '1.5rem 2rem'};
  border: 2px solid transparent;
  border-radius: ${({ unit }) => unit ? 'var(--borderRadiusBig) 0 0 var(--borderRadiusBig)' : ' var(--borderRadiusBig)'};
  transition: background-color .5s;
  color: ${props => props.theme.textPrimary || '#333'};
  text-align: right;
  height: 4rem;

  @media (max-width: 400px) {
    font-size: 1.6rem;
  }

  &::placeholder {
    opacity: 0;
    transition: opacity .4s;
  }

  // TO HIDE EDGE REVEAL_PASSWORD EYE ICON
  &::-ms-reveal, &::-ms-clear {
    display: none;
  }

  &:disabled {
    color: ${props => props.theme.textSecondary || '#666'};
    font-style: italic;
  }

  &:focus::not(:readonly) {
    border-color: ${props => props.theme.inputBorderFocus || '#999'};
    border-radius: .2rem;
  }

  & ~ .input-unit {
    border-radius: 0 var(--borderRadiusBig) var(--borderRadiusBig) 0;
    height: 4rem;
    background-color: #f2f2f2;
    padding: 1.2rem 1rem 0rem .5rem;
    right: 1.5rem;
    font-family: var(--fontBold);
    font-size: 1.6rem;
    color: ${props => props.theme.formFieldUnit};
  }

  &.inline-text {
    width: unset;
  }

  &:read-only {
    background-color: #eee;
    color: #666;
    cursor: not-allowed;
  }

  &[type=date], &[type=datetime-local], &[type=time] {

    &::placeholder {
      color: ${props => props.theme.textSecondary || '#666'};

    }
    padding-right: 4rem;

    &::-webkit-calendar-picker-indicator {
      filter: invert(.7);
    }
  }

  &[inputmode=numeric] {
    font-size: 3rem;
  }


  &[type=submit] {
    transition: background-color .3s, padding .3s;

    &.submitting-input {
      padding-right: 5.5rem;
      background-color: ${props => props.theme.textSecondary || '#666'};
      color: ${props => props.theme.textPrimary || '#333'};
      cursor: not-allowed;
    }
  }
`;
