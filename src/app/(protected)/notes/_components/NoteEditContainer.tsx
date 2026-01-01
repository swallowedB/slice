"use client";

import { useRouter } from "next/navigation";
import { useNoteQuery, useUpdateNoteMutation } from "@/hooks/queries/notes";
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

interface NoteEditContainerProps {
  noteId: number;
}

export default function NoteEditContainer({ noteId }: NoteEditContainerProps) {
  const router = useRouter();
  const { data: note } = useNoteQuery(noteId);
  const { mutate: updateNoteMutation, isPending } = useUpdateNoteMutation();

  const todoId = note.todo.id;

  const {
    form,
    embed,
    draft,
    loadModal,
    changeTitle,
    changeContent,
    changeLinkUrl,
  } = useNoteForm({
    todoId,
    isEditMode: true,
    initialData: {
      title: note.title,
      content: note.content,
      linkUrl: note.linkUrl,
      linkMetadata: note.linkMetadata,
    },
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

    const trimmedLinkUrl = form.linkUrl?.trim();

    updateNoteMutation(
      {
        noteId,
        data: {
          title: form.title.trim(),
          content: JSON.stringify(form.content),
          linkUrl: trimmedLinkUrl || null,
        },
      },
      {
        onSuccess: (data) => {
          draftNoteStorage.remove(todoId);
          toast.success("노트가 수정되었습니다.");
          router.replace(`/notes?goalId=${data.goal.id}`);
        },
        onError: (error) => {
          console.error("노트 수정 실패:", error);
          toast.error("노트 수정에 실패했습니다.");
        },
      },
    );
  };

  const metaInfo = {
    goalTitle: note.goal.title,
    todoTitle: note.todo.title,
    isTodoDone: note.todo.done,
    updatedAt: formatDate(note.updatedAt),
  };

  const isDisabled = !form.title.trim() || !form.content || isPending;

  return (
    <>
      <div className="relative">
        <PageHeader
          title="노트 수정하기"
          desktopClassName="sm:mb-3 lg:mb-5.5"
          mobileActions={
            <NoteMobileActions
              submitLabel="수정"
              isDisabled={isDisabled}
              onDraft={draft.save}
              onSubmit={handleSubmit}
            />
          }
          desktopActions={
            <NoteDesktopActions
              submitLabel="수정하기"
              isDisabled={isDisabled}
              onDraft={draft.save}
              onSubmit={handleSubmit}
            />
          }
        />
        {draft.hasNote && (
          <div className="hidden sm:absolute sm:top-12 sm:right-22 sm:z-500 sm:block sm:w-70 lg:top-12">
            <DraftCallout
              onLoadDraft={loadModal.open}
              onClose={draft.closeCallout}
            />
          </div>
        )}
        <NoteEditorForm
          title={form.title}
          content={form.content}
          linkUrl={form.linkUrl}
          linkMetadata={form.linkMetadata}
          isEmbedOpen={embed.isOpen}
          onChangeTitle={changeTitle}
          onChangeContent={changeContent}
          onChangeLinkUrl={changeLinkUrl}
          onToggleEmbed={embed.toggle}
          onDeleteLinkPreview={embed.deletePreview}
          metaInfo={metaInfo}
          hasDraftNote={draft.hasNote}
          onLoadDraft={loadModal.open}
          onCloseDraftCallout={draft.closeCallout}
        />
      </div>
      {loadModal.isOpen && (
        <ConfirmModal
          isOpen={loadModal.isOpen}
          title={`'${draft.getTitle()}'\n제목의 노트를 불러오시겠어요?`}
          onClose={loadModal.close}
          onConfirm={draft.load}
        />
      )}
    </>
  );
}
