import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveModals } from '../../../../redux/actions/uiActions';
import CleanFormStyled from '../../CleanFormStyled';
import Button from '../../components/Button/Button';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import MyIcon from '../../../UI/MyIcon/MyIcon';
import FilesManagerStyled from './FilesManagerStyled';
import { fileComponent, getPropToShow, setMetadataHandler } from './filesManagerUtils';

const FilesManager = props => {
  const {
    editMetadataHandler = () => {},
    isImage,
    metadata,
    name,
    propToShow,
    removeFileHandler = () => {},
    setState,
    state,
    temporaryFilesName,
    uploadFilesHandler = () => {},
    labelText,
    isRequired,
    subtitle,
  } = props;

  const dispatch = useDispatch();
  const [temporaryMetadata, setTemporaryMetadata] = useState({});
  const [form, setForm] = useState();
  const [editedFileId, setEditedFileId] = useState();

  useEffect(() => {
    const dataForm = setMetadataHandler(metadata, name);
    setForm(dataForm);
  }, []);

  const populateFormHandler = fileProps => {
    const filePropsArr = Object.entries(fileProps);
    const tempMetadata = {};
    for (let i = 0; i < filePropsArr.length; i++) {
      const field = document.querySelector(`[name=${name}_${filePropsArr[i][0]}]`);
      if (field) {
        field.value = filePropsArr[i][1];
        tempMetadata[filePropsArr[i][0]] = filePropsArr[i][1];
      }
    }
    setTemporaryMetadata(tempMetadata);
  };

  useEffect(() => {
    if (editedFileId) {
      populateFormHandler(state[name].find(it => it.fileId === editedFileId));
    }
  }, [editedFileId]);

  useEffect(() => {
    if (state[temporaryFilesName]?.length) {
      uploadFilesHandler(state, name, temporaryFilesName);
    }
  }, [state[temporaryFilesName]]);

  const confirmRemoveFileHandler = (e, st) => {
    dispatch(setActiveModals({
      body: 'tem certeza de que deseja excluir o arquivo?',
      actions: [
        {
          text: 'sim',
          clickHandler: () => removeFileHandler(e.target.dataset.id, st, name),
        },
      ],
    }));
  };

  const metadataInputHandler = e => {
    const { name: fieldName, value } = e.target;
    const treatedName = fieldName.split('_')[1];
    const fieldProps = metadata.find(it => it.name === treatedName);
    const { maxLength, labelText: label } = fieldProps;

    if (+maxLength === value.length) {
      return dispatch(setActiveModals({
        body: `O campo ${label} permite o registro de, no máximo, ${maxLength} caracteres.`,
      }));
    }

    if (+maxLength < value.length) {
      return e.target.value = e.target.value.slice(0, -1);
    }

    const newMetadata = { ...temporaryMetadata, [treatedName]: value };
    setTemporaryMetadata(newMetadata);
  };

  if (!state[name]?.length) {
    return null;
  }

  return (
    <FieldsetStyled style={{ maxHeight: 'unset' }}>
      <label htmlFor={name}>
        <span>{!labelText ? null : (typeof labelText === 'string') ? labelText : labelText(state)} {isRequired && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>)}</span>
      </label>
      {!!subtitle && <p className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(formState)}</p>}
      <FilesManagerStyled isImage={isImage}>
        <div className="files-container">
          {state[name].map(it => (
            <div key={it.fileId} className={`file-container ${isImage ? 'photo-container' : ''} flex-centered`}>
              <div className="file-container pointer">
                <div title="excluir arquivo" role="button" tabIndex={0} data-id={it.fileId} onClick={e => confirmRemoveFileHandler(e, state)} className="remove-overlay container-overlay centered-wrap">
                  <MyIcon iconName="trash" />
                </div>
                {fileComponent(isImage ? 'image' : 'file', it, propToShow)}
              </div>
              {!metadata
                ? null
                : editedFileId === it.fileId
                  ? (
                    <div className="metadata-form-wrapper fullscreen-overlay" onInput={metadataInputHandler}>
                      <CleanFormStyled>
                        {form}
                        <div className="button-div">
                          <Button
                            text="cancelar"
                            clickHandler={() => {
                              setEditedFileId();
                              setTemporaryMetadata({});
                            }}
                          />
                          <Button
                            text="salvar"
                            clickHandler={() => {
                              const newFile = { ...state[name].find(file => file.fileId === it.fileId), ...temporaryMetadata };
                              const newFiles = state[name].map(file => file.fileId === it.fileId ? newFile : file);
                              setState({ ...state, [name]: newFiles });
                              setEditedFileId();
                              setTemporaryMetadata({});
                              editMetadataHandler({ name, fileId: it.fileId, metadata: temporaryMetadata });
                            }}
                          />
                        </div>
                      </CleanFormStyled>
                    </div>
                  )
                  : (
                    <button
                      type="button"
                      onClick={() => setEditedFileId(it.fileId)}
                      title="Clique aqui para editar informações deste arquivo"
                      className="file-description container-subtitle"
                    >
                      {getPropToShow(it, propToShow) || 'Edite os dados do arquivo'}
                    </button>
                  )}
            </div>
          ))}
        </div>
      </FilesManagerStyled>
    </FieldsetStyled>
  );
};

export default FilesManager;
