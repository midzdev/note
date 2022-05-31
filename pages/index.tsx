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
        className={`fixed h-screen w-screen flex justify-center items-center bg-neutral-900 z-10 ${
          isSaving ? '' : 'hidden'
        }`}>
        <div className="w-20 h-20 rounded-full bg-transparent border-4 border-indigo-500 animate-ping flex items-center justify-center text-xs text-indigo-400 font-['Fira_Code']">
          Saving
        </div>
      </div>
      <textarea
        ref={noteRef}
        placeholder="Ctrl + S or double-tap to save note"
        className="fixed w-screen h-screen overflow-x-auto bg-transparent resize-none font-['Fira_Code'] p-4 text-white text-sm placeholder:text-neutral-400"
      />
    </div>
  );
}
