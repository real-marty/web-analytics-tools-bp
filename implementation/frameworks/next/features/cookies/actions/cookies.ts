"use server";

import { CookieName } from "@/components/cookies/cookie-name";
import { cookies } from "next/headers";

interface CookieProps {
  name: string;
  value: string;
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "none" | "strict" | "lax";
}

async function createCookie(cookieName: CookieName) {
  cookies().set(cookieName.toString(), '20', { maxAge: 60 * 60 * 24 * 365 })
}

async function deleteCookie(cookieName: string) {
  //cookies().delete(cookieName);
}

export default createCookie;