import { auth, signOut } from "@/models/OAuth/auth"; // Update path if needed
import ClockCalendar from "../ClockCalander/ClockCalander";

export default async function RightSidebar() {
  const session = await auth();
  const user = session?.user;

  return (
    <aside className="hidden pt-20 xl:flex w-96 flex-col gap-6 sticky top-6 h-[calc(100vh)] pl-6 border-l border-gray-100/20 overflow-y-auto no-scrollbar">
      {/* ⏰ CLOCK & CALENDAR WIDGET */}
      <ClockCalendar />
    </aside>
  );
}