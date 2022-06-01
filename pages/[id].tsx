import Head from 'next/head';

export async function getServerSideProps({ params }) {
  const { id } = params;

  const res = await fetch(`https://api.midzdev.com/note/${id}`);
  const data = await res.text();

  return { props: { id, data } };
}

export default function Note({ id, data }) {
  return (
    <>
      <Head>
        <meta property="og:site_name" content={`Note ID: ${id}`} />
        <meta property="og:description" content={data} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <pre className="fixed h-screen w-screen whitespace-pre-wrap break-words bg-transparent p-4 font-[Inter] text-sm text-white">
        {data}
      </pre>
    </>
  );
}
