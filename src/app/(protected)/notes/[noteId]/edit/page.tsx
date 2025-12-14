import { Suspense } from "react";
import NoteWriteContainer from "../../_components/NoteWriteContainer";

export default function NoteEditPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <NoteWriteContainer mode="edit" />
    </Suspense>
  );
}
