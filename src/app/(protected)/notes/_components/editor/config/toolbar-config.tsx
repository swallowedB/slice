import type { ToolbarConfig, LinkToolbarConfig } from "../types";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListBulletIcon,
  NumberedListIcon,
  HighlightIcon,
  LinkIcon,
} from "./toolbar-icons";

const textStyleOptions: ToolbarConfig[] = [
  {
    icon: <BoldIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    stateKey: "isBold",
    title: "굵게",
  },
  {
    icon: <ItalicIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    stateKey: "isItalic",
    title: "기울임",
  },
  {
    icon: <UnderlineIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    stateKey: "isUnderline",
    title: "밑줄",
  },
];

const alignOptions: ToolbarConfig[] = [
  {
    icon: <AlignLeftIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().setTextAlign("left").run(),
    stateKey: "isAlignLeft",
    title: "왼쪽 정렬",
  },
  {
    icon: <AlignCenterIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().setTextAlign("center").run(),
    stateKey: "isAlignCenter",
    title: "가운데 정렬",
  },
  {
    icon: <AlignRightIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().setTextAlign("right").run(),
    stateKey: "isAlignRight",
    title: "오른쪽 정렬",
  },
];

const listAndHighlightOptions: ToolbarConfig[] = [
  {
    icon: <ListBulletIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    stateKey: "isBulletList",
    title: "글머리 기호",
  },
  {
    icon: <NumberedListIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    stateKey: "isOrderedList",
    title: "번호 매기기",
  },
  {
    icon: <HighlightIcon className="h-6 w-6" />,
    action: (editor) => editor.chain().focus().toggleHighlight().run(),
    stateKey: "isHighlight",
    title: "형광펜",
  },
];

const linkOptions: LinkToolbarConfig[] = [
  {
    icon: <LinkIcon className="h-4 w-4" />,
    title: "링크 업로드",
  },
];

export const mainToolbarGroups = [
  textStyleOptions,
  alignOptions,
  listAndHighlightOptions,
];

export const linkGroup = linkOptions;
