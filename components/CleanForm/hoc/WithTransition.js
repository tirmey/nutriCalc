import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

const WithTransition = props => {
  const { children, name, conditionalRender, formState, setFormState, formError, setFormError } = props;

  return (
    <CSSTransition
      in={typeof conditionalRender === 'function' ? !!conditionalRender(formState) : true}
      timeout={{
        enter: 100,
        exit: 500,
      }}
      onExited={() => {
        if (!children?.props?.keepValue) {
          const newState = cloneDeep(formState);
          delete newState[name];
          setFormState(newState);
          if (formError[name]) {
            const newFormError = cloneDeep(formError);
            delete newFormError[name];
            setFormError(newFormError);
          }
        }
      }}
      appear
      enter
      exit
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default WithTransition;
