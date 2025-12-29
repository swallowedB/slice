import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useLinkMetadataMutation } from "@/hooks/queries/notes";
import { LinkMetadata } from "@/api/types/note";
import { toast } from "@/lib/toast";
import { draftNoteStorage } from "@/app/(protected)/notes/_utils/draft-note";

interface UseNoteFormOptions {
  todoId: number;
  isEditMode?: boolean;
  initialData?: {
    title: string;
    content: JSONContent;
    linkUrl: string | null;
    linkMetadata: LinkMetadata | null;
  };
}

export function useNoteForm({
  todoId,
  isEditMode = false,
  initialData,
}: UseNoteFormOptions) {
  const { mutate: getLinkMetadataMutation } = useLinkMetadataMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkMetadata, setLinkMetadata] = useState<LinkMetadata | null>(null);
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [hasDraftNote, setHasDraftNote] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setLinkUrl(initialData.linkUrl ?? "");
      setLinkMetadata(initialData.linkMetadata ?? null);
    }
  }, [initialData]);

  useEffect(() => {
    setHasDraftNote(draftNoteStorage.has(todoId));
  }, [todoId]);

  useEffect(() => {
    if (isEditMode || !todoId) return;

    const interval = setInterval(
      () => {
        if (title.trim() || content) {
          draftNoteStorage.save(todoId, {
            title,
            content: content || { type: "doc", content: [] },
            linkUrl,
            linkMetadata,
          });
          setHasDraftNote(true);
          toast.success("임시 저장이 완료되었습니다", { hasTime: true });
        }
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [isEditMode, todoId, title, content, linkUrl, linkMetadata]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent: JSONContent) => {
    setContent(newContent);
  };

  const handleLinkUrlChange = (url: string) => {
    setLinkUrl(url);

    if (!url.trim()) {
      setLinkMetadata(null);
      setIsEmbedOpen(false);
      return;
    }

    try {
      new URL(url);

      getLinkMetadataMutation(url, {
        onSuccess: (data) => {
          setLinkMetadata(data);
        },
        onError: (error) => {
          console.error("링크 메타데이터 가져오기 실패:", error);
          toast.error("링크 정보를 가져올 수 없습니다.");
        },
      });
    } catch (error) {}
  };

  const handleToggleEmbed = () => {
    setIsEmbedOpen(!isEmbedOpen);
  };

  const handleDeleteLinkPreview = () => {
    setLinkUrl("");
    setLinkMetadata(null);
    setIsEmbedOpen(false);
  };

  const handleDraft = () => {
    if (!title.trim() && !content) return;

    draftNoteStorage.save(todoId, {
      title,
      content: content || { type: "doc", content: [] },
      linkUrl,
      linkMetadata,
    });

    setHasDraftNote(true);
    toast.success("임시 저장이 완료되었습니다", { hasTime: true });
  };

  const handleLoadModalOpen = () => {
    setIsLoadModalOpen(true);
  };

  const handleLoadModalClose = () => {
    setIsLoadModalOpen(false);
  };

  const handleDraftCalloutClose = () => {
    setHasDraftNote(false);
  };

  const handleConfirmLoadDraft = () => {
    const draftNote = draftNoteStorage.get(todoId);

    if (draftNote) {
      setTitle(draftNote.title);
      setContent(draftNote.content);
      setLinkUrl(draftNote.linkUrl);
      setLinkMetadata(draftNote.linkMetadata ?? null);
    }

    draftNoteStorage.remove(todoId);
    setIsLoadModalOpen(false);
    setHasDraftNote(false);
  };

  const getDraftTitle = () => {
    const draftNote = draftNoteStorage.get(todoId);
    return draftNote?.title.trim() || "제목 없음";
  };

  return {
    title,
    content,
    linkUrl,
    linkMetadata,
    isEmbedOpen,
    hasDraftNote,
    isLoadModalOpen,
    handleTitleChange,
    handleContentChange,
    handleLinkUrlChange,
    handleToggleEmbed,
    handleDeleteLinkPreview,
    handleDraft,
    handleLoadModalOpen,
    handleLoadModalClose,
    handleDraftCalloutClose,
    handleConfirmLoadDraft,
    getDraftTitle,
  };
}
