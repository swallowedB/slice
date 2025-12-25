import NoteDetailModal from "../../../notes/_components/NoteDetailModal";
import NoteDetailContent from "../../../notes/_components/NoteDetailContent";

interface NoteDetailModalPageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default async function NoteDetailModalPage({
  params,
}: NoteDetailModalPageProps) {
  const { noteId } = await params;

  return (
    <NoteDetailModal>
      <NoteDetailContent noteId={Number(noteId)} />
    </NoteDetailModal>
  );
}
