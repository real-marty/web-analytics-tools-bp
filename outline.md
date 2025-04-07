# **Outline analytické části bakalářské práce**

## **1. Úvod - teorie**
- Úvod je klíčový pro vytvoření prvního dojmu.  
- Měl by obsahovat:
  - Stručný nástin problematiky (1–2 odstavce).
  - Jasné vysvětlení, co bude práce řešit a proč.
- Po přečtení úvodu by mělo být zřejmé:
  - Proč byla práce zadána.
  - Co bude jejím obsahem.
  - Jaký je její cíl.
- **Poznámka**: Neuvádět, co bylo vykonáno – to patří až do závěru.  
- **Rozsah**: maximálně jedna strana textu.

## **2. Cíl a zaměření práce -teorie**
- Primárním cílem je **komparativní analýza webových analytických nástrojů**, s ohledem na potřeby konkrétní firmy a autorovy vlastní požadavky.
- Většina zvolených nástrojů umožňuje kromě webové analytiky také jiné typy analýz (např. produktová analytika, uživatelské chování atd.).
- Konec této části bude věnován **formulaci požadavků firmy CCA** a **vlastních požadavků** na analytické nástroje.


## **3. Kontext a vymezení analytiky - teorie**
- Analytika je široký a rozmanitý obor, zahrnující různé disciplíny a typy softwarových nástrojů.
- Tato práce se zaměří konkrétně na **webovou analytiku**, s přesahem do dalších typů analýz, které moderní nástroje rovněž nabízejí.
- Pro doložení relevance tématu bude citována práce:  
  _[https://jedem.org/index.php/jedem/article/view/650]_  
  – která poukazuje na to, že obor roste rychleji, než jak jej reflektuje současná odborná literatura.
- **Poznámka**: Tímto bude obhájena potřeba použít i neakademické zdroje, protože:
  - některé nástroje (např. PostHog) jsou relativně nové (cca 4 roky),
  - klasická literatura často popisuje nástroje, které už nejsou aktivně využívány (např. Google Analytics v3).






## **4. Rozbor požadavků - prakticka**
- Rozbor jednotlivých požadavků, jejich význam a případné rozšířené vysvětlení:
  
  **Požadavky firmy CCA:**
  - Soulad s GDPR
  - Analýza chování uživatelů
  - SEO a analýza obsahu
  - Náklady a licencování
  - Prediktivní analytika (AI)
  - Možnost vlastního dotazování a reportování

  **Vlastní požadavky:**
  - Možnost on-premise hostování / štědrý free-tier
  - GDPR a soukromí uživatelů
  - Nízké náklady a transparentní licencování
  - Bezpečnost a anonymita (např. možnost sledování bez cookies)
  - Přesnost sběru dat i v přítomnosti blokátorů


## **5. Porovnání analytických nástrojů - prakticka**
- Analýza vybraných nástrojů (např. **PostHog**, **Matomo**, …):
  - Funkce, splnění požadavků
  - Ceníky a licenční modely
- Výběr **3 konkrétních nástrojů** pro testování a nasazení



## **6. Teoretická část – nasazení analytických nástrojů - teoreticka / prakticka**
- Jak funguje technické nasazení:
  - Docker
  - Reverzní proxy
  - Serverová architektura
  - Požadavky na DNS, firewall
  - Technická náročnost

## **7. Legislativa a technické limity sběru dat - teoreticka**
- Problémy způsobené blokátory (např. AdBlock)
- Dopady GDPR:
  - Zkreslení dat
  - Ukládání dat a souhlas uživatelů


## **8. Testování a porovnání nástrojů**
- Praktické testy:
  - Sběr dat s aktivovaným AdBlockem a bez něj
  - Porovnání výsledků mezi třemi zvolenými nástroji
  - Hodnocení přesnosti, spolehlivosti a relevance výstupních dat

