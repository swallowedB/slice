export default function TodoBox({
  title,
  variant,
  children,
}: {
  title: string;
  variant: "todo" | "done";
  children: React.ReactNode;
}) {
  const isTodo = variant === "todo";

  return (
    <div
      className={`w-full rounded-2xl px-2 py-4.5 sm:h-64 sm:px-2.5 sm:py-4 lg:h-81 lg:rounded-3xl lg:p-6 ${
        isTodo ? "bg-[#FFF8E4]" : ""
      }`}>
      <h5
        className={`mb-3.5 pl-2.5 text-sm font-bold sm:mb-1.5 sm:text-base lg:mb-3.75 ${
          isTodo ? "text-orange-250" : "text-gray-400"
        }`}>
        {title}
      </h5>

      {children}
    </div>
  );
}
