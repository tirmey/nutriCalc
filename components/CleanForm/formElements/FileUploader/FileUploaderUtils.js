const maxFilesDynamicHandler = (multiple, maxFiles, state) => !multiple ? 1 : !maxFiles ? null : typeof maxFiles === 'number' ? maxFiles : maxFiles(state);

const maxFilesCheckHandler = (maxFiles, e, st) => {
  const files = e.dataTransfer?.files || e.target?.files;
  const numFiles = files.length + (st[e.target.name]?.length || 0);
  return !maxFiles || numFiles <= maxFiles;
};

const checkSizeAndTypeHandler = (maxUploadSize, maxFileSize, e, st, fileTypes) => {
  const stateFiles = st[e.target.name] || [];
  const newFiles = e.dataTransfer?.files || e.target?.files;

  let uploadSize = 0;

  for (let i = 0; i < stateFiles.length; i++) {
    if (stateFiles[i].size > maxFileSize) {
      return ({ err: 'fileSize' });
    }

    if (fileTypes && !fileTypes.includes(stateFiles[i].type)) {
      return ({ err: 'fileType' });
    }

    uploadSize += stateFiles[i].size;
  }

  for (let i = 0; i < newFiles.length; i++) {
    if (newFiles[i].size > maxFileSize) {
      return ({ err: 'fileSize' });
    }

    if (fileTypes && !fileTypes.includes(newFiles[i].type)) {
      return ({ err: 'fileType' });
    }

    uploadSize += newFiles[i].size;
  }

  return (!maxUploadSize || uploadSize <= maxUploadSize) ? null : { err: 'uploadSize' };
};

const checkSameFileHandler = (e, st) => {
  const name = e.target.name;
  const newFiles = e.dataTransfer?.files || e.target?.files;
  const stateFiles = st[name];
  if (!st[name]) {
    return;
  }

  for (let i = 0; i < newFiles.length; i++) {
    const sameFile = stateFiles.find(it => it.name === newFiles[i].name);
    if (sameFile) {
      return true;
    }
  }
};

export const checkFiles = (e, props) => {
  const { maxFiles, maxUploadSize, maxFileSize, allowedFileTypes, formState, multiple } = props;
  const maxFilesDynamic = maxFilesDynamicHandler(multiple, maxFiles, formState);

  if (!maxFilesCheckHandler(maxFilesDynamic, e, formState)) {
    return ({ err: 'maxFiles' });
  }

  const sameFile = checkSameFileHandler(e, formState);
  if (sameFile) {
    return ({ err: 'sameFile' });
  }

  const checkSizeAndType = checkSizeAndTypeHandler(maxUploadSize, maxFileSize, e, formState, allowedFileTypes);
  if (checkSizeAndType?.err) {
    return ({ err: checkSizeAndType.err });
  }
};

export const fileTypes = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls: 'application/vnd.ms-excel',
  csv: 'application/vnd.ms-excel',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
  txt: 'text/plain',
  pdf: 'application/pdf',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
};

export const uploadErrorMessages = (err, props) => {
  const { maxFiles, maxUploadSize, maxFileSize, allowedFileTypes, formState, multiple } = props;
  const maxFilesDynamic = maxFilesDynamicHandler(multiple, maxFiles, formState);

  switch (err) {
    case 'maxFiles':
      return `Não é permitido carregar mais que ${maxFilesDynamic} arquivo${maxFilesDynamic > 1 ? 's' : ''}.`;
    case 'sameFile':
      return 'Um dos arquivos já foi carregado.';
    case 'fileSize':
      return `Um dos arquivos tem tamanho maior que o permitido (${(maxFileSize / 1024).toFixed()}kb).`;
    case 'uploadSize':
      return `Tamanho do conjunto de arquivos maior que o permitido (${(maxUploadSize / 1024).toFixed()}Kb).`;
    case 'fileType':
      return `São permitidos apenas os arquivos dos seguintes tipos:\n${allowedFileTypes.map(it => Object.entries(fileTypes).find(type => it === type[1])[0]).join(';\n')}.`;
    default:
      break;
  }
};
