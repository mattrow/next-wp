// components/NavMobile.tsx
"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Import your images
import SiteLogo from "@/public/SiteLogo.webp";
import { MobileNav } from "./nav/mobile-nav";

type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-background",
        "fade-in",
        className
      )}
      id={id}
    >
      <div id="nav-container" className="mx-auto max-w-6xl py-6">
        {/* Main container with 3 columns */}
        <div className="flex flex-row justify-between items-stretch">
          {/* Left Column - Left aligned content */}
          <div className="flex flex-col justify-center items-start flex-[2]">
            <Link
              className="hover:opacity-75 transition-all flex gap-2 items-center"
              href="/"
            >
              <Heart
                className="sm:w-10 sm:h-10 w-6 h-6 text-purple-500 flex-shrink-0"
                fill="currentColor"
                stroke="currentColor"
              />
              <Image
                src={SiteLogo}
                alt="Best AI Girlfriends"
                width={400}
                height={40}
                className="h-auto w-[250px] sm:w-[400px]"
              />
            </Link>
          </div>

          {/* Right Column - Aligned to left and centered */}
          <div className="flex items-center justify-end flex-1">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;