import GoalTodoBox from "./GoalTodoBox";
import { ListSkeleton } from "@/components/skeleton/ListSkeleton";

export default function GoalSkeleton() {
  const cardStyles =
    "relative mt-4 rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] sm:p-4 sm:pt-7.5 lg:rounded-[40px] lg:p-7.5";

  return (
    <div className={`animate-skeleton-fade relative ${cardStyles}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-40 rounded bg-gray-200" />
          <div className="h-2 w-56 rounded bg-gray-200" />
        </div>

        <div className="flex items-center gap-2 sm:static">
          <div className="absolute top-7.5 right-5 h-6 w-15 rounded-full bg-gray-200 sm:h-8 sm:w-20" />
          <div className="absolute bottom-0 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-gray-200 sm:static" />
        </div>
      </div>

      <div className="mt-6.5 grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <GoalTodoBox
          title="TO DO"
          variant="todo">
          <ListSkeleton
            count={2}
            rowClassName="h-10 bg-white/40"
          />
        </GoalTodoBox>

        <GoalTodoBox
          title="DONE"
          variant="done">
          <ListSkeleton
            variant="light"
            count={2}
            rowClassName="h-10 bg-white/40"
          />
        </GoalTodoBox>
      </div>
    </div>
  );
}
