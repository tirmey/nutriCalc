/* eslint-disable import/no-cycle */
import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import DynamicComponent from './DynamicComponent';
import Input from '../Input/Input';
import Select from '../Select/Select';
import { checkRequired } from '../../helpers/cleanFormUtils';
import WithFormState from '../../hoc/WithFormState';
import WithTransition from '../../hoc/WithTransition';
import DynamicSelect from '../DynamicSelect/DynamicSelect';
import FileUploader from '../FileUploader/FileUploader';
import Textarea from '../TextArea/TextArea';
import { inputGroupSetProps, RadioOrCheckSet } from '../RadioOrCheckSet/RadioOrCheckSet';

export const generateForm = ({
  object,
  inputHandler,
  innerState = {},
  setInnerState,
  formError,
  setFormError,
  formTouched,
  setFormTouched,
  messagesHandler,
}) => {
  const fields = [];
  object.fields.forEach(field => {
    const isRequired = checkRequired(innerState, field, object.allRequired);
    switch (field.el) {
      case '':
      case undefined:
      case 'input':
        fields.push((
          <WithTransition
            key={field.name}
            name={field.name}
            conditionalRender={field.conditionalRender}
            formState={innerState}
            setFormState={setInnerState}
            formError={formError}
            setFormError={setFormError}
          >
            <Input
              {...field}
              key={field.name}
              value={innerState[field.name] || ''}
              errorMessage={formError[field.name]}
              inputHandler={inputHandler}
              isRequired={isRequired}
              formState={innerState}
            />
          </WithTransition>
        ));
        break;
      case 'textarea':
        fields.push((
          <WithTransition
            key={field.name}
            name={field.name}
            conditionalRender={field.conditionalRender}
            formState={innerState}
            setFormState={setInnerState}
            formError={formError}
            setFormError={setFormError}
          >
            <Textarea
              {...field}
              key={field.name}
              value={innerState[field.name] || ''}
              errorMessage={formError[field.name]}
              inputHandler={inputHandler}
              isRequired={isRequired}
              formState={innerState}
              messagesHandler={messagesHandler}
            />
          </WithTransition>
        ));
        break;
      case 'select':
        fields.push((
          <WithTransition
            key={field.name}
            name={field.name}
            conditionalRender={field.conditionalRender}
            formState={innerState}
            setFormState={setInnerState}
            formError={formError}
            setFormError={setFormError}
          >
            <Select
              {...field}
              key={field.name}
              value={innerState[field.name] || ''}
              errorMessage={formError[field.name]}
              inputHandler={inputHandler}
              isRequired={isRequired}
              formState={innerState}
            />
          </WithTransition>
        ));
        break;
      case 'customJSX':
        fields.push((
          <WithTransition
            key={field.name}
            name={field.name}
            conditionalRender={field.conditionalRender}
            formState={innerState}
            setFormState={setInnerState}
            formError={formError}
            setFormError={setFormError}
          >
            <div className={`custom-jsx ${field.classes || ''}`}>
              {field.jsx(innerState)}
            </div>
          </WithTransition>
        ));
        break;
      case 'dynamicComponent':
      case 'customComponent':
        fields.push((
          <WithTransition
            key={field.name}
            name={field.name}
            conditionalRender={field.conditionalRender}
            formState={innerState}
            setFormState={setInnerState}
            formError={formError}
            setFormError={setFormError}
          >
            <div className="component-transition-wrapper">
              <WithFormState
                {...field}
                key={field.name}
                name={field.name}
                state={innerState}
                setState={setInnerState}
                formError={formError}
                setFormError={setFormError}
                containerClasses={field.containerClasses}
                formTouched={formTouched}
                setFormTouched={setFormTouched}
                isRequired={isRequired}
              >
                {field.el === 'customComponent' ? field.component : <DynamicComponent obj={field} />}
              </WithFormState>
            </div>
          </WithTransition>
        ));
        break;
      case 'dynamicSelect':
        fields.push(
          <WithTransition
            key={field.name}
            name={field.name}
            conditionalRender={field.conditionalRender}
            formState={innerState}
            setFormState={setInnerState}
            formError={formError}
            setFormError={setFormError}
          >
            <DynamicSelect
              errorMessage={formError[field.name]}
              value={innerState[field.name] || ''}
              isRequired={isRequired}
              formState={innerState}
              setFormState={setInnerState}
              formError={formError}
              setFormError={setFormError}
              selectHandler={inputHandler}
              {...field}
            />
          </WithTransition>,
        );
        break;
      case 'file':
        console.log('>>>>>> has to design a proper way to handle files in dynamicComponents');
        console.log('field: >>>>>> ', field);
        console.log('formState: >>>>>> ', innerState);
        fields.push(
          <WithTransition
            key={field.name}
            name={field.name}
            conditionalRender={field.conditionalRender}
            formState={innerState}
            setFormState={setInnerState}
            formError={formError}
            setFormError={setFormError}
          >
            <FileUploader
              value={innerState[field.name] || ''}
              errorMessage={formError[field.name]}
              inputHandler={inputHandler}
              isRequired={isRequired}
              messagesHandler={messagesHandler}
              formTouched={formTouched}
              setFormTouched={setFormTouched}
              formState={innerState}
              setFormState={setInnerState}
              formError={formError}
              setFormError={setFormError}
              {...field}
              maxFiles={1}
            />
          </WithTransition>,
        );
        break;
      case 'radioset':
      case 'checkboxset':
        fields.push(
          <WithTransition
            key={field.name}
            name={field.name}
            conditionalRender={field.conditionalRender}
            formState={innerState}
            setFormState={setInnerState}
            formError={formError}
            setFormError={setFormError}
          >
            <RadioOrCheckSet
              {...inputGroupSetProps({
                ...field,
                isRequired,
                type: field.el === 'checkboxset' ? 'checkbox' : 'radio',
                arr: field.options,
                changeHandler: inputHandler,
                errorMessage: formError[field.name],
                state: innerState,
              })}
              formState={innerState}
              formAnswers={field.formAnswers}
              maxChecked={field.maxChecked}
              exactChecked={field.exactChecked}
              minChecked={field.minChecked}
            />
          </WithTransition>,
        );
        break;
      default:
        break;
    }
  });
  return fields;
};

export const resetInternalState = objProps => {
  const internalState = {};
  for (let i = 0; i < objProps.fields.length; i++) {
    const renderable = objProps.fields[i].conditionalRender ? objProps.fields[i].conditionalRender({}) : true;
    if (objProps.fields[i].name && renderable) {
      internalState[objProps.fields[i].name] = '';
    }
  }
  return internalState;
};

export const dynamicToArray = (fields, st) => {
  const newState = cloneDeep(st);
  for (let i = 0; i < fields.length; i++) {
    if (!newState[fields[i]]) {
      continue;
    }

    const propArr = Object.values(newState[fields[i]]);
    newState[fields[i]] = propArr;
  }

  return newState;
};

export const arrayToDynamic = (fields, st) => {
  const newState = cloneDeep(st);
  for (let i = 0; i < fields.length; i++) {
    if (!st[fields[i]]) {
      continue;
    }

    const newObj = {};
    for (let j = 0; j < st[fields[i]].length; j++) {
      newObj[`${fields[i]}_${Math.random()}`] = st[fields[i]][j];
    }
    newState[fields[i]] = newObj;
  }

  return newState;
};
