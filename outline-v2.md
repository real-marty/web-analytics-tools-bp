### 1. Úvod
- Stručné představení problematiky (1–2 odstavce).
- Jasná specifikace cíle práce a jejího významu.
- Po přečtení úvodu musí být zřejmé:
  - Proč byla práce zadána.
  - Jaký je její obsah a cíl.
- *Poznámka:* Nepopisovat výsledky, ty patří až do závěru.
- Rozsah: max. 1 strana.
- **Primární cíl:** Komparativní analýza webových analytických nástrojů s ohledem na potřeby konkrétní firmy a autorovy požadavky.

---

### 2. Výzvy a perspektivy současného výzkumu v oblasti digitální analytiky
- Rychlý vývoj digitálních analytických nástrojů.
- Problém zastarávání výzkumných poznatků.
- Důsledky technologických změn pro akademický výzkum.
- Dominance proprietárních řešení a potřeba otevřených alternativ.
- Význam výzkumu v oblasti open-source nástrojů.

*Citace článku:*  
[https://jedem.org/index.php/jedem/article/view/650] – dokumentuje rychlejší růst oboru oproti reakci odborné literatury.  
→ Odůvodnění použití i neakademických zdrojů (např. nové nástroje jako PostHog, absence aktuálních informací v klasické literatuře).

---

### 3. Rozmanitost analytických přístupů
- Různorodost typů analýz umožněných vybranými nástroji.
- Zkoumané nástroje obvykle podporují více typů analýz (produktová analytika, behaviorální analýza apod.).
- Není zaměřeno výhradně na jediný analytický přístup.

---

### 4. Vymezení konceptu webové analytiky a její specifické vlastnosti
- Definice webové analytiky.
- Hlavní charakteristiky a cíle.
- Klíčové metriky, principy a specifické rysy.

---

### 5. Funkční požadavky na nástroje webové analytiky
- Klíčové funkce, které by měl nástroj nabízet.
- Možnosti rozšíření a přizpůsobení.
- Podpora různých analytických paradigmat.

---

### 6. Právní rámec webové analytiky se zaměřením na nařízení GDPR
- Dopady GDPR na technickou i datovou úroveň analytiky:
  - Zkreslení dat.
  - Nutnost explicitního souhlasu uživatele.
  - Omezení v ukládání a zpracování dat (např. IP adresy).
  - Anonymizace a pseudonymizace.
  - Alternativy ke cookies – cookieless tracking.

---

### 7. Vliv nástrojů pro blokování obsahu na technické možnosti sběru datu
- Teoretické pozadí blokování (např. AdBlock, Brave).
- Zkreslení dat a omezení sběru.
- Možnosti obejití pomocí proxy nebo vlastní infrastruktury.

---

### 8. Modularita a konfigurační přizpůsobitelnost při nasazování nástrojů
- Nasazení pomocí:
  - Dockeru,
  - reverzní proxy,
  - serverových konfigurací (firewall, DNS).
- Technická náročnost implementace.
- Automatizace testování pomocí nástroje **Playwright**.

---

### 9. Specifikace požadavků na analytický software
**Požadavky firmy CCA:**
- Soulad s GDPR.
- Analýza uživatelského chování.
- SEO a obsahová analytika.
- Nákladovost a licenční podmínky.
- Prediktivní analytika (AI).
- Možnost pokročilého dotazování a reportingu.

**Autorovy vlastní požadavky:**
- On-premise možnost nebo velkorysý free-tier.
- GDPR a soukromí uživatele.
- Transparentní náklady a otevřené licence.
- Bezpečnost a anonymita (bez cookies).
- Přesnost měření i při blokování obsahu.

---

### 10. Vyhodnocení dostupných softwarových řešení podle definovaných požadavků
- Vytvoření hodnoticího rámce (bodové a penalizační skóre).

**Poznámky:**
- Zohledněny i doplňkové funkce (např. produktová analytika).
- Doplňkové funkce nejsou rozhodující, ale přispívají k rozšiřitelnosti.
- Výběr musí být flexibilní a udržitelný s ohledem na budoucnost.

---
### 11. Produkční nasazení vybraných softwarových nástrojů

- Praktické nasazení analytických platforem: **Matomo**, **PostHog** a **Umami**.
- Zhodnocení výhodných licenčních podmínek, zejména štědrého **free-tier** modelu (např. PostHog).
- Specifický přínos PostHogu: přehledná kalkulace měsíčních nákladů prostřednictvím funkce **„End of the month estimate“**, která umožňuje včasné plánování a prevenci nečekaných výdajů.
- Hodnocení přehlednosti a úplnosti dokumentace jednotlivých nástrojů.
- Dostupnost SDK a možnost integrace do různých vývojových frameworků.
- Vizuální ilustrace: ukázka e-mailového upozornění s odhadem měsíčních nákladů (PostHog).'
  
---

### 12. Systematicky strukturovaný návod k využívání platforem
- Odkazy na oficiální dokumentaci.
- Konfigurační soubory a příklady nasazení.
- Stručný návod pro praktickou aplikaci.

---

### 13. Realizace rozšiřujících funkcí v rámci vybraných nástrojů
- Možnosti pluginů (např. vizualizační plugin v Matomo).
- Vlastní rozšíření nástrojů (případná úprava Umami).
- Zapojení vlastního vývoje.

---

### 14. Testování a validace systémového nasazení
- Automatizované testování pomocí nástroje **Playwright**.
- Porovnání chování v prohlížečích:
  - **Chrome** (bez blokování).
  - **Brave** (s integrovaným blokováním).
- Vyhodnocení rozdílů ve výsledcích a přesnosti měření.