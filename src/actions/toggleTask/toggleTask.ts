"use server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function toggleTask(taskId: string, isCompleted: boolean, currentPath: string) {
    const session = await auth()

    if (!session?.user) return

    try {
        await db.task.update({
            where: { id: taskId },
            data: { isCompleted: !isCompleted }
        })

        revalidatePath(currentPath)
    } catch (error: any) {
        console.log("Error toggling Task", error)
    }
}