"use client";

import Button from "@/components/common/button/Button";
import TextButton from "@/components/common/button/TextButton";
import PageHeader from "../../_components/layout/PageHeader";
import NoteEditorForm from "../_components/NoteEditorForm";
import { useState } from "react";

export default function NoteNewPage() {
  const [title, setTitle] = useState("");

  // TODO: 노트 등록
  const handleSubmit = () => {};

  return (
    <>
      <PageHeader
        title="노트 작성하기"
        className="sm:mb-14"
        mobileActions={
          <div className="flex items-center gap-4">
            <TextButton
              variant="primary"
              onClick={() => {}}>
              임시저장
            </TextButton>
            <TextButton
              variant="secondary"
              isDisabled={true}
              onClick={() => {}}>
              등록
            </TextButton>
          </div>
        }
        desktopActions={
          <div className="flex items-center gap-4">
            <Button
              variant="outline-orange"
              size="compact"
              onClick={() => {}}>
              임시저장
            </Button>
            <Button
              variant="primary"
              size="compact"
              isDisabled={true}
              onClick={() => {}}>
              등록하기
            </Button>
          </div>
        }
      />
      <NoteEditorForm
        title={title}
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
