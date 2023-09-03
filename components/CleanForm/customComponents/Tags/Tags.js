import React from 'react';
import TagsStyled from './TagsStyled';

const Tags = props => {
  const { text, clickHandler, allTags } = props;

  if (!allTags) {
    return <h2>É necessário informar a propriedade allTags, que contém o array de tags.</h2>;
  }

  return (
    <TagsStyled>
      <span className="tags__text">{typeof text === 'string' ? text : text.join(' ')}</span>
      <span role="button" tabIndex={0} className="tags__close" onClick={() => clickHandler(text, allTags)}>×</span>
    </TagsStyled>
  );
};

const propsAreEqual = (prev, next) => prev.text === next.text && JSON.stringify(prev.allTags) === JSON.stringify(next.allTags);

export default React.memo(Tags, propsAreEqual);
