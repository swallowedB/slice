"use client";

import { useNotesQuery } from "@/hooks/queries/notes";
import { useState } from "react";
import EmptyState from "@/components/common/empty-state/EmptyState";
import { EMPTY_MESSAGES } from "@/constants/messages";
import NoteList from "./NoteList";
import NoteDetailModal from "./NoteDetailModal";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";

interface NoteListContainerProps {
  goalId: number;
}

export default function NoteListContainer({ goalId }: NoteListContainerProps) {
  const { data, isLoading, error } = useNotesQuery(goalId);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleNoteClick = (id: number) => {
    setSelectedNoteId(id);
  };

  const handleNoteEdit = (id: number) => {
    // TODO: 노트 수정 페이지로 이동
  };

  const handleNoteDelete = (id: number) => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: 노트 삭제
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했어요!</div>;
  if (!data || data.notes.length === 0) {
    return <EmptyState>{EMPTY_MESSAGES.NOTE.LIST}</EmptyState>;
  }

  return (
    <>
      <NoteList
        notes={data.notes}
        onClickNote={handleNoteClick}
        onEditNote={handleNoteEdit}
        onDeleteNote={handleNoteDelete}
      />
      <NoteDetailModal
        isOpen={selectedNoteId !== null}
        noteId={selectedNoteId}
        onClose={() => setSelectedNoteId(null)}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="노트를 삭제하시겠어요?"
        message="삭제된 노트는 복구할 수 없습니다."
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
