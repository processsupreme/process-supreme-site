import { CommandLink } from "@/components/ui/CommandLink";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="max-w-container mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-[34rem] mx-auto text-center">
          <p className="font-mono text-tele text-dim mb-4">
            <span className="text-alert">404</span> · page not found
          </p>
          <h1 className="font-display text-section text-fg mb-4">
            Nothing here.
          </h1>
          <p className="font-mono text-tele text-mute mb-9">
            the page you are looking for does not exist or has been moved.
          </p>
          <CommandLink href="/" cursor={false}>back to home</CommandLink>
        </div>
      </div>
    </section>
  );
}
