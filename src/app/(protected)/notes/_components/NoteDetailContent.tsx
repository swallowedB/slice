"use client";

import { useNoteQuery } from "@/hooks/queries/notes";
import { useState } from "react";
import { formatDate } from "@/utils/date";
import NoteTitleView from "./NoteTitleView";
import NoteMetaInfo from "./NoteMetaInfo";
import { NoteLinkPreview } from "./NoteLinkPreview";
import { NoteEmbedView } from "./NoteEmbedView";
import { Editor } from "./editor/Editor";

interface NoteDetailContentProps {
  noteId: number;
}

export default function NoteDetailContent({ noteId }: NoteDetailContentProps) {
  const { data: note, isLoading, error } = useNoteQuery(noteId);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const linkMetadata = note?.linkMetadata;

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
          updatedAt={formatDate(note.updatedAt)}
        />
      </header>
      {linkMetadata && (
        <div className="mt-5 flex flex-col gap-6">
          {isEmbedOpen && (
            <NoteEmbedView
              url={linkMetadata.url}
              title={linkMetadata.title}
              onClose={() => setIsEmbedOpen(false)}
            />
          )}
          <NoteLinkPreview
            linkMetadata={linkMetadata}
            onClick={() => setIsEmbedOpen(true)}
          />
        </div>
      )}
      <div className="flex-1">
        <Editor content={note.content} />
      </div>
    </div>
  );
}
