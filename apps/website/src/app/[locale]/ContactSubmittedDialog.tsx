import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type ContactSubmittedDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const ContactSubmittedDialog = ({
  open: outerOpen,
  onOpenChange,
}: ContactSubmittedDialogProps): JSX.Element => {
  const t = useTranslations();
  const [innerOpen, setInnerOpen] = useState(false);
  const open = outerOpen ?? innerOpen;
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setInnerOpen(open);
        onOpenChange?.(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px] h-[200px]">
        <div className="grow flex flex-col justify-center items-center pt-8">
          <div className="text-c7 text-2xl">
            {t("label.ThankYouForYourRequest")}
          </div>
          <div className="text-c7">{t("label.WeWillContactYouSoon")}</div>
        </div>
        <div className="flex justify-end items-end">
          <Button
            size="lg"
            onClick={() => {
              onOpenChange?.(false);
              setInnerOpen(false);
            }}
          >
            {t("button.Ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
