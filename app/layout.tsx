import Analytics from "./analytics";
import "./globals.css";

export const metadata = { title: "Launchpad starter", description: "A Next.js app with Postgres and bot protection, deployed by Launchpad." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}
