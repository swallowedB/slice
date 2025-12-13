import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { JSONContent } from "@tiptap/react";

export function useNoteEditor(
  content: JSONContent | null,
  onChange: (content: JSONContent) => void,
) {
  return useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          autolink: true,
          openOnClick: false,
          defaultProtocol: "https",
          protocols: ["http", "https"],
          linkOnPaste: true,
          HTMLAttributes: {
            class: "text-orange-250 underline cursor-pointer",
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "이 곳을 통해 노트 작성을 시작해주세요",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: false,
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
