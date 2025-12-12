import clsx from "clsx";

export default function Badge({ isDone }: { isDone: boolean }) {
  const badgeClasses = clsx(
    "inline-flex min-w-11 justify-center rounded-md py-0.5 text-center text-[10px] font-semibold sm:min-w-[50px] sm:py-1 sm:text-xs",
    isDone ? "bg-gray-300 text-white" : "bg-orange-100 text-orange-400",
  );

  return <span className={badgeClasses}>{isDone ? "DONE" : "TO DO"}</span>;
}
