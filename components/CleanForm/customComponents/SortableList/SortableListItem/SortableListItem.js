/* eslint-disable jsx-a11y/control-has-associated-label */
import { checkLongWords } from '../../../../../utils/stringUtils';
import GenericContainer from '../../../../UI/GenericContainer/GenericContainer';
import MyIcon from '../../../../UI/MyIcon/MyIcon';
import { cloudinaryBaseURL } from '../../../../../utils/cloudinaryUtils';

const SortedListItem = props => {
  const { title, upHandler, downHandler, first, last, classes, isImage } = props;
  const elementToShow = isImage ? <img className="sortable-list-item__thumbnail" alt="Miniatura de foto do laboratório" src={`${cloudinaryBaseURL}${title}.webp`} /> : title;

  return (
    <GenericContainer classes={`sortable-list-item ${classes}`} hoverEffects cursor="default">
      <span className={`sortable-list-item__title ${checkLongWords(title) ? 'long-words' : ''}`}>{elementToShow}</span>
      <span className="sortable-list-item__actions">
        <button type="button" data-title={title} onClick={upHandler} className={`pointer ${first ? 'disabled' : ''}`}><MyIcon iconName="up" /></button>
        <button type="button" data-title={title} onClick={downHandler} className={`pointer ${last ? 'disabled' : ''}`}><MyIcon iconName="down" /></button>
      </span>
    </GenericContainer>
  );
};

export default SortedListItem;
