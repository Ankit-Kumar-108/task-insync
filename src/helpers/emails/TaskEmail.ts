"use server";
import { Resend } from "resend";
import { auth } from "@/models/OAuth/auth";
import TaskEmail from "@/components/emails/TaskEmail";

// Initialize Resend with your key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTaskNotification(taskTitle: string, deadline: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "User not found" };
  }

  try {
    const { data, error } = await resend.emails.send({
      // ⚠️ IMPORTANT: Use 'onboarding@resend.dev' until you verify your own domain
      from: 'Task-InSync <onboarding@resend.dev>',
      to: [session.user.email], // Can only send to YOURSELF during free tier testing
      subject: `Task Created: ${taskTitle}`,
      react: TaskEmail({ 
        userName: session.user.name || "User", 
        taskTitle, 
        deadline 
      }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: error.message };
    }

    return { success: true, data };

  } catch (error) {
    console.error("Email sending failed:", error);
    return { error: "Failed to send email" };
  }
}