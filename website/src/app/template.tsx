/**
 * Route transition: a 150ms fade-through-deck on navigation with a
 * one-line mono flicker in the corner. Pure CSS so it starts at first
 * paint and never waits on hydration; never blocks interaction.
 * Reduced motion zeroes both animations via the global override.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="route-fade">
      {children}
      <span
        className="route-flicker fixed bottom-3 right-4 z-50 font-mono text-tele-sm text-steel pointer-events-none"
        aria-hidden
      >
        loading ›
      </span>
    </div>
  );
}
