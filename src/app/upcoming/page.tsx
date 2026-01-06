import { auth } from "@/lib/auth";
import LeftSideBar from "@/components/SideBars/leftSideBar";
import MiddleSection from "@/components/middleSection/middleSection";
import NavBar from "@/components/navbar/navbar";
import RightSidebar from "@/components/SideBars/rightSideBar";

export default async function Home() {
  const session = await auth()
  return (
    <div className="flex flex-col justify-baseline min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-white">
      {/* navbar */}
      <NavBar />

      <main className="flex">

        {/* left sidebar here */}
        <LeftSideBar />

        {/* middle section */}
        <MiddleSection title="Upcoming" />

        {/* Right Sidebar */}
        <RightSidebar />

      </main>

    </div>

  )
}
