import LayoutResolver from '../layouts/LayoutResolver/LayoutResolver';
import dynamic from 'next/dynamic';
import { reduxWrapper } from '../redux/store';
import sanityClient from '../sanity/sanityClient';
import { getFormulas } from '../redux/slices/formulaSlice';

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

export const getStaticProps = reduxWrapper.getStaticProps(store => async ctx => {
  const state = store.getState();
  const results = await sanityClient.fetch(`*[_type=="formula"]{name,cal,lip,ptn,cho}`);
  store.dispatch(getFormulas(results));
});

export default Index;
