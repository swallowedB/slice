import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Spinner } from "@/assets/icons";
import { backendFetch } from "@/lib/backend";
import { NoteDetailResponse } from "@/api/types/note";
import notesQueryKeys from "@/hooks/queries/notes/queryKeys";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import NoteEditContainer from "@/app/(protected)/notes/_components/NoteEditContainer";

interface NoteEditPageProps {
  params: Promise<{ noteId: string }>;
}

export default async function NoteEditPage({ params }: NoteEditPageProps) {
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
      <AsyncBoundary
        loadingFallback={
          <div className="-mt-20 flex min-h-screen items-center justify-center">
            <Spinner
              width={60}
              height={60}
              className="text-orange-250"
            />
          </div>
        }>
        <NoteEditContainer noteId={noteIdNumber} />
      </AsyncBoundary>
    </HydrationBoundary>
  );
}
