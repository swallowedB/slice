import { ReactNode } from "react";

interface TodosLayoutProps {
  children: ReactNode;
}

export default function TodosLayout({ children }: TodosLayoutProps) {
  return (
    <div className="flex w-full max-w-[720px] flex-col rounded-3xl pb-20">
      {children}
    </div>
  );
}
