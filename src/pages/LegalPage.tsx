import { PWD_NOTE } from "@/lib/site";

interface Props { kind: "privacy" | "terms" | "disclaimer" }

const COPY: Record<Props["kind"], { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "We respect your privacy. Information you submit through our forms is used solely to prepare and discuss media plans with you.",
      "We do not sell or share your details with third parties outside of fulfilment partners required to deliver your campaign.",
      "You may request deletion of your details at any time by contacting us.",
    ],
  },
  terms: {
    title: "Terms",
    body: [
      "Quotations and availability are valid for the period stated in writing and depend on rollout timelines and operational readiness.",
      "Campaign bookings are governed by the contract signed between client and agency. All physical and digital deployments are subject to applicable depot and operational conditions.",
      "Payment terms, cancellation, and creative deadlines are specified in the booking order.",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    body: [
      PWD_NOTE,
      "Some depots are under BOT or have BOT history. Availability and conditions are determined depot-wise.",
      "Some media formats are being introduced in phases; our team will guide you on currently active options and upcoming opportunities based on your campaign timeline.",
    ],
  },
};

const LegalPage = ({ kind }: Props) => {
  const c = COPY[kind];
  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <h1 className="h-section">{c.title}</h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
          {c.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
};

export default LegalPage;