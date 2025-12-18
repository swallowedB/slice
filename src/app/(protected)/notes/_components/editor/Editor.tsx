"use client";

import { useEffect } from "react";
import { EditorContent, JSONContent } from "@tiptap/react";
import { useNoteEditor } from "./hooks/useNoteEditor";

export function Editor({ content }: { content: JSONContent }) {
  const editor = useNoteEditor(null);
  useEffect(() => {
    if (content && editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  return <EditorContent editor={editor} />;
}
