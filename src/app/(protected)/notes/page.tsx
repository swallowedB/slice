import PageHeader from "../_components/layout/PageHeader";
import NoteList from "./_components/NoteList";
import SectionHeader from "./_components/SectionHeader";

export default async function NotesPage() {
  return (
    <section className="h-screen">
      <PageHeader
        title="노트 모아보기"
        className="sm:mb-14"
      />
      <SectionHeader />
      <NoteList />
    </section>
  );
}
