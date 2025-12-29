import { Spinner } from "@/assets/icons";
import NoteCreateContainer from "../_components/NoteCreateContainer";
import { AsyncBoundary } from "../../_components/AsyncBoundary";

interface NoteNewPageProps {
  searchParams: Promise<{ todoId: string }>;
}

export default async function NoteNewPage({ searchParams }: NoteNewPageProps) {
  const { todoId } = await searchParams;

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
      <NoteCreateContainer todoId={Number(todoId)} />
    </AsyncBoundary>
  );
}
