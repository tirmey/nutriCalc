import { useSelector } from 'react-redux';
import LayoutResolver from '../layouts/LayoutResolver/LayoutResolver';
import { useEffect, useState } from 'react';
import CleanForm from '../components/CleanForm/CleanForm';

const formSections = [{
  elemArr: [
    {
      name: 'id',
      labelText: 'Identificador',
    },
    {
      el: 'dynamicSelect',
      name: 'gender',
      labelText: 'Sexo',
      options: [
        'masculino', 'feminino'
      ],
    },
    {
      name: 'weight',
      labelText: 'Peso',
      type: 'number',
      unit: 'kg',
    },
    {
      name: 'age',
      labelText: 'Idade',
      type: 'number',
      unit: 'anos',
    },
    {
      name: 'height',
      labelText: 'Altura',
      type: 'number',
      unit: 'cm',
    },
    {
      name: 'aim',
      labelText: 'Meta nutricional',
      type: 'number',
      unit: 'kcal/kg/d',
    },
  ]
}];

const Home = (props) => {
  const [formState, setFormState] = useState();

  useEffect(() => {
    console.log('formState: >>>>>> ', formState);
  }, [formState]);

  return (
      <LayoutResolver
        propsFromComponent={props}
        content={(
          <div>
            <span>Eternal spam here</span>
            <CleanForm
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
          </div>
        )}
      />
  );
};

export default Home;
