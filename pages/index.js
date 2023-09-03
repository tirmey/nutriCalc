import { useSelector, useStore } from 'react-redux';
import LayoutResolver from '../layouts/LayoutResolver/LayoutResolver';
import Link from 'next/link';

const Home = (props) => {
  const test = useSelector(st => st.testSlice);
  console.log('test: >>>>>> ', test);
  return (
      <LayoutResolver
        propsFromComponent={props}
        content={(<p>Homepage Preview Here!</p>)}
      />
  );
};

export default Home;
