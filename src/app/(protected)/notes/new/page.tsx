"use client";

import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import PageHeader from "../../_components/layout/PageHeader";
import NoteEditorForm from "../_components/NoteEditorForm";
import NoteMobileActions from "../_components/NoteMobileActions";
import NoteDesktopActions from "../_components/NoteDesktopActions";

export default function NoteNewPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (content: JSONContent) => {
    setContent(content);
  };

  // TODO: 노트 임시저장
  const handleDraft = () => {};

  // TODO: 노트 등록
  const handleSubmit = () => {};

  return (
    <>
      <PageHeader
        title="노트 작성하기"
        desktopClassName="sm:mb-3 lg:mb-5.5"
        mobileActions={
          <NoteMobileActions
            submitLabel="등록"
            isDisabled={true}
            onDraft={handleDraft}
            onSubmit={handleSubmit}
          />
        }
        desktopActions={
          <NoteDesktopActions
            submitLabel="등록하기"
            isDisabled={true}
            onDraft={handleDraft}
            onSubmit={handleSubmit}
          />
        }
      />
      <NoteEditorForm
        title={title}
        content={content}
        onChangeTitle={handleTitleChange}
        onChangeContent={handleContentChange}
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
