import { LucideIcon } from "lucide-react";
import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ButtonDefaultProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "prefix" | "suffix"
> {
  children: React.ReactNode;
  prefix?: LucideIcon;
  suffix?: LucideIcon;
  wFull?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  loadingText?: string;
}

export const ButtonDefault = ({
  children,
  type,
  prefix: Prefix,
  suffix: Suffix,
  wFull,
  className,
  isLoading,
  loadingText,
  ...props
}: ButtonDefaultProps) => {
  return (
    <button
      type={type}
      {...props}
      className={`${wFull ? "w-full" : "w-fit"} ${className} bg-emerald-600 h-11 px-4 flex items-center justify-center gap-3 rounded-full text-white cursor-pointer hover:bg-emerald-700 duration-300`}
    >
      {isLoading ? (
        <div className="flex items-center gap-3">
          {loadingText && loadingText}
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {Prefix && <Prefix aria-hidden="true" className="h-5 w-5" />}

          {children}

          {Suffix && <Suffix aria-hidden="true" className="h-5 w-5" />}
        </>
      )}
    </button>
  );
};