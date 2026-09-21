import type { FC } from "react";

interface HomeGreetingProps {
  userName?: string;
  neighborhoodName?: string;
}

export const HomeGreeting: FC<HomeGreetingProps> = ({
  neighborhoodName = "غزة",
}) => {
  return (
    <div className="text-right space-y-0.5">
      <h1 className="text-xl font-black text-[#123A68] flex items-center gap-1.5">
        <span>مرحباً بك في بطريقك</span>
        <span className="text-xl">👋</span>
      </h1>
      <p className="text-xs text-text-secondary">
        إليك ملخص نشاطك اليوم في {neighborhoodName}
      </p>
    </div>
  );
};

