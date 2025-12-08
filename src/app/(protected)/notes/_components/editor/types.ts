import type { Editor } from "@tiptap/react";

export interface EditorActiveState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isLink: boolean;
}

export interface ToolbarConfig {
  icon: React.ReactNode;
  action: (editor: Editor) => void;
  stateKey: keyof EditorActiveState;
  title: string;
}
