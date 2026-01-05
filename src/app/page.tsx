import LeftSideBar from "@/components/SideBars/leftSideBar";
import MiddleSection from "@/components/middleSection/middleSection";
import NavBar from "@/components/navbar/navbar";
import RightSidebar from "@/components/SideBars/rightSideBar";

export default async function Home() {
  return (
    <div className="flex flex-col justify-baseline min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-white">
        {/* navbar */}
        <NavBar/>
      
      <main className="flex">

        {/* left sidebar here */}
        <LeftSideBar/>

        {/* middle section */}

        <MiddleSection title="Inbox"/>
         
        <RightSidebar/>

      </main>

    </div>

  )
}
