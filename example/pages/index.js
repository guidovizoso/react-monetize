import Head from 'next/head';
import { MonetizeProvider } from 'react-monetize';

import Control from '../components/Control';
import MonetizedContent from '../components/MonetizedContent';

export default function Home() {
  return (
    <div className="container">
      <MonetizeProvider paymentPointer="$coil.xrptipbot.com/JABJLDXNSje7h_bY26_6wg">
        <Head>
          <title>react-monetize playground</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Control />
        <MonetizedContent />
      </MonetizeProvider>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
