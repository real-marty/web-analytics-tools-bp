# Todo - dodelat - ag

# Docker rychlá isntalace

Docker je nástroj vhodný pro vytváření, rozdělování a provozování aplikací v izolovaných virtualizovaných prostředích zvaných kontejnery. Následující text je **stručným, ale přehledným návodem**, jak tuto technologii dostat na různá běžně používaná zařízení.

## **Instalace**

Předtím, než začnete s instalací, zvažte následující problémy týkající se kompatibility firewallových pravidel:

Docker může proniknout firewallová pravidla nastavená pomocí ufw: [docker - ufw](https://docs.docker.com/engine/network/packet-filtering-firewalls/#docker-and-ufw).
Docker nepodporuje pravidla vycházející z nft: [docker - packet filtering](https://docs.docker.com/engine/network/packet-filtering-firewalls/).

**Doporučené, avšak ne nezbytné kroky jsou označené hvězdičkou \***

### **Na Linuxu v tomto případě na Ubuntu**

1. Aktualizace systému: **\***

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. Instaluj požadované balíčky:

   ```bash
   sudo apt install -y ca-certificates curl gnupg lsb-release
   ```

3. Přidej Docker GPG klíč:

   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

4. Přidej Docker repozitář:

   ```bash
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. Instaluj Docker:

   ```bash
   sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io
   ```

6. Ověř instalaci:

   ```bash
   docker --version
   ```

---

### **Na Windows:**

1. Stáhni a nainstaluj [Docker Desktop](https://www.docker.com/products/docker-desktop).
2. Povolit **WSL 2**:
   - Nainstaluj WSL2 (Windows Subsystem for Linux) podle [oficiálního návodu](https://learn.microsoft.com/en-us/windows/wsl/install).
   - Docker Desktop automaticky nakonfiguruje WSL2.
3. Restartuj systém a spusť Docker Desktop.

---

### **Na Macu:**

1. Stáhni a nainstaluj [Docker Desktop](https://www.docker.com/products/docker-desktop).

2. Po instalaci spusť Docker Desktop a povol nastavení, která si vyžádá.

---

## **Sestavení Docker image**

1. Otevři terminál ve složce s `Dockerfile`.

2. Spusť příkaz:

   ```bash
   docker build -t <<nazev-aplikace>> .
   ```

---

## **Krok 4: Spuštění Docker kontejneru**

1. Spustí kontejner:

   ```bash
   docker run -d -p 5000:5000 <<nazev-aplikace>>
   ```

2. Následná aplikace může být dostupná například pomocí prohlížeče:

   ```text
   http://localhost:5000
   ```

---

## **Práce s Docker Compose**

1. Vytvoření soubor `docker-compose.yml` - např. pro postgresql:

   ```yaml
   services:
     db:
       image: postgres # - definuje image
       restart: always # - vždy se restartuje
       environment:
       POSTGRES_PASSWORD: ChangemePlease # - heslo do databáze
       volumes:
         - pgdata:/var/lib/postgresql/data
           # uložení dat do lokálního file systému
           # v našem případě do: /var/lib/postgresql/data
   ```

2. Spuštění všeho za pomoci jednoho příkazu:

   ```bash
   docker compose up -d
   ```

---

## **Užitečné Docker příkazy**

- **Zobrazení běžících kontejnerů:**

  ```bash
  docker ps
  ```

- **Zastavení kontejneru:**

  ```bash
  docker stop <container_id>
  ```

- **Smazání kontejneru:**

  ```bash
  docker rm <container_id>
  ```

- **Smazání všech zastavených kontejnerů:**

  ```bash
  docker container prune
  ```
