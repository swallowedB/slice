import ProgressTodos from "./progress/ProgressTodos";
import RecentTodos from "./recent/RecentTodos";

export default function Todos() {
  return (
    <section className="mb-7.5 sm:mb-8 lg:mb-8.5">
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1 lg:gap-8 xl:grid-cols-2">
        <RecentTodos />
        <ProgressTodos />
      </div>
    </section>
  );
}
