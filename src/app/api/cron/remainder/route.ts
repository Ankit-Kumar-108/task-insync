import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";
import ReminderEmail from "@/components/emails/RemainderEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const isLocal = process.env.NODE_ENV === 'development';
  const authHeader = request.headers.get('authorization');

  if (!isLocal && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const now = new Date();

    // 2. Find tasks that are OVERDUE and haven't been emailed yet
    const overdueTasks = await db.task.findMany({
      where: {
        deadline: { lte: now },
        isCompleted: false,
        isSent: false,          // 👈 CHANGED from reminderSent
        user: { email: { not: null } }
      },
      include: { user: true }
    });

    if (overdueTasks.length === 0) {
      return NextResponse.json({ message: "No overdue tasks found" });
    }

    for (const task of overdueTasks) {
      if (!task.user.email) continue;

      await resend.emails.send({
        from: 'Task-InSync <onboarding@resend.dev>',
        to: [task.user.email],
        subject: `⚠️ OVERDUE: ${task.title}`,
        react: ReminderEmail({
          userName: task.user.name || "User",
          taskTitle: task.title,
          deadline: task.deadline?.toDateString()
        })
      });

      // 4. Update DB using isSent
      await db.task.update({
        where: { id: task.id },
        data: { isSent: true } // 👈 CHANGED from reminderSent
      });
    }

    return NextResponse.json({ success: true, count: overdueTasks.length });

  } catch (error) {
    console.error("Cron Error:", error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}