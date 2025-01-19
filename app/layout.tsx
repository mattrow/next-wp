import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from 'next/font/google';

import "./globals.css";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Main } from "@/components/craft";
import { mainMenu, contentMenu, socialLinks } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import Logo from "@/public/logo.svg";
import SiteLogo from "@/public/SiteLogo.webp";
import JessicaCarterWave from "@/public/JessicaCarterWave.webp";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Mail, Twitter, Youtube, Linkedin } from "lucide-react";
import Nav from "@/components/Nav";
import NavMobile from "@/components/NavMobile";
import { SocialIcon } from "@/components/Nav";
import {
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
  DiscordIcon,
  RedditIcon,
  MailIcon,
} from "@/components/Nav";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Best AI Girlfriends - Discover the Top AI Chat Sites and Apps",
  description:
    "Explore the best AI girlfriend sites and apps. Find reviews, rankings, and insights on the top virtual companions available.",
  metadataBase: new URL("https://www.bestaigirlfriends.com"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    noarchive: false,
    nosnippet: false,
  },
  alternates: {
    canonical: 'https://www.bestaigirlfriends.com'
  },
  openGraph: {
    title: "Best AI Girlfriends - Discover the Top AI Chat Sites and Apps",
    description:
      "Explore the best AI girlfriend sites and apps. Find reviews, rankings, and insights on the top virtual companions available.",
    url: "https://www.bestaigirlfriends.com",
    siteName: "Best AI Girlfriends",
    images: [
      {
        url: "https://aigirlfriendblog.com/wp-content/uploads/2025/01/websitethumb.jpg",
        width: 1200,
        height: 630,
        alt: "Best AI Girlfriends",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Girlfriends - Top Virtual Companions",
    description:
      "Discover and compare the best AI girlfriend apps and websites.",
    images: ["https://aigirlfriendblog.com/wp-content/uploads/2025/01/websitethumb.jpg"],
  },
};

// Revalidate content every hour
export const revalidate = 3600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased relative", inter.variable)}>
        {/* Modern gradient mesh background */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-gray-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_0%_0%,rgba(147,51,234,0.1),transparent_40%)]" />
        <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_100%_100%,rgba(79,70,229,0.1),transparent_40%)]" />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 z-50 sm:hidden bg-gray-900/60 backdrop-blur-xl border-b border-white/10">
            <NavMobile className="mx-4"/>
          </div>
          <div className="hidden sm:block">
            <Nav className="mx-4"/>
          </div>
          <Main className="mx-4">{children}</Main>
          <Footer/>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}


const Footer = () => {
  return (
    <footer className="relative mt-20 sm:px-0 px-4">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-purple-900/10 pointer-events-none" />
      
      {/* Main footer content */}
      <div className="relative border-t border-white/10 bg-gray-900/40 backdrop-blur-xl">
        <Section>
          <Container className="py-12">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Logo and Description */}
              <div className="col-span-1 md:col-span-2">
                <div className="relative group">
                  <Image
                    src={SiteLogo}
                    alt="Best AI Girlfriends"
                    width={300}
                    height={45}
                    className="mb-4 transition-all duration-300 group-hover:opacity-100 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                  Your trusted source for finding and reviewing the best AI companion experiences. 
                  We help you discover meaningful connections in the digital age.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {Object.entries(mainMenu).map(([key, href]) => (
                    <li key={key}>
                      <Link 
                        href={href}
                        className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 rounded-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors" />
                        {key}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Resources
                </h3>
                <ul className="space-y-2">
                  {Object.entries(contentMenu).map(([key, href]) => (
                    <li key={key}>
                      <Link 
                        href={href}
                        className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group capitalize"
                      >
                        <div className="w-1 h-1 rounded-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors" />
                        {key}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-8 border-t border-white/5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Social Links */}
                <div className="flex items-center space-x-3">
                  <SocialIcon
                    icon={TwitterIcon}
                    href={socialLinks.x}
                    label="Follow on X (Twitter)"
                  />
                  <SocialIcon
                    icon={YoutubeIcon}
                    href={socialLinks.youtube}
                    label="Subscribe on YouTube"
                  />
                  <SocialIcon
                    icon={LinkedinIcon}
                    href={socialLinks.linkedin}
                    label="Connect on LinkedIn"
                  />
                  <SocialIcon
                    icon={DiscordIcon}
                    href={socialLinks.discord}
                    label="Join our Discord"
                  />
                  <SocialIcon
                    icon={RedditIcon}
                    href={socialLinks.reddit}
                    label="Join our Subreddit"
                  />
                  <SocialIcon
                    icon={MailIcon}
                    href={socialLinks.email}
                    label="Send us an email"
                    isEmail
                  />
                </div>

                {/* Copyright */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-500">© 2025</span>
                  <Link 
                    href="/" 
                    className="group flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <Heart size={14} className="text-purple-400 group-hover:text-purple-300" />
                    <span className="text-gray-400 group-hover:text-purple-300">Best AI Girlfriends</span>
                  </Link>
                  <span className="text-gray-500">All rights reserved.</span>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </footer>
  );
};