interface CharacterCountProps {
  withSpace: number;
  withoutSpace: number;
}

export default function CharacterCount({
  withSpace,
  withoutSpace,
}: CharacterCountProps) {
  return (
    <p className="pt-6 text-right text-xs font-normal text-gray-400 lg:pt-5">
      공백포함 {withSpace}자 | 공백제외 {withoutSpace}자
    </p>
  );
}
