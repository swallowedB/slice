"use client";

import { useState, useEffect } from "react";
import { JSONContent } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useTodoQuery } from "@/hooks/queries/todos";
import {
  useCreateNoteMutation,
  useLinkMetadataMutation,
} from "@/hooks/queries/notes";
import { formatDate } from "@/utils/date";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";
import { toast } from "@/lib/toast";
import { LinkMetadata } from "@/api/types/note";
import NoteEditorForm from "./NoteEditorForm";
import NoteMobileActions from "./NoteMobileActions";
import NoteDesktopActions from "./NoteDesktopActions";
import DraftCallout from "./DraftCallout";
import { draftNoteStorage } from "../_utils/draft-note";
import { useAutoSaveDraft } from "../_hooks/useAutoSaveDraft";

interface NoteCreateContainerProps {
  todoId: number;
}

export default function NoteCreateContainer({
  todoId,
}: NoteCreateContainerProps) {
  const router = useRouter();

  const { data: todo } = useTodoQuery(todoId);
  const { mutate: createNoteMutation, isPending } = useCreateNoteMutation();
  const { mutate: getLinkMetadataMutation } = useLinkMetadataMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkMetadata, setLinkMetadata] = useState<LinkMetadata | null>(null);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [hasDraftNote, setHasDraftNote] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  useAutoSaveDraft({
    todoId,
    title,
    content,
    linkUrl,
    linkMetadata,
    isEditMode: false,
    onSave: () => setHasDraftNote(true),
  });

  useEffect(() => {
    setHasDraftNote(draftNoteStorage.has(todoId));
  }, [todoId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent: JSONContent) => {
    setContent(newContent);
  };

  const handleLinkUrlChange = (url: string) => {
    setLinkUrl(url);

    if (!url.trim()) {
      setLinkMetadata(null);
      setIsEmbedOpen(false);
      return;
    }

    try {
      new URL(url);

      getLinkMetadataMutation(url, {
        onSuccess: (data) => {
          setLinkMetadata(data);
        },
        onError: (error) => {
          console.error("링크 메타데이터 가져오기 실패:", error);
          toast.error("링크 정보를 가져올 수 없습니다.");
        },
      });
    } catch (error) {}
  };

  const handleToggleEmbed = () => {
    setIsEmbedOpen(!isEmbedOpen);
  };

  const handleDeleteLinkPreview = () => {
    setLinkUrl("");
    setLinkMetadata(null);
    setIsEmbedOpen(false);
  };

  const handleDraft = () => {
    if (!title.trim() && !content) return;

    draftNoteStorage.save(todoId, {
      title,
      content: content || { type: "doc", content: [] },
      linkUrl,
      linkMetadata,
    });

    setHasDraftNote(true);
    toast.success("임시 저장이 완료되었습니다", { hasTime: true });
  };

  const handleLoadModalOpen = () => {
    setIsLoadModalOpen(true);
  };

  const handleLoadModalClose = () => {
    setIsLoadModalOpen(false);
  };

  const handleDraftCalloutClose = () => {
    setHasDraftNote(false);
  };

  const handleConfirmLoadDraft = () => {
    const draftNote = draftNoteStorage.get(todoId);

    if (draftNote) {
      setTitle(draftNote.title);
      setContent(draftNote.content);
      setLinkUrl(draftNote.linkUrl);
      setLinkMetadata(draftNote.linkMetadata ?? null);
    }

    draftNoteStorage.remove(todoId);
    setIsLoadModalOpen(false);
    setHasDraftNote(false);
  };

  const getDraftTitle = () => {
    const draftNote = draftNoteStorage.get(todoId);
    return draftNote?.title.trim() || "제목 없음";
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!content) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    const payload = {
      title: title.trim(),
      content: JSON.stringify(content),
      ...(linkUrl.trim() && { linkUrl: linkUrl.trim() }),
    };

    createNoteMutation(
      { todoId, ...payload },
      {
        onSuccess: (data) => {
          draftNoteStorage.remove(todoId);
          router.replace(`/notes?goalId=${data.goal.id}`);
        },
        onError: (error) => {
          console.error("노트 등록 실패:", error);
          toast.error("노트 등록에 실패했습니다.");
        },
      },
    );
  };

  const isDisabled = !title.trim() || !content || isPending;

  const metaInfo = {
    goalTitle: todo.goal.title,
    todoTitle: todo.title,
    isTodoDone: todo.done,
    updatedAt: formatDate(todo.updatedAt),
  };

  return (
    <>
      <div className="relative">
        <PageHeader
          title="노트 작성하기"
          desktopClassName="sm:mb-3 lg:mb-5.5"
          mobileActions={
            <NoteMobileActions
              submitLabel="등록"
              isDisabled={isDisabled}
              onDraft={handleDraft}
              onSubmit={handleSubmit}
            />
          }
          desktopActions={
            <NoteDesktopActions
              submitLabel="등록하기"
              isDisabled={isDisabled}
              onDraft={handleDraft}
              onSubmit={handleSubmit}
            />
          }
        />
        {hasDraftNote && (
          <div className="hidden sm:absolute sm:top-12 sm:right-22 sm:z-500 sm:block sm:w-70 lg:top-12">
            <DraftCallout
              onLoadDraft={handleLoadModalOpen}
              onClose={handleDraftCalloutClose}
            />
          </div>
        )}
        <NoteEditorForm
          title={title}
          content={content}
          linkUrl={linkUrl}
          linkMetadata={linkMetadata}
          isEmbedOpen={isEmbedOpen}
          onChangeTitle={handleTitleChange}
          onChangeContent={handleContentChange}
          onChangeLinkUrl={handleLinkUrlChange}
          onToggleEmbed={handleToggleEmbed}
          onDeleteLinkPreview={handleDeleteLinkPreview}
          metaInfo={metaInfo}
          hasDraftNote={hasDraftNote}
          onLoadDraft={handleLoadModalOpen}
          onCloseDraftCallout={handleDraftCalloutClose}
        />
      </div>
      {isLoadModalOpen && (
        <ConfirmModal
          isOpen={isLoadModalOpen}
          title={`'${getDraftTitle()}'\n제목의 노트를 불러오시겠어요?`}
          onClose={handleLoadModalClose}
          onConfirm={handleConfirmLoadDraft}
        />
      )}
    </>
  );
}
