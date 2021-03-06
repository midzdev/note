import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Note • MidzDev</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Note by MidzDev" />
        <meta name="theme-color" content="#6969f5" />
        <meta name="keyword" content="" />
        <link rel="canonical" href="https://note.midzdev.com/" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
