// components/Nav.tsx
"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mainMenu } from "@/menu.config";
import { cn } from "@/lib/utils";

// Import your images
import SiteLogo from "@/public/SiteLogo.webp";
import JessicaCarterWave from "@/public/JessicaCarterWave.webp";

type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        "bg-background",
        "fade-in",
        className
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="mx-auto max-w-6xl p-6 sm:p-8"
      >
        {/* Main container with 3 columns */}
        <div className="flex flex-row justify-between items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-2">
            <Link
              className="hover:opacity-75 transition-all flex gap-2 items-center"
              href="/"
            >
              <Heart
                className="w-10 h-10 text-purple-500"
                fill="currentColor"
                stroke="currentColor"
              />
              <Image
                src={SiteLogo}
                alt="Best AI Girlfriends"
                width={400}
                height={40}
                className="h-auto"
              />
            </Link>
            {/* Search bar */}
            <div>
              <input
                type="text"
                placeholder="Search the site..."
                className="p-2 border rounded-md w-full"
              />
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col items-end">
            {/* Speech bubble */}
            <div className="speech-bubble mb-2">
              <p>I find the best AI Girlfriend sites for you</p>
            </div>
            {/* Navigation buttons */}
            <div className="flex space-x-4">
              {Object.entries(mainMenu).map(([key, href]) => (
                <Button key={href} asChild variant="ghost" size="sm">
                  <Link href={href}>{key}</Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex items-center">
            <Image
              src={JessicaCarterWave}
              alt="Character Waving"
              width={200} // Adjust size as needed
              height={200}
              className="h-auto"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;