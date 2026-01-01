import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { backendFetch } from "@/lib/backend";
import { NotesResponse } from "@/api/types/note";
import notesQueryKeys from "@/hooks/queries/notes/queryKeys";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import NoteListContainer from "@/app/(protected)/notes/_components/NoteListContainer";
import NoteListSkeleton from "@/app/(protected)/notes/_components/NoteListSkeleton";

interface NotesPageProps {
  searchParams: Promise<{
    goalId: string;
  }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const { goalId } = await searchParams;
  const goalIdNumber = Number(goalId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: notesQueryKeys.list(goalIdNumber),
    queryFn: () =>
      backendFetch<NotesResponse>(`/notes?goalId=${goalIdNumber}`, {
        auth: "access",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="h-screen">
        <PageHeader
          title="노트 모아보기"
          desktopClassName="sm:mb-14"
        />
        <AsyncBoundary loadingFallback={<NoteListSkeleton />}>
          <NoteListContainer goalId={goalIdNumber} />
        </AsyncBoundary>
      </section>
    </HydrationBoundary>
  );
}
