import { auth } from "@/models/OAuth/auth";
import LeftSideBar from "@/components/SideBars/leftSideBar";
import MiddleSection from "@/components/middleSection/middleSection";
import NavBar from "@/components/navbar/navbar";

export default async function Home() {
  const session = await auth()
  return (
    <div className="flex flex-col justify-baseline min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-white">
        {/* navbar */}
        <NavBar/>
      
      <main className="flex">

        {/* left sidebar here */}
        <LeftSideBar/>

        {/* middle section */}

        <MiddleSection title="completed"/>

        <div className="w-80 bg-[#ffffff] dark:bg-[#1c2127] border-l border-white/20">

        </div>

      </main>

    </div>

  )
}