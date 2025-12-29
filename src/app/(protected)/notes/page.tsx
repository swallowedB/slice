import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import NoteListContainer from "./_components/NoteListContainer";
import { AsyncBoundary } from "../_components/AsyncBoundary";
import NoteListSkeleton from "./_components/NoteListSkeleton";

interface NotesPageProps {
  searchParams: Promise<{
    goalId: string;
  }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const { goalId } = await searchParams;

  return (
    <section className="h-screen">
      <PageHeader
        title="노트 모아보기"
        desktopClassName="sm:mb-14"
      />
      <AsyncBoundary loadingFallback={<NoteListSkeleton />}>
        <NoteListContainer goalId={Number(goalId)} />
      </AsyncBoundary>
    </section>
  );
}
