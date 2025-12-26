import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GitProfileAi",
  description: "AI-powered GitHub profile analyzer with tech stack insights, project health scoring, and PDF export features.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png?v=3" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png?v=3" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" sizes="180x180" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png?v=3" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png?v=3" />
        
        <meta name="keywords" content="GitHub, AI, Analyzer, Profile, Repository, Tech Stack, Developer Tools" />
        <meta name="author" content="gitprofileAi Team" />
        
        <meta property="og:title" content="GitProfileAi - AI GitHub Profile Analyzer" />
        <meta property="og:description" content="Analyze any GitHub profile with AI. Get tech stack insights and project health scores." />
        <meta property="og:url" content="https://gitprofileai.vercel.app" />
        <meta property="og:type" content="website" />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased md:ml-56 pt-14 md:pt-0`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}