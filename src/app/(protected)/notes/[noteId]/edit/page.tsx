import { Suspense } from "react";
import NoteEditContainer from "../../_components/NoteEditContainer";

export default function NoteEditPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <NoteEditContainer />
    </Suspense>
  );
}
