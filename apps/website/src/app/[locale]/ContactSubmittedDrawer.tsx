import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type ContactSubmittedDrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const ContactSubmittedDrawer = ({
  open: outerOpen,
  onOpenChange,
}: ContactSubmittedDrawerProps): JSX.Element => {
  const t = useTranslations();
  const [innerOpen, setInnerOpen] = useState(false);
  const open = outerOpen ?? innerOpen;
  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        setInnerOpen(open);
        onOpenChange?.(open);
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-c7">
            {t("label.ThankYouForYourRequest")}
          </DrawerTitle>
          <DrawerDescription className="text-c7">
            {t("label.WeWillContactYouSoon")}
          </DrawerDescription>
        </DrawerHeader>
        <div className="min-h-[200px]" />
        <DrawerFooter>
          <Button
            size="lg"
            onClick={() => {
              onOpenChange?.(false);
              setInnerOpen(false);
            }}
          >
            {t("button.Ok")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
