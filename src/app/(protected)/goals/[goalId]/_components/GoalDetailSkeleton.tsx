import TodoButton from "@/app/(protected)/_components/todo-button/TodoButton";
import { ListSkeleton } from "@/components/skeleton/ListSkeleton";

export function GoalDetailSkeleton() {
  return (
    <>
      <div className="mb-7.5 block w-full animate-pulse sm:grid lg:mb-20 lg:grid-cols-1 lg:gap-x-0 xl:gap-x-8 2xl:grid-cols-2">
        <div className="relative mb-4 flex animate-pulse items-center gap-3 rounded-2xl bg-white px-4 py-4 lg:mb-0">
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="h-4 w-48 rounded bg-gray-200" />
          <div className="ml-auto h-6 w-6 rounded bg-gray-200" />
        </div>

        <div className="block sm:grid sm:grid-cols-2 sm:gap-x-5 lg:mt-5 lg:gap-x-5 xl:mt-5 xl:grid xl:grid-cols-2 2xl:mt-0">
          <div className="bg-orange-250 animate-pulse rounded-4xl px-8 py-8.5 sm:px-0 lg:h-31.25 lg:py-4 xl:h-auto xl:py-8.5">
            <div className="flex h-full items-center justify-center gap-7.5">
              <div className="h-24 w-24 rounded-full bg-gray-200" />

              <div className="flex flex-col gap-2">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-5 w-12 rounded bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex h-40 animate-pulse items-end rounded-4xl bg-gray-100 px-10 py-7.5 sm:mt-0 sm:h-auto lg:h-31.25 lg:py-4 xl:h-auto xl:py-7.5">
            <div className="flex items-center gap-1">
              <div className="h-6 w-40 rounded bg-gray-200 sm:h-5 lg:h-6" />
              <div className="h-5 w-5 rounded bg-gray-200 sm:h-3.5 sm:w-3.5 lg:h-5 lg:w-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        <div>
          <div className="relative mb-2.5 flex h-10.5 items-center justify-between">
            <h4 className="pl-2 text-lg font-semibold">TO DO</h4>
            <TodoButton className="top-1/2 translate-y-[-50%]" />
          </div>

          <div
            className={`min-h-0 rounded-2xl bg-orange-100 px-4 py-6 sm:min-h-138 sm:px-6 sm:py-8 lg:rounded-3xl`}>
            <ListSkeleton
              count={10}
              rowClassName="h-10 bg-white/40"
            />
          </div>
        </div>

        <div>
          <div className="relative mb-2.5 flex h-10.5 items-center justify-between">
            <h4 className="pl-2 text-lg font-semibold">DONE</h4>
          </div>
          <div
            className={`min-h-0 rounded-2xl bg-white px-4 py-6 sm:min-h-138 sm:px-6 sm:py-8 lg:rounded-3xl`}>
            <ListSkeleton
              count={10}
              rowClassName="h-10 bg-white/40"
            />
          </div>
        </div>
      </div>
    </>
  );
}
