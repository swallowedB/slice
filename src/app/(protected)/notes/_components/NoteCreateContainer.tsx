"use client";

import { useRouter } from "next/navigation";
import { useTodoQuery } from "@/hooks/queries/todos";
import { useCreateNoteMutation } from "@/hooks/queries/notes";
import { formatDate } from "@/utils/date";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";
import { toast } from "@/lib/toast";
import NoteEditorForm from "./NoteEditorForm";
import NoteMobileActions from "./NoteMobileActions";
import NoteDesktopActions from "./NoteDesktopActions";
import DraftCallout from "./DraftCallout";
import { draftNoteStorage } from "../_utils/draft-note";
import { useNoteForm } from "../_hooks/useNoteForm";

interface NoteCreateContainerProps {
  todoId: number;
}

export default function NoteCreateContainer({
  todoId,
}: NoteCreateContainerProps) {
  const router = useRouter();
  const { data: todo } = useTodoQuery(todoId);
  const { mutate: createNoteMutation, isPending } = useCreateNoteMutation();

  const form = useNoteForm({
    todoId,
  });

  const handleSubmit = () => {
    if (!form.title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!form.content) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    createNoteMutation(
      {
        todoId,
        title: form.title.trim(),
        content: JSON.stringify(form.content),
        ...(form.linkUrl.trim() && { linkUrl: form.linkUrl.trim() }),
      },
      {
        onSuccess: (data) => {
          draftNoteStorage.remove(todoId);
          toast.success("노트가 작성되었습니다.");
          router.replace(`/notes?goalId=${data.goal.id}`);
        },
        onError: (error) => {
          console.error("노트 등록 실패:", error);
          toast.error("노트 등록에 실패했습니다.");
        },
      },
    );
  };

  const metaInfo = {
    goalTitle: todo.goal.title,
    todoTitle: todo.title,
    isTodoDone: todo.done,
    updatedAt: formatDate(todo.updatedAt),
  };

  const isDisabled = !form.title.trim() || !form.content || isPending;

  return (
    <>
      <div className="relative">
        <PageHeader
          title="노트 작성하기"
          desktopClassName="sm:mb-3 lg:mb-5.5"
          mobileActions={
            <NoteMobileActions
              submitLabel="등록"
              isDisabled={isDisabled}
              onDraft={form.handleDraft}
              onSubmit={handleSubmit}
            />
          }
          desktopActions={
            <NoteDesktopActions
              submitLabel="등록하기"
              isDisabled={isDisabled}
              onDraft={form.handleDraft}
              onSubmit={handleSubmit}
            />
          }
        />
        {form.hasDraftNote && (
          <div className="hidden sm:absolute sm:top-12 sm:right-22 sm:z-500 sm:block sm:w-70 lg:top-12">
            <DraftCallout
              onLoadDraft={form.handleLoadModalOpen}
              onClose={form.handleDraftCalloutClose}
            />
          </div>
        )}
        <NoteEditorForm
          title={form.title}
          content={form.content}
          linkUrl={form.linkUrl}
          linkMetadata={form.linkMetadata}
          isEmbedOpen={form.isEmbedOpen}
          onChangeTitle={form.handleTitleChange}
          onChangeContent={form.handleContentChange}
          onChangeLinkUrl={form.handleLinkUrlChange}
          onToggleEmbed={form.handleToggleEmbed}
          onDeleteLinkPreview={form.handleDeleteLinkPreview}
          metaInfo={metaInfo}
          hasDraftNote={form.hasDraftNote}
          onLoadDraft={form.handleLoadModalOpen}
          onCloseDraftCallout={form.handleDraftCalloutClose}
        />
      </div>
      {form.isLoadModalOpen && (
        <ConfirmModal
          isOpen={form.isLoadModalOpen}
          title={`'${form.getDraftTitle()}'\n제목의 노트를 불러오시겠어요?`}
          onClose={form.handleLoadModalClose}
          onConfirm={form.handleConfirmLoadDraft}
        />
      )}
    </>
  );
}
