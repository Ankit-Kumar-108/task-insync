"use server"
import { db } from "@/models/DB/db";
import { auth } from "@/models/OAuth/auth";


export default async function GetTask(filter: string) {
    try {
        const session = await auth()
        if(!session?.user?.id || !session?.user?.email) return

        const user = await db.user.findUnique({
            where: { email: session.user.email },
        })

        const now = new Date()
        const startOfDay = new Date(now.setHours(0,0,0,0))
        const endOfDay = new Date(now.setHours(23,59,59,999))

        let whereClause: any = {
            userId: user?.id
        }

       switch (filter.toLowerCase()) {
      case "today":
        whereClause.deadline = {  
          gte: startOfDay,
          lte: endOfDay,
        };
        whereClause.isCompleted = false;
        break;

      case "upcoming":
        whereClause.deadline = {
          gt: endOfDay,
        };
        whereClause.isCompleted = false;
        break;

      case "completed":
        whereClause.isCompleted = true;
        break;

      case "inbox":
      default:
        // Inbox = All tasks that are NOT completed
        whereClause.isCompleted = false;
        break;
    }

    // 5. Fetch Tasks
    const tasks = await db.task.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks;

  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}