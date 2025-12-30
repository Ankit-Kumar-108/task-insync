import { signIn, signOut, auth } from "@/models/OAuth/auth";

export default async function Home() {
  const session = await auth()
  return (
    <div className="flex flex-col justify-baseline min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-white">

      <nav className="w-full h-16 bg-[#ffffff] dark:bg-[#1c2127] border border-white/20 flex justify-between items-center pl-4 pr-4 fixed">

        <div className="flex justify-center items-center gap-4">

          <img src="/lolo.png" alt="Logo Img" className="size-8 rounded-full" />
          <span className="font-bold text-xl">Task-InSync</span>

          <form action="" className="group ml-4">
            <div className="w-64 h-9 rounded-lg bg-slate-100/10 flex justify-start pl-4 items-center group-focus-within:ring-blue-500 group-focus-within:ring-2 gap-2.5">
              <span className="material-symbols-outlined opacity-50" style={{ fontSize: "20px" }}>search</span>
              <input type="text" placeholder="Search Tasks" className="ring-none outline-none border-none text-[14px]" />
            </div>
          </form>
        </div>

        <div className="flex justify-center items-center gap-5">
          <div className="size-10 flex justify-center items-center">
            <span className="material-symbols-outlined cursor-pointer">notifications</span>
          </div>

          <div className="size-10 flex justify-center items-center">
            <span className="material-symbols-outlined cursor-pointer">settings</span>
          </div>

          <div className="h-8 w-px bg-slate-100/20"></div>

          <div className="group relative">

            <button className="size-10 flex justify-center items-center rounded-full overflow-hidden ring-2 ring-green-500 cursor-pointer">
              {session && session.user ? (
                <img src={session.user.image || ""} alt="user img" />
              ) : (<span className="material-symbols-outlined">person</span>)}
            </button>
            <div className="p-4 w-20 absolute top-6 -right-4 invisible group-focus-within:visible group-hover:visible duration-200 transition-all"></div>
            <div className="w-74 h-96 bg-[#101922] border border-white/20 absolute top-13 right-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 invisible group-focus-within:visible group-hover:visible duration-200 transition-all pt-12 flex justify-center items-center gap-5 flex-col">
              {session && session.user ? (
                <>
                  <div className="flex justify-center items-center w-35 h-35 rounded-full overflow-hidden">
                    <img src={session.user.image || ""} alt="User Img" className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <p><b>{session.user.name}</b></p>
                    <p className="opacity-40">{session.user.email}</p>
                  </div>
                  <form action={
                    async () => {
                      "use server"
                      await signOut()
                    }
                  }>
                    <button className="w-48 rounded-xl h-10 bg-blue-500 hover:bg-blue-600 transition-all duration-200">
                      Sign Out
                    </button>
                  </form>
                </>
              ) : (<span>Agar ye deekha to samajh jaana tu to gya</span>)}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex">

        <div className="w-64 min-h-screen p-4 border-r border-white/20 pt-20 flex flex-col justify-start items-center">
          <div className="flex justify-center items-center flex-col gap-1 mb-6 ml-3 ">
            <button className="flex justify-start items-center gap-3 px-3 py-2 w-60 ml-3 rounded-lg mr-6 transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/15">
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>inbox</span>
              <span className="text-14">Inbox</span>
            </button>
            <button className="flex justify-start items-center gap-3 px-3 py-2 w-60 ml-3 rounded-lg mr-6 transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/15">
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>calendar_today</span>
              <span className="text-14">Today</span>
            </button>
            <button className="flex justify-start items-center gap-3 px-3 py-2 w-60 ml-3 rounded-lg mr-6 transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/15">
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>upcoming</span>
              <span className="text-14">Upcoming</span>
            </button>
            <button className="flex justify-start items-center gap-3 px-3 py-2 w-60 ml-3 rounded-lg mr-6 transition-all duration-200 hover:text-blue-500 hover:bg-blue-500/15">
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>check_box</span>
              <span className="text-14">Completed</span>
            </button>

          </div>
          <div className="flex justify-between items-center ml-3 pb-2 gap-22">
            <b className="opacity-50 text-15">PROJECTS</b>
            <span className="material-symbols-outlined opacity-50 mr-6">add</span>
          </div>

          <div className="flex justify-between items-center flex-col">
            <button className="flex justify-start items-center p-2 gap-3 w-56 hover:bg-white/5 rounded-lg transition-all duration-200 group">
              <div className="bg-orange-500 size-2.5 rounded-full"></div>
              <p className="">Personal</p>
              <p className="opacity-0 group-hover:opacity-100 duration-200 transition-all font-bold ml-22">...</p>
            </button>
            <button className="flex justify-start items-center p-2 gap-3 w-56 hover:bg-white/5 rounded-lg transition-all duration-200 group">
              <div className="bg-blue-500 size-2.5 rounded-full"></div>
              <p className="">Work</p>
              <p className="opacity-0 group-hover:opacity-100 duration-200 transition-all font-bold ml-28">...</p>
            </button>
            <button className="flex justify-start items-center p-2 gap-3 w-56 hover:bg-white/5 rounded-lg transition-all duration-200 group">
              <div className="bg-purple-500 size-2.5 rounded-full"></div>
              <p className="">Shopping</p>
              <p className="opacity-0 group-hover:opacity-100 duration-200 transition-all font-bold ml-20">...</p>
            </button>
          </div>
          <div className="w-53 h-24 bg-[#1c2127] rounded-xl border border-white/15 flex flex-col justify-center items-center gap-2 absolute bottom-10">

            <div className="flex justify-between items-center w-[80%]">
              <p className="font-medium text-xs">Daily Goals</p>
              <p className="text-blue-500 font-bold">80%</p>
            </div>

            <div className="h-2 w-[80%] bg-white/20 rounded-full">
              <div className="h-full w-[80%] rounded-full bg-blue-500 "></div>
            </div>

            <div className="">
              <span className="opacity-40 text-xs -ml-12">4 of 5 task completed</span>
            </div>

          </div>
        </div>

        <div className="w-full max-w-5xl p-6 flex justify-center items-center flex-col">

          {session && session.user ? (
          <h1 className="text-5xl font-bold tracking-tight text-green-400">Task InSync</h1>         
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-400 text-lg">Choose Account to Login</p>

              {/* Github OAuth */}
              <form action={
                async () => {
                  "use server"
                  await signIn("github")
                }
              }>
                <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition flex items-center gap-3 text-lg">
                  <img src="https://authjs.dev/img/providers/github.svg" className="w-6 h-6" alt="GitHub Logo" />
                  Sign in with GitHub
                </button>

              </form>
              {/* Google OAuth */}
              <form action={
                async () => {
                  "use server"
                  await signIn("google")
                }
              }>
                <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition flex items-center gap-3 text-lg">
                  <img src="https://authjs.dev/img/providers/google.svg" className="w-6 h-6" alt="Google Logo" />
                  Sign in with Google
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="w-80 bg-[#ffffff] dark:bg-[#1c2127] border-l border-white/20">

        </div>

      </main>

    </div>

  )
}