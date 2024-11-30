import {
  Dialog,
  DialogContent,
} from "@/components/cookies/ui-primitives/dialog";
import { DialogTitle } from "../ui-primitives/dialog";
import { ManageCookiesForm } from "./manage-cookies-form";

interface ManageCookiesDialogProps {
  open: boolean;
  onOpenChange: () => void;
  onAllCookiesRejected: () => void;
  onAllCookiesAccepted: () => void;
  onArbitraryCookiesAccepted: () => void;
}

export const ManageCookiesDialog = ({
  open,
  onOpenChange,
  onAllCookiesRejected,
  onAllCookiesAccepted,
  onArbitraryCookiesAccepted,
}: ManageCookiesDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="" aria-describedby={undefined}>
        <DialogTitle className="text-lg font-bold">
          Vaše soukromí je pro nás důležité
        </DialogTitle>
        <ManageCookiesForm
          onAllCookiesRejected={onAllCookiesRejected}
          onAllCookiesAccepted={onAllCookiesAccepted}
          onArbitraryCookiesAccepted={onArbitraryCookiesAccepted}
        />
      </DialogContent>
    </Dialog>
  );
};
