import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Note() {
  const [note, setNote] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const { data } =
        id && (await axios.get(`https://api.midzdev.com/note/${id}`));
      setNote(data);
    })();
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <code className="bg-neutral-800 border border-neutral-700 rounded-md p-2 w-[1024px] text-white focus:border-indigo-500 duration-200 font-['Fira_Code'] text-sm">
        {note}
      </code>
    </div>
  );
}
