import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui-primitives/accordion";
import { FormControl, FormItem, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export interface CookieAccordionProps {
  cookieName: string;
  cookieDesc: string;
  checked: boolean;
  disabled: boolean;
  value: string;
  onCheckedChange: () => void;
  onClick: (e: any) => any;
}

export const CookieAccordionItem = ({
  cookieName,
  cookieDesc,
  checked,
  disabled,
  value,
  onCheckedChange,
  onClick,
}: CookieAccordionProps) => {
  return (
    <AccordionItem value={value}>
      <div className="flex items-center justify-between">
        <AccordionTrigger className="mr-2 flex flex-row items-center justify-between">
          {cookieName}
        </AccordionTrigger>
        <FormControl>
          <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            onClick={onClick}
          />
        </FormControl>
      </div>

      <AccordionContent>
        <FormItem className="rounded-lg p-3 shadow-sm">
          <FormDescription className="text-justify">
            {cookieDesc}
          </FormDescription>
        </FormItem>
      </AccordionContent>
    </AccordionItem>
  );
};
