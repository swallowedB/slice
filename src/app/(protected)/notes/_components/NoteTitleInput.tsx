interface NoteTitleInputProps {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NoteTitleInput({
  title,
  onChange,
}: NoteTitleInputProps) {
  const maxLength = 30;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/icons/icon-note.svg"
          alt="노트 아이콘"
          className="h-10 w-10"
        />
        <input
          type="text"
          value={title}
          maxLength={maxLength}
          placeholder="노트의 제목을 입력해주세요"
          onChange={onChange}
          className="text-sm font-semibold text-gray-700 placeholder:text-sm placeholder:text-gray-300 focus:outline-none sm:text-2xl sm:placeholder:text-2xl"
        />
      </div>
      <p className="text-xs font-medium text-gray-600">
        <span>{title.length}</span>/
        <span className="text-orange-250">{maxLength}</span>
      </p>
    </div>
  );
}
