import React from 'react';
import MyTransition from '../../MyTransition/MyTransition';
import { Loader } from '../Loader/Loader';
import ButtonStyled from './ButtonStyled';

const Button = props => {
  const {
    buttonStyle = 'default',
    clickHandler = () => {},
    classes = '',
    color,
    disabled,
    isSubmitting,
    myData,
    size = 'medium',
    text,
    title = '',
    styles = {},
    type = 'button',
  } = props;

  return (
    <ButtonStyled
      disabled={isSubmitting || disabled}
      onClick={clickHandler}
      className={`my-button ${classes} ${buttonStyle === 'danger' ? 'button-danger' : ''}`}
      danger={buttonStyle === 'danger'}
      warning={buttonStyle === 'warning'}
      size={size}
      isSubmitting={isSubmitting}
      title={title}
      type={type}
      data-mydata={myData}
      style={{ ...styles }}
      color={color}
    >
      <MyTransition showElement={!isSubmitting}>
        <span>{text}</span>
      </MyTransition>
      <MyTransition showElement={!!isSubmitting}>
        <Loader classes="button-submitting-loader" />
      </MyTransition>
    </ButtonStyled>
  );
};

const propsAreEqual = (prev, next) => prev.disabled === next.disabled && prev.isSubmitting === next.isSubmitting && prev.text === next.text && prev.clickHandler === next.clickHandler;

export default React.memo(Button, propsAreEqual);
