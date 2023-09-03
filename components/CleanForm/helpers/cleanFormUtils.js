/* eslint-disable no-restricted-globals */
export const checkRequired = (state, element, allRequired) => {
  const isNotRequired = (!element.isRequired && !allRequired) || element.isNotRequired;
  if (isNotRequired) {
    return false;
  }

  return element.conditionalRender ? (!!element.conditionalRender(state) && !isNotRequired) : true;
};

export const submitValidation = props => {
  const { formSections, formState, formError, setFormError, formTouched, emptyFieldMsg, dynamicObject } = props;

  if (!formTouched) {
    return 'O formulário não foi editado.';
  }

  const newErrors = { ...formError };
  const errorsInOrderOfAppearance = [];

  const getAllRequiredFields = sections => {
    for (let i = 0; i < sections.length; i++) {
      const fields = sections[i].elemArr;
      const allRequired = sections[i].allRequired;
      for (let j = 0; j < fields.length; j++) {
        const elementIsRequired = checkRequired(formState, fields[j], allRequired);
        if (elementIsRequired && !formState[fields[j].name]) {
          newErrors[fields[j].name] = emptyFieldMsg;
        }

        const fieldIsRenderable = !fields[j].conditionalRender ? true : fields[j].conditionalRender(formState) ? true : false;
        if (fieldIsRenderable && fields[j].customValidation) {
          const value = formState[fields[j].name];
          const errorsOnCustomValidation = fields[j].customValidation(value, formState);

          if (errorsOnCustomValidation) {
            newErrors[fields[j].name] = errorsOnCustomValidation;
          } else {
            delete newErrors[fields[j].name];
          }
        }

        if (newErrors[fields[j].name]) {
          let valueToPush = fields[j].name;
          if (fields[j].el === 'radioset' || fields[j].el === 'checkboxset') {
            valueToPush = { type: fields[j].el, name: fields[j].name };
          }
          errorsInOrderOfAppearance.push(valueToPush);
        }
      }
    }
  };

  const formObj = dynamicObject ? [{ elemArr: formSections.fields, ...formSections }] : Object.values(formSections);
  getAllRequiredFields(formObj);

  setFormError(newErrors);

  return errorsInOrderOfAppearance;
};

export const checkNumber = val => {
  let value = `${val}`;
  if (value.includes(',')) {
    value = value.replace(',', '.');
  }

  if (isNaN(value) && value !== '.' && value !== '-') {
    return '';
  }

  if (value === '.') {
    return '0.';
  }

  if (value[0] === '0' && value.length === 2 && value[1] !== '.') {
    return `0.${value[1]}`;
  }

  return value;
};

export const getCurrentPage = (formSections, page) => {
  const sections = Object.values(formSections);
  return {
    currentSection: {
      ...sections[page - 1],
    },
  };
};

export const resetForm = (setForm, setErrors, setTouched) => {
  setForm({});
  setErrors({});
  setTouched({});
};

export const orderStateHandler = (st, inputNamesArr) => {
  const orderedState = {};
  for (let i = 0; i < inputNamesArr.length; i++) {
    if (st[inputNamesArr[i]]) {
      orderedState[inputNamesArr[i]] = st[inputNamesArr[i]];
    }
  }

  return orderedState;
};

export const checkFormAnswers = (data, checked) => {
  if (!data) {
    return '';
  }

  const { answer, option } = data;
  const classes = 'input-disabled';
  if (!answer) {
    return '';
  }

  if (answer === option) {
    return `${classes} test-answer-right`;
  }

  if (checked && (answer !== option)) {
    return `${classes} test-answer-wrong`;
  }
  return classes;
};

export const resetFormHandler = (setReset, time = 1000) => {
  setReset(true);
  setTimeout(() => {
    setReset();
  }, time);
};
