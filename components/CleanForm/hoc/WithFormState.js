import React, { Children, isValidElement, cloneElement, useState, useEffect } from 'react';
import ErrorMessage from '../formElements/ErrorMessage/ErrorMessage';

const WithFormState = props => {
  const {
    children,
    containerClasses,
    formError,
    setFormError,
    state,
    setState,
    name,
    title,
    labelText,
    subtitle,
    formTouched,
    setFormTouched,
    isRequired,
    showErrorMessage = true,
    messagesHandler,
    warning,
    customValidation,
  } = props;

  const [childrenWithProps, setChildrenWithProps] = useState();

  const warningMsg = warning ? warning(state) : null;

  const passChildren = (stateParam, formErrorParam) => {
    const childEdited = Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          name,
          title,
          labelText,
          subtitle,
          formError: formErrorParam,
          setFormError,
          state: stateParam,
          setState,
          formTouched,
          setFormTouched,
          messagesHandler,
          isRequired,
          warning,
          customValidation,
          ...child.props,
        });
      }
      return child;
    });
    setChildrenWithProps(childEdited);
  };

  useEffect(() => {
    passChildren(state, formError);
  }, [state, formError]);

  return childrenWithProps
    ? (
      <div className={containerClasses} style={{ position: 'relative' }}>
        {childrenWithProps}
        {((formError[name] && showErrorMessage) || warningMsg) && (
          <ErrorMessage
            msg={!formError[name] && warningMsg ? warningMsg : formError[name]}
            warning={!formError[name] && warningMsg}
          />
        )}
      </div>
    )
    : null;
};

export default WithFormState;
