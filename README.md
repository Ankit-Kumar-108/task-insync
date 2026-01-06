# Task-InSync ⚡
> A modern, high-performance task management application designed for speed and focus.

![Task-InSync Banner](/public/lolo.png)

## 🚀 Overview

**Task-InSync** is built to eliminate friction in your daily planning. Leveraging **Next.js 16** and **Server Actions**, it delivers an instant, app-like experience on the web.

Key highlights include **Optimistic UI** for zero-latency interactions, a dedicated **Focus Mode** (Pomodoro), and a seamless **Dark/Light theme** system.

## ✨ Key Features

- **⚡ Optimistic UI**: Tasks appear instantly when added. No loading spinners, no waiting. The interface updates immediately while the server syncs in the background.
- **🌗 Smart Theme System**: Fully responsive Dark & Light modes.
  - *Light Mode*: Clean, white aesthetics with high-contrast typography.
  - *Dark Mode*: Deep, immersive slate/gray tones for comfortable night usage.
- **🧘 Focus Mode**: Integrated Pomodoro timer.
  - Click the "Focus" icon on any task to enter a distraction-free 30-minute session.
  - Visual countdown and controls.
- **📅 Smart Date Logic**:
  - Automatically sorts tasks into **Today**, **Upcoming**, and **Overdue**.
  - Intelligent date resetting (defaults to 'Tomorrow' when adding to Upcoming).
- **🔒 Secure Authentication**: Powered by **Auth.js** (formerly NextAuth) with Google and GitHub providers.
- **📧 Email Notifications**: Automated transactional emails using **Resend**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: MongoDB (via [Prisma ORM](https://www.prisma.io/))
- **Auth**: [Auth.js](https://authjs.dev/)
- **Icons**: Material Symbols & Lucide React
- **Email**: React Email & Resend

## 📂 Project Structure

```bash
src/
├── actions/        # Server Actions (Mutations)
├── app/            # Next.js App Router Pages
├── components/     # React Components
│   ├── focus/      # Focus Mode Logic
│   ├── ThemeToggle # Dark Mode Switcher
│   ├── SideBars/   # Navigation Components
│   └── ...
├── lib/            # Utilities & DB Client
└── helpers/        # Helper Functions
```

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/task-insync.git
    cd task-insync
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file and add your credentials:
    ```env
    DATABASE_URL="..."
    AUTH_SECRET="..."
    AUTH_GOOGLE_ID="..."
    AUTH_GOOGLE_SECRET="..."
    AUTH_GITHUB_ID="..."
    AUTH_GITHUB_SECRET="..."
    RESEND_API_KEY="..."
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
