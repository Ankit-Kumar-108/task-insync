import { signIn, auth } from "@/lib/auth";
import GetTask from "@/actions/taskFetch/getTask";
import { taskStat } from "@/helpers/taskStatus/taskStatus";
import TasksContainer from "./TasksContainer";

interface MiddleSection {
    title: string
}

export default async function MiddleSection({ title }: MiddleSection) {
    const session = await auth();
    const tasks = await GetTask(title) || [];

    const now = new Date();
    const Today = now.getDate();
    const Day = now.toLocaleDateString('en-IN', { weekday: "short" });
    const date = (`${Day} ${Today}`);

    return (
        <main className="flex flex-1 flex-col overflow-y-auto bg-[#f6f7f8] dark:bg-[#101922] p-6 mt-20 lg:ml-65">

            {session && session.user ? (

                <div className="mx-auto w-full max-w-5xl">
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl font-black tracking-tight text-blue-500 sm:text-4xl capitalize">{title}</h1>
                                <span className="text-xl text-[#64748b] dark:text-[#9dabb9]">{date}</span>
                            </div>
                            <p className="text-[#64748b] dark:text-[#9dabb9]">
                                Let's Make Today Productive
                            </p>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
                        <div className="flex flex-col gap-1 rounded-xl border border-[#e2e8f0] dark:border-[#283039] bg-white dark:bg-[#1c2127] p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-[#64748b] dark:text-[#9dabb9]">
                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                <span className="text-sm font-medium">Completed</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{(await taskStat()).completed}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 rounded-xl border border-[#e2e8f0] dark:border-[#283039] bg-white dark:bg-[#1c2127] p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-[#64748b] dark:text-[#9dabb9]">
                                <span className="material-symbols-outlined text-[20px]">schedule</span>
                                <span className="text-sm font-medium">Pending</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{(await taskStat()).pending}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 rounded-xl border border-[#e2e8f0] dark:border-[#283039] bg-white dark:bg-[#1c2127] p-5 shadow-sm">
                            <div
                                className="flex items-center gap-2 text-[#64748b] dark:text-[#9dabb9]">
                                <span className="material-symbols-outlined text-[20px]">warning</span>
                                <span className="text-sm font-medium">Overdue</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{(await taskStat()).overdue}</span>
                                <span className="text-xs font-medium text-red-500">Action needed</span>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Container (Handles AddTask + List + Optimistic UI) */}
                    <TasksContainer initialTasks={tasks} title={title} />
                </div>

            ) : (
                // Login Prompt
                <div className="text-center space-y-4 flex justify-center items-center flex-col">
                    <p className="text-gray-400 text-lg">Choose Account to Login</p>
                    <form action={async () => { "use server"; await signIn("github") }}>
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition flex items-center gap-3 text-lg">
                            <img src="https://authjs.dev/img/providers/github.svg" className="w-6 h-6" alt="GitHub Logo" />
                            Sign in with GitHub
                        </button>
                    </form>
                    <form action={async () => { "use server"; await signIn("google") }}>
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition flex items-center gap-3 text-lg">
                            <img src="https://authjs.dev/img/providers/google.svg" className="w-6 h-6" alt="Google Logo" />
                            Sign in with Google
                        </button>
                    </form>
                </div>
            )}
        </main>
    )
}