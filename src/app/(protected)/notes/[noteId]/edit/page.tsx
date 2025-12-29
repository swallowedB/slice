import { Spinner } from "@/assets/icons";
import { AsyncBoundary } from "@/app/(protected)/_components/AsyncBoundary";
import NoteEditContainer from "../../_components/NoteEditContainer";

interface NoteEditPageProps {
  params: Promise<{ noteId: string }>;
}

export default async function NoteEditPage({ params }: NoteEditPageProps) {
  const { noteId } = await params;

  return (
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
      <NoteEditContainer noteId={Number(noteId)} />
    </AsyncBoundary>
  );
}
