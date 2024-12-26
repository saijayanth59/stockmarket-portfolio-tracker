import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemeToggleButton from "@/components/theme-toggle-button";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "StockTracker",
  description: "Personalized stock market command center",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1.0"
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-poppins">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-right" reverseOrder={false} />
          <AuthProvider>{children}</AuthProvider>
          <ThemeToggleButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
