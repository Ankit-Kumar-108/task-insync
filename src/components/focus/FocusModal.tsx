"use client";

import { useEffect, useState } from "react";

interface FocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskTitle: string;
}

export default function FocusModal({ isOpen, onClose, taskTitle }: FocusModalProps) {
    // 30 minutes in seconds
    const INITIAL_TIME = 30 * 60;
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optional: Play sound here
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Reset timer when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeLeft(INITIAL_TIME);
            setIsActive(false);
        }
    }, [isOpen]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(INITIAL_TIME);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white dark:bg-[#1c2127] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 p-8 flex flex-col items-center">

                {/* Header */}
                <div className="w-full flex justify-between items-start mb-8">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-blue-500 uppercase tracking-wider">Focus Mode</span>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">{taskTitle}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Timer Display */}
                <div className="relative mb-10">
                    <div className="text-8xl font-black tabular-nums tracking-tight text-slate-900 dark:text-white">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 w-full">
                    <button
                        onClick={toggleTimer}
                        className={`flex-1 h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isActive
                                ? "bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20"
                                : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20"
                            }`}
                    >
                        <span className="material-symbols-outlined fill-current">
                            {isActive ? "pause" : "play_arrow"}
                        </span>
                        {isActive ? "Pause Focus" : "Start Focus"}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="h-14 w-14 rounded-xl flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                        title="Reset Timer"
                    >
                        <span className="material-symbols-outlined">replay</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        Stay focused. Take a break when the timer rings.
                    </p>
                </div>
            </div>
        </div>
    );
}
