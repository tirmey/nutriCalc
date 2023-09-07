import CustomJSX from '../formElements/CustomJSX/CustomJSX';
import DynamicComponent from '../formElements/DynamicComponent/DynamicComponent';
import DynamicSelect from '../formElements/DynamicSelect/DynamicSelect';
import FileUploader from '../formElements/FileUploader/FileUploader';
import Input from '../formElements/Input/Input';
import { inputGroupSetProps, RadioOrCheckSet } from '../formElements/RadioOrCheckSet/RadioOrCheckSet';
import Select from '../formElements/Select/Select';
import Textarea from '../formElements/TextArea/TextArea';
import WithFormState from '../hoc/WithFormState';
import WithTransition from '../hoc/WithTransition';
import { checkRequired } from './cleanFormUtils';
import formHandlers from './formHandlers';

const elementBuilder = props => {
  const {
    element,
    allRequired,
    formAnswers,
    formState,
    setFormState,
    formError,
    setFormError,
    formTouched,
    setFormTouched,
    messagesHandler,
    submitWithEnter,
  } = props;
  const isRequired = checkRequired(formState, element, allRequired);

  const inputHandler = event => formHandlers({
    event,
    formState,
    setFormState,
    formError,
    setFormError,
    isRequired,
    ...element,
  });

  switch (element.el) {
    case undefined:
    case 'input':
      return (
        <WithTransition
          key={element.name}
          name={element.name}
          conditionalRender={element.conditionalRender}
          formState={formState}
          setFormState={setFormState}
          formError={formError}
          setFormError={setFormError}
        >
          <Input
            {...element}
            isRequired={isRequired}
            value={formState[element.name] || ''}
            errorMessage={formError[element.name]}
            inputHandler={inputHandler}
            formState={formState}
            submitWithEnter={submitWithEnter}
          />
        </WithTransition>
      );
    case 'select':
      return (
        <WithTransition
          key={element.name}
          name={element.name}
          conditionalRender={element.conditionalRender}
          formState={formState}
          setFormState={setFormState}
          formError={formError}
          setFormError={setFormError}
        >
          <Select
            {...element}
            errorMessage={formError[element.name]}
            value={formState[element.name] || ''}
            inputHandler={inputHandler}
            isRequired={isRequired}
            formState={formState}
          />
        </WithTransition>
      );
    case 'radioset':
    case 'checkboxset':
      return (
        <WithTransition
          key={element.name}
          name={element.name}
          conditionalRender={element.conditionalRender}
          formState={formState}
          setFormState={setFormState}
          formError={formError}
          setFormError={setFormError}
        >
          <RadioOrCheckSet
            {...inputGroupSetProps({
              ...element,
              isRequired,
              type: element.el === 'checkboxset' ? 'checkbox' : 'radio',
              arr: element.options,
              changeHandler: inputHandler,
              errorMessage: formError[element.name],
              state: formState,
            })}
            formState={formState}
            formAnswers={formAnswers}
            maxChecked={element.maxChecked}
            exactChecked={element.exactChecked}
            minChecked={element.minChecked}
          />
        </WithTransition>
      );
    case 'textarea':
      return (
        <WithTransition
          key={element.name}
          name={element.name}
          conditionalRender={element.conditionalRender}
          formState={formState}
          setFormState={setFormState}
          formError={formError}
          setFormError={setFormError}
        >
          <Textarea
            {...element}
            value={formState[element.name] || ''}
            errorMessage={formError[element.name]}
            inputHandler={inputHandler}
            isRequired={isRequired}
            formState={formState}
            messagesHandler={messagesHandler}
          />
        </WithTransition>
      );
    case 'file':
      return (
        <WithTransition
          key={element.name}
          name={element.name}
          conditionalRender={element.conditionalRender}
          formState={formState}
          setFormState={setFormState}
          formError={formError}
          setFormError={setFormError}
        >
          <FileUploader
            {...element}
            value={formState[element.name] || ''}
            errorMessage={formError[element.name]}
            inputHandler={inputHandler}
            isRequired={isRequired}
            messagesHandler={messagesHandler}
            formTouched={formTouched}
            setFormTouched={setFormTouched}
            formState={formState}
            setFormState={setFormState}
            formError={formError}
            setFormError={setFormError}
          />
        </WithTransition>
      );
    case 'dynamicSelect':
      return (
        <WithTransition
          key={element.name}
          name={element.name}
          conditionalRender={element.conditionalRender}
          formState={formState}
          setFormState={setFormState}
          formError={formError}
          setFormError={setFormError}
        >
          <DynamicSelect
            errorMessage={formError[element.name]}
            value={formState[element.name] || ''}
            isRequired={isRequired}
            formState={formState}
            setFormState={setFormState}
            formError={formError}
            setFormError={setFormError}
            formTouched={formTouched}
            setFormTouched={setFormTouched}
            selectHandler={inputHandler}
            {...element}
          />
        </WithTransition>
      );
    case 'customComponent':
    case 'dynamicComponent':
      return (
        <WithTransition
          key={element.name}
          name={element.name}
          conditionalRender={element.conditionalRender}
          formState={formState}
          setFormState={setFormState}
          formError={formError}
          setFormError={setFormError}
        >
          <WithFormState
            {...element}
            key={element.name}
            state={formState}
            setState={setFormState}
            formError={formError}
            setFormError={setFormError}
            formTouched={formTouched}
            setFormTouched={setFormTouched}
            isRequired={isRequired}
            messagesHandler={messagesHandler}
          >
            {element.el === 'customComponent' ? element.component : <DynamicComponent obj={element} />}
          </WithFormState>
        </WithTransition>
      );
    case 'customJSX':
      return (
        <WithTransition
          name={element.name}
          key={element.name}
          conditionalRender={element.conditionalRender}
          formState={formState}
          setFormState={setFormState}
          formError={formError}
          setFormError={setFormError}
        >
          <CustomJSX element={element} formState={formState} />
        </WithTransition>
      );
    default:
      return <h2 key={Math.random()}>Element type not recognized. Please, check the element array properties.</h2>;
  }
};

const buildFormUtils = props => {
  const { formSections } = props;
  const sections = Object.entries(formSections);
  return sections.map(sect => {
    const sectionName = sect[0];
    const { allRequired, elemArr, sectionTitle, sectionClasses } = sect[1];
    return (
      <section key={sectionName} className={`form-section form-section__${sectionName} ${sectionClasses || ''}`}>
        { sectionTitle && (
          <div className="form-section__title">
            {sectionTitle}
          </div>
        )}
        {elemArr.map(element => elementBuilder({ element, allRequired, ...props }))}
      </section>
    );
  });
};

export default buildFormUtils;
