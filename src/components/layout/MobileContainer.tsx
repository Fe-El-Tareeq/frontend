import type { FC, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface MobileContainerProps {
  children: ReactNode;
  className?: string;
  hasSidebar?: boolean;
}

export const MobileContainer: FC<MobileContainerProps> = ({
  children,
  className,
  hasSidebar = true,
}) => {
  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#E5EBF2] md:bg-[#F8FAFC] lg:bg-[#F8FAFC] dark:bg-[#071322] md:dark:bg-[#0B1E36] lg:dark:bg-[#0B1E36] flex justify-center md:justify-start items-stretch antialiased text-right transition-colors duration-200"
    >
      <div
        className={cn(
          "w-full max-w-107.5 md:max-w-none min-h-screen bg-white md:bg-[#F8FAFC] lg:bg-[#F8FAFC] dark:bg-[#0B1E36] text-slate-900 dark:text-slate-100 flex flex-col shadow-2xl md:shadow-none relative overflow-x-hidden border-x border-border/40 dark:border-white/5 md:border-none text-right mx-auto md:mx-0 transition-colors duration-200",
          hasSidebar && "lg:mr-72 lg:w-[calc(100%-18rem)]",
          !hasSidebar && "lg:max-w-7xl lg:mx-auto lg:bg-white lg:dark:bg-[#0B1E36]",
          className,
          "dark:bg-[#0B1E36] dark:text-slate-100",
        )}
      >
        {children}
      </div>
    </div>
  );
};
