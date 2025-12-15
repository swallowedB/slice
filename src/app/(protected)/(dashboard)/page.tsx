import DashboardHeader from "./_components/dashboard-header/DashboardHeader";
import Goal from "./_components/goal/Goal";
import Todos from "./_components/todos/Todos";

export default function DashBoardPage() {
  return (
    <section>
      <DashboardHeader />
      <Todos />
      <Goal />
    </section>
  );
}
