interface CharacterCountProps {
  withSpace: number;
  withoutSpace: number;
}

export default function CharacterCount({
  withSpace,
  withoutSpace,
}: CharacterCountProps) {
  return (
    <p className="text-right text-xs font-normal text-gray-400">
      공백포함 {withSpace}자 | 공백제외 {withoutSpace}자
    </p>
  );
}
