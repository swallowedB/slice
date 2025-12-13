"use client";

import { useNotesQuery } from "@/hooks/queries/notes";
import { useState } from "react";
import EmptyState from "@/components/common/empty-state/EmptyState";
import { EMPTY_MESSAGES } from "@/constants/messages";
import NoteList from "./NoteList";
import NoteDetailModal from "./NoteDetailModal";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";
import GoalBanner from "./GoalBanner";
import { useRouter } from "next/navigation";
import { useDeleteNoteMutation } from "@/hooks/queries/notes/useDeleteNoteMutaion";

interface NoteListContainerProps {
  goalId: number;
  todoId: number;
}

export default function NoteListContainer({
  goalId,
  todoId,
}: NoteListContainerProps) {
  const router = useRouter();

  const { data, isLoading, error } = useNotesQuery(goalId);
  const { mutate: deleteNoteMutation } = useDeleteNoteMutation();

  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [deleteNoteId, setDeleteNoteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleNoteClick = (id: number) => {
    setSelectedNoteId(id);
  };

  const handleNoteEdit = (id: number) => {
    router.push(`/notes/${id}/edit`);
  };

  const handleNoteDelete = (id: number) => {
    setDeleteNoteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteNoteId === null) return;

    deleteNoteMutation(
      { goalId, noteId: deleteNoteId },
      {
        onSuccess: () => {
          setDeleteNoteId(null);
          setIsDeleteModalOpen(false);

          if (selectedNoteId === deleteNoteId) {
            setSelectedNoteId(null);
          }
        },
      },
    );
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했어요!</div>;
  if (!data || data.notes.length === 0) {
    return <EmptyState>{EMPTY_MESSAGES.NOTE.LIST}</EmptyState>;
  }

  return (
    <>
      <GoalBanner title={data.goal.title} />
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
