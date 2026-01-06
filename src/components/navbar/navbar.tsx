import { signOut, auth } from "@/lib/auth";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default async function NavBar() {
  const session = await auth()

  return (
    <nav className="w-full h-16 bg-white dark:bg-[#1c2127] border-b border-slate-200 dark:border-white/20 flex justify-between items-center pl-4 pr-4 fixed z-50 " style={{ zIndex: "50" }}>

      <div className="flex justify-center items-center gap-4">

        <img src="/lolo.png" alt="Logo Img" className="size-8 rounded-full" />
        <span className="font-bold text-lg md:text-xl lg:text-xl text-slate-800 dark:text-white">Task-InSync</span>

        <form action="" className="group ml-4 hidden md:flex">
          <div className="w-64 h-9 rounded-lg bg-slate-100 dark:bg-slate-100/10 flex justify-start pl-4 items-center group-focus-within:ring-blue-500 group-focus-within:ring-2 gap-2.5 transition-colors">
            <span className="material-symbols-outlined opacity-50 text-[20px] text-slate-500 dark:text-gray-400" style={{ fontSize: "20px" }}>search</span>
            <input type="text" placeholder="Search Tasks" className="bg-transparent ring-none outline-none border-none text-[14px] text-slate-700 dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 w-full" />
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center gap-5">
        <div className="size-10 flex justify-center items-center">
          <span className="material-symbols-outlined cursor-pointer text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">notifications</span>
        </div>

        <div className="size-10 flex justify-center items-center">
          <ThemeToggle />
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-100/20"></div>

        <div className="group relative">

          <button className="size-10 flex justify-center items-center rounded-full overflow-hidden ring-2 ring-green-500 cursor-pointer">
            {session && session.user ? (
              <img src={session.user.image || ""} alt="user img" className="w-full h-full object-cover" />
            ) : (<span className="material-symbols-outlined text-slate-600 dark:text-white">person</span>)}
          </button>
          <div className="p-4 w-20 absolute top-6 -right-4 invisible group-focus-within:visible group-hover:visible duration-200 transition-all"></div>
          <div className="w-74 h-96 bg-white dark:bg-[#101922] border border-slate-200 dark:border-white/20 absolute top-13 right-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 invisible group-focus-within:visible group-hover:visible duration-200 transition-all pt-12 flex justify-center items-center gap-5 flex-col shadow-2xl dark:shadow-none">
            {session && session.user ? (
              <>
                <div className="flex justify-center items-center w-35 h-35 rounded-full overflow-hidden ring-4 ring-slate-100 dark:ring-white/10">
                  <img src={session.user.image || ""} alt="User Img" className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                  <p className="text-slate-800 dark:text-white text-lg"><b>{session.user.name}</b></p>
                  <p className="opacity-40 text-slate-500 dark:text-gray-400">{session.user.email}</p>
                </div>
                <form action={
                  async () => {
                    "use server"
                    await signOut()
                  }
                }>
                  <button className="w-48 rounded-xl h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-200 shadow-lg shadow-blue-500/30">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (<span>Hello User</span>)}
          </div>
        </div>
      </div>
    </nav>
  )
}