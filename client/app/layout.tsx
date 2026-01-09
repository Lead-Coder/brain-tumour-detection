import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProviderWithContext } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeuroDetect - Brain Tumor Detection AI",
  description: "Advanced AI-powered brain tumor detection system for medical professionals",
  keywords: "brain tumor detection, MRI analysis, AI medical imaging, tumor classification",
  openGraph: {
    title: "NeuroDetect - Brain Tumor Detection AI",
    description: "Advanced AI-powered brain tumor detection system",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProviderWithContext>{children}</ThemeProviderWithContext>
        <Analytics />
      </body>
    </html>
  )
}
