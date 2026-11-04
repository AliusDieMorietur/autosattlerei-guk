import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { LOCALES } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type LanguageSelectProps = {
  value: string;
  onChange?: (language: string) => void;
};

export const LanguageSelect = ({
  value,
  onChange,
}: LanguageSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-9 p-0 uppercase text-base">
        {value}
      </SelectTrigger>
      <SelectContent className="gk-surface-neutral-primary gk-stroke-neutral-low border w-fit min-w-9">
        <SelectGroup>
          {LOCALES.map((locale) => (
            <SelectItem
              key={locale}
              value={locale}
              className="gk-text-neutral-high text-base w-fit cursor-pointer uppercase"
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
}: LanguageSelectProps) => {
  return (
    <div className="flex items-center gap-4">
      {LOCALES.map((locale) => (
        <div
          key={locale}
          className={cn("uppercase transition-all", {
            "gk-text-neutral-low": value !== locale,
            "gk-text-neutral-xhigh": value === locale,
          })}
          onClick={() => onChange?.(locale)}
        >
          {locale}
        </div>
      ))}
    </div>
  );
};
