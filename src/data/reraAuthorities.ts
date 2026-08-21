export interface ReraAuthorityInfo {
  state: string;
  code: string;
  authorityName: string;
  shortName: string;
  officialPortal: string;
  projectSearchUrl: string;
  complaintUrl: string;
  numberPatternDescription: string;
}

export const RERA_AUTHORITIES: Record<string, ReraAuthorityInfo> = {
  maharashtra: {
    state: "Maharashtra",
    code: "MH",
    authorityName: "Maharashtra Real Estate Regulatory Authority",
    shortName: "MahaRERA",
    officialPortal: "https://maharera.maharashtra.gov.in",
    projectSearchUrl: "https://maharerait.mahaonline.gov.in",
    complaintUrl: "https://maharerait.mahaonline.gov.in",
    numberPatternDescription: "Begins with P5 followed by district code and registration sequence (e.g. P518000XXXXX)",
  },
  haryana: {
    state: "Haryana",
    code: "HR",
    authorityName: "Haryana Real Estate Regulatory Authority",
    shortName: "HRERA",
    officialPortal: "https://haryanarera.gov.in",
    projectSearchUrl: "https://haryanarera.gov.in/view_project/project_list",
    complaintUrl: "https://haryanarera.gov.in",
    numberPatternDescription: "Issued by Gurugram (GGM) or Panchkula (PKL) branch (e.g. RC/REP/HARERA/GGM/XXXX/XXXX)",
  },
  karnataka: {
    state: "Karnataka",
    code: "KA",
    authorityName: "Karnataka Real Estate Regulatory Authority",
    shortName: "RERA Karnataka",
    officialPortal: "https://rera.karnataka.gov.in",
    projectSearchUrl: "https://rera.karnataka.gov.in/viewAllProjects",
    complaintUrl: "https://rera.karnataka.gov.in",
    numberPatternDescription: "Begins with PRM/KA/RERA followed by registration code (e.g. PRM/KA/RERA/1251/XXXX/PR/XXXXXX)",
  },
  "uttar pradesh": {
    state: "Uttar Pradesh",
    code: "UP",
    authorityName: "Uttar Pradesh Real Estate Regulatory Authority",
    shortName: "UP RERA",
    officialPortal: "https://www.up-rera.in",
    projectSearchUrl: "https://www.up-rera.in/projects",
    complaintUrl: "https://www.up-rera.in",
    numberPatternDescription: "Begins with UPRERAPRJ followed by project sequence (e.g. UPRERAPRJXXXXX)",
  },
  delhi: {
    state: "Delhi",
    code: "DL",
    authorityName: "Real Estate Regulatory Authority for NCT of Delhi",
    shortName: "Delhi RERA",
    officialPortal: "https://rera.delhi.gov.in",
    projectSearchUrl: "https://rera.delhi.gov.in/project-search",
    complaintUrl: "https://rera.delhi.gov.in",
    numberPatternDescription: "Begins with DLRERA followed by registration digits (e.g. DLRERAXXXXX)",
  },
  gujarat: {
    state: "Gujarat",
    code: "GJ",
    authorityName: "Gujarat Real Estate Regulatory Authority",
    shortName: "GujRERA",
    officialPortal: "https://gujrera.gujarat.gov.in",
    projectSearchUrl: "https://gujrera.gujarat.gov.in",
    complaintUrl: "https://gujrera.gujarat.gov.in",
    numberPatternDescription: "Begins with PR/GJ/ followed by district and registration code (e.g. PR/GJ/AHMEDABAD/XXXX/XXXXXX)",
  },
  telangana: {
    state: "Telangana",
    code: "TS",
    authorityName: "Telangana State Real Estate Regulatory Authority",
    shortName: "TS RERA",
    officialPortal: "https://rera.telangana.gov.in",
    projectSearchUrl: "https://rera.telangana.gov.in/search-project",
    complaintUrl: "https://rera.telangana.gov.in",
    numberPatternDescription: "Begins with P0 followed by registration sequence (e.g. P024000XXXXX)",
  },
  "tamil nadu": {
    state: "Tamil Nadu",
    code: "TN",
    authorityName: "Tamil Nadu Real Estate Regulatory Authority",
    shortName: "TNRERA",
    officialPortal: "https://www.rera.tn.gov.in",
    projectSearchUrl: "https://www.rera.tn.gov.in/registered-projects",
    complaintUrl: "https://www.rera.tn.gov.in",
    numberPatternDescription: "Begins with TN/ followed by building/layout type and year (e.g. TN/29/Building/XXXX/XXXX)",
  },
  rajasthan: {
    state: "Rajasthan",
    code: "RJ",
    authorityName: "Rajasthan Real Estate Regulatory Authority",
    shortName: "RajRERA",
    officialPortal: "https://rera.rajasthan.gov.in",
    projectSearchUrl: "https://rera.rajasthan.gov.in/Projects",
    complaintUrl: "https://rera.rajasthan.gov.in",
    numberPatternDescription: "Begins with RAJ/P/ followed by year and sequence (e.g. RAJ/P/2023/XXXX)",
  },
  "madhya pradesh": {
    state: "Madhya Pradesh",
    code: "MP",
    authorityName: "Madhya Pradesh Real Estate Regulatory Authority",
    shortName: "MP RERA",
    officialPortal: "https://rera.mp.gov.in",
    projectSearchUrl: "https://rera.mp.gov.in/projects",
    complaintUrl: "https://rera.mp.gov.in",
    numberPatternDescription: "Begins with P- followed by district and registration digits (e.g. P-BPL-XX-XXXX)",
  },
  goa: {
    state: "Goa",
    code: "GA",
    authorityName: "Goa Real Estate Regulatory Authority",
    shortName: "Goa RERA",
    officialPortal: "https://rera.goa.gov.in",
    projectSearchUrl: "https://rera.goa.gov.in",
    complaintUrl: "https://rera.goa.gov.in",
    numberPatternDescription: "Begins with PRGO followed by registration digits (e.g. PRGOXXXXXXXX)",
  },
};

export const getAuthorityForState = (stateName?: string): ReraAuthorityInfo | null => {
  if (!stateName) return null;
  const key = stateName.trim().toLowerCase();
  return RERA_AUTHORITIES[key] || null;
};
