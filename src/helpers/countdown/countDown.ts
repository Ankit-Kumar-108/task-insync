
export default function calculateTimeLeft(deadlineString: Date | null) {
      if (!deadlineString) return null;
    
        const deadline = new Date(deadlineString).getTime();
        const now = new Date().getTime();
        const diff = deadline - now;
    
        // If time is negative, it's overdue
        if (diff < 0) {
            return { text: "Expired", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/20" };
        }
    
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
        if (days > 0) {
            return { text: `${days} days left`, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/20" };
        } else {
            return { text: `${hours}h left`, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/20" };
        }
}