import { useEffect, useState, useRef } from "react";
import { JSONContent } from "@tiptap/react";
import { useLinkMetadataMutation } from "@/hooks/queries/notes";
import { LinkMetadata } from "@/api/types/note";
import { toast } from "@/lib/toast";
import { draftNoteStorage } from "@/app/(protected)/notes/_utils/draft-note";

interface NoteFormData {
  title: string;
  content: JSONContent | null;
  linkUrl: string | null;
  linkMetadata: LinkMetadata | null;
}

interface UseNoteFormOptions {
  todoId: number;
  isEditMode?: boolean;
  initialData?: Partial<NoteFormData>;
}

const AUTO_SAVE_INTERVAL = 5 * 60 * 1000;

export function useNoteForm({
  todoId,
  isEditMode = false,
  initialData,
}: UseNoteFormOptions) {
  const { mutate: getLinkMetadataMutation } = useLinkMetadataMutation();
  const isInitialized = useRef(false);

  const [form, setForm] = useState<NoteFormData>({
    title: "",
    content: null,
    linkUrl: null,
    linkMetadata: null,
  });

  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [hasDraftNote, setHasDraftNote] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  useEffect(() => {
    if (initialData && !isInitialized.current) {
      setForm({
        title: initialData.title ?? "",
        content: initialData.content ?? null,
        linkUrl: initialData.linkUrl ?? null,
        linkMetadata: initialData.linkMetadata ?? null,
      });
      isInitialized.current = true;
    }
  }, [initialData]);

  useEffect(() => {
    setHasDraftNote(draftNoteStorage.has(todoId));
  }, [todoId]);

  useEffect(() => {
    if (isEditMode || !todoId) return;

    const interval = setInterval(() => {
      if (form.title.trim() || form.content) {
        draftNoteStorage.save(todoId, {
          title: form.title,
          content: form.content || { type: "doc", content: [] },
          linkUrl: form.linkUrl,
          linkMetadata: form.linkMetadata,
        });
        setHasDraftNote(true);
        toast.success("임시 저장이 완료되었습니다", { hasTime: true });
      }
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [isEditMode, todoId, form]);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, title: e.target.value }));
  };

  const changeContent = (newContent: JSONContent) => {
    setForm((prev) => ({ ...prev, content: newContent }));
  };

  const changeLinkUrl = (url: string) => {
    if (!url.trim()) {
      setForm((prev) => ({
        ...prev,
        linkUrl: null,
        linkMetadata: null,
      }));
      setIsEmbedOpen(false);
      return;
    }

    setForm((prev) => ({ ...prev, linkUrl: url }));

    try {
      new URL(url);

      getLinkMetadataMutation(url, {
        onSuccess: (data) => {
          setForm((prev) => ({ ...prev, linkMetadata: data }));
        },
        onError: (error) => {
          console.error("링크 메타데이터 가져오기 실패:", error);
          toast.error("링크 정보를 가져올 수 없습니다.");
        },
      });
    } catch (error) {
      console.error("유효하지 않은 URL:", error);
    }
  };

  const embed = {
    isOpen: isEmbedOpen,
    toggle: () => setIsEmbedOpen(!isEmbedOpen),
    deletePreview: () => {
      setForm((prev) => ({
        ...prev,
        linkUrl: null,
        linkMetadata: null,
      }));
      setIsEmbedOpen(false);
    },
  };

  const loadModal = {
    isOpen: isLoadModalOpen,
    open: () => setIsLoadModalOpen(true),
    close: () => setIsLoadModalOpen(false),
  };

  const draft = {
    hasNote: hasDraftNote,
    save: () => {
      if (!form.title.trim() && !form.content) return;

      draftNoteStorage.save(todoId, {
        title: form.title,
        content: form.content || { type: "doc", content: [] },
        linkUrl: form.linkUrl,
        linkMetadata: form.linkMetadata,
      });

      setHasDraftNote(true);
      toast.success("임시 저장이 완료되었습니다", { hasTime: true });
    },
    load: () => {
      const draftNote = draftNoteStorage.get(todoId);

      if (!draftNote) {
        loadModal.close();
        return;
      }

      setForm({
        title: draftNote.title,
        content: draftNote.content,
        linkUrl: draftNote.linkUrl,
        linkMetadata: draftNote.linkMetadata ?? null,
      });

      draftNoteStorage.remove(todoId);
      loadModal.close();
      setHasDraftNote(false);
    },
    getTitle: () => {
      const draftNote = draftNoteStorage.get(todoId);
      return draftNote?.title.trim() || "제목 없음";
    },
    closeCallout: () => setHasDraftNote(false),
  };

  return {
    form,
    embed,
    draft,
    loadModal,
    changeTitle,
    changeContent,
    changeLinkUrl,
  };
}
