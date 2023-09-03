import styled from 'styled-components';

export default styled.input`
  background-color: ${props => props.theme.formField || '#F2F2F4'};
  font-size: 2rem;
  width: 100%;
  position: relative;
  padding: 1.5rem 2rem;
  border: 2px solid transparent;
  border-radius: ${props => props.theme.borderRadiusBasic || '2px'};
  transition: background-color .5s;
  color: ${props => props.theme.textPrimary || '#333'};

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

  & ~ label {
    pointer-events: none;
    color: ${props => props.theme.textSecondary || '#666'};
    order: -1;
    width: 100%;
    margin-left: 1rem;
    font-size: 1.3rem;
    color: ${props => props.theme.textPrimary || '#333'};
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

  &[type=number] {
    padding-right: 4rem;
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
