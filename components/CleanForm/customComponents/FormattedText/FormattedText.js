import { useEffect, useRef } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import FieldsetStyled from '../../components/Fieldset/FieldsetStyled';
import { defaultMenuBar, defaultToolbar } from './formattedTextUtils';

const FormattedText = props => {
  const editorRef = useRef(null);
  const {
    name,
    isRequired,
    labelText,
    subtitle,
    state,
    setState,
    formError,
    setFormError,
    setFormTouched,
    formTouched,
    toolBar,
    menuBar,
    entityEncoding,
    uiState: { theme },
  } = props;
  const canUpdateState = useRef(true);

  useEffect(() => {
    if (editorRef.current && state[name]) {
      editorRef.current.value = state[name];
    }
  }, [editorRef]);

  const inputHandler = (txt, st) => {
    if (!formTouched) {
      setFormTouched(true);
    }

    if (canUpdateState.current) {
      if (txt && formError[name]) {
        const newFormError = cloneDeep(formError);
        delete newFormError[name];
        setFormError(newFormError);
      }
      setState({ ...st, [name]: txt });
      canUpdateState.current = false;

      // LIMIT STROKE SPEED TO PREVENT INFINITE RENDER LOOPS
      setTimeout(() => {
        canUpdateState.current = true;
      }, 1);
    }
  };

  return (
    <FieldsetStyled
      className={`fieldset-formatted-text ${isRequired ? 'fieldset-required' : ''}`}
      style={{ maxHeight: 'unset' }}
    >
      <label htmlFor={name}>
        <span>{!labelText ? null : (typeof labelText === 'string') ? labelText : labelText(state)} {isRequired && (<span className="required-field-asterisk" title="campo de preenchimento obrigatório">*</span>)}</span>
      </label>
      {!!subtitle && <p className="fieldset-subtitle">{typeof subtitle === 'string' ? subtitle : subtitle(state)}</p>}
      <Editor
        onInit={(e, editor) => editorRef.current = editor}
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        init={{
          height: 500,
          width: '100%',
          menubar: menuBar || defaultMenuBar,
          skin: theme === 'dark' ? 'oxide-dark' : '',
          content_css: theme,
          plugins: [
            'advlist autolink lists link charmap print preview',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste wordcount',
          ],
          toolbar: toolBar || defaultToolbar,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          language: 'pt_BR',
          branding: false,
          entity_encoding: entityEncoding || 'named',
        }}
        onEditorChange={txt => inputHandler(txt, state)}
        value={state[name]}
      />

    </FieldsetStyled>
  );
};

const mapStateToProps = state => ({
  uiState: state.uiReducer,
});

export default connect(mapStateToProps)(FormattedText);
