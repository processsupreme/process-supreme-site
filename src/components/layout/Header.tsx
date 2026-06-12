"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Header as cockpit chrome: a thin instrument bar. The wordmark is the
 * brand terminal lockup rendered live in the deck palette.
 */

const navigation = [
  { name: "engines", href: "/engines" },
  { name: "proof", href: "/proof" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
];

export function Wordmark() {
  return (
    <span className="font-mono text-tele whitespace-nowrap">
      <span className="text-steel">run </span>
      <span className="text-amber">process</span>
      <span className="text-fg">_supreme</span>
    </span>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-deck/95 backdrop-blur-sm border-b border-line">
      <nav className="max-w-container mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
        <Link href="/" aria-label="Process Supreme home" className="flex items-center gap-3">
          <span className="w-[7px] h-[7px] rounded-full bg-amber" aria-hidden />
          <Wordmark />
        </Link>

        {/* Desktop nav: mono commands */}
        <div className="hidden md:flex items-center gap-7 font-mono text-tele">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-mute hover:text-amber transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            data-tracking="header-cta"
            className="border border-line rounded-hard px-4 py-2 text-amber hover:border-amber hover:bg-panel transition-colors"
          >
            &gt; book_demo
          </Link>
        </div>

        {/* Mobile menu control */}
        <button
          type="button"
          className="md:hidden p-2 text-fg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-line bg-deck"
          >
            <div className="px-6 py-5 space-y-4 font-mono text-tele">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-mute hover:text-amber transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  &gt; {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-amber"
                onClick={() => setMobileMenuOpen(false)}
                data-tracking="mobile-header-cta"
              >
                &gt; book_demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
