import LeftSideBar from "@/components/SideBars/leftSideBar";
import ClockCalendar from "@/components/SideBars/rightSideBar";
import MiddleSection from "@/components/middleSection/middleSection";
import NavBar from "@/components/navbar/navbar";

export default async function Home() {
  return (
    <div className="flex flex-col justify-baseline min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-white">
        {/* navbar */}
        <NavBar/>
      
      <main className="flex">

        {/* left sidebar here */}
        <LeftSideBar/>

        {/* middle section */}

        <MiddleSection title="Home"/>

        {/* right side */}

        <ClockCalendar/>

      </main>

    </div>

  )
}