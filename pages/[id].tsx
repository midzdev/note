import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Note() {
  const [note, setNote] = useState<string>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    (async () => {
      const res = await fetch(`https://api.midzdev.com/note/${id}`);
      const data = await res.text();
      setNote(data);
    })();
  }, [router.isReady]);

  return (
    <>
      <pre>
        <code className="fixed w-screen h-screen bg-transparent font-['Fira_Code'] p-4 text-white font-semibold text-sm">
          {note}
        </code>
      </pre>
    </>
  );
}
