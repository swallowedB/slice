import NoteMetaInfo from "./NoteMetaInfo";
import NoteTitleInput from "./NoteTitleInput";

interface NoteEditorFormProps {
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  metaInfo: {
    goalTitle: string;
    todoTitle: string;
    isTodoDone: boolean;
    updatedAt: string;
  };
}

export default function NoteEditorForm({
  title,
  onChangeTitle,
  metaInfo,
}: NoteEditorFormProps) {
  return (
    <section className="h-full rounded-4xl bg-white p-4 sm:p-8">
      <header className="border-b border-gray-100 pb-4 lg:pb-7">
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
    </section>
  );
}
