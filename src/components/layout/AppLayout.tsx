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
          "flex-1 px-4 py-4 overflow-y-auto",
          showBottomNav && "pb-24",
          className,
        )}
      >
        {children}
      </main>

      {showBottomNav && <BottomNav />}
    </MobileContainer>
  );
};
