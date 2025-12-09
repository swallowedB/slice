"use client";

import { EditorContent, JSONContent } from "@tiptap/react";
import NoteMetaInfo from "./NoteMetaInfo";
import NoteTitleInput from "./NoteTitleInput";
import { useNoteEditor } from "./editor/hooks/useNoteEditor";
import EditorToolbar from "./editor/EditorToolbar";
import CharacterCount from "./CharacterCount";

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

  const text = editor.getText();
  const countWithSpace = text.length;
  const countWithoutSpace = text.replace(/\s+/g, "").length;

  return (
    <article>
      <div className="fixed top-22 right-5 left-5 z-300 sm:hidden">
        <EditorToolbar editor={editor} />
      </div>
      <section className="mt-19 flex min-h-[75vh] flex-col rounded-4xl bg-white p-4 sm:mt-0 sm:min-h-[80vh] sm:p-8">
        <div className="sticky top-8 z-300 hidden sm:block">
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
  );
}
