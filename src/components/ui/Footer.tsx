import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-10 mt-auto border-t border-outline-variant/20 bg-surface-container-low text-on-surface-variant font-sans">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-medium">
          © {new Date().getFullYear()} YARKVING. All rights reserved.
        </p>
        <p className="flex items-center gap-2">
          ติดต่อเรา: 
          <a
            href="mailto:supakorn642@gmail.com" 
            className="text-primary font-bold hover:underline transition-all"
          >
            supakorn642@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
