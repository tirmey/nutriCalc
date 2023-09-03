import React from 'react';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import InputInfo from '../../components/InputInfo/InputInfo';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import TextareaStyled from './TextareaStyled';

const Textarea = ({
  autoFocus,
  id,
  containerClasses,
  defaultValue,
  classes,
  formState,
  errorMessage,
  info,
  infoClickHandler,
  inputHandler,
  inputRef,
  isRequired,
  labelText,
  maxLength,
  name,
  readOnly,
  rows,
  subtitle,
  title,
  value,
  warning,
}) => {
  const warningMsg = warning ? warning(value) : null;

  return (
    <FieldsetStyled
      className={`fieldset-textarea ${errorMessage ? 'invalid-field' : ''} ${containerClasses || ''}`}
      invalidField={!!errorMessage}
      readOnly={readOnly}
    >
      <label htmlFor={id || name}>
        <span>
          {typeof labelText === 'string' ? labelText : labelText(formState)}
          {isRequired && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório"> *</span>)}
        </span>
        {!!info && (
        <InputInfo
          info={info}
          infoClickHandler={infoClickHandler}
        />
        )}
      </label>
      {!!subtitle && <p className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(formState)}</p>}
      <TextareaStyled
        autoFocus={autoFocus}
        id={id || name}
        value={value}
        defaultValue={defaultValue}
        name={name}
        onChange={inputHandler}
        ref={inputRef}
        required={isRequired}
        className={`${classes || ''} ${value ? '' : 'empty-field'}`}
        title={title}
        readOnly={readOnly}
        rows={rows}
        tabIndex={readOnly ? -1 : 0}
        maxLength={maxLength}
      />
      <ErrorMessage
        msg={!errorMessage && warningMsg ? warningMsg : errorMessage}
        warning={!errorMessage && warningMsg}
      />
    </FieldsetStyled>
  );
};

export default Textarea;
