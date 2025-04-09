// example website info
export interface Website {
  id: number;
  href: string;
  url: string;
  description: string;
}

//example proxy info
export interface ProxyInfo {
  _id: string;
  ip: string;
  anonymityLevel: string;
  asn: string;
  city: string;
  country: string;
  created_at: string;
  google: boolean;
  isp: string;
  lastChecked: number;
  latency: number;
  org: string;
  port: string;
  protocols: string[];
  region?: string | null | undefined;
  responseTime: number;
  speed: number;
  updated_at: string;
  workingPercent?: number | null; // now optional
  upTime: number;
  upTimeSuccessCount: number;
  upTimeTryCount: number;
}


/**
 * Interface for collecting metrics from each simulation.
 */
export interface SimulationMetrics {
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
