import React from 'react';
import Button from '../../components/Button/Button';
import PaginationStyled from './PaginationStyled';

const Pagination = props => {
  const { currentPage, totalPages, paginationBtnText, formTouched, clickHandler } = props;

  return (
    <PaginationStyled className="pagination__btn-div">
      {currentPage > 1 && (
        <Button
          medium
          myData="back"
          classes="pagination__btn-back"
          type="button"
          text={paginationBtnText.back}
          clickHandler={clickHandler}
        />
      )}
      {currentPage < totalPages && (
        <Button
          medium
          myData="next"
          classes="pagination__btn-next"
          text={paginationBtnText.next}
          type="button"
          clickHandler={clickHandler}
          disabled={!formTouched}
        />
      )}
    </PaginationStyled>
  );
};

export default Pagination;
