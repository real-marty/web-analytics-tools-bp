import { BRAVE_EXECUTABLE_PATH } from '../constants';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

import { readFileLines } from "./reader";

import type { SimulationMetrics, Website } from '../types';

import websites from '../data/list-sites.json';

// Cast the imported JSON data to our interface.
const websiteList: Website[] = websites;

/**
 * Simulates a visit using a given proxy and collects various metrics.
 *
 * The dwell time for each visited page is randomly simulated between 2000 and 10000 ms.
 * For sessions that only visit one page, we consider the single-page dwell time as the bounce time.
 *
 * @param proxyConfig - The proxy server string (e.g. "http://45.202.79.181:3128").
 * @param userId - An identifier for logging purposes.
 * @param browserType - Either 'brave' (using Brave’s executable) or 'chromium' (default).
 * @returns A Promise that resolves to a SimulationMetrics object.
 */
export async function simulateVisit(
    proxyConfig: string,
    userId: number,
    browserType: string
): Promise<SimulationMetrics> {
    const simulationStartTime = Date.now();
    const simulationMetrics: SimulationMetrics = {
        userId,
        proxy: proxyConfig,
        sitesVisited: 0,
        successfulClicks: 0,
        failedClicks: 0,
        visitedSites: {},
        totalDwellTimeMs: 0,
        dwellTimes: [],
        durationMs: 0,
    };

    let browser: Browser;
    if (browserType === 'brave') {
        browser = await chromium.launch({
            headless: false,
            executablePath: BRAVE_EXECUTABLE_PATH,
            proxy: { server: proxyConfig },
        });
    } else {
        browser = await chromium.launch({
            headless: false,
            proxy: { server: proxyConfig },
        });
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    // // Block images, styles, fonts, and media.
    // await page.route('**/*', (route) => {
    //     const request = route.request();
    //     const url = request.url().toLowerCase();
    //     const resourceType = request.resourceType();
    //     const blockedTypes = ['image', 'stylesheet', 'font', 'media'];
    //     const blockedExtensions = ['.webp', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.svg', '.ico', '.x-icon'];
    //     if (
    //         blockedTypes.includes(resourceType) ||
    //         blockedExtensions.some(ext => url.endsWith(ext))
    //     ) {
    //         route.abort();
    //     } else {
    //         route.continue();
    //     }
    // });

    // Step 1: Navigate to an IP test page.
    console.log(`User ${userId}: Navigating to the IP test page.`);
    await page.goto('https://b8g408o4kgcw48kssw080s4g.kuori.cz/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Step 2: Randomly determine the number of website visits (between 1 and 5).
    const numberOfVisits = Math.floor(Math.random() * 5) + 1;
    simulationMetrics.sitesVisited = numberOfVisits;

    // Shuffle the website list and select a random subset equal to numberOfVisits.
    const shuffledWebsites = websiteList.sort(() => 0.5 - Math.random()).slice(0, numberOfVisits);

    for (const element of shuffledWebsites) {
        const site = element;
        console.log(`User ${userId}: Visiting ${site.url}`);
        try {
            // Navigate to the website.
            await page.goto(site.url, { waitUntil: 'domcontentloaded' });

            // Simulate a dwell time on the page.
            // Random dwell time between 2000 and 10000 milliseconds.
            const dwellTime = Math.floor(Math.random() * 8000) + 2000;
            console.log(`User ${userId}: Staying on ${site.url} for ${dwellTime} ms.`);
            await page.waitForTimeout(dwellTime);
            simulationMetrics.totalDwellTimeMs += dwellTime;
            simulationMetrics.dwellTimes.push(dwellTime);

            // Attempt to click the link on the website.
            await page.click(`a[href="${site.href}"]`, { timeout: 3000 });
            simulationMetrics.successfulClicks++;
            simulationMetrics.visitedSites[site.url] = (simulationMetrics.visitedSites[site.url] || 0) + 1;
            console.log(`User ${userId}: Clicked link with href "${site.href}" on ${site.url}`);
        } catch (e: any) {
            simulationMetrics.failedClicks++;
            console.log(`User ${userId}: Failed clicking link with href "${site.href}" on ${site.url} - ${e.message}`);
        }
    }

    await browser.close();
    const simulationEndTime = Date.now();
    simulationMetrics.durationMs = simulationEndTime - simulationStartTime;
    console.log(`User ${userId}: Simulation complete in ${simulationMetrics.durationMs} ms.`);
    return simulationMetrics;
}