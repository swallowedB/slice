"use client";

import { EditorContent, JSONContent } from "@tiptap/react";
import NoteMetaInfo from "./NoteMetaInfo";
import NoteTitleInput from "./NoteTitleInput";
import { useNoteEditor } from "./editor/useNoteEditor";
import EditorToolbar from "./editor/EditorToolbar";

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

  if (!editor) return null;

  return (
    <article>
      <div className="mb-8 sm:hidden">
        <EditorToolbar editor={editor} />
      </div>
      <section className="min-h-[calc(100vh-215px)] rounded-4xl bg-white p-4 sm:min-h-[calc(100vh-150px)] sm:p-8 lg:min-h-[calc(100vh-225px)]">
        <div className="hidden sm:block">
          <EditorToolbar editor={editor} />
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

        <EditorContent editor={editor} />
      </section>
    </article>
  );
}
