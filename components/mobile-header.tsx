"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MobileHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="block md:hidden border-b border-gray-200">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%]">
            <SheetHeader>
              <SheetTitle className="text-left">
                <div className="font-serif text-2xl">Pokemon Unite 速報</div>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8">
              <ul className="space-y-4">
                {[
                  "U.S.",
                  "World",
                  "Business",
                  "Arts",
                  "Lifestyle",
                  "Opinion",
                  "Audio",
                  "Games",
                  "Cooking",
                  "Wirecutter",
                  "The Athletic",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="flex items-center justify-between py-2 hover:bg-gray-100 px-2"
                    >
                      {item}
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="font-serif text-xl font-bold tracking-tight">
          Pokemon Unite 速報
        </Link>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <div className="flex items-center space-x-2">
            {!isSearchOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-6 w-6" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Search bar */}
      {isSearchOpen && (
        <div className="flex items-center border-t border-gray-200 px-4 py-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="SEARCH"
            className="flex-1 border-0 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close search</span>
          </Button>
        </div>
      )}

      {/* Date */}
      <div className="border-t border-gray-200 px-4 py-2 text-xs">
        Wednesday, December 25, 2024
      </div>
    </header>
  );
}
