import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="hidden md:block border-b border-gray-200">
      {/* Top bar */}
      <div className="flex items-center justify-end px-4 py-2 text-sm">
        <ThemeToggle />
        <button className="p-2">
          <Search className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-4">
          {/* <Button variant="outline">LOG IN</Button> */}
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-1">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <div>Wednesday, December 25, 2024</div>
          </div>
          <Link href="/" className="mx-auto">
            <h1 className="font-serif text-5xl font-bold tracking-tight">
              Pokemon Unite 速報
            </h1>
          </Link>
          <div className="w-40" /> {/* Spacer for alignment */}
        </div>
      </div>
    </header>
  );
}
