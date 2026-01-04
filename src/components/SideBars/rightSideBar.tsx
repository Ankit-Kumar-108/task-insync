import { auth, signOut } from "@/models/OAuth/auth"; // Update path if needed
import ClockCalendar from "../ClockCalander/ClockCalander";
import Image from "next/image";
import { LogOut, CheckCircle2, ListTodo } from "lucide-react"; // npm install lucide-react

export default async function RightSidebar() {
    const session = await auth();
    const user = session?.user;

    return (
        <aside className="hidden xl:flex w-95 flex-col gap-6 fixed right-0 top-6 h-[calc(100vh-48px)] pl-6 border-l border-gray-100/20 overflow-y-auto no-scrollbar pt-20">

            {/* ⏰ CLOCK & CALENDAR WIDGET */}
            <ClockCalendar />
        </aside>
    );
}