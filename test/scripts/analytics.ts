// ─────────────────────────────────────────────────────────────
// Imports
// ─────────────────────────────────────────────────────────────
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import websites from '../data/list-sites.json';
import proxies from '../data/proxy-1.json';
import type { Website, ProxyInfo } from '../types';
import { BRAVE_EXECUTABLE_PATH } from '../constants';

// ─────────────────────────────────────────────────────────────
// Data Setup
// ─────────────────────────────────────────────────────────────
// Cast the imported JSON data to our interfaces.
const websiteList: Website[] = websites;
const proxyList: ProxyInfo[] = proxies;

const browser = process.argv[2] || 'default-browser';





(async () => {
    // Use 10 proxies (ensure your proxy list contains at least 10 entries).
    const selectedProxies: ProxyInfo[] = proxyList.slice(0, 1);

    // Function to simulate a single visitor.
    async function simulateVisit(proxyConfig: ProxyInfo, userId: number): Promise<void> {
        // Construct the proxy string using the first protocol (e.g., socks4 or socks5).
        // const protocol: string = proxyConfig.protocols[0];
        // const proxyServer: string = `${protocol}://${proxyConfig.ip}:${proxyConfig.port}`;
        // console.log(`User ${userId}: Using proxy ${proxyServer}`);

        // Launch the browser (using Brave with the adblocker enabled).
        const browser = await chromium.launch({
            headless: false,
            // executablePath: BRAVE_EXECUTABLE_PATH,
            proxy: {
                // server: 'http://gate.smartproxy.com:7000',
                server: 'http://45.202.79.181:3128',
                // username: 'spckg7bvq4',
                // password: '28dA7YVithfV0ks=es',
            },
        });
        // const browser = await chromium.launch({
        // headless: false,
        // proxy: {
        //     server: 'socks5h://spxes4qcig:oc_sH3tHzGycgN08w3@gate.smartproxy.com:7000', 
        //     // username: 'spxes4qcig',
        //     // password: 'oc_sH3tHzGycgN08w3',
        // },
        // });

        // const context: BrowserContext = await browser.newContext();
        // const page: Page = await context.newPage();

        // // Randomly choose 2 distinct websites.
        // const indices: number[] = [];
        // while (indices.length < 2) {
        //   const randomIndex: number = Math.floor(Math.random() * websiteList.length);
        //   if (!indices.includes(randomIndex)) {
        //     indices.push(randomIndex);
        //   }
        // }


        const context = await browser.newContext();
        const page = await context.newPage();

        // 🔇 Block all images
        await page.route('**/*', (route) => {
            const request = route.request();
            const url = request.url().toLowerCase();
            const resourceType = request.resourceType();

            // Block by resource type
            const blockedTypes = ['image', 'stylesheet', 'font', 'media'];

            // Block by file extension or specific URLs
            const blockedExtensions = ['.webp', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.svg', '.ico', '.x-icon'];

            if (
                blockedTypes.includes(resourceType) ||
                blockedExtensions.some(ext => url.endsWith(ext))
            ) {
                route.abort();
            } else {
                route.continue();
            }
        });

        // Navigate to IP test page
        await page.goto('https://b8g408o4kgcw48kssw080s4g.kuori.cz/', { waitUntil: 'domcontentloaded' });

        // Wait for 6 seconds
        await page.waitForTimeout(600000);

        await browser.close();

        // Navigate to the first site.
        const firstSite: Website = websiteList[0];
        console.log(`User ${userId}: Navigating to ${firstSite.url}`);
        await page.goto(firstSite.url);

        // Try clicking on the element with the href value from the first site.
        try {
            await page.click(`a[href="${firstSite.href}"]`, { timeout: 50000 });
            console.log(`User ${userId}: Clicked link with href "${firstSite.href}" on first site.`);
        } catch (e) {
            console.log(`User ${userId}: Link with href "${firstSite.href}" not found on first site.`);
        }

        // Navigate to the second site.
        const secondSite: Website = websiteList[indices[1]];
        console.log(`User ${userId}: Navigating to ${secondSite.url}`);
        await page.goto(secondSite.url);

        await page.waitForTimeout(6000);

        // Try clicking on the element with the href value from the second site.
        try {
            await page.click(`a[href="${secondSite.href}"]`, { timeout: 50000 });
            console.log(`User ${userId}: Clicked link with href "${secondSite.href}" on second site.`);
        } catch (e) {
            console.log(`User ${userId}: Link with href "${secondSite.href}" not found on second site.`);
        }

        await browser.close();
        console.log(`User ${userId}: Simulation complete.`);
    }


    //todo - run chromium or brave
    if (browser === 'brave') {
        console.log('Running Brave analytics...');
        // Brave-specific logic
    } else {
        console.log('Running Chromium analytics...');
        // Chromium-specific logic
    }

    const simulations: Promise<void>[] = selectedProxies.map((proxyConfig, index) =>
        simulateVisit(proxyConfig, index + 1)
    );
    await Promise.all(simulations);

})();
