import React from 'react';
import TriangleExclamation from '../../components/TriangleExclamation/TriangleExclamation';
import ErrorMessageStyled from './ErrorMessageStyled';

const ErrorMessage = ({ msg, warning }) => msg
  ? (
    <ErrorMessageStyled className="cleanform__error-message" warning={!!warning}>{!!warning && <TriangleExclamation />}{msg}</ErrorMessageStyled>
  )
  : null;

export default ErrorMessage;
