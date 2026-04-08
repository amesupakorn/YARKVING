import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export function Card({ className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface-container-lowest transition-colors duration-300",
        // The tonal layering. Lowest layered on top of Low (background)
        elevated ? "shadow-ambient" : "",
        "hover:bg-surface-bright",
        className
      )}
      {...props}
    />
  );
}
