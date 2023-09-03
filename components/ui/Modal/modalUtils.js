import { setActiveModals } from '../../../redux/actions/uiActions';
import { Loader } from '../../CleanForm/components/Loader/Loader';

export const modalProcessing = (dispatch, text) => dispatch(setActiveModals({
  header: text || 'Processando...',
  body: <Loader />,
  closeAfterProcess: true,
  hideCloseIcon: true,
  overlayVoidClick: true,
}));

export const modalError = (dispatch, err, props) => dispatch(setActiveModals({
  header: 'Erro!',
  body: typeof err === 'string' || !err.response ? err : err.response?.data?.message || 'Ocorreu um erro ao efetuar sua requisição.',
  closeAfterProcess: true,
  ...props,
}));
