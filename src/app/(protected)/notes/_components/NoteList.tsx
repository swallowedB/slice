"use client";

import EmptyState from "@/components/common/empty-state/EmptyState";
import NoteItem from "./NoteItem";

const mockNotes = {
  nextCursor: 0,
  totalCount: 3,
  notes: [
    {
      id: 1,
      title: "체계적인 폴더 구조 세팅하기",
      goal: {
        id: 100,
        title: "자바스크립트로 웹 서비스 만들기",
      },
      todo: {
        id: 1001,
        title: "자바스크립트 기초 챕터4 듣기",
        done: false,
      },
      updatedAt: "2025-11-26T10:08:39.408Z",
      createdAt: "2025-11-26T10:08:39.408Z",
      userId: 1,
      teamId: "team-abc",
    },
    {
      id: 2,
      title: "자바스크립트로 서버 연동하기",
      goal: {
        id: 100,
        title: "자바스크립트로 웹 서비스 만들기",
      },
      todo: {
        id: 1002,
        title: "자바스크립트 기초 챕터5 듣기",
        done: true,
      },
      updatedAt: "2025-11-27T10:08:39.408Z",
      createdAt: "2025-11-27T10:08:39.408Z",
      userId: 1,
      teamId: "team-abc",
    },
    {
      id: 3,
      title: "프로그래밍 시작하기 in JavaScript",
      goal: {
        id: 100,
        title: "자바스크립트로 웹 서비스 만들기",
      },
      todo: {
        id: 1002,
        title: "자바스크립트 기초 챕터1 듣기",
        done: true,
      },
      updatedAt: "2025-11-28T10:08:39.408Z",
      createdAt: "2025-11-28T10:08:39.408Z",
      userId: 1,
      teamId: "team-abc",
    },
  ],
};

export default function NoteList() {
  const handleNoteClick = (id: number) => {
    // TODO: 노트 상세가 사이드 보기로 열림
  };

  const handleNoteEdit = (id: number) => {
    // TODO: 노트 수정 페이지로 이동
  };

  const handleNoteDelete = (id: number) => {
    // TODO: 삭제 확인 모달 열기
  };

  if (mockNotes.totalCount === 0) {
    return <EmptyState>아직 등록된 노트가 없어요</EmptyState>;
  }

  return (
    <section
      className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-5"
      aria-label="노트 목록">
      {mockNotes.notes.map((note) => (
        <NoteItem
          key={note.id}
          onClickNote={handleNoteClick}
          onEditNote={handleNoteEdit}
          onDeleteNote={handleNoteDelete}
          {...note}
        />
      ))}
    </section>
  );
}
