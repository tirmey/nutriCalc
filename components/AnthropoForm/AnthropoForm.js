import React, { useEffect, useState } from 'react';
import formSections from './formSection';
import CleanForm from '../CleanForm/CleanForm';
import AnthropoFormStyled from './AnthropoFormStyled';

const AnthropoForm = props => {
  const {formState, setFormState} = props;

  return (
    <AnthropoFormStyled>
      <CleanForm
        classes="anthro-form"
        headerText={(
          <>
            <h3>Dados antropométricos</h3>
            <p>Informe os dados antropométricos para uctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien.</p>
          </>
        )}
        formState={formState}
        setFormState={setFormState}
        formSections={formSections}
        showSubmitButton={false}
      />
    </AnthropoFormStyled>
  );
};

export default AnthropoForm;
