import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Islamic Knowledge Platform",
  description: "Connect with scholars and explore Islamic knowledge",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <header className="border-b border-emerald-100 dark:border-emerald-900">
              <div className="container mx-auto py-4 px-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-600"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Islamic Knowledge
                  </h1>
                  <nav className="hidden md:flex gap-6">
                    <a href="#" className="text-emerald-600 hover:text-emerald-800">
                      Home
                    </a>
                    <a href="#" className="text-emerald-600 hover:text-emerald-800">
                      Scholars
                    </a>
                    <a href="#" className="text-emerald-600 hover:text-emerald-800">
                      Topics
                    </a>
                    <a href="#" className="text-emerald-600 hover:text-emerald-800">
                      About
                    </a>
                  </nav>
                </div>
              </div>
            </header>
            {children}
            <footer className="bg-emerald-50 dark:bg-emerald-900/20 py-6 border-t border-emerald-100 dark:border-emerald-900">
              <div className="container mx-auto px-4 text-center text-sm text-emerald-700 dark:text-emerald-300">
                <p>© 2023 Islamic Knowledge Platform. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'