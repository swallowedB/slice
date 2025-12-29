import NoteCreateContainer from "../_components/NoteCreateContainer";
import { AsyncBoundary } from "../../_components/AsyncBoundary";

interface NoteNewPageProps {
  searchParams: Promise<{ todoId: string }>;
}

export default async function NoteNewPage({ searchParams }: NoteNewPageProps) {
  const { todoId } = await searchParams;

  return (
    <AsyncBoundary loadingFallback={<div>로딩 중...</div>}>
      <NoteCreateContainer todoId={Number(todoId)} />
    </AsyncBoundary>
  );
}
