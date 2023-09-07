import React from 'react';
import { hb, imc, vet } from './resultsUtils';
import ResultsStyled from './ResultsStyled';
import Result from './Result/Result';
import Hint from '../../CleanForm/components/Hint/Hint';

const Results = ({ state }) => {
  const results = [
    ['IMC', imc(state), 'IMC - Breve definição de IMC'],
    ['HB', hb(state), 'Harris-Benedict - Breve definição do índice de Harris Bennedict'],
    ['VET', vet(state), 'VET - Breve definição do Valor Energétco Total'],
  ]
  return (
    <ResultsStyled>
      {results.map(it => (
        <Hint
          key={it[0]}
          text={it[2]}
          vertOffset={20}
          >
          <Result title={it[0]} value={it[1]} />
        </Hint>
      ))}
    </ResultsStyled>
  );
};

export default Results;
