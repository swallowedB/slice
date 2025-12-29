import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import NoteEditContainer from "../../_components/NoteEditContainer";

interface NoteEditPageProps {
  params: Promise<{ noteId: string }>;
}

export default async function NoteEditPage({ params }: NoteEditPageProps) {
  const { noteId } = await params;

  return (
    <AsyncBoundary loadingFallback={<div>로딩 중...</div>}>
      <NoteEditContainer noteId={Number(noteId)} />
    </AsyncBoundary>
  );
}
