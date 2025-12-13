import { Suspense } from "react";
import NoteNewContainer from "../_components/NoteNewContainer";

export default function NoteNewPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <NoteNewContainer />
    </Suspense>
  );
}
