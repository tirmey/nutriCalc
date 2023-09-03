import styled from 'styled-components';

const PaginationStyled = styled.div`    
  position: absolute;
  pointer-events: none;
  height: 4rem;
  width: calc(100% - 50px);
  right: 2.5rem;
  bottom: 5rem;

  button {
    top: 0;
    pointer-events: all;
    position: absolute;
  }

  .pagination__btn-back {
    left: 0;
  }

  .pagination__btn-next {
    right: 0;
  }    
  
`;

export default PaginationStyled;
