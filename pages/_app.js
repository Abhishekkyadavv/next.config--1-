import { useState } from 'react';
import '.././styles/globals.css';

export default function App({ Component, pageProps }) {
  const [Valid, setValid] = useState(false);
  return (
    <>
      {Valid ? <Component {...pageProps} /> : <button onClick={() => setValid(true)}>Login</button>}
    </>

  )
}
