"use client";

import { useNotesQuery, useDeleteNoteMutation } from "@/hooks/queries/notes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/common/empty-state/EmptyState";
import { EMPTY_MESSAGES } from "@/constants/messages";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";
import GoalBanner from "./GoalBanner";
import NoteList from "./NoteList";

interface NoteListContainerProps {
  goalId: number;
}

export default function NoteListContainer({ goalId }: NoteListContainerProps) {
  const router = useRouter();

  const { data } = useNotesQuery(goalId);
  const { mutate: deleteNoteMutation } = useDeleteNoteMutation();

  const [deleteNoteId, setDeleteNoteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

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
        },

        onError: (error) => {
          console.error("삭제 실패:", error);
          alert("노트 삭제에 실패했습니다.");
        },
      },
    );
  };

  if (data.notes.length === 0) {
    return <EmptyState>{EMPTY_MESSAGES.NOTE.LIST}</EmptyState>;
  }

  return (
    <>
      <GoalBanner title={data.goal.title} />
      <NoteList
        notes={data.notes}
        onEditNote={handleNoteEdit}
        onDeleteNote={handleNoteDelete}
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
