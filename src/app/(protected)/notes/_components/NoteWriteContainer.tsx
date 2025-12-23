"use client";

import { useState, useEffect } from "react";
import { JSONContent } from "@tiptap/react";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from "@/hooks/queries/notes";
import { useTodoQuery } from "@/hooks/queries/todos";
import { formatDate } from "@/utils/date";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";
import NoteEditorForm from "./NoteEditorForm";
import NoteMobileActions from "./NoteMobileActions";
import NoteDesktopActions from "./NoteDesktopActions";
import DraftCallout from "./DraftCallout";
import { draftNoteStorage } from "../_utils/draft-note";
import { toast } from "@/lib/toast";

interface NoteWriteContainerProps {
  mode: "create" | "edit";
}

export default function NoteWriteContainer({ mode }: NoteWriteContainerProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const isEditMode = mode === "edit";

  const queryTodoId = Number(searchParams.get("todoId"));
  const noteId = Number(params.noteId);

  const { data: todo, error: todoError } = useTodoQuery(queryTodoId);
  const { data: note, error: noteError } = useNoteQuery(noteId);
  const { mutate: createNoteMutation, isPending: isCreatePending } =
    useCreateNoteMutation();
  const { mutate: updateNoteMutation, isPending: isUpdatePending } =
    useUpdateNoteMutation();

  const isPending = isCreatePending || isUpdatePending;

  const todoId = isEditMode ? note?.todo.id : queryTodoId;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [hasDraftNote, setHasDraftNote] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  useEffect(() => {
    if (todoId) {
      setHasDraftNote(draftNoteStorage.has(todoId));
    }
  }, [todoId]);

  useEffect(() => {
    if (isEditMode || !todoId) return;

    const interval = setInterval(
      () => {
        if (title.trim() || content) {
          draftNoteStorage.save(todoId, {
            title,
            content: content || { type: "doc", content: [] },
            linkUrl,
          });
          setHasDraftNote(true);
          toast.success("임시 저장이 완료되었습니다", { hasTime: true });
        }
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [isEditMode, todoId, title, content, linkUrl]);

  useEffect(() => {
    if (isEditMode && note) {
      setTitle(note.title);
      setContent(note.content);
      setLinkUrl(note.linkUrl ?? "");
    }
  }, [isEditMode, note]);

  const isDisabled = !title.trim() || !content || isPending;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent: JSONContent) => {
    setContent(newContent);
  };

  const handleLinkUrlChange = (url: string) => {
    setLinkUrl(url);
  };

  const handleDraft = () => {
    if (!todoId) return;
    if (!title.trim() && !content) return;

    draftNoteStorage.save(todoId, {
      title,
      content: content || { type: "doc", content: [] },
      linkUrl,
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
    if (!todoId) return;

    const draftNote = draftNoteStorage.get(todoId);
    if (draftNote) {
      setTitle(draftNote.title);
      setContent(draftNote.content);
      setLinkUrl(draftNote.linkUrl);
    }

    draftNoteStorage.remove(todoId);

    setIsLoadModalOpen(false);
    setHasDraftNote(false);
  };

  const getDraftTitle = () => {
    if (!todoId) return "제목 없음";
    const draftNote = draftNoteStorage.get(todoId);
    return draftNote?.title.trim() || "제목 없음";
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    const payload = {
      title: title.trim(),
      content: JSON.stringify(content),
      linkUrl: linkUrl.trim() || undefined,
    };

    const onSuccess = (data: { goal: { id: number } }) => {
      if (todoId) {
        draftNoteStorage.remove(todoId);
      }
      router.replace(`/notes?goalId=${data.goal.id}`);
    };

    const onError = (error: Error) => {
      const action = isEditMode ? "수정" : "등록";
      console.error(`노트 ${action} 실패:`, error);
      alert(`노트 ${action}에 실패했습니다.`);
    };

    if (isEditMode) {
      updateNoteMutation({ noteId, data: payload }, { onSuccess, onError });
    } else {
      createNoteMutation(
        { todoId: queryTodoId, ...payload },
        { onSuccess, onError },
      );
    }
  };

  if (!isEditMode && todoError) {
    return <div>할일 정보를 불러올 수 없습니다.</div>;
  }

  if (isEditMode && (noteError || !note)) {
    return <div>노트를 찾을 수 없습니다.</div>;
  }

  const metaInfo = isEditMode
    ? {
        goalTitle: note!.goal.title,
        todoTitle: note!.todo.title,
        isTodoDone: note!.todo.done,
        updatedAt: formatDate(note!.updatedAt),
      }
    : {
        goalTitle: todo?.goal.title ?? "",
        todoTitle: todo?.title ?? "",
        isTodoDone: todo?.done ?? false,
        updatedAt: formatDate(todo?.updatedAt ?? new Date().toISOString()),
      };

  return (
    <>
      <div className="relative">
        <PageHeader
          title={isEditMode ? "노트 수정하기" : "노트 작성하기"}
          desktopClassName="sm:mb-3 lg:mb-5.5"
          mobileActions={
            <NoteMobileActions
              submitLabel={isEditMode ? "수정" : "등록"}
              isDisabled={isDisabled}
              onDraft={handleDraft}
              onSubmit={handleSubmit}
            />
          }
          desktopActions={
            <NoteDesktopActions
              submitLabel={isEditMode ? "수정하기" : "등록하기"}
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
          onChangeTitle={handleTitleChange}
          onChangeContent={handleContentChange}
          onChangeLinkUrl={handleLinkUrlChange}
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
