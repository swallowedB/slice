import Button from "@/components/common/button/Button";

interface NoteDesktopActionsProps {
  submitLabel: string;
  isDisabled?: boolean;
  onDraft?: () => void;
  onSubmit?: () => void;
}

export default function NoteDesktopActions({
  submitLabel,
  onDraft,
  isDisabled,
  onSubmit,
}: NoteDesktopActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        variant="outline-orange"
        size="compact"
        onClick={onDraft}>
        임시저장
      </Button>
      <Button
        type="submit"
        variant="primary"
        size="compact"
        isDisabled={isDisabled}
        onClick={onSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
}
