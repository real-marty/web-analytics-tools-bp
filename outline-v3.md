
# **Osnova bakalářské práce**

## **1. Úvod**

- Stručné představení problematiky (1–2 odstavce).
- Jasná specifikace cíle práce a jejího významu.
- Po přečtení úvodu musí být zřejmé:
  - Proč byla práce zadána.
  - Jaký je její obsah a cíl.
- *Poznámka:* Nepopisovat výsledky, ty patří až do závěru.
- Rozsah: max. 1 strana.
- **Primární cíl:** Komparativní analýza webových analytických nástrojů s ohledem na potřeby konkrétní firmy a autorovy požadavky.

---

## **2. Kontext a výzvy současné digitální analytiky**

### **2.1  Současný stav výzkumu v oblasti digitální analytiky**

- Rychlý vývoj digitálních analytických nástrojů.
- Problém zastarávání výzkumných poznatků.
- Důsledky technologických změn pro akademický výzkum.
- Dominance proprietárních řešení a potřeba otevřených alternativ.
- Význam výzkumu v oblasti open-source nástrojů.

*Citace článku:*  
[https://jedem.org/index.php/jedem/article/view/650] – dokumentuje rychlejší růst oboru oproti reakci odborné literatury.  
→ Odůvodnění použití i neakademických zdrojů (např. nové nástroje jako PostHog, absence aktuálních informací v klasické literatuře).

### **2.2  Přehled analytických přístupů**

- Různorodost typů analýz umožněných vybranými nástroji.
- Zkoumané nástroje obvykle podporují více typů analýz (produktová analytika, behaviorální analýza apod.).
  - Druhy anal
- Není zaměřeno výhradně na jediný analytický přístup.

### **2.3 Vymezení konceptu webové analytiky**

- Definice webové analytiky.
- Hlavní charakteristiky a cíle.
- Metriky, principy a specifické rysy.

### **2.4 Právní rámec webové analytiky se zaměřením na GDPR**

- Zkreslení dat, souhlas uživatele, omezení zpracování dat.
- Anonymizace, pseudonymizace, cookieless tracking.

### **2.5 Vliv nástrojů pro blokování obsahu na technické možnosti sběru dat**

- AdBlock, Brave a další.
- Zkreslení dat, způsoby obejití (proxy, vlastní infrastruktura).

---

## **3. Přehled nástrojů pro analýzu webového provozu**

### **3.1 Návrh hodnoticí metodiky pro výběr nástroje**

- Bodový a penalizační systém.
- Kritéria: funkčnost, soukromí, licencování, rozšiřitelnost.

### **3.2 Přehled analytických nástrojů pro analýzu provozovu web. aplikací**

- Klíčové funkce, možnosti přizpůsobení, podpora různých analytických paradigmat.


### **3.4 Přehled zkoumaných analytických nástrojů**

- Krátká charakteristika nástrojů: **Matomo**, **PostHog**, **Umami**.
- Licenční modely, open-source povaha, rozšiřitelnost, komunita.

---

## **4. Analýza potřeb a požadavků**

### **4.1 Analýza potřeb v oblasti webové analytiky**

#### **Požadavky firmy CCA:**

- Soulad s GDPR.
- Analýza uživatelského chování.
- SEO a obsahová analytika.
- Nákladovost a licenční podmínky.
- Prediktivní analytika (AI).
- Možnost pokročilého dotazování a reportingu.

#### **Požadavky na další projekty**

- On-premise možnost nebo velkorysý free-tier.
- GDPR a soukromí uživatele.
- Transparentní náklady a otevřené licence.
- Bezpečnost a anonymita (bez cookies).
- Přesnost měření i při blokování obsahu.

---

## **5. Návrh řešení**

### **5.1 Návrh vhodného řešení pro společnost CCA**

- Výběr konkrétního nástroje.
- Odůvodnění volby dle kritérií a firemních potřeb.

### **5.2 Návrh možností rozšíření**

- Zakázková implementace pluginů a vlastních funkcí.
- Případné zapojení AI, prediktivní analytiky.

---

## **6. Implementace řešení**

### **6.1 Produkční nasazení vybraných softwarových nástrojů**

- Praktické nasazení Matomo, PostHog a Umami.
- Free-tier modely a nákladové kalkulace (např. PostHog).
- Hodnocení dokumentace a podpory SDK.

### **6.2 Systematicky strukturovaný návod k využívání platforem**

- Odkazy na dokumentaci, ukázky konfigurací.
- Možnosti integrace do různých vývojových prostředí.

### **6.3 Realizace vlastních rozšíření v rámci vybraných nástrojů**

- Pluginy (např. vizualizační plugin v Matomo).
- Úprava Umami, vlastní doprogramování funkcí.

---

## **7. Testování a zhodnocení řešení**

### **7.1 Automatizované testování a simulace sběru dat**

- Testování pomocí Playwrightu.
- Prohlížeče s/bez blokování obsahu (Chrome vs. Brave).

### **7.2 Vyhodnocení přesnosti, robustnosti a nákladovosti**

- Porovnání výsledků nástrojů.
- Zhodnocení souladu s požadavky CCA.
- Interpretace výsledků a doporučení.

---

## **8. Závěr**

- Shrnutí zjištění z analýzy, návrhu, implementace a testování.
- Reflexe nad výběrem nástroje a jeho využitelností.
- Doporučení pro další vývoj a nasazení v projektech CCA i mimo ně.
  