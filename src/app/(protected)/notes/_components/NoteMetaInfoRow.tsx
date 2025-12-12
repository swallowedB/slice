interface NoteMetaInfoRowProps {
  src: string;
  label: "목표" | "할 일" | "날짜";
  children: React.ReactNode;
}

export default function NoteMetaInfoRow({
  src,
  label,
  children,
}: NoteMetaInfoRowProps) {
  return (
    <div className="flex text-sm">
      <h4 className="flex min-w-15 items-center justify-start gap-1 text-gray-400">
        <img
          src={src}
          alt={`${label} 아이콘`}
          className="h-4 w-4"
        />
        <span className="font-medium">{label}</span>
      </h4>
      {children}
    </div>
  );
}
