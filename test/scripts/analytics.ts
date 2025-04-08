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
 * Interface for collecting metrics from each simulation.
 */
interface SimulationMetrics {
    userId: number;
    proxy: string;
    sitesVisited: number;          // Number of website visits attempted
    successfulClicks: number;
    failedClicks: number;
    visitedSites: { [siteUrl: string]: number };  // Distribution of clicks per site
    totalDwellTimeMs: number;      // Total dwell time (in ms) for all visited sites in the simulation
    dwellTimes: number[];          // Array of dwell times (in ms) for each site visited
    durationMs: number;            // Duration of the entire simulation
}

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
async function simulateVisit(
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

    // Step 2: Randomly determine the number of website visits (between 1 and 5).
    const numberOfVisits = Math.floor(Math.random() * 5) + 1;
    simulationMetrics.sitesVisited = numberOfVisits;

    // Shuffle the website list and select a random subset equal to numberOfVisits.
    const shuffledWebsites = websiteList.sort(() => 0.5 - Math.random()).slice(0, numberOfVisits);

    for (let i = 0; i < shuffledWebsites.length; i++) {
        const site = shuffledWebsites[i];
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
                        resolve({
                            userId: index + 1,
                            proxy: proxyConfig,
                            sitesVisited: 0,
                            successfulClicks: 0,
                            failedClicks: 0,
                            visitedSites: {},
                            totalDwellTimeMs: 0,
                            dwellTimes: [],
                            durationMs: 0,
                        });
                    });
            }, delayMs);
        });
    });

    // Wait for all simulations to complete.
    const metricsArray = await Promise.all(simulations);

    // Aggregation of global metrics.
    const totalSimulations = metricsArray.length;
    const goodProxies = selectedProxies.length;
    const totalSitesVisited = metricsArray.reduce((acc, sim) => acc + sim.sitesVisited, 0);
    const totalSuccessfulClicks = metricsArray.reduce((acc, sim) => acc + sim.successfulClicks, 0);
    const totalFailedClicks = metricsArray.reduce((acc, sim) => acc + sim.failedClicks, 0);
    const totalClicks = totalSuccessfulClicks + totalFailedClicks;
    const successfulSimulations = metricsArray.filter(sim => sim.successfulClicks > 0).length;
    const totalDwellTime = metricsArray.reduce((acc, sim) => acc + sim.totalDwellTimeMs, 0);
    const averageDwellTimePerVisit = totalSitesVisited > 0 ? totalDwellTime / totalSitesVisited : 0;

    // Compute bounce sessions as those with only one visited site.
    const bounceSessions = metricsArray.filter(sim => sim.sitesVisited === 1);
    const totalBounceTime = bounceSessions.reduce((acc, sim) => acc + sim.totalDwellTimeMs, 0);
    const averageBounceTime = bounceSessions.length > 0 ? totalBounceTime / bounceSessions.length : 0;

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
    console.log(`Overall Click Success Rate: ${totalClicks > 0 ? ((totalSuccessfulClicks / totalClicks) * 100).toFixed(2) : 0}%`);
    console.log(`Total Dwell Time (all visits): ${totalDwellTime} ms`);
    console.log(`Average Dwell Time per Visit: ${averageDwellTimePerVisit.toFixed(0)} ms`);
    console.log(`\nBounce Sessions (only one page visited): ${bounceSessions.length}`);
    console.log(`Average Bounce Time (single-page dwell time): ${(averageBounceTime / 1000).toFixed(2)} seconds`);
    console.log("\nDistribution of clicks per site:");
    Object.entries(siteDistribution).forEach(([siteUrl, count]) => {
        console.log(`- ${siteUrl}: ${count} click(s)`);
    });
    console.log('-----------------------------------');
})();
