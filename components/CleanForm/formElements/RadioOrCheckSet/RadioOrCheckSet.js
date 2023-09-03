import React from 'react';
import Check from '../../components/Check/Check';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import InputInfo from '../../components/InputInfo/InputInfo';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Input from '../Input/Input';
import RadioOrCheckSetStyled from './RadioOrCheckSetStyled';

export const RadioInput = ({ text, info, infoClickHandler }) => (
  <>
    <div className="radio-btn__wrapper">
      <div className="radio-btn__external centered-wrap">
        <div className="radio-btn__internal" />
      </div>
    </div>
    <span>{text}</span>
    {!!info && <InputInfo info={info} infoClickHandler={infoClickHandler} /> }
  </>
);

export const CheckboxInput = ({ text, info, infoClickHandler }) => (
  <>
    <div className="checkbox-toggler">
      <Check />
    </div>
    <span>{text}</span>
    {!!info && <InputInfo info={info} infoClickHandler={infoClickHandler} /> }
  </>
);

export const inputGroupSetProps = ({ type, name, title, containerClasses, changeHandler, arr, state, allSetInfo, subtitle, infoClickHandler, isRequired, errorMessage }) => ({
  type,
  name,
  title,
  changeHandler,
  containerClasses,
  allSetInfo,
  subtitle,
  infoClickHandler,
  isRequired,
  errorMessage,
  options: arr.map(item => {
    const infoClckHandler = item.infoClickHandler ? item.infoClickHandler : () => {};
    if (typeof item === 'string') {
      return {
        id: item,
        value: item,
        title: item,
        checked: type === 'radio' ? state[name] === item : state[name] ? state[name].includes(item) : false,
        label: (!type || type === 'radio')
          ? <RadioInput text={item} info={item.info} infoClickHandler={infoClckHandler} />
          : <CheckboxInput text={item} info={item.info} infoClickHandler={infoClckHandler} />,
        info: item.info,
        infoClickHandler: infoClckHandler,
      };
    }

    return {
      id: item.id || item.value,
      value: item.value || item.title,
      title: item.title,
      checked: type === 'radio' ? state[name] === item.value : state[name] ? state[name].includes(item.value) : false,
      label: (!type || type === 'radio')
        ? <RadioInput text={item.label} info={item.info} infoClickHandler={infoClckHandler} />
        : <CheckboxInput text={item.label} info={item.info} infoClickHandler={infoClckHandler} />,
      info: item.info,
      infoClickHandler: infoClckHandler,
    };
  }),
});

export const RadioOrCheckSet = ({
  type,
  name,
  title,
  options,
  changeHandler,
  isRequired,
  errorMessage,
  formAnswers,
  formState,
  validationHandler,
  containerClasses,
  allSetInfo,
  infoClickHandler,
  subtitle,
  warning,
}) => {
  const warningMsg = warning ? warning(formState[name]) : null;
  return (
    <FieldsetStyled className={`fieldset-${type}-set-${name}`}>
      <RadioOrCheckSetStyled
        className={`${type}-set  ${type}-set-${name} ${containerClasses || ''} ${errorMessage ? `${type}-set__error` : ''} ${isRequired ? `${type}-set__required` : ''} custom-scrollbar`}
        data-name={name}
        name={`${type}_set_${name}`}
      >
        <div className={`${type}-set__title ${isRequired ? 'required' : ''}`}>
          {!!title && <h2>{typeof title === 'string' ? title : title(formState)} {isRequired && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>)}</h2>}
          {allSetInfo && <InputInfo info={allSetInfo} infoClickHandler={infoClickHandler} />}
        </div>
        {!!subtitle && <div className={`${type}-set__subtitle fieldset-subtitle`}>{subtitle}</div>}
        <div className={`${type}-set__options custom-scrollbar`}>
          {options.map(opt => (
            <Input
              key={opt.id}
              id={`${name}-${opt.id}`}
              type={type}
              name={name}
              labelText={opt.label}
              value={opt.value}
              defaultValue={opt.defaultValue}
              inputHandler={changeHandler}
              required={(isRequired || validationHandler)}
              checked={opt.checked}
              disabled={opt.disabled}
              readOnly={opt.readOnly}
              tabIndex={opt.readOnly ? -1 : 0}
              aria-disabled={opt.readOnly}
              className={opt.inputClasses}
              data-data={JSON.stringify(opt.dataset)}
              title={opt.title}
              info={opt.info}
              infoClickHandler={opt.infoClickHandler ? opt.infoClickHandler : () => {}}
              radioAnswers={{ question: title, answer: formAnswers ? formAnswers[title] : null, option: opt.value }}
            />
          ))}
        </div>
        <ErrorMessage
          msg={!errorMessage && warningMsg ? warningMsg : errorMessage}
          warning={!errorMessage && warningMsg}
        />
      </RadioOrCheckSetStyled>
    </FieldsetStyled>
  );
};
