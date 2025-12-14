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
import NoteEditorForm from "./NoteEditorForm";
import NoteMobileActions from "./NoteMobileActions";
import NoteDesktopActions from "./NoteDesktopActions";

interface NoteWriteContainerProps {
  mode: "create" | "edit";
}

export default function NoteWriteContainer({ mode }: NoteWriteContainerProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const isEditMode = mode === "edit";

  const todoId = Number(searchParams.get("todoId"));
  const noteId = Number(params.noteId);

  const { data: todo, error: todoError } = useTodoQuery(todoId);
  const { data: note, error: noteError } = useNoteQuery(noteId);
  const { mutate: createNoteMutation, isPending: isCreatePending } =
    useCreateNoteMutation();
  const { mutate: updateNoteMutation, isPending: isUpdatePending } =
    useUpdateNoteMutation();

  const isPending = isCreatePending || isUpdatePending;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [linkUrl, setLinkUrl] = useState("");

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

  const handleContentChange = (content: JSONContent) => {
    setContent(content);
  };

  const handleLinkUrlChange = (url: string) => {
    setLinkUrl(url);
  };

  const handleDraft = () => {
    // TODO: 노트 임시저장
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
      createNoteMutation({ todoId, ...payload }, { onSuccess, onError });
    }
  };

  // TODO: ErrorBoundary?
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
        updatedAt: new Date(note!.updatedAt).toLocaleDateString("ko-KR"),
      }
    : {
        goalTitle: todo?.goal.title ?? "",
        todoTitle: todo?.title ?? "",
        isTodoDone: todo?.done ?? false,
        updatedAt: new Date().toLocaleDateString("ko-KR"),
      };

  return (
    <>
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
      <NoteEditorForm
        title={title}
        content={content}
        linkUrl={linkUrl}
        onChangeTitle={handleTitleChange}
        onChangeContent={handleContentChange}
        onChangeLinkUrl={handleLinkUrlChange}
        metaInfo={metaInfo}
      />
    </>
  );
}
