import { cloudinaryBaseURL } from '../../../../utils/cloudinaryUtils';
import Input from '../../formElements/Input/Input';
import Select from '../../formElements/Select/Select';
import Textarea from '../../formElements/TextArea/TextArea';
import { setFileIcon } from '../../../UI/Files/File/fileUtils';
import { reduceString } from '../../../../utils/stringUtils';

export const setMetadataHandler = (props = [], fieldName) => {
  const form = [];
  for (let i = 0; i < props.length; i++) {
    switch (props[i].type) {
      case 'input':
        form.push(<Input key={props[i].name} {...props[i]} name={`${fieldName}_${props[i].name}`} />);
        break;
      case 'textarea':
        form.push(<Textarea key={props[i].name} {...props[i]} name={`${fieldName}_${props[i].name}`} />);
        break;
      case 'select':
        form.push(<Select key={props[i].name} {...props[i]} name={`${fieldName}_${props[i].name}`} />);
        break;
      default:
        break;
    }
  }
  return form;
};

export const getPropToShow = (item, propToShow) => {
  if (!propToShow) {
    return;
  }

  if (propToShow.includes('.')) {
    const props = propToShow.split('.');
    return item[props[0]][props[1]];
  }

  if (typeof propToShow === 'string') {
    return item[propToShow];
  }

  for (let i = 0; i < propToShow.length; i++) {
    if (item[propToShow[i]]) {
      return item[propToShow[i]];
    }
  }
};

export const fileComponent = (type, it, propToShow) => {
  if (type === 'image') {
    const ext = it.extension || 'jpg';
    return <img alt={getPropToShow(it, propToShow) || 'Clique para editar os metadados da imagem'} src={`${cloudinaryBaseURL}${it.fileId}.${ext}`} />;
  }

  return (
    <div>
      <div className="file-icon">
        {setFileIcon(it.extension)}
      </div>
      {it.fileName ? <span className="file-name break-word">{reduceString(it.fileName, 40)}</span> : null}
    </div>
  );
};
