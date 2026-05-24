import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { PWD_NOTE, BOT_NOTE, NAV_LINKS, COMPANY_NAV, KIPL_LEGAL_NAME } from "@/lib/site";
import { KIPL_OFFICES, KIPL_EMAILS, KIPL_PHONE } from "@/lib/kipl";
import kiplLogo from "@/assets/kipl-logo.png";
import { WHATSAPP_URL } from "./WhatsAppQR";
import { CLIENT_FACTS } from "@/lib/clientFacts";

const SiteFooter = () => {
  return (
    <footer className="mt-32 border-t border-stroke">
      <div className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={kiplLogo} alt="KIPL" className="h-9 w-auto" />
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted-2">
              One Agency. One Contract. Entire Maharashtra. Sole-agency access to MSRTC stations, buses,
              and digital media across 36 districts. Implemented by{" "}
              <span className="font-semibold text-ivory">{KIPL_LEGAL_NAME}</span>.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 border-t border-stroke pt-3 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-faint">
              <span className="h-1 w-1 rounded-sm bg-violet" /> KIPL · Outdoor Media
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="label-sm">Explore</div>
            <ul className="mt-5 space-y-2.5 text-[13.5px]">
              {NAV_LINKS.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-ivory hover:text-accent transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="label-sm">Company</div>
            <ul className="mt-5 space-y-2.5 text-[13.5px]">
              {COMPANY_NAV.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-ivory hover:text-accent transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="label-sm">Direct</div>
            <ul className="mt-5 space-y-3 text-[13.5px] text-ivory">
              {KIPL_EMAILS.map((e) => (
                <li key={e} className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 shrink-0 text-accent" /><a href={`mailto:${e}`} className="break-all hover:text-accent">{e}</a></li>
              ))}
              <li className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-accent" /><a href={`tel:+91${KIPL_PHONE}`} className="hover:text-accent">{CLIENT_FACTS.contactPhoneDisplay}</a></li>
              <li className="flex items-center gap-2.5"><MessageCircle className="h-3.5 w-3.5 text-accent" /><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-accent">WhatsApp KIPL</a></li>
            </ul>
            <div className="mt-6 space-y-3 text-[12px] leading-relaxed text-muted-2">
              <div><span className="font-semibold text-ivory">{KIPL_OFFICES[0].label}</span><br/>{KIPL_OFFICES[0].lines.join(", ")}</div>
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-2 border-t border-stroke pt-6 text-[11.5px] leading-relaxed text-faint">
          <p><span className="font-semibold text-muted-2">Important · </span>{PWD_NOTE}</p>
          <p><span className="font-semibold text-muted-2">Depot conditions · </span>{BOT_NOTE}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-[11.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {KIPL_LEGAL_NAME}. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-accent">Privacy</Link>
            <Link to="/terms" className="hover:text-accent">Terms</Link>
            <Link to="/disclaimer" className="hover:text-accent">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
