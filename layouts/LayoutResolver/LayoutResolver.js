import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Modal from '../../components/UI/Modal/Modal';
import MyTransition from '../../components/UI/MyTransition/MyTransition';
import themeDark from '../../themes/themeDark';
import themeLight from '../../themes/themeLight';
import { getFromStorage, handleBodyScrollbar } from '../../utils/general';
import BaseLayout from '../BaseLayout/BaseLayout';
import NakedLayout from '../NakedLayout/NakedLayout';
import { setActiveModals, setTheme } from '../../redux/slices/uiSlice';
import GlobalStyle from '../../themes/globalStyle';

const LayoutResolver = props => {
  const dispatch = useDispatch();

  const {
    content,
    propsFromComponent,
    customStyles = {},
    type,
  } = props;

  const {
    isModalOpen,
    theme,
    activeModals,
  } = useSelector(state =>  state.uiSlice);

  useEffect(() => {
    const savedTheme = getFromStorage('app-theme');
    if (savedTheme) {
      return dispatch(setTheme(savedTheme));
    }

    if (window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme('dark'));
    }
  }, [theme, dispatch]);

  useEffect(() => {
    handleBodyScrollbar();
    const hasOpenWindow = !!isModalOpen?.length ;
    document.body.classList[hasOpenWindow ? 'add' : 'remove']('fixed');
  }, [isModalOpen]);

  let returnedLayout;
  switch (type) {
    case 'nakedLayout':
      returnedLayout = <NakedLayout {...propsFromComponent} content={content} customStyles={customStyles} />;
      break;
    default:
      returnedLayout = <BaseLayout {...propsFromComponent} content={content} customStyles={customStyles} />;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <GlobalStyle />
      {Object.entries(activeModals).map(it => (
        <MyTransition
          key={it[0]}
          showElement={!!isModalOpen.includes(it[0])}
          onExited={() => dispatch(setActiveModals({ ...it[1], eraseContent: true, closeAll: it[1].closeAll || !isModalOpen?.length }))}
          transitionStyles={{ zIndex: 'var(--zIndexModalOverlay)' }}
          animation="animZoom"
        >
          <Modal modalId={it[0]} />
        </MyTransition>

      ))}
      {returnedLayout}
    </ThemeProvider>
  );
};

export default LayoutResolver;
