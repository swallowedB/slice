import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { JSONContent } from "@tiptap/react";

export function useNoteEditor(
  content: JSONContent | null,
  onChange: (content: JSONContent) => void,
) {
  return useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "이 곳을 통해 노트 작성을 시작해주세요",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "note-editor",
      },
    },
  });
}
