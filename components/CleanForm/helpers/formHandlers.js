import cloneDeep from 'lodash.clonedeep';
import { pluralHandler } from '../../../utils/stringUtils';
import { checkNumber } from './cleanFormUtils';

export const inputHandler = props => {
  const { event: e, customValidation, customInputHandler, formState, setFormState, formError, setFormError, changeCausesResetForm, changeCausesResetFields } = props;
  const value = e.target.value;
  const input = e.target.name;

  if (changeCausesResetForm) {
    const returnedState = { [input]: value };

    const { exclude = [] } = changeCausesResetForm;
    for (let i = 0; i < exclude.length; i++) {
      returnedState[exclude[i]] = formState[exclude[i]];
    }

    setFormState(returnedState);
    setFormError({});
    return;
  }

  const newState = cloneDeep(formState);
  const newErrorState = { ...formError };
  let newError;

  if (changeCausesResetFields) {
    for (let i = 0; i < changeCausesResetFields.length; i++) {
      delete newState[changeCausesResetFields[i]];
      delete newErrorState[changeCausesResetFields[i]];
    }
  }

  newState[input] = customInputHandler ? customInputHandler(value, newState, e) : value;

  if (!value) {
    delete newState[e.target.name];
    if (e.target.required) {
      newErrorState[input] = 'Este campo deve ser preenchido.';
      setFormState(newState);
      return setFormError(newErrorState);
    }
  }
  delete newErrorState[input];

  if (e.target.inputMode === 'decimal' || e.target.inputMode === 'numeric') {
    newState[input] = checkNumber(value).trim();
  }

  if (customValidation) {
    newError = customValidation(newState[input], newState);
    if (newError) {
      newErrorState[input] = newError;
    }
  }

  setFormError(newErrorState);
  setFormState(newState);

  const caret = e.target.selectionStart;
  const element = e.target;

  if (customInputHandler && caret) {
    window.requestAnimationFrame(() => {
      element.selectionStart = caret;
      element.selectionEnd = caret;
    });
  }
};

export const radioChangeHandler = props => {
  const { event: e, formState, setFormState, formError, setFormError, customValidation } = props;
  const { value, name } = e.target;

  const newFormError = { ...formError };
  let error;
  if (customValidation) {
    error = customValidation(value, formState);
    if (error) {
      newFormError[name] = error;
    }
  }

  if (!error && newFormError[name]) {
    delete newFormError[name];
  }

  if (error) {
    newFormError[name] = error;
  } else {
    delete newFormError[name];
  }

  setFormError(newFormError);
  return setFormState({ ...formState, [name]: value });
};

export const checkboxChangeHandler = props => {
  const { event: e, customValidation, formState, setFormState, formError, setFormError, maxChecked, exactChecked, minChecked } = props;
  const value = e.target.value;
  const checked = e.target.checked;
  const checkboxName = e.target.name;
  const newFormState = { ...formState };
  const newFormError = { ...formError };

  const maxCheckedExceededMsg = `Escolha, no máximo, ${maxChecked} ${pluralHandler('alternativa', maxChecked)}.`;
  const notExactCheckedMsg = `Escolha, exatamente, ${exactChecked} ${pluralHandler('alternativa', exactChecked)}.`;
  const minCheckedMsg = `Escolha, ao menos, ${minChecked} ${pluralHandler('alternativa', minChecked)}.`;

  let error;
  if (customValidation) {
    error = customValidation(value, formState);
  }

  if (maxChecked) {
    if (checked && formState[checkboxName]?.length >= maxChecked) {
      error = maxCheckedExceededMsg;
    } else if (!checked && (formState[checkboxName]?.length || 0) > maxChecked + 1) {
      error = maxCheckedExceededMsg;
    }
  }

  if (exactChecked) {
    if (!checked && formState[checkboxName]?.length !== 3) {
      error = notExactCheckedMsg;
    }
    if (checked && formState[checkboxName]?.length !== 1) {
      error = notExactCheckedMsg;
    }
  }

  if (minChecked) {
    if (checked && ((formState[checkboxName]?.length || 0) + 1) < minChecked) {
      error = minCheckedMsg;
    } else if (!checked && (formState[checkboxName]?.length || 0) < minChecked + 1) {
      error = minCheckedMsg;
    }
  }

  if (error) {
    newFormError[checkboxName] = error;
  } else {
    delete newFormError[checkboxName];
  }

  if (checked) {
    if (!newFormState[checkboxName]) {
      newFormState[checkboxName] = [];
    }
    const newCheckboxValue = [...newFormState[checkboxName], value].sort();
    newFormState[checkboxName] = newCheckboxValue;
  } else {
    const newCheckboxValue = newFormState[checkboxName].filter(item => item !== e.target.value);
    if (!newCheckboxValue.length) {
      delete newFormState[checkboxName];
    } else {
      newFormState[checkboxName] = newCheckboxValue;
    }
  }
  setFormError(newFormError);
  return setFormState(newFormState);
};

const editFileDescription = (name, filename, file, st) => st[name].map(it => it.name === filename ? file : it);

export const filesChangeHandler = props => {
  const { event, formState, setFormState, formError, setFormError, isRequired } = props;
  const name = event.target.name;
  const stateFiles = formState[name] || [];
  const newState = cloneDeep(formState);

  let
    file,
    filename;

  if (!event.target.action) {
    const files = event.dataTransfer?.files || event.target?.files;
    newState[name] = [...stateFiles, ...files];
    if (formError[name]) {
      const newFormErrors = cloneDeep(formError);
      delete newFormErrors[name];
      setFormError(newFormErrors);
    }
  } else {
    filename = event.target.dataset.name;
    file = formState[name]?.find(it => it.name === event.target.dataset.name);
  }

  if (event.target.action === 'delete') {
    newState[name] = newState[name].filter(it => it.name !== filename);
    if (!newState[name]?.length && isRequired) {
      setFormError({ ...formError, [name]: 'Este campo deve ser preenchido' });
    }
  } else if (event.target.action === 'description') {
    file.description = event.target.description;
    newState[name] = editFileDescription(name, filename, file, newState);
  }

  setFormState(newState);
};

const formHandlers = props => {
  const { event } = props;

  if (event.target.type) {
    const type = event.target.type;
    // if the element has the type attribute, is an INPUT
    if (type === 'radio') {
      return radioChangeHandler(props);
    }
    if (type === 'checkbox') {
      return checkboxChangeHandler(props);
    }
    if (type === 'file') {
      return filesChangeHandler(props);
    }
  }

  // if it´s not a RADIO, a FILE or a CHECKBOX it´s a SELECT, a TEXTAREA or an ordinary INPUT type. So, attach the usual inputHandler function.
  return inputHandler(props);
};

export default formHandlers;
