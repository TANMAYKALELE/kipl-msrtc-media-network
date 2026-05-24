import { CLIENT_FACTS, TRUST_STATS as APPROVED_TRUST_STATS } from "./clientFacts";

export const NAV_LINKS = [
  { to: "/solutions", label: "Solutions" },
  { to: "/reach", label: "Reach" },
  { to: "/proof", label: "Proof" },
  { to: "/how-it-works", label: "How It Works" },
] as const;

export const COMPANY_NAV = [
  { to: "/about-kipl", label: "About KIPL" },
  { to: "/contact", label: "Contact Us" },
] as const;

export const KIPL_LEGAL_NAME = CLIENT_FACTS.implementer;

export const CONTACT = {
  email: CLIENT_FACTS.contactEmail,
  phone: CLIENT_FACTS.contactPhoneDisplay,
  whatsapp: `+${CLIENT_FACTS.whatsappNumber}`,
  address: "Ch. Sambhajinagar, Maharashtra, India",
  hours: "Mon–Sat · 10:00–19:00 IST",
};

export const PWD_NOTE =
  "Roadside shelters (pickup sheds) are under the PWD Department and are not included in this advertising inventory. Media coverage is limited to MSRTC bus stations, depots, and buses.";

export const BOT_NOTE =
  "Some depots are under BOT or have BOT history. Availability and conditions are determined depot-wise.";

export const TRUST_STATS = APPROVED_TRUST_STATS;
