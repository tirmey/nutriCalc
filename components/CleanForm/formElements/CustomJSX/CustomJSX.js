import React from 'react';
import CustomJSXStyled from './CustomJSXStyled';

const CustomJSX = props => {
  const { element, formState } = props

  return (
    <CustomJSXStyled className={`custom-jsx ${element.classes || ''}`} key={element.name}>
      {element.jsx(formState)}
    </CustomJSXStyled>
  );
};

export default CustomJSX;
