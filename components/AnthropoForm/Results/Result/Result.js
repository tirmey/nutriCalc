import React from 'react';
import ResultSyled from './ResultStyled';

const Result = props => {
  const { title, value } = props;

  return (
    <ResultSyled>
      <h3>{title}</h3>
      <h4>{value}</h4>
    </ResultSyled>
  );
};

export default Result;
