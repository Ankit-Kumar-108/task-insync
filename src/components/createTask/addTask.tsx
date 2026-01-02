"use client";
import { useState, useEffect } from "react";
import CreateTask from "@/actions/taskCreate/createTask";
import { usePathname } from "next/navigation"; 
import toast from "react-hot-toast";
import Loader from "../Loading/Loading";

export default function AddTaskInput({ title }: { title: string }) {
  const pathname = usePathname();
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(""); // State to hold the chosen date
  const [isLoading, setIsLoading] = useState(false)
  // 1. Auto-set date based on the page (Inbox = empty, Today = today)
  useEffect(() => {
    const now = new Date();
    if (title.toLowerCase() === "today") {
        setDate(now.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    } else if (title.toLowerCase() === "upcoming") {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow.toISOString().split('T')[0]);
    } else {
        setDate(""); // Inbox has no date by default
    }
  }, [title]);

  return (
    <div className="mb-8 group focus-within:ring-2 ring-[#2b8cee] ring-offset-2 ring-offset-[#f6f7f8] dark:ring-offset-[#101922] rounded-xl">
      
      <form 
        action={async (formData) => {
            setIsLoading(true)
            await CreateTask(formData);
            setTaskName(""); // Clear text
            setIsLoading(false)
            toast.success("Task Created!")
        }} 
        className="flex items-center rounded-xl bg-white dark:bg-[#1c2127] border border-[#e2e8f0] dark:border-[#283039] shadow-sm overflow-hidden h-14 transition-colors pr-2"
      >
        
        {/* Hidden inputs for the Server Action */}
        <input type="hidden" name="path" value={pathname} />
        
        {/* Submit Button (Plus Icon) */}
        <button type="submit" disabled={isLoading} className="flex h-full w-14 shrink-0 items-center justify-center text-[#2b8cee] hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          {isLoading?(
            <Loader/>
          ):(
          <span className="material-symbols-outlined text-[24px]">add_circle</span>
          )}
        </button>

        {/* Text Input */}
        <input 
          name="title" 
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="h-full w-full border-none bg-transparent px-2 text-slate-900 dark:text-white placeholder-[#64748b] dark:placeholder-[#9dabb9] focus:ring-0 text-base focus:outline-none" 
          placeholder={`Add task to '${title}'...`} 
          type="text" 
          required
          autoComplete="off"
        />

        {/* 2. THE DATE PICKER */}
        <div className="flex items-center gap-2">
            <div className="relative">
                {/* This input is the real date picker */}
                <input 
                    type="date" 
                    name="deadLine" // Matches CreateTask.ts
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent text-xs text-gray-500 border border-gray-200 dark:border-gray-700 rounded p-1 focus:outline-none focus:border-[#2b8cee]"
                />
            </div>
        </div>

      </form>
    </div>
  );
}