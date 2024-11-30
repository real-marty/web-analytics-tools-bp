export default interface CookieFormFieldProps {
    name: string;
    type: "single" | "multiple";
    cookieName: string;
    cookieDesc: string;
    disabled: boolean;
    value: string;
};