"use client";

import { useNoteQuery } from "@/hooks/queries/notes";
import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import { canEmbedUrl, isYouTubeUrl, getYouTubeEmbedUrl } from "@/utils/embed";
import {
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNoteEditor } from "./editor/hooks/useNoteEditor";
import NoteTitleView from "./NoteTitleView";
import NoteMetaInfo from "./NoteMetaInfo";
import { NoteLinkPreview } from "./NoteLinkPreview";

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

  const linkMetadata = note?.linkMetadata;
  const isYouTubeLink = linkMetadata && isYouTubeUrl(linkMetadata.url);
  const canEmbed = linkMetadata && canEmbedUrl(linkMetadata.url);

  const showYouTubeEmbed = showEmbed && isYouTubeLink;
  const showGeneralEmbed =
    showEmbed && linkMetadata && !isYouTubeLink && canEmbed;
  const showUnsupportedUI =
    showEmbed && linkMetadata && !isYouTubeLink && !canEmbed;

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
      {(showYouTubeEmbed || showGeneralEmbed || showUnsupportedUI) && (
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
          {showYouTubeEmbed && (
            <div className="relative aspect-video max-h-[400px] w-full sm:max-h-[500px] lg:max-h-[600px]">
              <iframe
                src={getYouTubeEmbedUrl(linkMetadata.url)}
                className="absolute inset-0 h-full w-full"
                title={linkMetadata.title ?? "YouTube Video"}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              />
            </div>
          )}
          {showGeneralEmbed && (
            <div className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]">
              <iframe
                src={linkMetadata.url}
                className="absolute inset-0 h-full w-full"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title={linkMetadata.title ?? "링크 콘텐츠"}
              />
            </div>
          )}
          {showUnsupportedUI && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-6 rounded-full bg-gray-50 p-6">
                <ArrowTopRightOnSquareIcon className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                이 사이트는 미리보기를 지원하지 않습니다.
              </h3>
              <p className="mb-8 text-sm text-gray-600">
                새 탭에서 열어보세요.
              </p>
              <button
                onClick={() =>
                  window.open(linkMetadata.url, "_blank", "noopener,noreferrer")
                }
                className="bg-orange-250 inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-400">
                새 탭에서 열기
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
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
