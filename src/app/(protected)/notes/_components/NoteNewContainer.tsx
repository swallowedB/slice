"use client";

import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateNoteMutation } from "@/hooks/queries/notes";
import NoteEditorForm from "../_components/NoteEditorForm";
import NoteMobileActions from "../_components/NoteMobileActions";
import NoteDesktopActions from "../_components/NoteDesktopActions";

export default function NoteNewContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const todoId = searchParams.get("todoId");

  const { mutate: createNoteMutation, isPending } = useCreateNoteMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [linkUrl, setLinkUrl] = useState("");

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

    createNoteMutation(
      {
        todoId: Number(todoId),
        title: title.trim(),
        content: JSON.stringify(content),
        linkUrl: linkUrl.trim() || undefined,
      },
      {
        onSuccess: (data) => {
          router.replace(`/notes?goalId=${data.goal.id}`);
        },

        onError: (error) => {
          console.error("노트 등록 실패:", error);
          // TODO: 고민
          alert("노트 등록에 실패했습니다.");
        },
      },
    );
  };

  return (
    <>
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
      <NoteEditorForm
        title={title}
        content={content}
        linkUrl={linkUrl}
        onChangeTitle={handleTitleChange}
        onChangeContent={handleContentChange}
        onChangeLinkUrl={handleLinkUrlChange}
        metaInfo={{
          goalTitle: "자바스크립트로 웹 서비스 만들기",
          todoTitle: "자바스크립트 기초 챕터1 듣기",
          isTodoDone: false,
          updatedAt: "2025. 11. 23",
        }}
      />
    </>
  );
}
