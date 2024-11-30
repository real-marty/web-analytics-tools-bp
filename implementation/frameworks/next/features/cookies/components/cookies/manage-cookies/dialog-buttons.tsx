import { Button } from "@/components/ui/button";

interface DialogButtonsProps {
  onAllCookiesAccepted: () => void;
  onAllCookiesRejected: () => void;
}

export const DialogButtons = ({
  onAllCookiesAccepted,
  onAllCookiesRejected,
}: DialogButtonsProps) => {
  return (
    <div className="flex w-full flex-col space-y-2 pt-5 md:flex-row md:space-x-4 md:space-y-0">
      <Button className="bg-red-600" type="submit">
        Uložit nastavení
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={onAllCookiesAccepted}
      >
        Přijmout vše
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={onAllCookiesRejected}
      >
        Zamítnout vše
      </Button>
    </div>
  );
};
