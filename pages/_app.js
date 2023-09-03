import '../styles/globals.css'
import { reduxWrapper } from '../redux/store'
import { Provider } from 'react-redux'

function MyApp({ Component,...rest }) {
  const { store, props } = reduxWrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;
