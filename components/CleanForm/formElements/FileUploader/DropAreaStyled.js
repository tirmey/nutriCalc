import styled from 'styled-components';

const DropAreaStyled = styled.div`
  border: ${props => `4px dashed ${props.readyToDrop ? props.theme.primary : props.theme.textDisabled}`};
  border-radius: .6rem;
  background-color: ${props => props.theme.coc};
  position: relative;
  transition: border 1s, background-color 1s;

  .button-upload {
    pointer-events: ${props => props.readyToDrop ? 'none' : 'all'};
    padding: 2rem 2.5rem;
    margin: 5rem;
    font-family: var(--fontTitle);
    color: ${props => props.theme.textSecondary};
    font-size: 2rem;
    border-radius: .6rem;
    box-shadow: 0 0 20px -4px rgb(0 0 0 / 20%);
    background-color: ${props => props.theme.card};
    opacity:  ${props => props.readyToDrop ? '.1' : '1'};
    transition: opacity .5s, background-color .5s, color .5s;

    &:hover {
      background-color: ${props => props.theme.primary};
      color: ${props => props.theme.textLight};
    }
  }
`;

export default DropAreaStyled;
