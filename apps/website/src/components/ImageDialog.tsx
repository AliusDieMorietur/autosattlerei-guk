import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogPortal,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { AnimatedImage } from "./AnimatedImage";

export type ImageDialogProps = DialogProps & {
  src?: string;
};

export const ImageDialog = ({
  src,
  ...props
}: ImageDialogProps): JSX.Element => {
  return (
    <Dialog {...props}>
      <DialogContent
        className="max-w-[900px] p-10 bg-transparent"
        hideCloseButton
        customClose={
          <X
            className="cursor-pointer fixed z-[2000] top-4 right-4 pointer-events-auto min-w-7 min-h-7 text-white/50"
            onClick={() => props.onOpenChange?.(false)}
          />
        }
      >
        <DialogTitle className="hidden" />

        {src && (
          <img src={src} alt="image" className="rounded-xl overflow-hidden" />
        )}
      </DialogContent>
    </Dialog>
  );
};
