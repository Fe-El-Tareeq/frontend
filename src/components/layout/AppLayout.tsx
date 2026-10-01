import type { FC, ReactNode } from "react";
import { MobileContainer } from "./MobileContainer";
import { Header } from "./Header";
import type { HeaderProps } from "./Header";
import { BottomNav } from "./BottomNav";
import { cn } from "../../utils/cn";

export interface AppLayoutProps {
  children: ReactNode;
  headerProps?: HeaderProps;
  showHeader?: boolean;
  showBottomNav?: boolean;
  className?: string;
}

export const AppLayout: FC<AppLayoutProps> = ({
  children,
  headerProps,
  showHeader = true,
  showBottomNav = true,
  className,
}) => {
  return (
    <MobileContainer>
      {showHeader && <Header {...headerProps} />}

      <main
        className={cn(
          "w-full max-w-4xl mx-auto flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6 overflow-y-auto",
          showBottomNav && "pb-24 lg:pb-12",
          className,
        )}
      >
        {children}
      </main>

      {showBottomNav && <BottomNav />}
    </MobileContainer>
  );
};
