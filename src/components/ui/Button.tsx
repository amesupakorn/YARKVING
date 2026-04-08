import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-variant disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-on-primary hover:bg-opacity-90 bg-gradient-to-br from-primary to-primary-container shadow-sm": variant === "primary",
          "bg-secondary-container text-on-secondary-container hover:bg-opacity-80": variant === "secondary",
          "hover:bg-surface-container-high text-on-surface": variant === "ghost",
        },
        className
      )}
      {...props}
    />
  );
}
