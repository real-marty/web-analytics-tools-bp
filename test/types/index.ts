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
