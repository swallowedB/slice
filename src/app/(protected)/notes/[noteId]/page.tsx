import NoteDetailContent from "@/app/(protected)/notes/_components/NoteDetailContent";
import PageHeader from "../../_components/layout/PageHeader";
import { AsyncBoundary } from "../../_components/AsyncBoundary";
import NoteDetailSkeleton from "../_components/NoteDetailSkeleton";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{
    noteId: string;
  }>;
}) {
  const { noteId } = await params;

  return (
    <>
      <PageHeader
        title="노트 상세보기"
        desktopClassName="sm:mb-3 lg:mb-5.5"
      />
      <div className="min-h-[75vh] rounded-4xl bg-white p-4 sm:min-h-[80vh] sm:p-8">
        <AsyncBoundary loadingFallback={<NoteDetailSkeleton />}>
          <NoteDetailContent noteId={Number(noteId)} />
        </AsyncBoundary>
      </div>
    </>
  );
}
