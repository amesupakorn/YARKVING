import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  pulsing?: boolean;
}

export function Badge({ className, pulsing = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        "bg-tertiary-container text-on-tertiary-container",
        pulsing && "animate-pulse",
        className
      )}
      {...props}
    >
      {pulsing && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
        </span>
      )}
      {children}
    </span>
  );
}
