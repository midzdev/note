import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';

export default function Index() {
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

        saveNote(note);
      }
    });
  }

  return (
    <textarea
      ref={noteRef}
      placeholder="Ctrl + S to save note."
      className="fixed w-screen h-screen overflow-x-auto bg-transparent resize-none font-['Fira_Code'] p-4 text-white font-semibold text-sm placeholder:text-neutral-400"
    />
  );
}
