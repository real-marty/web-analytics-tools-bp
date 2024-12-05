### Integrace PostHog do Next.js aplikace s TypeScript a App Routerem

Pokud chcete sledovat analytická data ve své Next.js aplikaci pomocí [PostHog](https://posthog.com), postupujte podle tohoto návodu pro použití s TypeScriptem a novým App Routerem.

---

#### **1. Instalace knihovny PostHog**

Nejprve nainstalujte knihovnu PostHog:

```bash
npm install posthog-js
# nebo PNPM
pnpm add posthog-js
# nebo Yarn
yarn add posthog-js
```

Pro TypeScript:

```bash
npm install --save-dev @types/posthog-js
# nebo PNPM
pnpm add -D @types/posthog-js
# nebo Yarn
yarn add -D @types/posthog-js
```

---

#### **2. Inicializace PostHog v aplikaci**

Vytvořte konfigurační soubor pro inicializaci PostHog. Uložte ho například jako `utils/posthog.ts`.

```typescript
import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined" && !posthog.__loaded) {
    posthog.init("VAŠE_POSTHOG_API_KEY", {
      api_host: "https://app.posthog.com", // Pro vlastní instance upravte URL
    });
  }
};

export const shutdownPostHog = () => {
  posthog.shutdown();
};
```

---

#### **3. Použití PostHog v App Routeru**

Do souboru `app/layout.tsx` přidejte inicializaci PostHog.

```typescript
"use client";

import { useEffect } from "react";
import { initPostHog, shutdownPostHog } from "@/utils/posthog";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initPostHog();

    return () => {
      shutdownPostHog();
    };
  }, []);

  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
```

---

#### **4. Sledování stránek (Page Views)**

V App Routeru můžete sledovat návštěvy stránek pomocí middleware `router.events`. Vytvořte si globální hook pro sledování změn stránek:

```typescript
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";

export const usePostHogPageViews = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      posthog.capture("$pageview", { url: pathname });
    }
  }, [pathname]);
};
```

Použijte tento hook v `layout.tsx`:

```typescript
"use client";

import { usePostHogPageViews } from "@/hooks/usePostHogPageViews";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  usePostHogPageViews();

  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
```

---

#### **5. Sledování událostí**

Pro vlastní události vytvořte utility funkci:

```typescript
import posthog from "posthog-js";

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>,
) => {
  posthog.capture(eventName, properties);
};
```

A použijte ji ve své komponentě:

```typescript
"use client";

import { trackEvent } from "@/utils/posthog";

export default function ExampleButton() {
  const handleClick = () => {
    trackEvent("klik_tlacitka", { vlastnost: "hodnota" });
  };

  return <button onClick={handleClick}>Klikni zde</button>;
}
```

---

#### **6. Ověření integrace**

Po nasazení aplikace přejděte do svého PostHog dashboardu a zkontrolujte, zda se data správně odesílají.

---

#### **7. Další funkce**

- **Identifikace uživatelů:**

```typescript
posthog.identify("uzivatelske_id", { email: "user@example.com" });
```

- **Feature Flags:** Přidání funkčních přepínačů.
- **A/B Testování:** Pro experimenty a analýzu výsledků.

Více informací naleznete v oficiální dokumentaci [PostHog Next.js knihovny](https://posthog.com/docs/libraries/next-js).
