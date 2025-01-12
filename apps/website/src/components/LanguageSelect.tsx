import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DESvg } from "./icons/DESvg";
import { UASvg } from "./icons/UASvg";
import { RUSvg } from "./icons/RUSvg";
import { UKSvg } from "./icons/UKSvg";
import { LOCALES } from "@/i18n/routing";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const LOCALE_TO_SVG: Record<(typeof LOCALES)[number], ReactNode> = {
  en: <UKSvg className="w-4 h-3" />,
  de: <DESvg className="w-4 h-3" />,
  ua: <UASvg className="w-4 h-3" />,
  ru: <RUSvg className="w-4 h-3" />,
};

export type LanguageSelectProps = {
  value: string;
  onChange?: (language: string) => void;
};

export const LanguageSelect = ({
  value,
  onChange,
}: LanguageSelectProps): JSX.Element => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-9 p-0 uppercase text-base">
        {value}
      </SelectTrigger>
      <SelectContent className="bg-c2 border-white/10 border w-fit min-w-9">
        <SelectGroup>
          {LOCALES.map((locale) => (
            <SelectItem
              key={locale}
              value={locale}
              className="text-c7 text-base w-fit cursor-pointer uppercase"
            >
              {locale}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

LanguageSelect.Horizontal = ({
  value,
  onChange,
}: LanguageSelectProps): JSX.Element => {
  return (
    <div className="flex items-center gap-4">
      {LOCALES.map((locale) => (
        <div
          key={locale}
          className={cn("uppercase transition-all", {
            "text-white/50": value !== locale,
            "text-white": value === locale,
          })}
          onClick={() => onChange?.(locale)}
        >
          {locale}
        </div>
      ))}
    </div>
  );
};
