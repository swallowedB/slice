"use client";

import { useNoteQuery } from "@/hooks/queries/notes";
import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import {
  canEmbedUrl,
  isYouTubeUrl,
  getYouTubeEmbedUrl,
} from "@/app/(protected)/notes/_utils/embed";
import { useNoteEditor } from "./editor/hooks/useNoteEditor";
import NoteTitleView from "./NoteTitleView";
import NoteMetaInfo from "./NoteMetaInfo";
import { NoteLinkPreview } from "./NoteLinkPreview";
import { NoteEmbedView } from "./NoteEmbedView";

interface NoteDetailContentProps {
  noteId: number;
}

export default function NoteDetailContent({ noteId }: NoteDetailContentProps) {
  const { data: note, isLoading, error } = useNoteQuery(noteId);
  const editor = useNoteEditor(null);
  const [showEmbed, setShowEmbed] = useState(false);

  const linkMetadata = note?.linkMetadata;
  const isYouTube = linkMetadata ? isYouTubeUrl(linkMetadata.url) : false;
  const canEmbed = linkMetadata ? canEmbedUrl(linkMetadata.url) : false;

  const embedUrl =
    isYouTube && linkMetadata
      ? getYouTubeEmbedUrl(linkMetadata.url)
      : (linkMetadata?.url ?? "");

  const shouldShowEmbed = showEmbed && linkMetadata;

  useEffect(() => {
    if (note?.content && editor) {
      editor.commands.setContent(note.content);
    }
    console.log(note?.content);
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
          updatedAt={formatDate(note.updatedAt)}
        />
      </header>
      {shouldShowEmbed && (
        <NoteEmbedView
          url={embedUrl}
          title={linkMetadata.title}
          isYouTube={isYouTube}
          canEmbed={canEmbed}
          onClose={() => setShowEmbed(false)}
        />
      )}
      {linkMetadata && (
        <div className="mt-6">
          <NoteLinkPreview
            linkMetadata={linkMetadata}
            onClick={() => setShowEmbed(true)}
          />
        </div>
      )}
      <div className="flex-1">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
