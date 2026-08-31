import type { FC } from "react";

interface HomeGreetingProps {
  userName?: string;
  neighborhoodName?: string;
}

export const HomeGreeting: FC<HomeGreetingProps> = ({
  userName = "هديل محمد",
  neighborhoodName = "غزة - الرمال",
}) => {
  return (
    <div className="space-y-0.5">
      <h2 className="text-sm font-black text-primary">
        مرحباً، {userName} 👋
      </h2>
      <p className="text-xs text-text-secondary">
        إليك ملخص نشاطك اليوم في {neighborhoodName}
      </p>
    </div>
  );
};
