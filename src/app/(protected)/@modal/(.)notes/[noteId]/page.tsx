import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { backendFetch } from "@/lib/backend";
import { NoteDetailResponse } from "@/api/types/note";
import notesQueryKeys from "@/hooks/queries/notes/queryKeys";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import NoteDetailSkeleton from "@/app/(protected)/notes/_components/NoteDetailSkeleton";
import NoteDetailModal from "@/app/(protected)/notes/_components/NoteDetailModal";
import NoteDetailContent from "@/app/(protected)/notes/_components/NoteDetailContent";

interface NoteDetailModalPageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default async function NoteDetailModalPage({
  params,
}: NoteDetailModalPageProps) {
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
      <NoteDetailModal>
        <AsyncBoundary loadingFallback={<NoteDetailSkeleton />}>
          <NoteDetailContent noteId={noteIdNumber} />
        </AsyncBoundary>
      </NoteDetailModal>
    </HydrationBoundary>
  );
}
