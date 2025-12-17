"use client";

import { useNoteQuery } from "@/hooks/queries/notes";
import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import NoteTitleView from "./NoteTitleView";
import NoteMetaInfo from "./NoteMetaInfo";
import { useNoteEditor } from "./editor/hooks/useNoteEditor";
import { NoteLinkPreview } from "./NoteLinkPreview";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface NoteDetailContentProps {
  noteId: number;
}

export default function NoteDetailContent({ noteId }: NoteDetailContentProps) {
  const { data: note, isLoading, error } = useNoteQuery(noteId);
  const editor = useNoteEditor(null);
  const [showEmbed, setShowEmbed] = useState(false);

  useEffect(() => {
    if (note?.content && editor) {
      editor.commands.setContent(note.content);
    }
  }, [note?.content, editor]);

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/,
    )?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const shouldShowYouTubeEmbed =
    showEmbed && note?.linkMetadata && isYouTubeUrl(note.linkMetadata.url);

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
      {shouldShowYouTubeEmbed && (
        <div className="mt-5 border border-gray-100">
          <div className="bg-gray-25 flex justify-end">
            <button
              type="button"
              aria-label="닫기"
              className="cursor-pointer pr-1 text-gray-200 lg:py-1"
              onClick={() => setShowEmbed(false)}>
              <XMarkIcon
                strokeWidth={1.8}
                className="h-6 w-6"
              />
            </button>
          </div>
          <div className="relative aspect-video max-h-[400px] w-full sm:max-h-[500px] lg:max-h-[600px]">
            <iframe
              src={getYouTubeEmbedUrl(note.linkMetadata!.url)}
              className="absolute inset-0 h-full w-full"
              title={note.linkMetadata!.title ?? "YouTube Video"}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            />
          </div>
        </div>
      )}
      {note.linkMetadata && (
        <div className="mt-6">
          <NoteLinkPreview
            linkMetadata={note.linkMetadata}
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
