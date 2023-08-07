import 'antd/dist/reset.css'
import '../styles/globals.css'
import { CookiesProvider } from 'react-cookie';
function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return   <CookiesProvider>
  <Component {...pageProps} /></CookiesProvider>
}

export default MyApp
