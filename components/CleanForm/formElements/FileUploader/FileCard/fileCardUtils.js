import FileIcon from '../FileIcon';

export const getThumb = (file, icons = {}, deleteFileHandler, addFileDescriptionHandler = () => {}, hasDescription) => {
  const nameSplit = file.name.split('.');
  const extension = nameSplit[nameSplit.length - 1];
  let thumbNail;
  if (file.type.includes('image/')) {
    const url = window.URL.createObjectURL(file);
    thumbNail = <img className="file-card__image" alt="arquivo" src={url} onLoad={() => window.URL.revokeObjectURL(url)} />;
  } else if (!icons[extension]) {
    thumbNail = <><FileIcon /><span className="file-card__icon-extension">{extension}</span></>;
  } else {
    thumbNail = icons[extension];
  }

  return (
    <span className="file-card__icon-container">
      {hasDescription && <span aria-label="add-description" role="button" tabIndex={0} className="file-card__file-action file-card__add-description" data-name={file.name} onClick={addFileDescriptionHandler} />}
      <span role="button" aria-label="remove-file" tabIndex={0} className="file-card__file-action file-card__delete-file" data-name={file.name} onClick={deleteFileHandler} />
      {thumbNail}
    </span>
  );
};
