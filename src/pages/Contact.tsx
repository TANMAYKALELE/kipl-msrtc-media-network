import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Send, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import WhatsAppQR, { WHATSAPP_URL } from "@/components/WhatsAppQR";
import { KIPL_OFFICES, KIPL_EMAILS, KIPL_PHONE } from "@/lib/kipl";
import { KIPL_LEGAL_NAME } from "@/lib/site";
import { CLIENT_FACTS } from "@/lib/clientFacts";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message received", { description: "Our team will get back to you within one business day." });
    }, 600);
  };

  return (
    <>
      <section className="pt-36 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="label-amber">Contact Us</div>
              <h1 className="mt-6 h-display text-ivory max-w-4xl">Talk to the team behind the MSRTC Media Network.</h1>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-4">
            <p className="lede max-w-md">{KIPL_LEGAL_NAME} — implementation partner for the MSRTC Media Network.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-stroke">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            {KIPL_OFFICES.map((o, i) => (
              <Reveal key={o.label} delay={i * 80} className="border-b border-stroke pb-6">
                <div className="label-amber flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {o.role}</div>
                <h3 className="mt-4 h-card text-ivory text-[18px]">{o.label}</h3>
                <address className="mt-3 not-italic text-[14px] leading-relaxed text-muted-2">
                  {o.lines.map((ln) => <div key={ln}>{ln}</div>)}
                </address>
              </Reveal>
            ))}

            <Reveal delay={200} className="border-b border-stroke pb-6">
              <div className="label-sm">Direct channels</div>
              <ul className="mt-4 space-y-3 text-[14px]">
                {KIPL_EMAILS.map((e) => (
                  <li key={e} className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /><a href={`mailto:${e}`} className="text-ivory hover:text-accent">{e}</a></li>
                ))}
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /><a href={`tel:+91${KIPL_PHONE}`} className="text-ivory hover:text-accent">{CLIENT_FACTS.contactPhoneDisplay}</a></li>
                <li className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-accent" /><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-ivory hover:text-accent">WhatsApp KIPL</a></li>
                <li className="flex items-center gap-3 text-muted-2"><Clock className="h-4 w-4 text-accent" /> Mon–Sat · 10:00–19:00 IST</li>
              </ul>
            </Reveal>

            <Reveal delay={240} className="premium-panel p-7">
              <div className="label-amber flex items-center gap-2"><Briefcase className="h-3.5 w-3.5" /> We're Hiring</div>
              <h3 className="mt-4 h-card text-ivory text-[18px]">Join the KIPL team.</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-2">{CLIENT_FACTS.hiring}</p>
            </Reveal>

            <Reveal delay={300}><WhatsAppQR /></Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal className="premium-panel p-8 sm:p-10">
              <div className="label-amber">Send a message</div>
              <h2 className="mt-5 h-section text-ivory text-[28px] sm:text-[34px]">For partnerships, media plans, and government engagements.</h2>
              <p className="mt-4 text-[14px] text-muted-2">Share a few details and the KIPL team will respond within one business day.</p>

              <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="name" className="label-sm">Name</Label><Input id="name" name="name" required autoComplete="name" /></div>
                <div className="space-y-2"><Label htmlFor="company" className="label-sm">Company</Label><Input id="company" name="company" required autoComplete="organization" /></div>
                <div className="space-y-2"><Label htmlFor="email" className="label-sm">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" /></div>
                <div className="space-y-2"><Label htmlFor="phone" className="label-sm">Phone</Label><Input id="phone" name="phone" type="tel" required autoComplete="tel" /></div>
                <div className="sm:col-span-2 space-y-2"><Label htmlFor="message" className="label-sm">Message</Label><Textarea id="message" name="message" rows={5} required placeholder="Tell us about your campaign, partnership, or query." /></div>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
                  <Button type="submit" size="lg" disabled={submitting} className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
                    {submitting ? "Sending…" : (<>Send Message <Send className="h-4 w-4" /></>)}
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-sm border-stroke-strong bg-transparent text-ivory hover:bg-surface-2 hover:text-ivory">
                    <Link to="/get-media-plan">Get Media Plan <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Let's Partner for Success"
        title="One Agency. One Contract. Entire Maharashtra."
        subtitle="Get a tailored Maharashtra transit media plan — implemented by KIPL."
        primaryLabel="Get Media Plan"
        secondary={{ to: "/about-kipl", label: "About KIPL" }}
      />
    </>
  );
};

export default Contact;
