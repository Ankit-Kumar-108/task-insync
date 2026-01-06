"use client"
import { useTransition } from "react";
import toggleTask from "@/actions/toggleTask/toggleTask";
import Loader from "../Loading/Loading";

interface TaskCheckBoxProps {
    title: string,
    taskId: string,
    taskIsCompleted: boolean
}

export default function TaskCheckbox({ title, taskId, taskIsCompleted}: TaskCheckBoxProps) {
    const [isPending, startTransition] = useTransition()
    return (
    <>    
    {isPending ? <Loader/> : (
        //  Checkbox 
        //  TOGGLE FORM 
     <form action={async () => {
        // 1. DEFINE THE PATH VARIABLE HERE
        // We check if we are on "Today" (Home page) or "Inbox"/"Upcoming"
        const currentPath = title.toLowerCase() === "today" ? "/" : `/${title.toLowerCase()}`;
        startTransition(async() => {
            // 2. PASS 'currentPath' TO THE FUNCTION
            await toggleTask(taskId, taskIsCompleted, currentPath);    
        })
    }}>
        <button
            type="submit"
            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${taskIsCompleted
                ? 'bg-[#2b8cee] border-[#2b8cee]'
                : 'border-[#64748b] hover:border-[#2b8cee]'
            }`}
            >
            {taskIsCompleted && <span className="material-symbols-outlined text-[14px] text-white">check</span>}
            
        </button>
    </form>
    )}
    </>
    )
}