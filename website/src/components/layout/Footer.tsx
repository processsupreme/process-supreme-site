import Link from "next/link";
import { Wordmark } from "./Header";

/**
 * Footer as a status bar: links as mono commands, the sign-off as a log
 * line.
 */

const commands = [
  { name: "what we automate", href: "/engines" },
  { name: "proof", href: "/proof" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-well font-mono text-tele">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="py-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
          <Wordmark />
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {commands.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="text-dim hover:text-amber transition-colors"
              >
                <span className="text-steel-deep">&gt;</span> {c.name}
              </Link>
            ))}
          </nav>
          <p className="text-mute">
            cut the fat out of how your business runs.
          </p>
        </div>
        <div className="py-5 border-t border-line flex flex-wrap items-center justify-between gap-4 text-tele-sm uppercase">
          <span className="text-dim">
            © {new Date().getFullYear()} Process Supreme LLC
          </span>
          <span className="text-amber normal-case">PS, we love you</span>
        </div>
      </div>
    </footer>
  );
}
