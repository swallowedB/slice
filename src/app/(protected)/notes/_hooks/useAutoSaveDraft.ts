import { useEffect } from "react";
import { JSONContent } from "@tiptap/react";
import { toast } from "@/lib/toast";
import { draftNoteStorage } from "../_utils/draft-note";

interface UseAutoSaveDraftProps {
  todoId: number | undefined;
  title: string;
  content: JSONContent | null;
  linkUrl: string;
  isEditMode: boolean;
  onSave?: () => void;
}
export function useAutoSaveDraft({
  todoId,
  title,
  content,
  linkUrl,
  isEditMode,
  onSave,
}: UseAutoSaveDraftProps) {
  useEffect(() => {
    if (isEditMode || !todoId) return;

    const interval = setInterval(
      () => {
        if (title.trim() || content) {
          draftNoteStorage.save(todoId, {
            title,
            content: content || { type: "doc", content: [] },
            linkUrl,
          });
          onSave?.();
          toast.success("임시 저장이 완료되었습니다", { hasTime: true });
        }
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [isEditMode, todoId, title, content, linkUrl]);
}
