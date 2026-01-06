"use client";

import { useOptimistic } from "react";
import calculateTimeLeft from "@/helpers/countdown/countDown";
import TaskCheckbox from "./TaskCheckbox";
import EditTaskModal from "../editTask/updateTask";
import DeleteTask from "../deleteTask/deletetask";
import AddTaskInput from "../createTask/addTask";

// Define Task interface matching Prisma model usage
interface Task {
    id: string;
    title: string;
    description: string | null;
    deadline: Date | null;
    isCompleted: boolean;
    userId: string;
    createdAt: Date;
    reminderSent: boolean;
    priority: string;
    isSent: boolean;
}

interface TasksContainerProps {
    initialTasks: Task[];
    title: string;
}

export default function TasksContainer({ initialTasks, title }: TasksContainerProps) {
    const [optimisticTasks, addOptimisticTask] = useOptimistic(
        initialTasks,
        (state, newTask: Task) => [newTask, ...state]
    );

    const handleOptimisticAdd = (task: Task) => {
        addOptimisticTask(task);
    };

    return (
        <>
            {/* Add Task Input with optimistic callback */}
            <AddTaskInput title={title} onOptimisticAdd={handleOptimisticAdd} />

            {/* Task List */}
            <div className="flex flex-col gap-3">
                {optimisticTasks.length > 0 ? (
                    optimisticTasks.map((task) => {
                        // Calculate time left for THIS specific task
                        const timeLeft = calculateTimeLeft(task.deadline);
                        const isOverdue =
                            task.deadline &&
                            new Date(task.deadline) < new Date() &&
                            !task.isCompleted;
                        return (
                            <div
                                key={task.id}
                                className={`group flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-[#e2e8f0] dark:border-[#283039] bg-white dark:bg-[#1c2127] p-4 shadow-sm ${isOverdue
                                    ? "hover:border-red-500/50 transition-all cursor-pointer"
                                    : "hover:border-[#2b8cee]/50 transition-all cursor-pointer"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Checkbox */}
                                    <TaskCheckbox
                                        title={title}
                                        taskId={task.id}
                                        taskIsCompleted={task.isCompleted}
                                    />

                                    <div className="flex flex-col gap-1">
                                        {/* Title */}
                                        <span
                                            className={`text-base font-medium ${task.isCompleted
                                                ? "text-gray-500 line-through"
                                                : "text-slate-900 dark:text-white"
                                                }`}
                                        >
                                            {task.title}
                                        </span>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            {/* SHOW THE COUNTDOWN BADGE */}
                                            {timeLeft && !task.isCompleted && (
                                                <span
                                                    className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${timeLeft.color} ${timeLeft.bg}`}
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        timer
                                                    </span>
                                                    {timeLeft.text}
                                                </span>
                                            )}

                                            {/* Standard Date Display */}
                                            {task.deadline && (
                                                <span className="flex items-center gap-1 text-xs text-[#64748b] dark:text-[#9dabb9]">
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        calendar_today
                                                    </span>
                                                    {new Date(task.deadline).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-3 sm:mt-0 flex items-center justify-end gap-2 opacity-100 sm:opacity-100 sm:group-hover:opacity-100 transition-opacity">
                                    <EditTaskModal task={task} />
                                    <DeleteTask title={title} task_Id={task.id} />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-30">
                            inbox
                        </span>
                        <p>No tasks found in {title}.</p>
                    </div>
                )}
            </div>
        </>
    );
}
