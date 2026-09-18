import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aadhi Code",
  description: "Technology company based in Baluwatar, Kathmandu, Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", gap: "1rem", zIndex: 1000, alignItems: "center" }}>
              <a href="/admin/dashboard" style={{ color: "var(--text-main)", textDecoration: "none", fontSize: "0.9rem", fontWeight: "bold" }}>
                🔒 Admin
              </a>
              <ThemeToggle />
            </div>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
