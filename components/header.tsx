import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const getCurrentFormattedDate = (): string => {
  const now = new Date();

  // 曜日の名前の配列
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // 月の名前の配列
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 曜日、月、日、年を取得
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();

  // フォーマットした文字列を返す
  return `${dayOfWeek}, ${month} ${day}, ${year}`;
};

export default function Header() {
  return (
    <header className="hidden md:block border-b border-gray-200">
      {/* Top bar */}
      <div className="flex items-center justify-end px-4 py-2 text-sm">
        <ThemeToggle />
        <button className="p-2">{/* <Search className="h-5 w-5" /> */}</button>

        <div className="flex items-center space-x-4">
          {/* <Button variant="outline">LOG IN</Button> */}
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-1">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <div>{getCurrentFormattedDate()}</div>
          </div>
          <Link href="/" className="mx-auto">
            <h1 className="font-serif text-5xl font-bold tracking-tight">
              Pokemon Unite 速報
            </h1>
          </Link>
          <div className="w-40" /> {/* Spacer for alignment */}
        </div>
      </div>
      {/* Navigation */}
      {/* <nav className="border-t border-gray-200">
        <ul className="flex items-center justify-center space-x-6 px-4 py-2 text-sm">
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
              <Link href="#" className="flex items-center py-2 hover:underline">
                {item}
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}
    </header>
  );
}
