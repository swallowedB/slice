"use client";

import { EditorContent, JSONContent } from "@tiptap/react";
import { useState } from "react";
import NoteMetaInfo from "./NoteMetaInfo";
import NoteTitleInput from "./NoteTitleInput";
import { useNoteEditor } from "./editor/hooks/useNoteEditor";
import EditorToolbar from "./editor/EditorToolbar";
import CharacterCount from "./CharacterCount";
import InputModal from "@/components/common/popup-modal/InputModal";
import Button from "@/components/common/button/Button";
import BaseInput from "@/components/common/input/base-input/BaseInput";

interface NoteEditorFormProps {
  title: string;
  content: JSONContent | null;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (content: JSONContent) => void;
  metaInfo: {
    goalTitle: string;
    todoTitle: string;
    isTodoDone: boolean;
    updatedAt: string;
  };
}

export default function NoteEditorForm({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  metaInfo,
}: NoteEditorFormProps) {
  const editor = useNoteEditor(content, onChangeContent);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  if (!editor) return null;

  const text = editor.getText();
  const countWithSpace = text.length;
  const countWithoutSpace = text.replace(/\s+/g, "").length;

  const handleOpenLinkModal = () => {
    const currentUrl: string = editor.getAttributes("link").href || "";
    setLinkUrl(currentUrl);
    setIsLinkModalOpen(true);
  };

  const handleCloseLinkModal = () => {
    setLinkUrl("");
    setIsLinkModalOpen(false);
  };

  const handleConfirmLink = () => {
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }
    handleCloseLinkModal();
  };

  return (
    <>
      <article>
        <div className="fixed top-22 right-5 left-5 z-300 sm:hidden">
          <EditorToolbar
            editor={editor}
            onClickLink={handleOpenLinkModal}
            isLinkModalOpen={isLinkModalOpen}
          />
        </div>
        <section className="mt-19 flex min-h-[75vh] flex-col rounded-4xl bg-white p-4 sm:mt-0 sm:min-h-[80vh] sm:p-8">
          <div className="sticky top-8 z-300 hidden sm:block">
            <EditorToolbar
              editor={editor}
              onClickLink={handleOpenLinkModal}
              isLinkModalOpen={isLinkModalOpen}
            />
          </div>
          <header className="border-b border-gray-100 pb-4 sm:py-7.5">
            <NoteTitleInput
              title={title}
              onChange={onChangeTitle}
            />
            <NoteMetaInfo
              goalTitle={metaInfo.goalTitle}
              todoTitle={metaInfo.todoTitle}
              isTodoDone={metaInfo.isTodoDone}
              updatedAt={metaInfo.updatedAt}
            />
          </header>
          <div className="flex-1">
            <EditorContent editor={editor} />
          </div>
          <div className="pt-6 lg:pt-5">
            <CharacterCount
              withSpace={countWithSpace}
              withoutSpace={countWithoutSpace}
            />
          </div>
        </section>
      </article>
      {isLinkModalOpen && (
        <InputModal
          title="링크 업로드"
          onClose={handleCloseLinkModal}
          onConfirm={handleConfirmLink}
          footer={<Button onClick={handleConfirmLink}>확인</Button>}>
          <BaseInput
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://www.example.com"
            className="border border-gray-200 text-sm sm:text-base"
          />
        </InputModal>
      )}
    </>
  );
}
