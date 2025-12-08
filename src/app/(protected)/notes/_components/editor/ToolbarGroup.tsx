interface ToolbarGroupProps {
  children: React.ReactNode;
}

export default function ToolbarGroup({ children }: ToolbarGroupProps) {
  return <div className="flex items-center gap-1">{children}</div>;
}
