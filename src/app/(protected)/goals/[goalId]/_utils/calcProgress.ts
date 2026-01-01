export function calcProgress(todos: { checked: boolean }[]) {
  if (todos.length === 0) return 0;

  const done = todos.filter((t) => t.checked).length;
  return Math.round((done / todos.length) * 100);
}
