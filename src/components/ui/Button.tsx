"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "command";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  "data-tracking"?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  // Filled amber: the one loud control on the deck
  primary:
    "bg-amber text-deck font-medium hover:bg-amber-bright focus-visible:ring-2 focus-visible:ring-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-deck transition-colors",
  // Hairline instrument switch
  secondary:
    "border border-line-bright text-fg font-medium hover:border-amber hover:text-amber transition-colors",
  // Bare mono link
  ghost:
    "font-mono text-tele text-mute hover:text-amber underline-offset-4 hover:underline transition-colors",
  // Prompt-styled command chip
  command:
    "font-mono text-tele border border-line bg-panel text-amber hover:border-amber hover:bg-panel-up transition-colors",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    className,
    children,
    "data-tracking": dataTracking,
    ...props
  },
  ref
) {
  const baseStyles =
    variant === "ghost"
      ? "inline-flex items-center transition-all"
      : "inline-flex items-center justify-center px-6 py-3 rounded-hard transition-all";

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={combinedClassName}
        data-tracking={dataTracking}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonAsButton;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(combinedClassName, disabled && "opacity-50 cursor-not-allowed")}
      data-tracking={dataTracking}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  );
});
