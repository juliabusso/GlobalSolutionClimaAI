"use client";

import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ isLoading, children, className = "", disabled, ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-md px-4 py-2";
  const enabledStyles = "bg-[#2A597D] text-white hover:bg-[#244d6a]";
  const finalClassName = `${baseStyles} ${enabledStyles} ${className}`;

  return (
    <button className={finalClassName} disabled={disabled || isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
