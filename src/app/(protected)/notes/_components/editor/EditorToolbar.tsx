"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { toolbarGroups } from "./config/toolbar-config";
import ToolbarGroup from "./components/ToolbarGroup";
import ToolbarButton from "./components/ToolbarButton";

interface EditorToolbarProps {
  editor: Editor;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: (snapshot) => {
      const { editor } = snapshot;
      if (!editor) return null;

      return {
        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
        isUnderline: editor.isActive("underline"),
        isAlignLeft: editor.isActive({ textAlign: "left" }),
        isAlignCenter: editor.isActive({ textAlign: "center" }),
        isAlignRight: editor.isActive({ textAlign: "right" }),
        isBulletList: editor.isActive("bulletList"),
        isOrderedList: editor.isActive("orderedList"),
        isLink: editor.isActive("link"),
      };
    },
  });

  if (!editorState) return null;

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-1.5 sm:bg-gray-50">
      {toolbarGroups.map((group, groupIndex) => (
        <ToolbarGroup key={groupIndex}>
          {group.map((config) => (
            <ToolbarButton
              key={config.stateKey}
              onClick={() => config.action(editor)}
              isActive={editorState[config.stateKey]}
              title={config.title}>
              {config.icon}
            </ToolbarButton>
          ))}
        </ToolbarGroup>
      ))}
    </div>
  );
}
