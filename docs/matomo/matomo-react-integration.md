# Integrace Matomo s Reactem

Tento průvodce popisuje, jak začít sledovat data pomocí **Matomo** na webových stránkách vytvořených v **Reactu**. Postupujte podle níže uvedených kroků pro bezproblémovou integraci.

---

## 1. **Nastavení Matomo**

1. Nainstalujte Matomo na váš server nebo použijte Matomo Cloud.
2. Získejte **sledovací kód Matomo** z administračního rozhraní:
   - Přejděte na **Administrace** > **Webové stránky** > **Správa**.
   - Zkopírujte JavaScriptový sledovací kód pro váš web.

---

## 2. **Instalace závislostí**

Pomocí `npm` nebo `yarn` nainstalujte balíček pro Matomo JavaScript tracker.

```bash
npm install @datapunt/matomo-tracker-react
# nebo
yarn add @datapunt/matomo-tracker-react
```

---

## 3. **Konfigurace Matomo v Reactu**

Vytvořte konfigurační soubor pro nastavení sledování pomocí Matomo.

### Příklad: `matomo.js`

```javascript
import { init } from "@datapunt/matomo-tracker-react";

const matomoInstance = init({
  // Nahraďte URL vašeho serveru Matomo
  urlBase: "https://vas-matomo-url.priklad",
  // Nahraďte ID vaší stránky z Matomo
  siteId: 1,
  trackerUrl: "https://vas-matomo-url.priklad/matomo.php",
  // Volitelné: Posílá heartbeat každých 10 sekund
  srcUrl: "https://vas-matomo-url.priklad/matomo.js",
  heartBeat: { active: true, seconds: 10 },
  // Povolit sledování odkazů
  linkTracking: true,
  configurations: {
    // Volitelné: Zajištění zabezpečených cookies
    setSecureCookie: true,
  },
});

export default matomoInstance;
```

---

## 4. **Integrace Matomo do React aplikace**

Obalte vaši aplikaci pomocí Matomo trackeru.

### Příklad: `App.js`

```javascript
import React from "react";
import { MatomoProvider } from "@datapunt/matomo-tracker-react";
import matomoInstance from "./matomo";

function App() {
  return (
    <MatomoProvider value={matomoInstance}>
      <YourMainComponent />
    </MatomoProvider>
  );
}

export default App;
```

---

## 5. **Sledování návštěvnosti stránek**

Použijte hook `useMatomo` pro sledování návštěvnosti nebo vlastních událostí.

### Příklad: Sledování návštěvnosti

```javascript
import { useMatomo } from "@datapunt/matomo-tracker-react";

function YourPageComponent() {
  const { trackPageView } = useMatomo();

  React.useEffect(() => {
    trackPageView({
      documentTitle: "Název stránky",
    });
  }, [trackPageView]);

  return <div>Obsah vaší stránky</div>;
}
```

---

## 6. **Sledování vlastních událostí**

Posílejte data o vlastních událostech pomocí Matomo.

### Příklad: Sledování události

```javascript
import { useMatomo } from "@datapunt/matomo-tracker-react";

function YourButtonComponent() {
  const { trackEvent } = useMatomo();

  const handleClick = () => {
    trackEvent({
      category: "Tlačítko",
      action: "Kliknutí",
      name: "Příklad tlačítka",
      value: 1,
    });
  };

  return <button onClick={handleClick}>Klikni na mě</button>;
}
```

---

## 7. **Ověření sledování**

1. Otevřete svůj web a proveďte akce, jako je navigace nebo klikání na tlačítka.
2. V Matomo rozhraní zkontrolujte sekci **Návštěvníci v reálném čase**, abyste se ujistili, že jsou data správně sledována.

---

## Další tipy

- Ujistěte se, že sledovací kód odpovídá vašemu serveru nebo cloudové instanci Matomo.
- Použijte nástroje pro ladění v Matomo:
  - Otevřete konzoli prohlížeče a zkontrolujte, zda se tracker načítá bez chyb.
  - Sledujte HTTP požadavky na `matomo.php`.

---

Dodržením tohoto průvodce integrujete Matomo do své React aplikace.

Pro pokročilé případy použití navštivte [dokumentaci Matomo](https://matomo.org/docs/).
