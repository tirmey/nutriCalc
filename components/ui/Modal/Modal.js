import { useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Button from '../../CleanForm/components/Button/Button';
import MyLink from '../MyLink/MyLink';
import ModalStyled from './ModalStyled';
import { isModalOpen, setActiveModals } from '../../../redux/slices/uiSlice';

const Modal = props => {
  const {
    animation,
    modalId,
  } = props;

  const dispatch = useDispatch();
  const { activeModals } = useSelector(state =>  state.uiSlice);

  const {
    overlayVoidClick,
    exhibitionTime,
    hideCloseIcon,
    styles,
    bodyStyles,
    header,
    body,
    big,
    helpMessage,
    actions,
    noCancelButton,
    cancelText,
    success,
  } = activeModals[modalId];

  const modalRef = useRef();

  const clickHandler = e => {
    if (activeModals[modalId]?.clickHandler) {
      activeModals[modalId]?.clickHandler(e, modalRef, activeModals[modalId]);
      return;
    }

    if (e.target.classList.contains('close-widget')) {
      if (activeModals[modalId].closeAll) {
        return dispatch(isModalOpen());
      }
      dispatch(setActiveModals(activeModals[modalId]));
    }
  };

  useEffect(() => {
    if (exhibitionTime) {
      setTimeout(() => {
        if (activeModals[modalId].closeAll) {
          return dispatch(isModalOpen());
        }
        dispatch(setActiveModals(activeModals[modalId]));
      }, exhibitionTime);
    }
  }, [activeModals[modalId]]);

  return (
    activeModals[modalId]
      ? (
        <ModalStyled
          onClick={clickHandler}
          className={`centered fullscreen-overlay  ${(overlayVoidClick || exhibitionTime) ? '' : 'close-widget'} ${animation ? animation : ''}`}
          big={big}
          ref={modalRef}
          data-modalid={modalId}
        >
          <div className="modal" style={styles || {}}>
            <div className="modal__header">
              {!header
                ? <h2>{success ? 'Sucesso' : 'Atenção'}!</h2>
                : typeof header === 'string'
                  ? <h2>{header}</h2>
                  : header}
              {(!exhibitionTime && !hideCloseIcon) && <span className="modal__close close-widget" data-modalid={modalId}>×</span>}
            </div>
            <div className="modal__body custom-scrollbar" style={bodyStyles}>
              {body}
              {helpMessage && (
                <div role="button" tabIndex={0} className="modal__help-message" onClick={() => dispatch(setActiveModals(activeModals[modalId]))}>
                  <MyLink href={`/central-comunicacao?${typeof helpMessage === 'string' ? helpMessage : ''}`} newWindow>
                    Caso precise, entre em contato conosco!
                  </MyLink>
                </div>
              )}
              {!!actions && (
                <div className="button-div">
                  {!noCancelButton && (
                    <Button
                      text={cancelText || 'cancelar'}
                      size={actions[0].btnSize || 'small'}
                      clickHandler={() => dispatch(setActiveModals(activeModals[modalId]))}
                    />
                  )}
                  {actions.map(act => (
                    <Button
                      key={act.text}
                      text={act.text}
                      size={act.btnSize || 'small'}
                      myData={JSON.stringify({ modalId })}
                      clickHandler={act.clickHandler}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </ModalStyled>
      )
      : null
  );
};

const mapStateToProps = state => ({
  ui: state.uiReducer,
});

export default connect(mapStateToProps)(Modal);
