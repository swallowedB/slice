import NoteList from "./_components/NoteList";

export default async function NotesPage() {
  return (
    <div className="h-screen">
      <h2 className="hidden text-black sm:mb-14 sm:block sm:text-2xl sm:font-semibold">
        노트 모아보기
      </h2>
      <div className="mb-4 flex items-center gap-3 rounded-2xl bg-orange-50 p-4 sm:mb-6 sm:rounded-3xl sm:p-6 lg:mb-5 lg:gap-6 lg:p-10">
        <div className="h-8 w-8 border lg:h-10 lg:w-10"></div>
        <div className="text-gray-750 min-w-0 flex-1 truncate text-base font-semibold sm:text-xl lg:text-2xl">
          자바스크립트로 웹 서비스 만들기
        </div>
      </div>
      <NoteList />
    </div>
  );
}
