import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import NoteDetailSkeleton from "@/app/(protected)/notes/_components/NoteDetailSkeleton";
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
      <AsyncBoundary loadingFallback={<NoteDetailSkeleton />}>
        <NoteDetailContent noteId={Number(noteId)} />
      </AsyncBoundary>
    </NoteDetailModal>
  );
}
