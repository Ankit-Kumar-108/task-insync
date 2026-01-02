"use server"
import { db } from "@/models/DB/db";
import { auth } from "@/models/OAuth/auth";

export async function taskStat() {
    const session = await auth()
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    if (!session?.user?.email || "") {
        return {
            completed: 0,
            pending: 0,
            overdue: 0,
            upcoming: 0,
            today: 0
        }
    }

    try {
        const user = await db.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return {
                completed: 0,
                pending: 0,
                overdue: 0,
                today: 0,
                upcoming:0
            }
        }

        const completed = await db.task.count({
            where: {
                userId: user.id,
                isCompleted: true
            }
        })

        const pending = await db.task.count({
            where: {
                userId: user.id,
                isCompleted: false
            }
        })

        const overdue = await db.task.count({
            where: {
                userId: user.id,
                isCompleted: false,
                deadline: {
                    lt: new Date()
                }
            }
        })

        const today = await db.task.count({
            where: {
                userId: user.id,
                isCompleted: false,
                deadline: {
                    gte: startOfToday,
                    lt: startOfTomorrow
                }
            },
        });


        const upcoming = await db.task.count({
            where: {
                userId: user.id,
                isCompleted: false,
                deadline: {
                    gte: startOfTomorrow
                }
            },
        });

        return { completed, pending, overdue, upcoming, today }

    } catch (error) {
        console.log("Error findind Task Stats: ", error)
        return {
            completed: 0,
            pending: 0,
            overdue: 0,
            today: 0,
            upcoming: 0,
        }
    }
}