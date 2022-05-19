import { useState } from 'react';
import Router from 'next/router';

export default function Index() {
  const [note, setNote] = useState('');

  async function saveNote() {
    const res = await fetch('https://api.midzdev.com/note/save', {
      method: 'POST',
      body: note,
    });

    const id = await res.text();

    Router.push('/' + id);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <textarea
        value={note}
        onChange={({ target }) => setNote(target.value)}
        rows={14}
        className="outline-none resize-none bg-neutral-800 border border-neutral-700 rounded-md p-2 w-[1024px] text-white focus:border-indigo-500 duration-200 font-['Fira_Code'] text-sm"></textarea>

      <div className="mt-4">
        <button
          className="bg-emerald-500 px-4 py-2 font-['Fira_Code'] font-semibold text-white text-sm rounded-md mr-2"
          onClick={saveNote}>
          Save
        </button>
        <button
          className="bg-rose-500 px-4 py-2 font-['Fira_Code'] font-semibold text-white text-sm rounded-md"
          onClick={() => setNote('')}>
          Clear
        </button>
      </div>
    </div>
  );
}
