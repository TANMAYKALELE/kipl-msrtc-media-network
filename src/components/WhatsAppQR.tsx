import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLIENT_FACTS } from "@/lib/clientFacts";

const PHONE = CLIENT_FACTS.whatsappNumber;
const MESSAGE = CLIENT_FACTS.whatsappMessage;

export const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&data=${encodeURIComponent(WHATSAPP_URL)}`;

const WhatsAppQR = () => (
  <div className="premium-panel p-7">
    <div className="label-amber flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</div>
    <h3 className="mt-4 h-card text-ivory text-lg">Scan to chat with KIPL</h3>
    <p className="mt-2 text-[13.5px] text-muted-2">Opens WhatsApp with a pre-filled enquiry message.</p>
    <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
      <div className="grid h-36 w-36 shrink-0 place-items-center rounded-sm border border-dashed border-accent/40 bg-background p-2">
        <img src={QR_SRC} alt="QR code that opens WhatsApp chat with KIPL" className="h-full w-full"
          loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
      </div>
      <div className="space-y-3">
        <p className="label-sm">Or tap below</p>
        <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
        </Button>
        <p className="text-[11px] text-faint">{CLIENT_FACTS.contactPhoneDisplay} · Mon–Sat</p>
      </div>
    </div>
  </div>
);

export default WhatsAppQR;
