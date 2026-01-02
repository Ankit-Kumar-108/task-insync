"use server";
import { db } from "@/models/DB/db"; // Check your import path!
import { auth } from "@/models/OAuth/auth";
import { revalidatePath } from "next/cache";

export async function updateTask(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: "Not authenticated" };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return { error: "User not found" };

    const taskId = formData.get("taskId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const priority = formData.get("priority") as string;

    if (!taskId) return { error: "Task ID missing" };

    await db.task.update({
      where: {
        id: taskId,
        userId: user.id, // Security check
      },
      data: {
        title,
        description,
        deadline: date ? new Date(date) : null, // Handle clearing date
        priority: priority || "Low",
        // updatedAt is handled automatically by Prisma
      },
    });

    // Refresh all views
    revalidatePath("/");
    revalidatePath("/today");
    revalidatePath("/upcoming");
    revalidatePath("/completed");
    revalidatePath("/inbox");

    return { success: true };

  } catch (error) {
    console.error("Update Error:", error);
    return { error: "Failed to update task" };
  }
}