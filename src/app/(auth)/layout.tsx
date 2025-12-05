
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center flex-col gap-10">
      <section className="flex items-center gap-2">
        <img
          src="/logo.svg"
          alt=""
          className="w-12 h-12"
        />
        <p className="font-bold text-black text-4xl" >SLICE</p>
      </section>
      <section>{children}</section>
    </main>
  );
}
