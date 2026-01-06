"use server"
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function deleteTask(taskId: string, currentPath: string) {
    const session = await auth()

    if (!session?.user) return

    try {
        await db.task.delete({
            where: { id: taskId }
        })
        revalidatePath(currentPath)
    } catch (error: any) {
        console.log("error deleting task:", error)
    }
}