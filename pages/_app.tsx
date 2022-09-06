import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css';
require('../styles/index.less');

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
