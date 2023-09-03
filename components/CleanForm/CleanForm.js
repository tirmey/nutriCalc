/*
  CleanForm verion 0.1.0 by Thiago Rodrigues Meyer

  /////// WARNING ///////
  The code below could make you cry...
  A safety pig is provided below for your benefit!

                         _
 _._ _..._ .-',     _.._(`))
'-. `     '  /-._.-'    ',/
   )         \            '.
  / _    _    |             \
 |  a    a    /              |
 \   .-.                     ;
  '-('' ).-'       ,'       ;
     '-;           |      .'
        \           \    /
        | 7  .__  _.-\   \
        | |  |  ``/  /`  /
       /,_|  |   /,_/   /
          /,_/
*/

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import CleanFormStyled from './CleanFormStyled';
import Button from './components/Button/Button';
import ErrorMessage from './formElements/ErrorMessage/ErrorMessage';
import Pagination from './formElements/Pagination/Pagination';
import buildFormUtils from './helpers/buildFormUtils';
import { getCurrentPage, submitValidation } from './helpers/cleanFormUtils';

const CleanForm = props => {
  const {
    currentPage,
    children,
    classes,
    emptyFieldMsg = 'Este campo deve ser preenchido.',
    externalErrors,
    formErrorMessageText = 'Preencha ou corrija os campos indicados.',
    formAnswers,
    formId,
    formSections,
    formState = {},
    formRef,
    headerText,
    messagesHandler = msg => console.log(`${msg}\n attach a messages handler to show messages to clients`),
    noLabel,
    otherButtons,
    paginated,
    paginationBtnText = { next: 'avançar', back: 'voltar' },
    paginationClickHandler, // delegates page changes and another actions to parent component
    hidePaginationButtons,
    pageValidation,
    resetForm,
    setExternalErrors = () => {},
    setFormState,
    showSubmitButton = true,
    submitButton,
    submitButtonSize,
    submitHandler,
    submitText,
    submitting,
    touched,
    setCurrentPage,
    submitWithEnter,
  } = props;

  const [formError, setFormError] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState();
  const [formTouched, setFormTouched] = useState();
  const submitButtonText = submitText ? submitText : submitting ? 'Enviando...' : 'Enviar';

  // PAGINATION
  const [pageObject, setPageObject] = useState({});

  useEffect(() => {
    if (touched) {
      setFormTouched(true);
    }
  }, [touched]);

  useEffect(() => {
    if (resetForm) {
      setFormTouched();
      setFormState({});
      setFormError({});
      setFormErrorMessage();
    }
  }, [resetForm]);

  useEffect(() => {
    if (paginated) {
      setPageObject(getCurrentPage(formSections, currentPage));
    }
  }, [currentPage]);

  useEffect(() => {
    setFormErrorMessage(externalErrors);
  }, [externalErrors]);

  const paginationInternalClickHandler = (e, currPg, pgObj, formSt) => {
    const action = e.target.dataset.mydata;
    let errorsOnPage = false;
    if (pageValidation && action === 'next') {
      errorsOnPage = submitValidation({ formSections: pgObj, formState: formSt, formError, formTouched, setFormError, emptyFieldMsg });
    }

    if (errorsOnPage?.length) {
      setFormErrorMessage(formErrorMessageText);
      setTimeout(() => {
        setFormErrorMessage();
      }, 3000);
    }

    if (paginationClickHandler) {
      paginationClickHandler(e, currPg, errorsOnPage);
    } else {
      if (pageValidation && errorsOnPage?.length) {
        return;
      }
      setCurrentPage(currPg + (action === 'next' ? 1 : -1));
    }
  };

  const internalSubmitHandler = (e, formSt, formErr) => {
    e.preventDefault();
    const errors = submitValidation({
      formSections,
      formState: formSt,
      formError: formErr,
      formTouched,
      setFormError,
      emptyFieldMsg,
    });

    setFormErrorMessage(Object.keys(errors).length ? formErrorMessageText : '');

    if (!Object.keys(errors).length && externalErrors) {
      setFormErrorMessage(externalErrors);
    }

    setTimeout(() => {
      setFormErrorMessage('');
      setExternalErrors('');
    }, 3000);

    submitHandler(formSt, errors, e);
  };

  const keyHandler = (e, formSt, formErr) => {
    if (e.key === 'Enter' && submitWithEnter && (!paginated || currentPage === formSections.length)) {
      internalSubmitHandler(e, formSt, formErr);
    }
  };

  return (
    <CleanFormStyled
      className={`cleanform-root ${classes || ''} ${(Object.keys(formError).length || externalErrors) ? 'form-error' : ''} ${formTouched ? '' : 'form-untouched'} ${noLabel ? 'no-label' : ''}`}
      submitting={submitting}
    >
      {headerText && (
        <div className="header-text">
          {headerText}
        </div>
      )}
      <form
        id={formId}
        onSubmit={e => internalSubmitHandler(e, formState, formError)}
        onChange={() => { if (!formTouched) { setFormTouched(true); } }}
        noValidate
        onKeyPress={e => keyHandler(e, formState, formError)}
        ref={formRef}
      >
        {buildFormUtils({
          formAnswers,
          formSections: paginated ? pageObject : formSections,
          formState,
          setFormState,
          formError,
          setFormError,
          formTouched,
          setFormTouched,
          messagesHandler,
          submitWithEnter,
        })}
        {children}
        {(showSubmitButton && (!paginated || (paginated && (currentPage === formSections.length || hidePaginationButtons)))) && (
          <div className={`submit-div ${otherButtons ? 'multiple-buttons' : ''}`}>
            {!!otherButtons && otherButtons}
            {submitButton
              ? submitButton(submitting, formError, formTouched)
              : (
                <Button
                  classes="btn-submit"
                  disabled={!!submitting || !!Object.keys(formError).length || !formTouched || !!formAnswers}
                  isSubmitting={submitting}
                  text={submitText || 'enviar'}
                  type="submit"
                  value={submitButtonText}
                  size={submitButtonSize}
                />
              )}
          </div>
        )}
        {(formErrorMessage && typeof formErrorMessage === 'string') && (
          <ErrorMessage
            msg={formErrorMessage}
          />
        )}
        {(paginated && !hidePaginationButtons) && (
          <Pagination
            currentPage={currentPage}
            formTouched={formTouched}
            totalPages={formSections.length}
            paginationBtnText={paginationBtnText}
            clickHandler={e => paginationInternalClickHandler(e, currentPage, pageObject, formState)}
          />
        )}
      </form>
    </CleanFormStyled>
  );
};

export default CleanForm;
