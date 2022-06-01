import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';

export default function Index() {
  const [isSaving, setIsSaving] = useState(false);
  const [clicked, setClicked] = useState(false);
  const noteRef = useRef();

  async function saveNote(note: string) {
    const res = await fetch('https://api.midzdev.com/note/save', {
      method: 'POST',
      body: note,
    });

    const id = await res.text();

    Router.push('/' + id);
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        // @ts-ignore
        const note = noteRef.current?.value;
        if (!note) return;
        setIsSaving(true);

        saveNote(note);
      }
    });
  }

  function handleClick() {
    console.log(clicked);
    if (!clicked) {
      setClicked(true);
      setTimeout(() => setClicked(false), 250);
    } else {
      // @ts-ignore
      const note = noteRef.current?.value;
      if (!note) return;
      setIsSaving(true);

      saveNote(note);
    }
  }

  return (
    <div onClick={handleClick}>
      <div
        className={`fixed z-10 flex h-screen w-screen items-center justify-center bg-neutral-900 ${
          isSaving ? '' : 'hidden'
        }`}>
        <div className="flex h-20 w-20 animate-ping items-center justify-center rounded-full border-4 border-indigo-500 bg-transparent font-['Fira_Code'] text-xs text-indigo-400">
          Saving
        </div>
      </div>
      <textarea
        ref={noteRef}
        placeholder="Ctrl + S or double-tap to save note"
        className="fixed h-screen w-screen resize-none overflow-x-auto bg-transparent p-4 font-['Fira_Code'] text-sm text-white placeholder:text-neutral-400"
      />
    </div>
  );
}
