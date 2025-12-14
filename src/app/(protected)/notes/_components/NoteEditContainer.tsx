"use client";

import { useState, useEffect } from "react";
import { JSONContent } from "@tiptap/react";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import { useParams, useRouter } from "next/navigation";
import { useNoteQuery, useUpdateNoteMutation } from "@/hooks/queries/notes";
import NoteEditorForm from "../_components/NoteEditorForm";
import NoteMobileActions from "../_components/NoteMobileActions";
import NoteDesktopActions from "../_components/NoteDesktopActions";

export default function NoteEditContainer() {
  const router = useRouter();
  const params = useParams();
  const noteId = Number(params.noteId);

  const { data: note, isLoading, error } = useNoteQuery(noteId);
  const { mutate: updateNoteMutation, isPending } = useUpdateNoteMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(JSON.parse(note.content));
      setLinkUrl(note.linkUrl || "");
    }
  }, [note]);

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

  // TODO: 노트 임시저장
  const handleDraft = () => {};

  const handleSubmit = () => {
    if (title.trim() === "") {
      // TODO: 고민
      alert("제목을 입력해주세요.");
      return;
    }

    if (content === null) {
      // TODO: 고민
      alert("내용을 입력해주세요.");
      return;
    }

    updateNoteMutation(
      {
        noteId,
        data: {
          title: title.trim(),
          content: JSON.stringify(content),
          linkUrl: linkUrl.trim() || undefined,
        },
      },
      {
        onSuccess: (data) => {
          router.replace(`/notes?goalId=${data.goal.id}`);
        },

        onError: (error) => {
          console.error("노트 수정 실패:", error);
          // TODO: 고민
          alert("노트 수정에 실패했습니다.");
        },
      },
    );
  };

  // TODO:
  if (isLoading) return <div>노트 불러오는 중...</div>;
  if (error) return <div>노트를 불러오는 중 오류가 발생했습니다.</div>;
  if (!note) return <div>노트를 찾을 수 없습니다.</div>;

  return (
    <>
      <PageHeader
        title="노트 수정하기"
        desktopClassName="sm:mb-3 lg:mb-5.5"
        mobileActions={
          <NoteMobileActions
            submitLabel="수정"
            isDisabled={isDisabled}
            onDraft={handleDraft}
            onSubmit={handleSubmit}
          />
        }
        desktopActions={
          <NoteDesktopActions
            submitLabel="수정하기"
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
        metaInfo={{
          goalTitle: note.goal.title,
          todoTitle: note.todo.title,
          isTodoDone: note.todo.done,
          updatedAt: new Date(note.updatedAt).toLocaleDateString("ko-KR"),
        }}
      />
    </>
  );
}
