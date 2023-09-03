/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import CustomRadioButtonSetStyled from './CustomRadioButtonSetStyled';
import CustomRadioItem from './CustomRadioItem';

const CustomRadioButtonSet = props => {
  const { name, title, items, globalOptions, setState, state, isRequired, formError, setFormError, subtitle, customValidation } = props;

  const changeHandler = e => {
    const propName = e.target.name;
    const propValue = e.target.value;
    const newState = cloneDeep(state);

    if (!newState[name]) {
      newState[name] = {};
    }
    newState[name][propName] = propValue;
    setState(newState);

    const validationMsg = customValidation && customValidation(newState[name], newState);
    if (validationMsg) {
      setFormError({ ...formError, [name]: validationMsg });
    } else {
      const newFormError = cloneDeep(formError);
      delete newFormError[name];
      setFormError(newFormError);
    }
  };

  return (
    <CustomRadioButtonSetStyled className="custom-radio-set" name={name}>
      <h2 className="custom-radio-set__title">{title} {isRequired && <span className="required-field-asterisk">*</span>}</h2>
      {!!subtitle && <p className="custom-radio-set__item">{subtitle}</p>}
      <div className="custom-radio-set__body">
        {items.map(item => (
          <CustomRadioItem
            key={item.name}
            item={item}
            elState={state[name]}
            changeHandler={changeHandler}
            globalOptions={globalOptions}
          />
        ))}
      </div>
    </CustomRadioButtonSetStyled>
  );
};

export default CustomRadioButtonSet;
