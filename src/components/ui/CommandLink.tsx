import Link from "next/link";

/**
 * The command-prompt CTA chip, glass-treated. One component so every
 * page's $ prompt looks identical.
 */
export function CommandLink({
  href,
  children,
  tracking,
  cursor = true,
}: {
  href: string;
  children: React.ReactNode;
  tracking?: string;
  cursor?: boolean;
}) {
  return (
    <Link
      href={href}
      data-tracking={tracking}
      className="group inline-flex items-center gap-3 glass rounded-inset px-6 py-3.5 font-mono text-tele hover:!border-amber transition-colors"
    >
      <span className="text-amber">$</span>
      <span className="text-fg group-hover:text-amber transition-colors">{children}</span>
      {cursor && (
        <span className="cursor-blink inline-block w-[8px] h-[15px] bg-amber" aria-hidden />
      )}
    </Link>
  );
}
