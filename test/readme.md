# Návod ke spuštění projektu Playwright

Tento návod popisuje postup, jak zprovoznit projekt Playwright na novém zařízení po stažení z Git repozitáře. Předpokládá se, že ve složce projektu chybí adresář `node_modules`.

---

## 1. Instalace Node.js

Pro správné fungování projektu je nutné mít nainstalovaný Node.js, který obsahuje také správce balíčků `npm`.  
Instalační soubory jsou dostupné na stránce:  
<https://nodejs.org/>  
Doporučuje se zvolit verzi označenou jako LTS (Long-Term Support).

---

### 2. Klonování repozitáře

V příkazovém řádku nebo terminálu je třeba spustit následující příkazy:

```bash
git clone <adresa-repozitáře>
cd <složka-projektu>
```

---

### 3. Instalace závislostí

Ve složce projektu je potřeba nainstalovat všechny závislosti uvedené v souboru `package.json`:

```bash
npm install
```

Tím se vytvoří složka `node_modules` a stáhnou se všechny potřebné knihovny.

---

### 4. Instalace prohlížečů pro Playwright

Playwright vyžaduje instalaci vlastních verzí prohlížečů:

```bash
npx playwright install
```

Tímto příkazem se stáhnou všechny podporované prohlížeče (Chromium, Firefox, WebKit).

---

### 5. Spuštění testů

Pro spuštění testů lze použít některý z následujících příkazů:

```bash
npm test
```

nebo přímo pomocí nástroje Playwright:

```bash
npx playwright test
```

---

### 6. Otevření uživatelského rozhraní testů (volitelné)

Playwright nabízí možnost spouštět testy přes grafické rozhraní:

```bash
npx playwright test --ui
```

---

### 7. Řešení častých problémů

- Ujistěte se, že se příkazy spouští ve složce, která obsahuje soubor `package.json`.
- Pokud projekt obsahuje konfigurační soubor `playwright.config.ts` nebo `playwright.config.js`, měl by být umístěn v kořenové složce.
- Pokud instalace selže nebo testy nefungují, lze zkusit:

```bash
npx playwright install --with-deps
```

Tento příkaz doinstaluje i systémové závislosti potřebné pro běh prohlížečů (zejména na Linuxu).

---

### 8. Oficiální instalace Playwrightu (pro vytvoření nového projektu)

Pokud není projekt zatím vytvořen, lze použít oficiální instalační návod podle dokumentace:

```bash
npm create playwright@latest
```

Tento příkaz spustí průvodce, který:

- vytvoří novou složku projektu,
- inicializuje `package.json`,
- nainstaluje knihovnu `@playwright/test`,
- nastaví vzorové testy a konfiguraci,
- stáhne potřebné prohlížeče.

Více informací:  
<https://playwright.dev/docs/intro>

---

### Příklad struktury projektu

```
projekt/
├── tests/                 # Testovací soubory
├── playwright.config.ts   # Konfigurace Playwrightu
├── package.json           # Seznam závislostí a skriptů
└── ...
```