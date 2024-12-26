import { Github, Twitter } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full py-8">
      <div className="w-full px-0">
        <Separator className="mb-8" />
        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
