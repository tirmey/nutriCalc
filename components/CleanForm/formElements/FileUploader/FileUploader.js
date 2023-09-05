/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
import { useRef, createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Textarea from '../TextArea/TextArea';
import DropAreaStyled from './DropAreaStyled';
import FileCard from './FileCard/FileCard';
import FileUploaderStyled from './FileUploaderStyled';
import { checkFiles, uploadErrorMessages } from './FileUploaderUtils';
import { isModalOpen, setActiveModals } from '../../../../redux/slices/uiSlice';

const FileUploader = props => {
  const {
    formState,
    name,
    inputHandler,
    labelText,
    icons,
    containerClasses,
    fieldsetStyles,
    hasDescription,
    errorMessage,
    warning,
    messagesHandler,
    multiple,
    formTouched,
    setFormTouched,
    subtitle,
    isRequired,
  } = props;
  const [filesInDropZone, setFilesInDropZone] = useState();
  const inputRef = createRef();
  const fileDescription = useRef();
  const dispatch = useDispatch();
  const warningMsg = warning ? warning(value) : null;

  const setFileDescriptionHandler = e => {
    const description = e?.target.value;
    fileDescription.current = description;
  };

  const enterDragZoneHandler = () => {
    setFilesInDropZone(true);
  };

  const leaveDragZoneHandler = () => {
    setFilesInDropZone();
  };

  const allowDrop = e => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const editEvent = (e, action) => {
    e.target.type = 'file';
    e.target.name = name;
    e.target.action = action;
  };

  const addFileHandler = e => {
    setFilesInDropZone();
    e.stopPropagation();
    e.preventDefault();

    const errors = checkFiles(e, props);
    if (errors) {
      const msg = uploadErrorMessages(errors.err, props);
      messagesHandler(msg);
      return;
    }

    editEvent(e);
    inputHandler(e);
    if (!formTouched) {
      setFormTouched(true);
    }
  };

  const editFileInput = e => {
    const dt = new DataTransfer();
    for (let i = 0; i < inputRef?.current?.files?.length; i++) {
      if (inputRef.current.files[i].name !== e.target.dataset.name) {
        dt.items.add(inputRef.current.files[i]);
      }
    }
    if (inputRef.current) {
      inputRef.current.files = dt.files;
    }
  };

  const deleteFileHandler = e => {
    editFileInput(e);
    editEvent(e, 'delete');
    inputHandler(e);
  };

  const confirmDeleteHandler = e => {
    dispatch(setActiveModals({
      body: `Deseja apagar o arquivo "${e.target.dataset.name}"?`,
      actions: [{
        text: 'apagar',
        clickHandler: () => {
          deleteFileHandler(e);
          dispatch(isModalOpen());
          if (!formTouched) {
            setFormTouched(true);
          }
        },
      }],
    }));
  };

  const addFileDescriptionHandler = e => {
    editEvent(e, 'description');
    inputHandler(e);
  };

  const setDescriptionFileName = e => {
    const files = formState[name];
    const file = files.find(it => it.name === e.target.dataset.name);
    const previousDescription = file.description;
    const textareaRef = createRef();

    dispatch(setActiveModals({
      header: 'editar descrição',
      body: (
        <Textarea
          name="textarea-comment"
          autoFocus={!fileDescription.current}
          defaultValue={previousDescription}
          value={fileDescription.current}
          inputHandler={setFileDescriptionHandler}
          labelText="Descrição"
          clickHandler={clickEvt => {
            if (clickEvt.target.classList.contains('close-widget')) {
              setFileDescriptionHandler();
            }
          }}
          inputRef={textareaRef}
        />
      ),
      actions: [{
        text: 'salvar',
        clickHandler: () => {
          e.target.description = fileDescription.current;
          addFileDescriptionHandler(e);
          setFileDescriptionHandler();
          dispatch(isModalOpen());
        },
      }],
    }));
    setTimeout(() => {
      if (previousDescription) {
        textareaRef.current.select();
      }
    }, 200);
  };
  return (
    <FileUploaderStyled className="cleanform-file-uploader">
      <FieldsetStyled
        className={`fieldset-file ${containerClasses || ''} ${errorMessage ? 'invalid-field' : ''}`}
        style={fieldsetStyles}
      >
        {labelText && (
          <label htmlFor="files-input">
            <span>
              {typeof labelText === 'string' ? labelText : labelText(formState)}
              {!!isRequired && <span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>}
            </span>
          </label>
        )}
        {!!subtitle && <span className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(formState)}</span>}
        <DropAreaStyled
          onDragOver={allowDrop}
          onDragEnter={enterDragZoneHandler}
          onDragLeave={leaveDragZoneHandler}
          onDrop={addFileHandler}
          readyToDrop={filesInDropZone}
          className="centered-wrap drop-area"
        >
          <input id="files-input" ref={inputRef} type="file" name={name} className="files-input" multiple={multiple} onInput={addFileHandler} />
          <button
            type="button"
            className="button-upload"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click();
              }
            }}
          >
            clique aqui ou arraste arquivos para este container
          </button>
        </DropAreaStyled>
        <ErrorMessage
          msg={!errorMessage && warningMsg ? warningMsg : errorMessage}
          warning={!errorMessage && warningMsg}
        />
        {!!formState[name]?.length && (
          <div className="files-list-container">
            {formState[name].map(it => (
              <FileCard
                key={it.name}
                file={it}
                icons={icons}
                hasDescription={hasDescription}
                addFileDescriptionHandler={setDescriptionFileName}
                deleteFileHandler={confirmDeleteHandler}
              />
            ))}
          </div>
        )}
      </FieldsetStyled>
    </FileUploaderStyled>
  );
};

export default FileUploader;
