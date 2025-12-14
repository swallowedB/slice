"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import NoteDetailModal from "../../_components/NoteDetailModal";
import NoteDetailContent from "../../_components/NoteDetailContent";

interface NoteDetailModalPageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default function NoteDetailModalPage({
  params,
}: NoteDetailModalPageProps) {
  const { noteId } = use(params);
  const router = useRouter();

  return (
    <NoteDetailModal onClose={() => router.back()}>
      <NoteDetailContent noteId={Number(noteId)} />
    </NoteDetailModal>
  );
}
