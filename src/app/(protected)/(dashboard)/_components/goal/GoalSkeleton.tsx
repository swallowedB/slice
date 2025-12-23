import GoalTodoBox from "./GoalTodoBox";
import { ListSkeleton } from "@/components/skeleton/ListSkeleton";

export default function GoalSkeletion() {
  const cardStyles =
    "relative mt-4 rounded-[28px] bg-white px-4 py-6.5 pb-11 shadow-[0_4px_4px_0_rgba(0,0,0,0.025)] transition-all sm:p-4 sm:pt-7.5 lg:rounded-[40px] lg:p-7.5 lg:hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.025)]";

  return (
    <div className={`animate-skeleton-fade ${cardStyles}`}>
      <div className="flex items-start justify-between sm:grid sm:grid-cols-2 sm:items-center lg:flex lg:flex-col lg:items-start xl:flex-row xl:items-center">
        <div className="w-full pl-2.5 sm:w-auto lg:grid lg:grid-rows-[auto_auto] lg:gap-1 lg:pl-3.5 2xl:grid 2xl:grid-cols-2 2xl:items-center">
          <div className="animate-skeleton-fade mb-3 h-5 w-40 rounded bg-gray-200 pr-20 sm:mb-0 sm:h-4 sm:w-32 sm:pr-0 lg:h-5 lg:w-86 lg:pr-7.5" />
          <div className="animate-skeleton-fade mt-2 h-2 w-full rounded bg-gray-200 lg:w-86" />
        </div>

        <div className="flex pr-2.5 sm:ml-auto lg:mt-4 xl:mt-0">
          <div className="animate-skeleton-fade hidden sm:block">
            <div className="relative h-10 w-26 items-center justify-center rounded-full bg-gray-200 font-semibold"></div>
          </div>
          <div className="animate-skeleton-fade block sm:hidden">
            <div className="absolute right-5 flex h-4 w-18.5 items-center justify-center bg-gray-200 font-semibold sm:static sm:w-full">
              <div className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-4.5 sm:w-4.5"></div>
            </div>
          </div>

          <div className="animate-skeleton-fade absolute bottom-3.5 left-1/2 mt-2.5 ml-0 h-8 w-8 -translate-x-1/2 transform rounded-full border border-gray-200 bg-white sm:static sm:mt-0 sm:ml-4 sm:h-10 sm:w-10 sm:translate-x-0 sm:transform-none">
            <div className="h-full w-full rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="mt-6.5 grid grid-cols-1 overflow-hidden sm:gap-2 2xl:grid-cols-2">
        <GoalTodoBox
          title="TO DO"
          variant="todo">
          <ListSkeleton
            count={5}
            rowClassName="h-10 lg:h-11 bg-white/40"
          />
        </GoalTodoBox>
        <GoalTodoBox
          title="DONE"
          variant="done">
          <ListSkeleton
            variant="light"
            count={5}
            rowClassName="h-10 lg:h-11 bg-white/40"
          />
        </GoalTodoBox>
      </div>
      <div />
    </div>
  );
}
