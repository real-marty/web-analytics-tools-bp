import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { readFileLines } from './reader'; // Adjust the import path as necessary

async function testProxy(rawProxy: string): Promise<boolean> {
    const proxyUrl = `http://${rawProxy}`;
    const agent = new HttpsProxyAgent(proxyUrl);

    try {
        const response = await axios.get('https://api.ipify.org?format=json', {
            httpsAgent: agent,
            timeout: 5000,
        });

        console.log(`✅ Working proxy: ${proxyUrl} → IP: ${response.data.ip}`);
        return true;
    } catch (error) {
        console.log(`❌ Failed proxy: ${proxyUrl}`);
        return false;
    }
}

export async function getWorkingProxies(filePath: string): Promise<string[]> {
    const rawProxies = await readFileLines(filePath);
    const workingProxies: string[] = [];

    for (const rawProxy of rawProxies) {
        const ok = await testProxy(rawProxy);
        if (ok) workingProxies.push(rawProxy);
    }

    return workingProxies;
}