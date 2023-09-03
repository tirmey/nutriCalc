import React from 'react';
import LayoutResolver from '../layouts/LayoutResolver/LayoutResolver';

const Third = props => {
  console.log('props: ', props);

  return (
    <LayoutResolver
      propsFromComponent={{}}
      content={(<p>Third Page</p>)}
    />
  );
};

export default Third;
