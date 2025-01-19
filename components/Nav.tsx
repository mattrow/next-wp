// components/Nav.tsx
"use client";

import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mainMenu, socialLinks } from "@/menu.config";
import { cn } from "@/lib/utils";

// Import your images
import SiteLogo from "@/public/SiteLogo.webp";
import JessicaCarterWave from "@/public/JessWaveCropped.png";

type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

// Update the SocialIcon interface to include className
export interface SocialIconProps {
  icon: React.ElementType;
  href: string;
  label: string;
  isEmail?: boolean;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, href, label, isEmail, className }) => {
  return (
    <Link
      href={isEmail ? `mailto:${href}` : href}
      target={isEmail ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800/30 backdrop-blur-sm border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300",
        className
      )}
      aria-label={label}
    >
      <Icon
        className="w-5 h-5 text-white/70 hover:text-white transition-colors"
        strokeWidth={0}
        fill="currentColor"
      />
    </Link>
  );
};

export const DiscordIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="22" 
    height="22" 
    fill="currentColor" 
    viewBox="0 0 16 16"
  >
    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
  </svg>
);

export const RedditIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="22" 
    height="22" 
    fill="currentColor" 
    viewBox="0 0 16 16"
  >
    <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z"/>
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165"/>
  </svg>
);

export const TwitterIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    fill="currentColor" 
    viewBox="0 0 16 16"
  >
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
  </svg>
);

export const YoutubeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="22" 
    height="22" 
    fill="currentColor" 
    viewBox="0 0 16 16"
  >
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
  </svg>
);

export const LinkedinIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    fill="currentColor" 
    viewBox="0 0 16 16"
  >
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
  </svg>
);

export const MailIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    fill="currentColor" 
    viewBox="0 0 16 16"
  >
    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
  </svg>
);

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        "fade-in",
        className
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="mx-auto max-w-6xl"
      >
        {/* Main container with 3 columns */}
        <div className="flex flex-row justify-between items-stretch">
          {/* Left Column - Left aligned content */}
          <div className="flex flex-col justify-center items-start flex-[2] py-4">
            <Link
              className="hover:opacity-75 transition-all flex gap-2 items-center"
              href="/"
            >
              <Heart
                className="w-10 h-10 text-purple-500 flex-shrink-0"
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
            {/* Search bar with modern styling */}
            <div className="relative mt-2 w-full max-w-md">
              <input
                type="text"
                placeholder="Search AI Girlfriends..."
                className="p-2 pl-3 pr-10 w-full rounded-xl bg-gray-900/40 backdrop-blur-2xl border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300"
              />
              <Search 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500/70 hover:text-purple-500 transition-colors" 
                strokeWidth={2}
              />
            </div>
          </div>

          {/* Middle Column - Adjusted margins */}
          <div className="flex flex-col justify-center items-end flex-1">
            {/* Speech bubble */}
            <div className="speech-bubble font-semibold mb-2">
              <p>I&apos;m Jess! My mission is to find the best AI Girlfriends of 2025.</p>
            </div>
            {/* Social Icons with updated styling */}
            <div className="flex space-x-3">
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
                isEmail={true}
              />
            </div>
          </div>

          {/* Right Column - Aligned to left and centered */}
          <div className="flex items-center justify-center flex-1">
            <Image
              src={JessicaCarterWave}
              alt="Character Waving"
              width={200}
              height={200}
              className="h-auto pt-2"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;