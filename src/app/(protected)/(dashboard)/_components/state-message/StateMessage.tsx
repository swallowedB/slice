type StatusMessageProps = {
  children: React.ReactNode;
};

export default function StatusMessage({ children }: StatusMessageProps) {
  return (
    <p className="flex h-full items-center justify-center text-base font-semibold text-white">
      {children}
    </p>
  );
}
