import { ReactNode } from "react";

interface TaskListLayoutProps {
  children: ReactNode;
}

export default function TaskListLayout({ children }: TaskListLayoutProps) {
  return (
    <div className="flex w-full max-w-[720px] flex-col rounded-3xl px-4">
      {children}
    </div>
  );
}
