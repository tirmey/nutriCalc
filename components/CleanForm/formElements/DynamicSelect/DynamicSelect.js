import React, { useEffect, useRef, useState } from 'react';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import MyTransition from '../../MyTransition/MyTransition';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import InputStyled from '../Input/InputStyled';
import DynamicSelectStyled from './DynamicSelectStyled';
import CaretDown from '../../components/caretDown';
import DynamicSelectWrapperStyled from './DynamicSelecredWrapperStyled';

const DynamicSelect = props => {
  const {
    errorMessage,
    externalInputBlurHandler,
    externalInputFocusHandler,
    externalUpdateStateHandler,
    externalDependenceValue, // if this value changes, the input is cleared. Must be a not falsy primitive (non empty string, numbers != 0)
    formState,
    formTouched,
    isRequired,
    labelText,
    loaderComponent,
    loadingLabel = 'carregando...',
    minLengthToShow,
    name,
    options,
    selectHandler,
    setFormTouched = () => {},
    showLoader,
    subtitle,
    warning,
    withOptionsLabel = 'escolha uma opção',
    withoutOptionsLabel = 'sem opções disponíveis',
  } = props;

  const [optionsFiltered, setOptionsFiltered] = useState([]);
  const optionsWithState = Array.isArray(options) ? options : options(formState);
  const [showOptions, setShowOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [initialLoad, setInitialLoad] = useState();
  const [inputValue, setInputValue] = useState();
  const inputValueRef = useRef();
  const inputRef = React.createRef();
  const [currentExternalDependenceValue, setCurrentExternalDependenceValue] = useState();
  const warningMsg = warning ? warning(formState[name]) : null;

  const setInputValueHandler = val => {
    setInputValue(val);
    inputValueRef.current = val;
  };

  const internalUpdateStateHandler = val => {
    if (!formTouched) {
      setFormTouched(true);
    }

    if (externalUpdateStateHandler) {
      return externalUpdateStateHandler(val);
    }
    if (selectHandler) {
      if (initialLoad) {
        selectHandler({ target: { name, value: val, required: isRequired } });
      }
    }
  };

  useEffect(() => {
    const selectedExistsInOptions = formState[name] && optionsWithState && JSON.stringify(optionsWithState).includes(formState[name]);

    if (!selectedExistsInOptions && JSON.stringify(optionsWithState) !== JSON.stringify(optionsFiltered)) {
      setInputValueHandler();
      internalUpdateStateHandler();
    }

    if (!minLengthToShow) {
      setOptionsFiltered(optionsWithState);
    }

    if (externalDependenceValue) {
      setCurrentExternalDependenceValue(externalDependenceValue);
      if (currentExternalDependenceValue && currentExternalDependenceValue !== externalDependenceValue) {
        setInputValueHandler();
        internalUpdateStateHandler();
      }
    }
    setInitialLoad(true);
  }, [options, externalDependenceValue, currentExternalDependenceValue]);

  const inputBlurHandler = e => {
    setTimeout(() => {
      setShowOptions();
      setSelectedOption();
      if (minLengthToShow) {
        setOptionsFiltered([]);
      } else {
        setOptionsFiltered(optionsWithState);
      }
      if (typeof inputValueRef.current !== 'undefined' && !optionsWithState.includes(inputValueRef.current)) {
        setInputValueHandler();
        return internalUpdateStateHandler();
      }
      if (inputValueRef.current) {
        internalUpdateStateHandler(inputValueRef.current);
      }
      setInputValueHandler();
    }, 300);
    if (externalInputBlurHandler) {
      externalInputBlurHandler(e, formState);
    }
  };

  const changeHandler = e => {
    if (!optionsWithState.length) {
      return internalUpdateStateHandler();
    }
    const value = e.target.value ? e.target.value : '';
    setInputValueHandler(value);

    if (minLengthToShow && value.length < minLengthToShow) {
      setOptionsFiltered([]);
      return;
    }

    setOptionsFiltered(optionsWithState.filter(opt => opt.toLowerCase().includes(value ? value.toLowerCase() : '')));
    setShowOptions(!optionsWithState.includes(value));
  };

  const selectOptionHandler = e => {
    const option = e.target.dataset.option;
    setInputValueHandler(option);
  };

  const getOptionPosition = option => {
    const elementScrollTop = document.querySelector(`[data-option="${option}"]`).offsetTop;
    return elementScrollTop - 100;
  };

  const keyPressHandler = e => {
    if (showOptions && optionsFiltered.length && ['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      let option;
      if (!selectedOption) {
        if (e.key === 'ArrowDown') {
          option = optionsFiltered[0];
        } else if (e.key === 'ArrowUp') {
          option = optionsFiltered[optionsFiltered.length - 1];
        }
      } else {
        const currentOptionIndex = optionsFiltered.indexOf(selectedOption);
        if (e.key === 'ArrowDown') {
          if (currentOptionIndex === optionsFiltered.length - 1) {
            option = optionsFiltered[0];
          } else {
            option = optionsFiltered[currentOptionIndex + 1];
          }
        } else if (e.key === 'ArrowUp') {
          if (currentOptionIndex === 0) {
            option = optionsFiltered[optionsFiltered.length - 1];
          } else {
            option = optionsFiltered[currentOptionIndex - 1];
          }
        }
      }
      setSelectedOption(option);
      const position = getOptionPosition(option);
      document.getElementById(`dynamic-select__options-div__${name}`).scrollTop = position;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      setInputValueHandler(selectedOption);
      setOptionsFiltered(optionsWithState);
      setShowOptions();
    }
  };

  const mouseMoveHandler = e => {
    setSelectedOption(e.target.dataset.option);
  };

  return (
    <DynamicSelectWrapperStyled>
      <FieldsetStyled
        className={`fieldset-dynamic-select ${errorMessage ? 'invalid-field' : ''}`}
      >
        <div className='input-wrapper'>
          <label className="select-label" htmlFor={name}>
            <span>{typeof labelText === 'string' ? labelText : labelText(formState)} {isRequired && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>)}</span>
          </label>
          {!!subtitle && <p className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(formState)}</p>}
          {showLoader && loaderComponent}
          <InputStyled
            ref={inputRef}
            value={typeof inputValue === 'string' ? inputValue : formState[name] ? formState[name] : ''}
            placeholder={optionsWithState.length ? withOptionsLabel : showLoader ? loadingLabel : withoutOptionsLabel}
            onChange={changeHandler}
            onFocus={e => {
              setShowOptions(true);
              if (externalInputFocusHandler) {
                externalInputFocusHandler(e, formState);
              }
            }}
            onBlur={inputBlurHandler}
            onKeyPress={keyPressHandler}
            name={name}
            id={name}
            autoComplete="off"
          />
          <CaretDown classes="open-icon" />
          <ErrorMessage
            msg={!errorMessage && warningMsg ? warningMsg : errorMessage}
            warning={!errorMessage && warningMsg}
          />
        </div>
      </FieldsetStyled>
      <DynamicSelectStyled>
        <MyTransition
          showElement={showOptions}
          exit={400}
        >
          <div className="dynamic-select__options-div" id={`dynamic-select__options-div__${name}`}>
            {!!optionsWithState.length && optionsFiltered.map(opt => (
              <span
                role="button"
                tabIndex={0}
                className={`dynamic-select__option ${selectedOption === opt ? 'option-selected' : ''}`}
                onClick={selectOptionHandler}
                key={typeof opt === 'string' ? opt : opt.value}
                data-option={typeof opt === 'string' ? opt : opt.value}
                onMouseMove={mouseMoveHandler}
              >
                {typeof opt === 'string' ? opt : opt.label}
              </span>
            ))}
          </div>
        </MyTransition>
      </DynamicSelectStyled>
    </DynamicSelectWrapperStyled>
  );
};

export default DynamicSelect;
