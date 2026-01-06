import Link from "next/link";
import { taskStat } from "@/helpers/taskStatus/taskStatus"
export default async function LeftSideBar() {

  const stat = await taskStat();
  const total = (stat.pending || 0) + (stat.completed || 0);
  const percent = total === 0 ? 0 : (stat.completed / total) * 100;
  return (
    <div className="hidden w-65 min-h-screen p-4 border-r border-slate-200 dark:border-white/20 pt-20 lg:flex flex-col justify-start items-center fixed z-40 bg-white dark:bg-[#101922]">
      <div className="flex justify-center items-center flex-col gap-1 mb-6 w-full dark:text-white/70 text-black/70">

        {/* INBOX */}
        <Link href="/inbox" className="flex justify-between items-center px-3 py-2 w-60 rounded-lg transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/15 group">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined font-[20px] " style={{ fontSize: "20px" }}>inbox</span>
            <span className="text-14">Inbox</span>
          </div>
          <span className="opacity-50 group-hover:opacity-100 group-hover:text-blue-500 duration-200 transition-all text-xs ml-auto">
            {stat.overdue}
          </span>
        </Link>

        {/* TODAY */}
        <Link href="/today" className="flex justify-between items-center px-3 py-2 w-60 rounded-lg transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/15 group">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            <span className="text-14">Today</span>
          </div>
          <span className="opacity-50 group-hover:opacity-100 group-hover:text-blue-500 duration-200 transition-all text-xs ml-auto">
            {stat.today}
          </span>
        </Link>

        {/* UPCOMING */}
        <Link href="/upcoming" className="flex justify-between items-center px-3 py-2 w-60 rounded-lg transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/15 group">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">upcoming</span>
            <span className="text-14">Upcoming</span>
          </div>
          <span className="opacity-50 group-hover:opacity-100 group-hover:text-blue-500 duration-200 transition-all text-xs ml-auto">
            {stat.upcoming}
          </span>
        </Link>

        {/* COMPLETED */}
        <Link href="/completed" className="flex justify-between items-center px-3 py-2 w-60 rounded-lg transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/15 group">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">check_box</span>
            <span className="text-14">Completed</span>
          </div>
          <span className="opacity-50 group-hover:opacity-100 group-hover:text-blue-500 duration-200 transition-all text-xs ml-auto">
            {stat.completed}
          </span>
        </Link>

      </div>

      {/* <div className="flex justify-between items-center ml-3 pb-2 w-full px-4">
        <b className="opacity-50 text-15 text-gray-500 dark:text-white">PROJECTS</b>
        <span className="material-symbols-outlined opacity-50 mr-6 text-gray-500 dark:text-white">add</span>
      </div>

      <div className="flex justify-between items-center flex-col">
        <button className="flex justify-start items-center p-2 gap-3 w-56 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all duration-200 group">
          <div className="bg-orange-500 size-2.5 rounded-full"></div>
          <p className="text-gray-600 dark:text-white">Personal</p>
          <p className="opacity-0 group-hover:opacity-100 duration-200 transition-all font-bold ml-auto text-gray-400 dark:text-white">...</p>
        </button>
        <button className="flex justify-start items-center p-2 gap-3 w-56 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all duration-200 group">
          <div className="bg-blue-500 size-2.5 rounded-full"></div>
          <p className="text-gray-600 dark:text-white">Work</p>
          <p className="opacity-0 group-hover:opacity-100 duration-200 transition-all font-bold ml-auto text-gray-400 dark:text-white">...</p>
        </button>
        <button className="flex justify-start items-center p-2 gap-3 w-56 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all duration-200 group">
          <div className="bg-purple-500 size-2.5 rounded-full"></div>
          <p className="text-gray-600 dark:text-white">Shopping</p>
          <p className="opacity-0 group-hover:opacity-100 duration-200 transition-all font-bold ml-auto text-gray-400 dark:text-white">...</p>
        </button>
      </div> */}

      {/* DAILY GOALS WIDGET */}
      <div className="w-53 h-24 bg-slate-50 border-slate-200 dark:bg-[#1c2127] rounded-xl border dark:border-white/15 flex flex-col justify-center items-center gap-2 absolute bottom-10">

        <div className="flex justify-between items-center w-[80%]">
          <p className="font-medium text-xs text-gray-600 dark:text-white">Daily Goals</p>
          {/* Math.round removes ugly decimals like 33.3333% */}
          <p className="text-blue-500 font-bold">{Math.round(percent)}%</p>
        </div>

        <div className="h-2 w-[80%] bg-slate-200 dark:bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <div className="">
          <span className="opacity-40 text-xs text-center block text-gray-600 dark:text-white">
            {/* Logic Check: Showing Completed vs Total */}
            {stat.completed} of {total} task completed
          </span>
        </div>

      </div>
    </div>
  )
}