/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { orderStateHandler, submitValidation } from '../../helpers/cleanFormUtils';
import { checkboxChangeHandler, filesChangeHandler, inputHandler, radioChangeHandler } from '../../helpers/formHandlers';
import { generateForm, resetInternalState } from './DyanamicComponentUtils';
import MyTransition from '../../MyTransition/MyTransition';
import DynamicComponentStyled from './DynamicComponentStyled';
import Button from '../../components/Button/Button';
import Plus from '../../components/Plus/Plus';
import Edit from '../../components/Edit/Edit';
import Trash from '../../components/Trash/Trash';

const DynamicComponent = props => {
  const {
    state,
    setState,

    formError,
    setFormError,
    obj,
    name,
    isRequired,
    formTouched,
    setFormTouched,
    messagesHandler,
  } = props;
  const [selectedObj, setSelectedObj] = useState();
  const [innerState, setInnerState] = useState({});
  const [innerErrors, setInnerErrors] = useState([]);
  const { saveDynamicItemCB, removeDynamicItemCB } = obj;
  useEffect(() => {
    setInnerState(resetInternalState(obj));
  }, []);

  const internalInputHandler = e => {
    const { name: targetName, value } = e.target;
    const field = obj.fields.find(f => f.name === targetName);

    const handlerProps = {
      event: e,
      ...field,
      customValidation: field.customValidation ? () => field.customValidation(value, innerState, state) : () => {},
      customInputHandler: field.customInputHandler,
      formState: innerState,
      setFormState: setInnerState,
      formError: innerErrors,
      setFormError: setInnerErrors,
    };

    switch (field.el) {
      case 'checkboxset':
        checkboxChangeHandler(handlerProps);
        break;
      case 'radioset':
        radioChangeHandler(handlerProps);
        break;
      case 'file':
        filesChangeHandler(handlerProps);
        break;
      default:
        inputHandler(handlerProps);
        break;
    }
  };

  const createNewObjectHandler = (newId, innerSt) => {
    // TODO: create routine to store files in a way that the´re only referenced in edition data;
    const newFormErrors = cloneDeep(formError);
    const validationErrors = submitValidation({ formSections: obj, formState: innerSt, formError: innerErrors, setFormError: setInnerErrors, formTouched: true, emptyFieldMsg: 'Este campo deve ser preenchido', dynamicObject: true });

    if (validationErrors.length) {
      return;
    }

    if (newFormErrors[obj.name]) {
      delete newFormErrors[obj.name];
      setFormError(newFormErrors);
    }

    if (saveDynamicItemCB) {
      saveDynamicItemCB({ [`${obj.name}_${newId}`]: innerSt });
    }

    const newObj = { ...innerSt };

    const newState = {
      ...state,
      [obj.name]: {
        ...state[obj.name],
        [`${obj.name}_${newId}`]: newObj,
      },
    };
    setState(newState);

    setInnerState(resetInternalState(obj));
    setSelectedObj();
  };

  const removeObjectHandler = e => {
    if (!formTouched) {
      setFormTouched(true);
    }

    const newObject = cloneDeep(state[obj.name]);
    delete newObject[e.target.dataset.mydata];
    if (Object.keys(newObject).length) {
      setState({
        ...state,
        [obj.name]: newObject,
      });
    } else {
      const newState = cloneDeep(state);
      delete newState[obj.name];
      setState(newState);
    }
    if (removeDynamicItemCB) {
      removeDynamicItemCB({ oldState: state[obj.name], deletedItem: { [e.target.dataset.mydata]: state[obj.name][e.target.dataset.mydata] } });
    }
  };

  const confirmRemoveObjectHandler = e => {
    e.persist();
    const exclude = confirm('Confirma a exclusão deste item?');
    if (exclude) {
      removeObjectHandler(e);
    }
  };

  const editObjectHandler = e => {
    const data = JSON.parse(e.target.dataset.mydata);
    const selected = data.item;
    const objOnState = state[data.objType][selected[0]];
    setInnerState({ id: selected[0], ...selected[1] });
    setSelectedObj({ id: selected[0], ...objOnState });
  };

  const clearInnerState = () => {
    setSelectedObj();
    setInnerState(resetInternalState(obj));
    setInnerErrors({});
  };

  const orderDynamicStateHandler = (st, object) => Object.entries(orderStateHandler(st, object.fields.map(it => it.name)));

  const renderDynamic = (st, object, innerObj) => (
    (typeof st[object.name] !== 'undefined') && Object.entries(st[object.name]).map((item, index) => (
      <React.Fragment key={item[0]}>
        {index === 0 && <h2 className="dynamic-object__list-title">{object.listTitle}</h2>}
        <div className={`dynamic-object__nested-level ${!innerObj ? 'first-level' : ''}`}>
          <h3 className="dynamic-object__nested-level__title">{object.itemTitle} {index + 1}</h3>
          {orderDynamicStateHandler(item[1], object).map(field => {
            const thisField = object.fields.find(ob => ob.name === field[0]);
            let subObj = object;
            let newState = st;
            const renderSubobject = typeof field[1] === 'object' && !Array.isArray(field[1]);

            if (renderSubobject) {
              subObj = thisField;
              newState = { [field[0]]: field[1] };
            }

            const newField = subObj.fields?.find(f => f.name === field[0]) || {};
            const labelText = newField.labelText || newField.title;
            const fieldValue = thisField?.renderValue ? thisField.renderValue(field[1]) : field[1];

            return renderSubobject
              ? renderDynamic(newState, subObj, true)
              : (field[1] && labelText && !newField.doNotRenderDynamic)
                ? (
                  <div key={`${item[0]}_${field[0]}`} className="dynamic-object__nested-level__property">
                    <p>
                      <span className="dynamic-object__nested-level__property__key">{labelText}</span>
                      <span className="dynamic-object__nested-level__property__value">{typeof fieldValue === 'string' ? fieldValue : 'Formato não renderizável.'}</span>
                    </p>
                  </div>
                )
                : null;
          })}
          {!innerObj && (
            <div className="dynamic-object__nested-level__object-actions-div submit-div">
              <Edit
                classes="icon-action-edit pointer"
                myData={JSON.stringify({ objType: object.name, item })}
                clickHandler={editObjectHandler}
              />
              <Trash
                classes="icon-action-delete pointer"
                myData={item[0]}
                clickHandler={confirmRemoveObjectHandler}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    ))
  );

  return (
    <DynamicComponentStyled className="dynamic-object" name={name}>
      <h2 className="dynamic-object__object-name">
        {obj.propTitle}
        {isRequired && (
          <span
            className="required-field-asterisk"
            title="campo de preenchimento obrigatório"
          >
            *
          </span>
        )}
      </h2>
      <Button
        text={(
          <>
            <Plus />
            <span>Adicionar {obj.itemTitle}</span>
          </>
        )}
        classes="dynamic-object__add-object"
        clickHandler={() => {
          if (obj.maxItems) {
            const totalItems = Object.keys(state[name] || {}).length;
            if (totalItems >= obj.maxItems) {
              const msg = `Não é possível registrar mais de ${obj.maxItems} ${obj.propTitle}`;
              return messagesHandler(msg);
            }
          }
          setSelectedObj('new');
        }}
        size="small"
      />
      {renderDynamic(state, obj)}
      <MyTransition
        transitionStyles={{ position: 'relative', zIndex: 'var(--zIndexDynamicComponentOverlay)' }}
        showElement={!!selectedObj}
        animation="animZoom"
      >
        <div className="fullscreen-overlay container-centered dynamic-object__overlay">
          <div className="dynamic-object__form-new-window">
            <div className="dynamic-object__form-new-window__header">
              <h3>Adicionar {obj.propTitle}</h3>
              <span role="button" tabIndex={0} className="dynamic-object__form-new-window__close" onClick={clearInnerState}>×</span>
            </div>
            <div className="dynamic-object__form-new-window__body">
              {generateForm({
                object: obj,
                inputHandler: internalInputHandler,
                innerState,
                setInnerState,
                formError: innerErrors,
                setFormError: setInnerErrors,
                messagesHandler,
                formTouched,
                setFormTouched,
              })}
              <div className="dynamic-object__form-new-window__submit-div">
                <Button
                  size="small"
                  text="cancelar"
                  clickHandler={clearInnerState}
                />
                <Button
                  size="small"
                  text="adicionar"
                  clickHandler={() => {
                    if (innerState.id) {
                      const editedItem = {};
                      const editedItemArr = Object.entries(innerState);
                      for (let i = 0; i < editedItemArr.length; i++) {
                        if (editedItemArr[i][1] && editedItemArr[i][0] !== 'id') {
                          editedItem[editedItemArr[i][0]] = editedItemArr[i][1];
                        }
                      }
                      createNewObjectHandler(innerState.id.split('_')[1], editedItem);
                    } else {
                      createNewObjectHandler(new Date().getTime(), innerState);
                    }
                  }}
                />
              </div>
              {!!Object.keys(innerErrors).length && <p className="dynamic-object__form-new-window__validation-error">Há erros de validação</p>}
            </div>
          </div>
        </div>
      </MyTransition>
    </DynamicComponentStyled>
  );
};

export default DynamicComponent;
