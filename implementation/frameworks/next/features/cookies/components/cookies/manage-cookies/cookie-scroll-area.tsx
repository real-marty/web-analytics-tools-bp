import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CookieFormField } from "./cookie-form-field";
import { UseFormReturn } from "react-hook-form";
import CookieFormFieldProps from "./cookie-field-props";

interface CookieScrollAreaProps {
    form: UseFormReturn<any>;
    cookieFields: CookieFormFieldProps[];
}

export const CookieScrollArea = ( { form, cookieFields } : CookieScrollAreaProps ) => {
    return (
        <ScrollArea className="h-[200px] w-full rounded-md border p-4 overflow-y-auto">
            <div className="space-y-4">
            {cookieFields.map((field: CookieFormFieldProps, index: number) => (
                <CookieFormField
                    key={index}
                    form={form}
                    name={field.name}
                    type={field.type}
                    cookieName={field.cookieName}
                    cookieDesc={field.cookieDesc}
                    disabled={field.disabled}
                    value={field.value}
                />
            ))}
            </div>
            </ScrollArea>
    );
};