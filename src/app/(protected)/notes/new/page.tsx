"use client";

import PageHeader from "../../_components/layout/PageHeader";
import NoteEditorForm from "../_components/NoteEditorForm";
import NoteMobileActions from "../_components/NoteMobileActions";
import NoteDesktopActions from "../_components/NoteDesktopActions";
import { useState } from "react";

// TODO: NoteNewPage 컴포넌트 → 서버 컴포넌트로
export default function NoteNewPage() {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // TODO: 노트 등록
  const handleSubmit = () => {};

  return (
    <>
      <PageHeader
        title="노트 작성하기"
        className="sm:mb-14"
        mobileActions={
          <NoteMobileActions
            submitLabel="등록"
            isDisabled={true}
            onDraft={() => {}}
            onSubmit={handleSubmit}
          />
        }
        desktopActions={
          <NoteDesktopActions
            submitLabel="등록하기"
            isDisabled={true}
            onDraft={() => {}}
            onSubmit={handleSubmit}
          />
        }
      />
      <NoteEditorForm
        title={title}
        onChangeTitle={handleTitleChange}
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
