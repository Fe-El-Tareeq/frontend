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
      className="min-h-screen w-full bg-[#E5EBF2] lg:bg-[#F8FAFC] dark:bg-[#071322] lg:dark:bg-[#0B1E36] flex justify-center lg:justify-start items-stretch antialiased text-right transition-colors duration-200"
    >
      <div
        className={cn(
          "w-full max-w-[430px] md:max-w-3xl lg:max-w-none min-h-screen bg-white dark:bg-[#0B1E36] text-slate-900 dark:text-slate-100 flex flex-col shadow-2xl md:shadow-lg lg:shadow-none relative overflow-x-hidden border-x border-border/40 dark:border-white/5 lg:border-none text-right mx-auto lg:mx-0 transition-colors duration-200",
          hasSidebar && "lg:mr-72 lg:w-[calc(100%-18rem)] lg:bg-[#F8FAFC] lg:dark:bg-[#0B1E36]",
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
