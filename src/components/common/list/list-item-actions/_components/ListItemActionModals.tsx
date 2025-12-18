import { Todo } from "@/api/types/todo";
import TodoFormContent from "@/app/(protected)/_components/todo-modal/_components/TodoFormContent";
import ConfirmModal from "@/components/common/popup-modal/ConfirmModal";

// ListItemActionModals.tsx
type Props = {
  todo?: Todo;
  editOpen: boolean;
  confirmOpen: boolean;
  onCloseEdit: () => void;
  onCloseConfirm: () => void;
  onConfirmDelete: () => void;
};

export function ListItemActionModals({
  todo,
  editOpen,
  confirmOpen,
  onCloseEdit,
  onCloseConfirm,
  onConfirmDelete,
}: Props) {
  return (
    <>
      {editOpen && (
        <TodoFormContent
          mode="edit"
          todoId={todo?.id}
          todo={todo}
          onClose={onCloseEdit}
        />
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        title="정말 삭제하시겠어요?"
        message="삭제된 목표는 복구할 수 없습니다."
        onClose={onCloseConfirm}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}
