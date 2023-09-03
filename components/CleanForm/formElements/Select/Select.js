import React from 'react';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import InputInfo from '../../components/InputInfo/InputInfo';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SelectStyled from './SelectStyled';

const Select = ({
  blurHandler,
  classes,
  containerClasses,
  defaultValue,
  disabled,
  errorMessage,
  fieldsetStyles,
  firstOptionLabel = 'selecione:',
  firstOptionDisabled,
  focusHandler,
  formState,
  id,
  info,
  infoClickHandler,
  inputHandler,
  isRequired,
  labelText,
  name,
  options,
  optionsUpperCase,
  readOnly,
  subtitle,
  value,
  warning,
}) => {
  const warningMsg = warning ? warning(value) : null;

  const getOptions = () => {
    const getOption = opt => {
      let optionLabel = typeof opt === 'string' ? opt : opt.label;
      if (optionsUpperCase) {
        optionLabel = optionLabel.toUpperCase();
      }

      return (
        <option
          key={typeof opt === 'string' ? opt : opt.value}
          value={typeof opt === 'string' ? opt : opt.value}
        >
          {optionLabel}
        </option>
      );
    };

    return Array.isArray(options)
      ? options.map(opt => getOption(opt))
      : options(formState)?.map(it => getOption(it));
  };

  return (
    <FieldsetStyled
      className={`fieldset-select ${containerClasses || ''} ${errorMessage ? 'invalid-field' : ''}`}
      style={fieldsetStyles}
      readOnly={readOnly}
    >
      <label className="select-label" htmlFor={id || name}>
        {labelText && <span>{typeof labelText === 'string' ? labelText : labelText(formState)} {isRequired && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>)}</span>}
      </label>
      {info && <InputInfo info={info} infoClickHandler={infoClickHandler} />}
      {!!subtitle && <p className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(formState)}</p>}
      <SelectStyled
        id={id ? `${name}-${id}` : name}
        className={`${classes} ${value ? '' : 'empty-field'}`}
        disabled={(!disabled && !readOnly) ? null : readOnly ? true : typeof disabled === 'boolean' ? disabled : disabled(formState)}
        name={name}
        value={value}
        defaltValue={defaultValue || ''}
        onBlur={blurHandler || null}
        onChange={inputHandler}
        onFocus={focusHandler || null}
        required={isRequired ? true : false}
        tabIndex={readOnly ? -1 : 0}
        aria-disabled={readOnly ? true : false}
      >
        <option value="" disabled={firstOptionDisabled}>{firstOptionLabel}</option>
        {getOptions(options)}
      </SelectStyled>
      <ErrorMessage
        msg={!errorMessage && warningMsg ? warningMsg : errorMessage}
        warning={!errorMessage && warningMsg}
      />
    </FieldsetStyled>
  );
};

export default Select;
