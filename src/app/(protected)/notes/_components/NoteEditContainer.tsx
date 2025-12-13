"use client";

import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import { useParams, useRouter } from "next/navigation";
import NoteEditorForm from "../_components/NoteEditorForm";
import NoteMobileActions from "../_components/NoteMobileActions";
import NoteDesktopActions from "../_components/NoteDesktopActions";

export default function NoteEditContainer() {
  const router = useRouter();
  const params = useParams();
  const noteId = Number(params.noteId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [linkUrl, setLinkUrl] = useState("");

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
  };

  return (
    <>
      <PageHeader
        title="노트 수정하기"
        desktopClassName="sm:mb-3 lg:mb-5.5"
        mobileActions={
          <NoteMobileActions
            submitLabel="수정"
            onDraft={handleDraft}
            onSubmit={handleSubmit}
          />
        }
        desktopActions={
          <NoteDesktopActions
            submitLabel="수정하기"
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
