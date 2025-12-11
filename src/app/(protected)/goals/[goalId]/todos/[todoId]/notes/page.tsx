import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import SectionHeader from "./_components/SectionHeader";
import NoteListContainer from "./_components/NoteListContainer";

interface NotesPageProps {
  params: Promise<{
    goalId: string;
    todoId: string;
  }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { goalId } = await params;

  return (
    <section className="h-screen">
      <PageHeader
        title="노트 모아보기"
        desktopClassName="sm:mb-14"
      />
      <SectionHeader />
      <NoteListContainer goalId={Number(goalId)} />
    </section>
  );
}
