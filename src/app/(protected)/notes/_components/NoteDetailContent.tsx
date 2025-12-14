"use client";

import { useNoteQuery } from "@/hooks/queries/notes";
import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import NoteTitleView from "./NoteTitleView";
import NoteMetaInfo from "./NoteMetaInfo";
import { useNoteEditor } from "./editor/hooks/useNoteEditor";

interface NoteDetailContentProps {
  noteId: number;
}

export default function NoteDetailContent({ noteId }: NoteDetailContentProps) {
  const { data: note, isLoading, error } = useNoteQuery(noteId);

  const editor = useNoteEditor(null);

  useEffect(() => {
    if (note?.content && editor) {
      editor.commands.setContent(note.content);
    }
  }, [note?.content, editor]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || !note) {
    return <div>노트를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col">
      <header className="border-b border-gray-100 pb-7">
        <NoteTitleView
          title={note.title}
          className="text-lg sm:text-2xl"
        />
        <NoteMetaInfo
          goalTitle={note.goal.title}
          todoTitle={note.todo.title}
          isTodoDone={note.todo.done}
          updatedAt={new Date(note.updatedAt).toLocaleDateString("ko-KR")}
        />
      </header>
      <div className="flex-1">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
