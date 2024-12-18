import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

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



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Best AI Girlfriends",
  description: "Discover the best AI Girlfriend sites.",
  metadataBase: new URL("https://yourdomain.com"),
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
      
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 z-50 sm:hidden">
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
    <footer className="bg-gray-900/20 border-t border-gray-800 px-4 mt-20">
      <Section>
        <Container className="py-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <Image
                src={SiteLogo}
                alt="Best AI Girlfriends"
                width={300}
                height={45}
                className="mb-4 opacity-70 hover:opacity-100 transition-opacity filter grayscale"
              />
              <p className="text-gray-400 max-w-md">
                Your trusted source for finding and reviewing the best AI companion experiences. 
                We help you discover meaningful connections in the digital age.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-purple-500 font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {Object.entries(mainMenu).map(([key, href]) => (
                  <li key={key}>
                    <Link 
                      href={href}
                      className="text-gray-400 hover:text-purple-500 transition-colors"
                    >
                      {key}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-purple-500 font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {Object.entries(contentMenu).map(([key, href]) => (
                  <li key={key}>
                    <Link 
                      href={href}
                      className="text-gray-400 hover:text-purple-500 transition-colors capitalize"
                    >
                      {key}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
                />
              </div>

              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400">
                <span>© 2024</span>
                <Link href="/" className="hover:text-purple-500 transition-colors flex items-center gap-1">
                  <Heart size={16} className="text-purple-500" />
                  Best AI Girlfriends
                </Link>
                <span>All rights reserved.</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
};