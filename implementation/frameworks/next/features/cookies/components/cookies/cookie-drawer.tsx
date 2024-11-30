"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/cookies/ui-primitives/drawer";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { hasCookie } from "cookies-next";
import { ManageCookiesDialog } from "./manage-cookies/manage-cookies";
import createCookie from "@/actions/cookies/cookies";
import { CookieName } from "@/components/cookies/cookie-name";

export const CookieDrawer = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // when component renders
  useEffect(() => {
    const allCookieNames = Object.values(CookieName);

    let containsEssentialCookies = false;
    allCookieNames
      .filter((cookieName) => typeof cookieName === "string") // filter out the indides of the enum
      .forEach((cookieName) => {
        if (hasCookie(cookieName.toString())) {
          containsEssentialCookies = true;
        }
      });

    setShowConsent((prev) => containsEssentialCookies);
  }, []);

  const acceptCookies = async () => {
    const allCookieNames = Object.values(CookieName);
    allCookieNames
      .filter((cookieName) => typeof cookieName === "string")
      .forEach(async (cookieName) => {
        await createCookie(cookieName);
      });
    setShowConsent(true);
  };

  const rejectAllCookies = () => {
    createCookie(CookieName.ESSENTIAL);
    setShowConsent(true);
  };

  const onArbitraryCookiesAccepted = () => {
    setShowConsent(true);
  };

  if (showConsent) {
    return null;
  }

  return (
    <>
      <ManageCookiesDialog
        open={openDialog}
        onOpenChange={() => setShowConsent(!showConsent)}
        onAllCookiesRejected={rejectAllCookies}
        onAllCookiesAccepted={acceptCookies}
        onArbitraryCookiesAccepted={onArbitraryCookiesAccepted}
      />
      <Drawer open={!showConsent}>
        <DrawerContent className="fixed bottom-0 w-full items-center justify-center bg-opacity-90 p-6">
          <DrawerHeader className="space-y-4 text-lg font-bold">
            <DrawerTitle className="flex justify-center text-center">
              Tento web využívá cookies
            </DrawerTitle>
            <DrawerDescription>
              Výběrem „Přijmout vše“ nám dáváte souhlas se zpracováním všech
              volitelných typů cookies. Pod tlačítkem „Nastavit cookies“ můžete
              spravovat jednotlivé druhy cookies, kde se o nich také vše
              dozvíte.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="w-full p-4">
            <div className="flex w-full flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
              <DrawerClose asChild>
                <Button className="flex-1 bg-red-600" onClick={acceptCookies}>
                  Přijmout vše
                </Button>
              </DrawerClose>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setOpenDialog(true)}
              >
                Nastavit cookies
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={rejectAllCookies}
              >
                Zamítnout vše
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
