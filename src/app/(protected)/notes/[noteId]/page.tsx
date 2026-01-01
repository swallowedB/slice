import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { backendFetch } from "@/lib/backend";
import { NoteDetailResponse } from "@/api/types/note";
import notesQueryKeys from "@/hooks/queries/notes/queryKeys";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import NoteDetailContent from "@/app/(protected)/notes/_components/NoteDetailContent";
import NoteDetailSkeleton from "@/app/(protected)/notes/_components/NoteDetailSkeleton";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{
    noteId: string;
  }>;
}) {
  const { noteId } = await params;
  const noteIdNumber = Number(noteId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: notesQueryKeys.detail(noteIdNumber),
    queryFn: () =>
      backendFetch<NoteDetailResponse>(`/notes/${noteIdNumber}`, {
        auth: "access",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageHeader
        title="노트 상세보기"
        desktopClassName="sm:mb-3 lg:mb-5.5"
      />
      <div className="min-h-[75vh] rounded-4xl bg-white p-4 sm:min-h-[80vh] sm:p-8">
        <AsyncBoundary loadingFallback={<NoteDetailSkeleton />}>
          <NoteDetailContent noteId={noteIdNumber} />
        </AsyncBoundary>
      </div>
    </HydrationBoundary>
  );
}
