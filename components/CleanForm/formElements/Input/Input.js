import React, { useState } from 'react';
import Eye from '../../components/Eye/Eye';
import EyeSlash from '../../components/Eye/EyeSlash';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import InputInfo from '../../components/InputInfo/InputInfo';
import { checkFormAnswers } from '../../helpers/cleanFormUtils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InputStyled from './InputStyled';

const Input = ({
  autoFocus,
  autoComplete,
  blurHandler,
  checked,
  clickHandler,
  containerClasses,
  copyHandler = () => {},
  dataset,
  defaultValue,
  disabled,
  errorMessage,
  fieldsetStyles,
  focusHandler,
  formState,
  id,
  info,
  infoClickHandler,
  inputClasses,
  inputHandler = () => {},
  inputRef,
  inputMode,
  isRequired,
  keyPressHandler,
  labelText,
  maxLength,
  name,
  placeholder,
  radioAnswers,
  readOnly,
  submitting,
  submitWithEnter,
  subtitle,
  title,
  type,
  unit,
  value,
  min,
  max,
  warning,
}) => {
  const warningMsg = warning ? warning(value) : null;
  const [passwordStyle, setPasswordStyle] = useState('hide');
  const notCheckboxOrRadio = type !== 'checkbox' && type !== 'radio';


  const showPasswordHandler = (e, setStyle) => {
    if (e.currentTarget.previousElementSibling.type === 'password') {
      e.currentTarget.previousElementSibling.type = 'text';
      setStyle('show');
    } else {
      e.currentTarget.previousElementSibling.type = 'password';
      setStyle('hide');
    }
  };

  return (
    <FieldsetStyled
      className={`fieldset-${type || 'text'} ${containerClasses || ''} ${errorMessage ? 'invalid-field' : ''} ${(isRequired && notCheckboxOrRadio) ? 'fieldset-required' : ''} ${checked ? 'fieldset-checked' : ''}`}
      invalidField={!!errorMessage}
      style={fieldsetStyles}
      readOnly={readOnly}
    >
      <div className={`input-wrapper ${checked ? 'input-checked' : ''}`}>
        <label htmlFor={id || name} title={title || ''} tabIndex={!notCheckboxOrRadio ? 0 : -1} className={`input-label ${checkFormAnswers(radioAnswers, checked)}`}>
          <span>{!labelText ? null : (!notCheckboxOrRadio || typeof labelText === 'string') ? labelText : labelText(formState)} {(isRequired && notCheckboxOrRadio) && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>)}</span>
        </label>
        {!!subtitle && <p className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(formState)}</p>}
        <div className='input-unit-wrapper'>
          <InputStyled
            aria-disabled={readOnly}
            autoComplete={autoComplete ? '' : 'chrome-off'}
            autoCorrect="off"
            autoFocus={autoFocus}
            checked={checked}
            className={`${inputClasses || ''} ${submitting ? 'submitting-input' : ''} ${value ? '' : 'empty-field'}`}
            data-data={JSON.stringify(dataset)}
            defaultValue={defaultValue}
            disabled={radioAnswers?.answer ? true : !disabled ? null : typeof disabled === 'boolean' ? disabled : disabled(formState)}
            id={id || name}
            inputMode={inputMode ? inputMode : (type && type === 'number') ? 'numeric' : 'text'}
            max={(!max || typeof max === 'string') ? (max || '') : max(formState)}
            maxLength={maxLength || ''}
            min={(!min || typeof min === 'string') ? (min || '') : min(formState)}
            name={name}
            onClick={clickHandler ? clickHandler : () => {}}
            onChange={inputHandler}
            onCopy={copyHandler}
            onFocus={focusHandler ? focusHandler : () => {}}
            onBlur={blurHandler ? blurHandler : () => {}}
            onKeyPress={keyPressHandler ? keyPressHandler : e => { if (e.key === 'Enter' && !submitWithEnter) { e.preventDefault(); } }}
            placeholder={placeholder || ' '}
            required={isRequired}
            readOnly={readOnly}
            ref={inputRef}
            tabIndex={readOnly ? -1 : 0}
            title={title}
            unit={unit}
            type={!type || type === 'number' ? 'text' : type}
            value={value}
          />
          {unit && (
            <span className="input-unit">{unit}</span>
          )}
        </div>
        {(type === 'password' && passwordStyle === 'show') && (
          <EyeSlash clickHandler={e => showPasswordHandler(e, setPasswordStyle)} classes={`form-password-eye ${info ? 'input-has-info' : ''}`} />
        )}
        {(type === 'password' && passwordStyle === 'hide') && (
          <Eye clickHandler={e => showPasswordHandler(e, setPasswordStyle)} classes={`form-password-eye ${info ? 'input-has-info' : ''}`} />

        )}
        {!!info && notCheckboxOrRadio && <InputInfo info={info} infoClickHandler={infoClickHandler} />}
        <ErrorMessage
          msg={!errorMessage && warningMsg ? warningMsg : errorMessage}
          warning={!errorMessage && warningMsg}
        />
        {autoComplete && <div className="autocomplete-div" />}
      </div>
    </FieldsetStyled>
  );
};

export default Input;
