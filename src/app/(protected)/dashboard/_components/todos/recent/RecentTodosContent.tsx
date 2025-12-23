import ListItem from "@/components/common/list/list-item/ListItem";
import { useToggleTodo } from "@/hooks/queries/todos";
import { useTodosSuspense } from "@/hooks/queries/todos/useTodosSuspense";

export default function RecentTodosContent() {
  const todos = useTodosSuspense();

  const recentTodos = [...todos]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 4);

  const { handleToggle } = useToggleTodo();

  if (recentTodos.length === 0) {
    return (
      <p className="flex h-full w-full items-center justify-center text-base font-semibold text-white">
        최근에 등록한 할 일이 없어요
      </p>
    );
  }

  return (
    <ListItem
      className="grid gap-0.5 lg:gap-1.5"
      items={recentTodos}
      onToggleChecked={handleToggle}
      variant="white"
    />
  );
}
