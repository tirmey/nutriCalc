import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import { setActiveModals } from '../../../../redux/actions/uiActions';
import Tags from '../Tags/Tags';
import TagInputStyled from './TagInputStyled';
import InputStyled from '../../formElements/Input/InputStyled';
import ErrorMessage from '../../formElements/ErrorMessage/ErrorMessage';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import InputInfo from '../../components/InputInfo/InputInfo';

const TagInput = props => {
  const {
    name,
    state,
    setState,
    formTouched,
    setFormTouched,
    formError,
    setFormError,
    isRequired,
    subtitle,
    labelText,
    maxLength,
    maxTags,
    customValidation,
    title,
    info,
    infoClickHandler = () => {},
  } = props;
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const showErrors = body => {
    dispatch(setActiveModals({
      body,
      exhibitionTime: 1500,
    }));
  };

  const updateState = (st, value) => {
    if (maxLength && value.length > maxLength) {
      showErrors(`Tamanho máximo permitido: ${maxLength} caracteres.`);
      return st;
    }

    const newState = { ...st, [name]: [value.trim(), ...(st[name] || [])] };
    return newState;
  };

  const keyPressHandler = (e, st) => {
    const value = e.target.value.trim();

    if (!value && e.key === 'Enter') {
      e.preventDefault();
      showErrors('Infome a palavra-chave a ser registrada');
      return;
    }

    if (value && e.key === 'Enter') {
      e.preventDefault();

      if (st[name]?.includes(value)) {
        showErrors('esta palavra-chave já foi registrada');
        return;
      }

      if (st[name]?.length >= maxTags) {
        showErrors(`Devem ser informadas, no máximo, ${maxTags} palavras-chave`);
        return;
      }

      if (formError[name]) {
        const newFormError = cloneDeep(formError);
        delete newFormError[name];
        setFormError(newFormError);
      }

      if (customValidation) {
        const errorMessage = customValidation([value, ...(st[name] || [])], st);
        if (errorMessage) {
          showErrors(errorMessage);
          return;
        }
      }

      if (!formTouched) {
        setFormTouched(true);
      }

      setState(updateState(st, value));
      return setInputValue('');
    }
  };

  return (
    <TagInputStyled>
      <FieldsetStyled>
        <label htmlFor={name} title={title || ''}>
          <span>{!labelText ? null : typeof labelText === 'string' ? labelText : labelText(state)} {isRequired && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>)}</span>
        </label>
        {!!subtitle && <p className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(state)}</p>}
        <InputStyled
          {...props}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => keyPressHandler(e, state)}
          labelText={labelText}
        />
        {!!info && <InputInfo info={info} infoClickHandler={infoClickHandler} />}
        <ErrorMessage
          msg={inputValue ? 'É necessário teclar "enter" para registrar a palavra-chave' : ''}
          warning
        />
      </FieldsetStyled>
      {!!state[name]?.length && (
        <div className="tags-container">
          {state[name].map(it => (
            <Tags
              key={it}
              text={it}
              allTags={state}
              clickHandler={() => {
                if (!formTouched) {
                  setFormTouched(true);
                }
                const newState = { ...state, [name]: state[name].filter(tag => tag !== it) };

                if (!newState[name].length) {
                  delete newState[name];
                }
                setState(newState);

                if (newState[name] && customValidation) {
                  const errorMessage = customValidation(newState[name], newState);

                  if (errorMessage) {
                    showErrors(errorMessage);
                    setFormError({ ...formError, [name]: errorMessage });
                  }

                  if (isRequired && !newState[name]?.length) {
                    setFormError({ ...formError, [name]: 'Este campo deve ser preenchido.' });
                  }
                }
              }}
            />
          ))}
        </div>
      )}
    </TagInputStyled>
  );
};

const propsAreEqual = (prev, next) => JSON.stringify(prev.state) === JSON.stringify(next.state) && JSON.stringify(prev.formError) === JSON.stringify(next.formError);

export default React.memo(TagInput, propsAreEqual);
