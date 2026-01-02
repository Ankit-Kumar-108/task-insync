"use server"
import { db } from "@/models/DB/db";
import { auth } from "@/models/OAuth/auth";
import { revalidatePath } from "next/cache";

export default async function deleteTask(taskId: string, currentPath:string) {
    const session = await auth()

    if(!session?.user) return

    try {
        await db.task.delete({
            where: {id: taskId}
        })
        revalidatePath(currentPath)
    } catch (error:any) {
        console.log("error deleting task:", error)
    }
}