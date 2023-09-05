export const breakBigWords = (word, maxSize) => {
  if (word.length > maxSize) {
    return <span className="break-word">{word}</span>;
  }
  return word;
};

export const textNormalizer = str => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.normalize('NFD').replace(/[^a-zA-Z0-9 ]/g, '').replace(/[ ]/g, '_').toLowerCase();
};
