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
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#E5EBF2] flex justify-center items-stretch antialiased text-right"
    >
      <div
        className={cn(
          "w-full max-w-[430px] min-h-screen bg-white flex flex-col shadow-2xl relative overflow-x-hidden border-x border-border/40 text-right",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
