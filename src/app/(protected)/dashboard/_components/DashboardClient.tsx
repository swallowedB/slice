"use client";

import DashboardHeader from "./dashboard-header/DashboardHeader";
import Todos from "./todos/Todos";
import Goal from "./goal/Goal";

export default function DashboardClient() {
  return (
    <section>
      <DashboardHeader />
      <Todos />
      <Goal />
    </section>
  );
}
