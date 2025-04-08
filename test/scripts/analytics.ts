import { BRAVE_EXECUTABLE_PATH } from '../constants';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
// types
import type { Website } from '../types';
// utils
import { readFileLines } from "../utils/reader";
import { getWorkingProxies } from "../utils/proxy-tester";
// data
import websites from '../data/list-sites.json';

// Cast the imported JSON data to our interface.
const websiteList: Website[] = websites;
const browserType = process.argv[2] || 'default-browser';

/**
 * Interface used to collect metrics from each simulation.
 */
interface SimulationMetrics {
    userId: number;
    proxy: string;
    sitesVisited: number; // number of website clicks attempted
    successfulClicks: number;
    failedClicks: number;
    visitedSites: { [siteUrl: string]: number }; // counts per site
    durationMs: number;
    bounce: boolean; // true if only one site was visited from websiteList
}

/**
 * Simulates a visit using a given proxy and collects various metrics.
 *
 * @param proxyConfig - The proxy server string (e.g. "http://45.202.79.181:3128").
 * @param userId - An identifier for logging purposes.
 * @param browserType - Either 'brave' (using Brave’s executable) or 'chromium' (default).
 * @returns A Promise that resolves to a SimulationMetrics object.
 */
async function simulateVisit(
    proxyConfig: string,
    userId: number,
    browserType: string
): Promise<SimulationMetrics> {
    const startTime = Date.now();
    const simulationMetrics: SimulationMetrics = {
        userId,
        proxy: proxyConfig,
        sitesVisited: 0,
        successfulClicks: 0,
        failedClicks: 0,
        visitedSites: {},
        durationMs: 0,
        bounce: false,
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

    // Block images, styles, fonts, and media.
    await page.route('**/*', (route) => {
        const request = route.request();
        const url = request.url().toLowerCase();
        const resourceType = request.resourceType();
        const blockedTypes = ['image', 'stylesheet', 'font', 'media'];
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

    // Step 1: Navigate to an IP test page.
    console.log(`User ${userId}: Navigating to the IP test page.`);
    await page.goto('https://b8g408o4kgcw48kssw080s4g.kuori.cz/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Step 2: Randomly determine a number of website clicks (1 to 5).
    const numberOfVisits = Math.floor(Math.random() * 5) + 1;
    simulationMetrics.sitesVisited = numberOfVisits;

    // Shuffle the website list and choose "numberOfVisits" sites.
    const shuffledWebsites = websiteList.sort(() => 0.5 - Math.random()).slice(0, numberOfVisits);

    for (let i = 0; i < shuffledWebsites.length; i++) {
        const site = shuffledWebsites[i];
        console.log(`User ${userId}: Visiting ${site.url}`);
        try {
            await page.goto(site.url, { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(2000);
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
    const endTime = Date.now();
    simulationMetrics.durationMs = endTime - startTime;
    // Define a bounce session as one with only one visited website (from the website list).
    simulationMetrics.bounce = (simulationMetrics.sitesVisited === 1);
    console.log(`User ${userId}: Simulation complete in ${simulationMetrics.durationMs} ms.`);
    return simulationMetrics;
}

(async () => {
    let simulations: Promise<SimulationMetrics>[] = [];

    // Retrieve working proxies.
    const working = await getWorkingProxies('./data/proxies.txt');
    console.log('\n✅ Final working proxies:', working);

    // Use a selection of working proxies (ensure you have enough proxies in your file).
    const selectedProxies: string[] = working.slice(0, 3);

    if (browserType !== 'brave' && browserType !== 'chromium') {
        console.log(`Invalid browser type. Please use 'brave' or 'chromium'.`);
        return;
    }

    // Distribute simulations evenly over one hour.
    const hourMs = 3600000; // One hour in milliseconds.
    simulations = selectedProxies.map((proxyConfig, index) => {
        // Calculate a delay to spread the simulations over the hour.
        const delayMs = Math.floor((hourMs / selectedProxies.length) * index);
        return new Promise<SimulationMetrics>((resolve) => {
            setTimeout(() => {
                simulateVisit(proxyConfig, index + 1, browserType)
                    .then(resolve)
                    .catch(err => {
                        console.error(`User ${index + 1}: Error during simulation - ${err}`);
                        // Return metrics with zeros in case of an error.
                        resolve({
                            userId: index + 1,
                            proxy: proxyConfig,
                            sitesVisited: 0,
                            successfulClicks: 0,
                            failedClicks: 0,
                            visitedSites: {},
                            durationMs: 0,
                            bounce: false,
                        });
                    });
            }, delayMs);
        });
    });

    // Wait for all simulations to complete.
    const metricsArray = await Promise.all(simulations);

    // Aggregate global metrics.
    const totalSimulations = metricsArray.length;
    const goodProxies = selectedProxies.length;
    const totalSitesVisited = metricsArray.reduce((acc, sim) => acc + sim.sitesVisited, 0);
    const totalSuccessfulClicks = metricsArray.reduce((acc, sim) => acc + sim.successfulClicks, 0);
    const totalFailedClicks = metricsArray.reduce((acc, sim) => acc + sim.failedClicks, 0);
    const totalClicks = totalSuccessfulClicks + totalFailedClicks;
    const successfulSimulations = metricsArray.filter(sim => sim.successfulClicks > 0).length;
    const bounceSessions = metricsArray.filter(sim => sim.bounce).length;
    const avgSimulationDuration = metricsArray.reduce((acc, sim) => acc + sim.durationMs, 0) / (totalSimulations || 1);
    const bounceRate = (bounceSessions / totalSimulations) * 100;
    const clickSuccessRate = totalClicks > 0 ? (totalSuccessfulClicks / totalClicks) * 100 : 0;

    // Aggregate a distribution of clicks per site.
    const siteDistribution: { [siteUrl: string]: number } = {};
    metricsArray.forEach(sim => {
        for (const [siteUrl, count] of Object.entries(sim.visitedSites)) {
            siteDistribution[siteUrl] = (siteDistribution[siteUrl] || 0) + count;
        }
    });

    // Print out aggregated metrics.
    console.log("\n--- Simulation Metrics Summary ---");
    console.log(`Good Proxies: ${goodProxies}`);
    console.log(`Total Simulations: ${totalSimulations}`);
    console.log(`Successful Simulations: ${successfulSimulations}`);
    console.log(`Total Sites Visited (attempted): ${totalSitesVisited}`);
    console.log(`Total Successful Clicks: ${totalSuccessfulClicks}`);
    console.log(`Total Failed Clicks: ${totalFailedClicks}`);
    console.log(`Overall Click Success Rate: ${clickSuccessRate.toFixed(2)}%`);
    console.log(`Bounce Sessions (only one page visited): ${bounceSessions} (${bounceRate.toFixed(2)}%)`);
    console.log(`Average Simulation Duration: ${avgSimulationDuration.toFixed(0)} ms`);
    console.log("\nDistribution of clicks per site:");
    Object.entries(siteDistribution).forEach(([siteUrl, count]) => {
        console.log(`- ${siteUrl}: ${count} click(s)`);
    });
    console.log('-----------------------------------');
})();
