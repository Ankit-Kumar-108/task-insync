import { signIn, auth } from "@/models/OAuth/auth";
import AddTaskInput from "../createTask/addTask";
import GetTask from "@/actions/taskFetch/getTask";
import toggleTask from "@/actions/toggleTask/toggleTask";
import calculateTimeLeft from "@/helpers/countdown/countDown";
import { taskStat } from "@/helpers/taskStatus/taskStatus";
import EditTaskModal from "../editTask/updateTask";
import DeleteTask from "../deleteTask/deletetask";

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
        <main className="flex flex-1 flex-col overflow-y-auto bg-[#f6f7f8] dark:bg-[#101922] p-4 sm:p-8 mt-20 mr-95" style={{marginLeft: "260px"}}>

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

                    {/* Add Task Input */}
                    <AddTaskInput title={title} />

                    {/* Task List */}
                    <div className="flex flex-col gap-3">
                        {tasks.length > 0 ? (
                            tasks.map((task) => {
                                // 2. Calculate time left for THIS specific task
                                const timeLeft = calculateTimeLeft(task.deadline);

                                return (
                                    <div
                                        key={task.id}
                                        className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-[#e2e8f0] dark:border-[#283039] bg-white dark:bg-[#1c2127] p-4 shadow-sm hover:border-[#2b8cee]/50 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-start gap-4">

                                            {/* Checkbox */}
                                            {/* TOGGLE FORM */}
                                            <form action={async () => {
                                                "use server";

                                                // 1. DEFINE THE PATH VARIABLE HERE
                                                // We check if we are on "Today" (Home page) or "Inbox"/"Upcoming"
                                                const currentPath = title.toLowerCase() === "today" ? "/" : `/${title.toLowerCase()}`;

                                                // 2. PASS 'currentPath' TO THE FUNCTION
                                                await toggleTask(task.id, task.isCompleted, currentPath);
                                            }}>
                                                <button
                                                    type="submit"
                                                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${task.isCompleted
                                                        ? 'bg-[#2b8cee] border-[#2b8cee]'
                                                        : 'border-[#64748b] hover:border-[#2b8cee]'
                                                        }`}
                                                >
                                                    {task.isCompleted && <span className="material-symbols-outlined text-[14px] text-white">check</span>}
                                                </button>
                                            </form>

                                            <div className="flex flex-col gap-1">
                                                {/* Title */}
                                                <span className={`text-base font-medium ${task.isCompleted ? 'text-gray-500 line-through' : 'text-slate-900 dark:text-white'}`}>
                                                    {task.title}
                                                </span>

                                                {/* Meta Info */}
                                                <div className="flex flex-wrap items-center gap-3">

                                                    {/* 3. SHOW THE COUNTDOWN BADGE */}
                                                    {timeLeft && !task.isCompleted && (
                                                        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${timeLeft.color} ${timeLeft.bg}`}>
                                                            <span className="material-symbols-outlined text-[14px]">timer</span>
                                                            {timeLeft.text}
                                                        </span>
                                                    )}

                                                    {/* Standard Date Display */}
                                                    {task.deadline && (
                                                        <span className="flex items-center gap-1 text-xs text-[#64748b] dark:text-[#9dabb9]">
                                                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                                            {new Date(task.deadline).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-3 sm:mt-0 flex items-center justify-end gap-2 opacity-100 sm:opacity-100 sm:group-hover:opacity-100 transition-opacity">
                                            <EditTaskModal task={task}/>
                                            <DeleteTask title={title} task_Id={task.id}/>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center py-10 text-gray-400">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-30">inbox</span>
                                <p>No tasks found in {title}.</p>
                            </div>
                        )}
                    </div>
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