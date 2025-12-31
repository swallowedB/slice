import { ListSkeleton } from "@/components/skeleton/ListSkeleton";

export default function GoalContainerSkeleton() {
  return (
    <section className="animate-skeleton-fade">
      <div className="mb-7.5 block w-full sm:grid lg:mb-20 lg:grid-cols-1 lg:gap-x-0 xl:gap-x-8 2xl:grid-cols-2">
        <div className="mb-4 rounded-[28px] bg-white p-4 shadow lg:rounded-[40px] lg:p-6">
          <div className="flex items-center justify-between">
            <div className="bg-gray-80 h-6 w-48 rounded" />
            <div className="bg-gray-80 h-8 w-8 rounded-full" />
          </div>
        </div>

        <div className="block sm:grid sm:grid-cols-2 sm:gap-x-5 lg:mt-5 lg:gap-x-5 xl:mt-5 xl:grid xl:grid-cols-2 2xl:mt-0">
          <div className="mb-4 rounded-[28px] bg-white p-6 shadow sm:mb-0 lg:rounded-[40px]">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="bg-gray-80 h-24 w-24 rounded-full" />
              <div className="bg-gray-80 h-4 w-20 rounded" />
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow lg:rounded-[40px]">
            <div className="flex flex-col gap-3">
              <div className="bg-gray-80 h-5 w-24 rounded" />
              <div className="bg-gray-80 h-4 w-full rounded" />
              <div className="bg-gray-80 h-4 w-3/4 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] bg-white p-4 shadow lg:rounded-[40px] lg:p-6">
        <ListSkeleton
          count={5}
          variant="light"
          rowClassName="h-10 lg:h-11"
        />
      </div>
    </section>
  );
}
