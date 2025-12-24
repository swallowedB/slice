import NavigationDesktop from "./_components/navigation/NavigationDesktop";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function ProtectedLayout({
  children,
  modal,
}: ProtectedLayoutProps) {
  return (
    <main className="flex min-h-screen overflow-hidden sm:h-screen sm:gap-12 lg:gap-20">
      <div className="hidden sm:block">
        <NavigationDesktop />
      </div>

      <section className="flex-1 overflow-y-auto px-5 pt-22 pb-12 sm:pt-12 lg:py-20 lg:pr-40">
        {children}
        {modal}
      </section>
    </main>
  );
}
