### Pro integraci **PostHog** do aplikace vytvořené v Reactu postupujte podle těchto kroků s použitím oficiální knihovny React z dokumentace [PostHog React](https://posthog.com/docs/libraries/react).

---

### 1. Instalace knihovny PostHog

Nejprve nainstalujte knihovnu `posthog-js` a `posthog-react` pomocí vašeho balíčkovacího systému:

```bash
npm install posthog-js posthog-react
# nebo
yarn add posthog-js posthog-react
```

---

### 2. Inicializace PostHog v aplikaci

Přidejte inicializaci PostHog v kořenovém souboru aplikace (např. `src/index.js` nebo `src/main.tsx`).

#### Kořenový soubor aplikace (`index.js` nebo `App.tsx`):

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { PostHogProvider } from "posthog-react";
import posthog from "posthog-js";
import App from "./App";

// Inicializace PostHog
posthog.init("VÁŠ_POSTHOG_KLÍČ", {
  api_host: "https://app.posthog.com", // nebo vaše vlastní instance PostHog
});

ReactDOM.render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
```

---

### 3. Sledování událostí v komponentách

Pro sledování událostí použijte hook `usePostHog`. Můžete například sledovat kliknutí na tlačítko:

#### Ukázková komponenta

```tsx
import React from "react";
import { usePostHog } from "posthog-react";

const MyComponent = () => {
  const posthog = usePostHog();

  const handleClick = () => {
    if (posthog) {
      posthog.capture("button_clicked", {
        property_name: "hodnota", // vlastní vlastnosti události
      });
    }
  };

  return <button onClick={handleClick}>Klikni na mě</button>;
};

export default MyComponent;
```

---

### 4. Nastavení uživatelů

Můžete propojit data konkrétních uživatelů pomocí funkce `posthog.identify`:

```tsx
posthog.identify("uzivatel_id", {
  email: "uzivatel@priklad.com",
  jmeno: "Jan Novák",
});
```

---

### 5. Debugging a přizpůsobení

Pokud chcete povolit debug režim, můžete upravit konfiguraci při inicializaci:

```tsx
posthog.init("VÁŠ_POSTHOG_KLÍČ", {
  api_host: "https://app.posthog.com",
  debug: true, // Povolení debug režimu
});
```

---

### 6. Odstranění klienta při odhlášení uživatele

Pokud potřebujete odstranit data klienta při odhlášení, použijte:

```tsx
posthog.reset();
```
