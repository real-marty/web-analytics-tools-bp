
// types
import type { SimulationMetrics } from '../types';
// utils
import { getWorkingProxies } from "../utils/proxy-tester";
import { simulateVisit } from "../utils/simulation";

// args
const browserType = process.argv[2] || 'default-browser';

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
