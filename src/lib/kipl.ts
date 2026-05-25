import { CLIENT_FACTS } from "./clientFacts";

export const KIPL = {
  legalName: CLIENT_FACTS.implementer,
  shortName: "KIPL",
  tagline: "Implementation, infrastructure, monitoring, and execution agency behind the MSRTC Media Network.",
  established: "2012",
  incorporation: "Incorporated under the Companies Act, 1956",
  employees: "225",
  employeesLabel: CLIENT_FACTS.kiplEmployees,
  experienceYears: "14+",
  experienceLabel: CLIENT_FACTS.kiplExperience,
  companyDistricts: CLIENT_FACTS.companyDistricts,
  deployments: "6500+",
  supportPros: "225",
  uptimeProof: "99.99%",
  uptimeProofWindow: "over 5 years",
  uptimeGuarantee: "98%",
};

export const KIPL_OFFICES = [
  {
    label: "Ch. Sambhajinagar Office",
    role: "Head Office",
    lines: [
      "Plot No. 25, Flat No. 5, 2nd Floor",
      "Saisakha Apartment",
      "Shardashram Colony",
      "Ch. Sambhajinagar - 431001",
    ],
  },
  {
    label: "Mumbai Office",
    role: "Branch Office",
    lines: [
      "177, Prem Kutir, Ground Floor",
      "Babu Bhai Chinai Marg",
      "Behind LIC (Yogkshema), Nariman Point",
      "Mumbai - 400021",
    ],
  },
] as const;

export const KIPL_EMAILS = [CLIENT_FACTS.contactEmail] as const;
export const KIPL_PHONE = "9850999958";

export const KIPL_PROJECTS = [
  {
    name: "Maharashtra Traffic eChallan System",
    desc: "Statewide digital traffic enforcement platform delivered for the Government of Maharashtra.",
  },
  {
    name: "Cyber Forensic Labs",
    desc: "Forensic technology infrastructure built for law enforcement and government investigation needs.",
  },
  {
    name: "Digital Eco-Friendly Wall Painting",
    desc: "Sustainable, large-format public communication using eco-conscious materials and processes.",
  },
  {
    name: "Variable Messaging Systems",
    desc: "Dynamic public information displays deployed across government and transit environments.",
  },
] as const;

export const KIPL_STRENGTHS = [
  { key: "speed", label: "Speed", desc: "Rapid deployment timelines across large, distributed networks." },
  { key: "partnership", label: "Partnership", desc: "Long-horizon collaboration with government and public-sector clients." },
  { key: "integrity", label: "Integrity", desc: "Transparent operations and accountable delivery." },
  { key: "excellence", label: "Excellence", desc: "Engineering precision and operational discipline." },
  { key: "trust", label: "Trust", desc: "Proven government-grade reliability over 14+ years." },
  { key: "confidentiality", label: "Confidentiality", desc: "Secure handling of sensitive infrastructure and data." },
] as const;

export const KIPL_TECH_STACK = [
  "Dedicated electricity meters",
  "Independent high-speed broadband",
  "PSU and SIM-based internet",
  "ELCB and proper earthing",
  CLIENT_FACTS.monitoring,
  "Cloud-based infrastructure",
  "24/7 support",
  "Redundancy and failover logic",
] as const;

export const KIPL_PASSENGER_FEATURES = [
  "Dedicated call centre",
  "QR code helpdesk for complaint, suggestion and feedback",
  "Chatbot-integrated helpline",
  "Bilingual passenger information",
  "Next-stop alerts",
  "Mobile charging kiosks",
  "1% digital media space for Women Safety at no cost",
] as const;

export const KIPL_PARTNERSHIP_BENEFITS = [
  "98% system uptime",
  "Zero infrastructure cost",
  "Passenger satisfaction",
  "Secured digital experience",
  "Focus on women safety",
  "QR code helpdesk",
  "Mobile charging kiosks",
  "Integrated software system",
] as const;

export const KIPL_WHY_PARTNER = [
  { title: "Strategic partnership", desc: "Aligned, multi-year engagement built around MSRTC's network priorities." },
  { title: "Market leadership", desc: "Specialized leadership in digital advertising infrastructure across Maharashtra." },
  { title: "Technical capability", desc: "In-house IT team, cloud backbone, and proven large-scale execution." },
  { title: "Financial stability", desc: "Capex and Opex borne by KIPL — zero infrastructure liability for MSRTC." },
] as const;

export const KIPL_UVP = [
  {
    title: "Zero Liability Model",
    desc: "KIPL bears Capex and Opex; MSRTC receives pure advertising revenue without infrastructure burden.",
  },
  {
    title: "Proven Track Record",
    desc: "6500+ successful deployments in Maharashtra, with 99.99% uptime over 5 years on critical infrastructure.",
  },
  {
    title: "Sustainability & Innovation",
    desc: "State-of-the-art materials with UV resistance, real-time analytics, location-based tracking, and future-ready cloud infrastructure.",
  },
] as const;
