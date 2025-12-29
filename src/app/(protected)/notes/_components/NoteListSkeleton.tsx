import NoteItemSkeleton from "./NoteItemSkeleton";

export default function NoteListSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-2 pb-12 sm:gap-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-5 lg:pb-20">
      {Array.from({ length: 6 }).map((_, index) => (
        <NoteItemSkeleton key={index} />
      ))}
    </section>
  );
}
