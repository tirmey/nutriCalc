import React, { useState } from 'react';
import HomeStyled from './HomeStyled';
import AnthropoForm from '../../AnthropoForm/AnthropoForm';

const Home = props => {
  const [anthropoState, setAnthropoState] = useState();

  return (
    <HomeStyled>
      <h2 className='calc-title'>Terapia Nutricional</h2>
      <p className='calc-description'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
      </p>
      <AnthropoForm formState={anthropoState} setFormState ={setAnthropoState} />
    </HomeStyled>
  );
};

export default Home;
