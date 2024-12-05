# Postup pro integraci PostHogu do Angular aplikace

## 1. **Instalace PostHog knihovny**
Nejprve nainstalujte knihovnu PostHog pomocí npm:

```bash
npm install posthog-js
```

---

## 2. **Inicializace PostHog**
Otevřete hlavní soubor aplikace (`main.ts`) nebo jiný vhodný inicializační soubor a inicializujte PostHog:

```typescript
import posthog from 'posthog-js';

posthog.init('<YOUR_POSTHOG_API_KEY>', {
  api_host: 'https://app.posthog.com', // Nebo vlastní host, pokud používáte self-hosting
});
```

---

## 3. **Zavedení PostHog do služby Angularu**
Vytvořte službu, která bude spravovat všechny funkce PostHogu:

```bash
ng generate service posthog
```

V souboru `posthog.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import posthog from 'posthog-js';

@Injectable({
  providedIn: 'root',
})
export class PosthogService {
  constructor() {}

  trackEvent(eventName: string, properties?: Record<string, any>) {
    posthog.capture(eventName, properties);
  }

  identifyUser(userId: string, traits?: Record<string, any>) {
    posthog.identify(userId, traits);
  }

  setPersonProperties(properties: Record<string, any>) {
    posthog.people.set(properties);
  }
}
```

---

## 4. **Použití služby v Komponentách**
Importujte a použijte službu `PosthogService` v libovolné komponentě:

```typescript
import { Component, OnInit } from '@angular/core';
import { PosthogService } from './posthog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private posthogService: PosthogService) {}

  ngOnInit(): void {
    // Identifikace uživatele
    this.posthogService.identifyUser('user123', { email: 'user@example.com' });

    // Sledování události
    this.posthogService.trackEvent('Page View', { page: 'Home' });
  }
}
```

---

## 5. **Volitelné: Debugging**
Pro testování můžete zapnout režim ladění:

```typescript
posthog.init('<YOUR_POSTHOG_API_KEY>', {
  api_host: 'https://app.posthog.com',
  debug: true,
});
```

---

## 6. **Nasazení**
Ujistěte se, že vaše aplikace je připravena na produkční prostředí, a ověřte, že události jsou správně odesílány do PostHogu.

---

Tento jednoduchý postup vám umožní sbírat data o uživatelích a sledovat události v Angular aplikaci pomocí PostHogu.