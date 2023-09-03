
import Footer from '../layoutComponents/Footer/Footer';
import Header from '../layoutComponents/Header/Header';
import BaseLayoutStyled from './BaseLayoutStyled';

const BaseLayout = props => {
  const { content, customStyles } = props;
  return (
    <BaseLayoutStyled>
      <div className="base-layout-content" style={customStyles}>
        <Header />
        {content}
      </div>
      <Footer />
    </BaseLayoutStyled>
  );
};

export default BaseLayout;
