import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
        <meta property="og:title" content="Note by MidzDev" />
        <meta property="og:description" content={data} />
      </Head>
      <pre className="fixed w-screen h-screen bg-transparent font-['Fira_Code'] p-4 text-white font-semibold text-sm whitespace-pre-wrap break-words">
        {data}
      </pre>
    </>
  );
}
