import React from 'react';
import { checkLongWords, reduceString } from '../../../../../utils/stringUtils';
import FileCardStyled from './FileCardStyled';
import { getThumb } from './fileCardUtils';

const FileCard = props => {
  const { file, icons, deleteFileHandler, addFileDescriptionHandler, hasDescription } = props;
  const { name } = file;
  const splitName = name.split('.');
  const extension = splitName[splitName.length - 1];
  const extensionLength = extension.length + 1;
  const reducedName = `${reduceString(name.slice(0, name.length - extensionLength), 40)}.${extension}`;
  const isImage = file.type.includes('image/');
  return (
    <FileCardStyled isImage={isImage} hasDescription={hasDescription}>
      {getThumb(file, icons, deleteFileHandler, addFileDescriptionHandler, hasDescription)}
      <span className={`file-card__file-name ${checkLongWords(name) ? 'long-name' : ''}`}>{reducedName}</span>
    </FileCardStyled>
  );
};

export default FileCard;
