import { useToggleDoneMutation } from "./useToggleDoneMutation";

export function useToggleTodo() {
  const { mutate } = useToggleDoneMutation();
  const handleToggle = (id: number, checked: boolean) => {
    mutate({
      id,
      payload: { done: checked },
    });
  };

  return { handleToggle };
}
