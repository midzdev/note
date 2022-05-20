import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Note - MidzDev</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Note by MidzDev" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
