import NakedLayoutStyled from './NakedLayoutStyled';

const NakedLayout = props => {
  const { content, customStyles } = props;

  return (
    <NakedLayoutStyled>
      <div className="naked-layout-content" style={customStyles}>
        {content}
      </div>
    </NakedLayoutStyled>
  );
};

export default NakedLayout;
