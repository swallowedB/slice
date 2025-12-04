import Badge from "./Badge";
import NoteMetaInfoRow from "./NoteMetaInfoRow";

interface NoteMetaInfoProps {
  goalTitle: string;
  todoTitle: string;
  isTodoDone: boolean;
  updatedAt: string;
}

export default function NoteMetaInfo({
  goalTitle,
  todoTitle,
  isTodoDone,
  updatedAt,
}: NoteMetaInfoProps) {
  return (
    <div className="mt-7.5 flex flex-col gap-1 sm:gap-2">
      <NoteMetaInfoRow
        src="/icons/flag/flag-outline-gray.svg"
        label="목표">
        <p className="font-normal text-gray-700">{goalTitle}</p>
      </NoteMetaInfoRow>
      <NoteMetaInfoRow
        src="/icons/todo/todo-outline-gray.svg"
        label="할 일">
        <div className="flex items-center gap-1 sm:gap-2">
          <Badge isDone={isTodoDone} />
          <p className="font-normal text-gray-700">{todoTitle}</p>
        </div>
      </NoteMetaInfoRow>
      <NoteMetaInfoRow
        src="/icons/icon-calendar-gray.svg"
        label="날짜">
        <p className="font-normal text-gray-700">{updatedAt}</p>
      </NoteMetaInfoRow>
    </div>
  );
}
