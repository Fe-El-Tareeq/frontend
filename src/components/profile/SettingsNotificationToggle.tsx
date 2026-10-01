import type { FC } from "react";

interface SettingsNotificationToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  borderBottom?: boolean;
}

export const SettingsNotificationToggle: FC<
  SettingsNotificationToggleProps
> = ({ title, description, checked, onChange, borderBottom = true }) => {
  return (
    <div
      className={`flex items-center justify-between ${
        borderBottom ? "border-b border-slate-100 pb-3" : ""
      }`}
    >
      {/* 1. Title and description on the RIGHT (1st child in RTL) */}
      <div className="text-right">
        <h3 className="text-xs font-bold text-primary">{title}</h3>
        <p className="text-[10.5px] text-text-muted">{description}</p>
      </div>

      {/* 2. Switch Toggle on the LEFT (2nd child in RTL) */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#123A68]" />
      </label>
    </div>
  );
};
