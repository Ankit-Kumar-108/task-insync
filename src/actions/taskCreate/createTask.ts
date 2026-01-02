"use server"
import { auth } from "../../models/OAuth/auth"
import { db } from "../../models/DB/db"
import { revalidatePath } from "next/cache"

export default async function CreateTask(formData:FormData) {
    // checks if user is logged in or not 
    const session = await auth()
    if(!session?.user?.id) return

    const title = formData.get("title") as string
    const path = formData.get("path") as string
    const deadLineString = formData.get("deadLine") as string

    let deadLineDate: Date | null = null
    if(deadLineString && deadLineString !== "null"){
        deadLineDate = new Date(deadLineString)
    }

    await db.task.create({
        data:{
            title,
            description: "",
            deadline: deadLineDate,
            userId: session.user.id,
            isCompleted: false
        },
    })
    revalidatePath(path || "/")
    return{error: "error creating task"}
}