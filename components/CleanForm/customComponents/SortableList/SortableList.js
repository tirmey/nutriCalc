/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import SortableListStyled from './SortableListStyled';
import SortableListItem from './SortableListItem/SortableListItem';
import { upHandler, downHandler, checkSorted } from './sortableListUtils';
import { getPropToShow } from '../FilesManager/filesManagerUtils';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';

const SortableList = props => {
  const { elementName, prop, state, setState, formTouched, setFormTouched, isImage, labelText, subtitle, isRequired } = props;
  const [listItems, setListItems] = useState();

  useEffect(() => {
    if (state[elementName]) {
      let items;
      const treatedItems = Array.isArray(items) ? state[elementName] : Object.values(state[elementName]);
      if (!prop) {
        items = treatedItems;
      } else {
        items = treatedItems.map(it => getPropToShow(it, prop));
      }
      setListItems(items);
    }
  }, [state[elementName]]);

  const sortAndUpdateState = ({ items, isArray }) => {
    let newItems;
    if (isArray) {
      newItems = items;
    } else {
      const newList = {};

      for (let i = 0; i < items.length; i++) {
        newList[items[i][0]] = items[i][1];
      }

      newItems = newList;
    }

    if (!formTouched) {
      setFormTouched(true);
    }

    const stateWithSortedItems = checkSorted(state, listItems, newItems, elementName, prop);
    setState(stateWithSortedItems);
  };

  return (
    <FieldsetStyled style={{ maxHeight: 'unset' }}>
      <label>
        <span>{!labelText ? null : (typeof labelText === 'string') ? labelText : labelText(state)} {isRequired && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>)}</span>
      </label>
      {!!subtitle && <p className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(formState)}</p>}
      <SortableListStyled>
        {!!listItems && listItems.map((it, i) => (
          <SortableListItem
            isImage={isImage}
            key={it}
            title={it}
            last={i === listItems.length - 1}
            first={i === 0}
            upHandler={e => sortAndUpdateState(upHandler(e, state[elementName], prop))}
            downHandler={e => sortAndUpdateState(downHandler(e, state[elementName], prop))}
          />
        ))}
      </SortableListStyled>
    </FieldsetStyled>
  );
};

export default SortableList;
