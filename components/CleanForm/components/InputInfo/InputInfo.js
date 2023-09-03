import React from 'react';
import CircleQuestion from '../CircleQuestion/CircleQuestion';
import Hint from '../Hint/Hint';
import InputInfoStyled from './InputInfoStyled';

const InputInfo = ({ infoClickHandler, info }) => (
  <InputInfoStyled
    className={`input-info-container ${infoClickHandler ? 'with-click-handler' : ''}`}
    withClickHandler={!!infoClickHandler}
    onClick={infoClickHandler ? infoClickHandler : () => {}}
  >
    <Hint
      classes="input-info-hint"
      text={info}
    >
      <CircleQuestion
        classes="input-info-icon"
        classQuestionMark="input-info-question-mark"
        classCircle="input-info-circle"
        styles={{ opacity: 1 }}
      />
    </Hint>
  </InputInfoStyled>
);

export default InputInfo;
