import TextButton from "@/components/common/button/TextButton";

interface NoteMobileActionsProps {
  submitLabel: string;
  isDisabled?: boolean;
  onDraft?: () => void;
  onSubmit?: () => void;
}

export default function NoteMobileActions({
  submitLabel,
  onDraft,
  isDisabled,
  onSubmit,
}: NoteMobileActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <TextButton
        type="button"
        variant="primary"
        onClick={onDraft}>
        임시저장
      </TextButton>
      <TextButton
        type="submit"
        variant="secondary"
        isDisabled={isDisabled}
        onClick={onSubmit}>
        {submitLabel}
      </TextButton>
    </div>
  );
}
