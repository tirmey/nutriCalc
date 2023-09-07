import React from 'react';
import { hb, imc, vet } from './resultsUtils';
import ResultsStyled from './ResultsStyled';
import Result from './Result/Result';

const Results = ({ state }) => {
  console.log('state: >>>>>> ', state);
  const results = [
    ['IMC', imc(state)],
    ['HB', hb(state)],
    ['VET', vet(state)],
  ]
  return (
    <ResultsStyled>
      {results.map(it => <Result key={it[0]} title={it[0]} value={it[1]} />)}
    </ResultsStyled>
  );
};

export default Results;
