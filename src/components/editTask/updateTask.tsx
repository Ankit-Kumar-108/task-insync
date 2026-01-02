"use client";

import { useState } from "react";
import { updateTask } from "@/actions/updateTask/updateTask";

// 1. FIX: Update interface to match Prisma DB Model exactly
interface TaskProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    deadline: Date | null;    // Changed from 'date: string'
    priority?: string;        // Made optional (?) just in case DB doesn't have it yet
    isCompleted: boolean;
  };
}

export default function EditTaskModal({ task }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. FIX: Safely convert DB Date object to "YYYY-MM-DD" string for the input
  const formattedDate = task.deadline 
    ? new Date(task.deadline).toISOString().split("T")[0] 
    : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("taskId", task.id); 

    await updateTask(formData);
    
    setIsLoading(false);
    setIsOpen(false); 
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </button>

      {isOpen && (
       <div className="fixed z-50 flex items-center justify-center bg-[#101922] backdrop-blur-sm p-4 rounded-lg border" style={{borderColor: "#283029", top: "30%", right: "35%"}}>
          <div className="w-full max-w-md bg-white dark:bg-[#101922] rounded-xl shadow-2xl p-8 flex justify-center items-center flex-col">
            
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium opacity-70 text-center">Title</label>
                <input 
                  name="title" 
                  defaultValue={task.title}
                  required
                  className="p-2 rounded-lg bg-gray-50 dark:bg-[#1c2127] dark:border-gray-700 outline-none focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium opacity-70 text-center">Description</label>
                <textarea 
                  name="description" 
                  defaultValue={task.description || ""}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-[#1c2127] dark:border-gray-700 outline-none focus:border-blue-500 h-24 resize-none"
                />
              </div>

              {/* Date & Priority Row */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm font-medium opacity-70 text-center">Date</label>
                  <input 
                    type="date"
                    name="date" 
                    defaultValue={formattedDate} // Uses the fixed date logic
                    className="p-2 rounded-lg bg-gray-50 dark:bg-[#1c2127] dark:border-gray-700 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm font-medium opacity-70">Priority</label>
                  {/* 3. FIX: Handle missing priority by defaulting to "low" */}
                  <select 
                    name="priority"
                    defaultValue={task.priority || "low"} 
                    className="p-2 rounded-lg bg-gray-50 dark:bg-[#1c2127] dark:border-gray-700/20 outline-none focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}