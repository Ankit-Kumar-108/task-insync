"use client";

import { useState } from "react";
import { updateTask } from "@/actions/updateTask/updateTask";

interface TaskProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    deadline: Date | null;
    priority?: string;
    isCompleted: boolean;
  };
}

export default function EditTaskModal({ task }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-md transition-all"
        title="Edit Task"
      >
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-white dark:bg-[#101922] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 transform transition-all animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Edit Task
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Title</label>
                <input
                  name="title"
                  defaultValue={task.title}
                  required
                  placeholder="What needs to be done?"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#161f2b] border border-gray-200 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={task.description || ""}
                  placeholder="Add details about your task..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#161f2b] border border-gray-200 dark:border-gray-700/50 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all h-28 resize-none leading-relaxed"
                />
              </div>

              {/* Date & Priority Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={formattedDate}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#161f2b] border border-gray-200 dark:border-gray-700/50 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Priority</label>
                  <div className="relative">
                    <select
                      name="priority"
                      defaultValue={task.priority || "low"}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#161f2b] border border-gray-200 dark:border-gray-700/50 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <span className="material-symbols-outlined text-xl">expand_more</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent dark:border-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}