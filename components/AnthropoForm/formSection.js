import Results from "./Results/Results";

const formSections = [{
  elemArr: [
/*     {
      name: 'id',
      labelText: 'Identificador',
    }, */
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
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget',
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
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget',
    },
    {
      el: 'customJSX',
      jsx: st => <Results state={st} />,
      conditionalRender: st => st.gender && st.weight > 0 && st.age > 0 && st.height > 0 && st.aim > 0,
    }
  ]
}];

export default formSections;
