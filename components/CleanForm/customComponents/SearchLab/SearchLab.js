import { useCallback, useEffect, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { useDispatch } from 'react-redux';
import { setActiveModals } from '../../../../redux/actions/uiActions';
import { ajax } from '../../../../utils/general';
import { encodeQuery } from '../../../../utils/queryUtils';
import Button from '../../components/Button/Button';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import Input from '../../formElements/Input/Input';
import MyTransition from '../../MyTransition/MyTransition';
import ListContainer from '../../../UI/ListContainer/ListContainer';
import ListElement from '../../../UI/ListElement/ListElement';
import MyIcon from '../../../UI/MyIcon/MyIcon';
import SearchLabStyled from './SearchLabStyled';

const SearchLab = props => {
  const { state, setState, formError, setFormError, name, isRequired, subtitle } = props;
  const [inputValue, setInputValue] = useState();
  const [selectedLab, setSelectedLab] = useState();
  const [searching, setSearching] = useState();
  const dispatch = useDispatch();

  const clickElementHandler = it => {
    setSelectedLab(it);
    const newState = cloneDeep(state);
    newState.lab = it._id;
    setState(newState);

    if (formError[name]) {
      const newFormError = cloneDeep(formError);
      delete newFormError[name];
      setFormError(newFormError);
    }

    dispatch(setActiveModals());
  };

  const searchHandler = async () => {
    const treatedInput = inputValue?.normalize('NFD').replace(/[^a-zA-Z0-9 ]/g, '');
    if (!inputValue || ['laboratorio', ' de', ' da', ' e', ' a'].find(it => treatedInput.includes(it)) || inputValue.length < 4) {
      return dispatch(setActiveModals({ body: 'Inclua em sua busca apenas palavras distintivas do nome do laboratório' }));
    }

    const query = {
      query: { $text: { $search: inputValue } },
    };

    const params = encodeQuery(query);
    setSearching(true);
    const labs = await ajax({ method: 'get', url: '/customApi/labs/get-labs', params });
    setSearching();
    if (!labs?.data?.length) {
      return dispatch(setActiveModals({ exhibitionTime: 1500, body: 'Não foram encontrados laboratórios.' }));
    }
    dispatch(setActiveModals({
      header: 'Selecione o laboratório',
      body: (
        <ListContainer>
          {labs.data.map(it => (
            <ListElement
              key={it.name}
              item={{ title: it.name }}
              styles={{ cursor: 'pointer' }}
              dataToShow={[{
                key: 'title',
                title: 'Laboratório',
              }]}
              clickElementHandler={() => clickElementHandler(it)}
            />
          ))}
        </ListContainer>
      ),
    }));
  };

  const getLabFromState = useCallback(async docId => {
    const query = {
      docId,
    };

    const params = encodeQuery(query);
    const lab = await ajax({ method: 'get', url: '/customApi/labs/get-labs', params });
    setSelectedLab(lab.data);
  });

  useEffect(() => {
    if (!selectedLab && state[name]) {
      setInputValue(state[name]);
      if (inputValue) {
        getLabFromState(inputValue);
      }
    }
  }, [inputValue]);

  const clearLabHandler = () => {
    setSelectedLab();
    setInputValue();
    const newState = cloneDeep(state);
    delete newState.lab;
    setState(newState);

    if (isRequired) {
      setFormError({ ...formError, [name]: 'É necessário informar o laboratório' });
    }
  };

  return (
    <SearchLabStyled>
      <FieldsetStyled>
        <MyTransition
          showElement={!!selectedLab}
        >
          <div className="remove-lab-div">
            <div>
              <p>Laboratorio Selecionado:</p>
              <p className="lab-name">{selectedLab?.name}</p>
            </div>
            <MyIcon classes="pointer" iconName="circle-x-mark" clickHandler={clearLabHandler} />
          </div>
        </MyTransition>
        <MyTransition
          showElement={!selectedLab}
        >
          <Input
            labelText="Pesquisar laboratório"
            subtitle={subtitle}
            inputHandler={e => setInputValue(e.target.value)}
            keyPressHandler={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                searchHandler();
              }
            }}
          />
          <div className="submit-div">
            <Button
              type="button"
              text="pesquisar"
              clickHandler={searchHandler}
              isSubmitting={searching}
            />
          </div>
        </MyTransition>

      </FieldsetStyled>
    </SearchLabStyled>
  );
};

export default SearchLab;
