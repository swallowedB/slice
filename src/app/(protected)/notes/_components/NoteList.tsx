"use client";

import { useMemo } from "react";
import { Note } from "@/hooks/queries/notes";
import NoteItem from "./NoteItem";

interface NoteListProps {
  notes: Note[];
  onEditNote: (id: number) => void;
  onDeleteNote: (id: number) => void;
}

export default function NoteList({
  notes,
  onEditNote,
  onDeleteNote,
}: NoteListProps) {
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [notes]);

  return (
    <section
      className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-5"
      aria-label="노트 목록">
      {sortedNotes.map((note) => (
        <NoteItem
          key={note.id}
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
          {...note}
        />
      ))}
    </section>
  );
}
