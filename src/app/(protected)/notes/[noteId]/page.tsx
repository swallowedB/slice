import NoteDetailContent from "@/app/(protected)/notes/_components/NoteDetailContent";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{
    noteId: string;
  }>;
}) {
  const { noteId } = await params;

  return (
    <div>
      <NoteDetailContent noteId={Number(noteId)} />
    </div>
  );
}
