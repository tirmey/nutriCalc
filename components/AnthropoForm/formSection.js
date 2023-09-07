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
      info: 'Alguma informação sobre a meta nutricional?',
    },
    {
      el: 'customJSX',
      name: 'results',
      jsx: st => <Results state={st} />,
      conditionalRender: st => st.gender && st.weight > 0 && st.age > 0 && st.height > 0 && st.aim > 0,
    }
  ]
}];

export default formSections;
