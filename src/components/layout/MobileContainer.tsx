import type { FC, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export const MobileContainer: FC<MobileContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex justify-center items-stretch antialiased">
      <div
        className={cn(
          "w-full max-w-107.5 min-h-screen bg-white flex flex-col shadow-2xl relative overflow-x-hidden border-x border-border/40",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
