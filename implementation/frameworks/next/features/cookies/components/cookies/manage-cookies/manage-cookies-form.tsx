import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CookieName } from "@/components/cookies/cookie-name";
import createCookie from "@/actions/cookies/cookies";
import { Form } from "@/components/ui/form";
import { CookieScrollArea } from "./cookie-scroll-area";
import { DialogButtons } from "./dialog-buttons";
import CookieFormFieldProps from "./cookie-field-props";

const cookieFormFieldsProps: CookieFormFieldProps[] = [
  {
    name: "marketing_cookies",
    type: "single",
    cookieName: "Marketingové cookies",
    cookieDesc:
      "Marketingové cookies shromažďují osobní údaje o uživateli z marketingového hlediska. Např. shromažďují informace za účelem přizpůsobení nabízené reklamy zájmům zákazníka, propojení se sociální sítí atd. K využívání cookies tohoto druhu potřebuje provozovatel webu souhlas subjektu údajů. Bez takového souhlasu nelze marketingové cookies využívat.",
    disabled: false,
    value: "marketing_cookies",
  },
  {
    name: "analytic_cookies",
    type: "single",
    cookieName: "Analytické cookies",
    cookieDesc:
      "Analytické cookies nám slouží ke statistikám, přehledům a optimalizaci webu. Díky tomu pak sledujeme návštěvnost našich stránek i to, odkud jste k nám přišli a co vás tu zaujalo. To vše samozřejmě bez identifikace konkrétních uživatelů.",
    disabled: false,
    value: "analytic_cookies",
  },
  {
    name: "essential_cookies",
    type: "single",
    cookieName: "Nezbytné cookies",
    cookieDesc:
      "Nezbytné cookies jsou ty, které jsou potřebné pro správné fungování webu – např. košíku, dále pro zabezpečení webu nebo možnost přihlašování do účtu. Tyto cookies proto nemůžete odmítnout a nepotřebujeme k jejich zpracování váš souhlas.",
    disabled: true,
    value: "essential_cookies",
  },
];

const CookieAcceptanceSchema = z.object({
  marketing_cookies: z.boolean(),
  analytic_cookies: z.boolean(),
  essential_cookies: z.boolean(),
});

interface ManageCookiesFormProps {
  onAllCookiesRejected: () => void;
  onAllCookiesAccepted: () => void;
  onArbitraryCookiesAccepted: () => void;
}

export const ManageCookiesForm = ({
  onAllCookiesRejected,
  onAllCookiesAccepted,
  onArbitraryCookiesAccepted,
}: ManageCookiesFormProps) => {
  const form = useForm<z.infer<typeof CookieAcceptanceSchema>>({
    resolver: zodResolver(CookieAcceptanceSchema),
    defaultValues: {
      marketing_cookies: false,
      analytic_cookies: false,
      essential_cookies: true,
    },
  });

  const onSubmit = (data: z.infer<typeof CookieAcceptanceSchema>) => {
    sendCookieIfAccepted(data.marketing_cookies, CookieName.MARKETING);
    sendCookieIfAccepted(data.analytic_cookies, CookieName.ANALYTICS);

    createCookie(CookieName.ESSENTIAL);
    onArbitraryCookiesAccepted();
  };

  const sendCookieIfAccepted = (
    isAccepted: boolean,
    cookieName: CookieName,
  ) => {
    if (isAccepted) {
      createCookie(cookieName);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <h3 className="mb-4 text-lg font-medium"></h3>
        <CookieScrollArea form={form} cookieFields={cookieFormFieldsProps} />
        <DialogButtons
          onAllCookiesAccepted={onAllCookiesAccepted}
          onAllCookiesRejected={onAllCookiesRejected}
        />
      </form>
    </Form>
  );
};
