import MobileHeader from "../_components/layout/MobileHeader";
import Goal from "./_components/goal/Goal";
import ProgressTodos from "./_components/progress/ProgressTodos";
import RecentTodos from "./_components/recent/RecentTodos";

export default function DashBoardPage() {
  return (
    <section>
      <MobileHeader title="체다치즈님의 대시보드" />
      <h2 className="color-black hidden sm:mb-8.5 sm:block sm:pl-2 sm:text-2xl sm:font-semibold">
        체다치즈님의 대시보드
      </h2>

      {/* 최근 할일 + 진행도 섹션 */}
      <section className="mb-7.5 sm:mb-8 lg:mb-8.5">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1 lg:gap-8 xl:grid-cols-2">
          <RecentTodos />
          <ProgressTodos />
        </div>
      </section>

      {/* 목표별 섹션 */}
      <Goal />
    </section>
  );
}
