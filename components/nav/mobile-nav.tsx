"use client";

// React and Next Imports
import * as React from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Handle scrollbar width
  React.useEffect(() => {
    if (open) {
      // Get scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--removed-body-scroll-bar-size', `${scrollbarWidth}px`);
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }, [open]);

  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[300px] fixed inset-y-0 right-0 h-full bg-gray-900/40 backdrop-blur-2xl border-l border-white/10 shadow-2xl"
      >
        <nav className="flex flex-col gap-4 mt-8">
          <button
            onClick={() => handleNavigation('/best-ai-girlfriends-2025')}
            className="text-left text-lg font-medium text-white hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20"
          >
            Best AI Girlfriends 2025
          </button>
          <button
            onClick={() => handleNavigation('/reviews')}
            className="text-left text-lg font-medium text-white hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20"
          >
            Reviews
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
