import { FormField } from "@/components/ui/form";
import { CookieAccordionItem } from "./cookie-accordion";
import { Accordion } from "../ui-primitives/accordion";
import { UseFormReturn } from "react-hook-form";

interface CookieFormFieldProps {
  form: UseFormReturn<any, any, undefined>;
  name: string;
  type: "single" | "multiple";
  cookieName: string;
  cookieDesc: string;
  disabled: boolean;
  value: string;
}

export const CookieFormField = ({
  form,
  name,
  type,
  cookieName,
  cookieDesc,
  disabled,
  value,
}: CookieFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <Accordion type={type} collapsible>
          <CookieAccordionItem
            cookieName={cookieName}
            cookieDesc={cookieDesc}
            disabled={disabled}
            value={value}
            checked={field.value}
            onCheckedChange={field.onChange}
            onClick={(e) => e.stopPropagation()}
          />
        </Accordion>
      )}
    />
  );
};
