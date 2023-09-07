import LayoutResolver from '../layouts/LayoutResolver/LayoutResolver';
import dynamic from 'next/dynamic';

const DynamicHome =  dynamic(() => import('../components/pageComponents/Home/Home'));

const Index = (props) => {
  return (
    <>
      <LayoutResolver
        propsFromComponent={props}
        content={<DynamicHome />}
      />
    </>
  );
};

export default Index;
