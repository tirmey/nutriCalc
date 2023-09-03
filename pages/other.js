import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxWrapper } from '../redux/store';
import sanityClient from '../sanity/sanityClient';
import { getFormulas } from '../redux/slices/formulaSlice';
import { setActiveModals } from '../redux/slices/uiSlice';
import LayoutResolver from '../layouts/LayoutResolver/LayoutResolver';
import { increment } from '../redux/slices/testSlice';

const Other = props => {
  const dispatch = useDispatch();
  const { formulas } = useSelector(state => state.formulaSlice);
  const test = useSelector(state =>  state.testSlice);

  const showModal = () => {
    dispatch(setActiveModals({
      body: 'Testando!!!!',
    }));
  };

  return (
    <>
      <LayoutResolver
        propsFromComponent={props}
        content={(
          <div>
            <p>Other Page edited.</p>
            <p onClick={showModal}>Click to open a modal</p>
            <p onClick={() => dispatch(increment())}>Click to count: {test.value1}</p>
            {formulas.map(it => (
              <div key={it.name}>
                <p>{it.name}</p>
              </div>))}
          </div>
        )}
      />
    </>
  );
};

export const getStaticProps = reduxWrapper.getStaticProps(store => async ctx => {
  const returnedProps = { returnedProps: true, teste: 'Props retornado' };
  const results = await sanityClient.fetch(`*[_type=="formula"]{name,cal,lip,ptn,cho}`);
  store.dispatch(getFormulas(results));

  if (!returnedProps) {
    return {
      notFound: true,
    };
  }

  return {
    props: returnedProps,
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_GLOBAL_TIME,
  };
})

export default Other;
