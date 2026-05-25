import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Send, Briefcase } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
import { cardHover, cardHoverReset, buttonHover, staggerContainer, fadeUp, viewportReveal, safeVariants } from "@/lib/motion";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const reduce = useReducedMotion();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    data["_subject"] = "New KIPL Contact Enquiry";
    data["_template"] = "table";
    data["_captcha"] = "false";

    try {
      const response = await fetch("https://formsubmit.co/ajax/contactus@kiploutdoormedia.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        formEl.reset();
        toast.success("Message received", { description: "Our team will get back to you within one business day." });
      } else {
        toast.error("Submission failed", { description: "There was an issue sending your message. Please try WhatsApp." });
      }
    } catch (err) {
      toast.error("Submission error", { description: "Network error. Please try direct email or WhatsApp." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="label-amber">Contact Us</div>
              <h1 className="mt-6 h-display text-ivory max-w-4xl">Talk to the team behind the MSRTC Media Network.</h1>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-4">
            <p className="lede max-w-md">{KIPL_LEGAL_NAME} — implementation agency for the MSRTC Media Network.</p>
          </Reveal>
        </div>
      </section>

      {/* Symmetric Offices Section */}
      <section className="section-y border-t border-stroke bg-surface-1/30">
        <div className="container-page">
          <Reveal>
            <div className="label-amber">Our Locations</div>
            <h2 className="mt-5 h-section">Visually balanced offices across Maharashtra.</h2>
          </Reveal>
          
          <motion.div
            variants={safeVariants(reduce, staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            {KIPL_OFFICES.map((o) => (
              <motion.div
                key={o.label}
                className="premium-panel flex flex-col justify-between p-8 sm:p-10 min-h-[240px]"
                variants={safeVariants(reduce, fadeUp)}
                whileHover={reduce ? undefined : cardHover}
                whileTap={reduce ? undefined : cardHoverReset}
              >
                <div>
                  <div className="label-amber flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {o.role}
                  </div>
                  <h3 className="mt-6 h-card text-ivory text-[22px] font-bold leading-tight">{o.label}</h3>
                  <address className="mt-4 not-italic text-[15px] leading-relaxed text-muted-2">
                    {o.lines.map((ln) => <div key={ln}>{ln}</div>)}
                  </address>
                </div>
                <div className="mt-6 border-t border-stroke/40 pt-4 flex items-center text-detail text-faint font-semibold uppercase tracking-[0.16em]">
                  Active Operations Hub
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Channels, Hiring, QR & Form */}
      <section className="section-y border-t border-stroke">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          {/* Left Column: Direct info, hiring, QR */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct channels */}
            <Reveal className="border-b border-stroke pb-6">
              <div className="label-sm">Direct channels</div>
              <motion.ul
                className="mt-4 space-y-4 text-[14px]"
                variants={safeVariants(reduce, staggerContainer)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
              >
                {KIPL_EMAILS.map((e) => (
                  <motion.li
                    key={e}
                    className="flex items-center gap-3"
                    variants={safeVariants(reduce, fadeUp)}
                  >
                    <Mail className="h-4 w-4 text-accent shrink-0" />
                    <a href={`mailto:${e}`} className="text-ivory hover:text-accent font-semibold transition-colors break-all">{e}</a>
                  </motion.li>
                ))}
                <motion.li className="flex items-center gap-3" variants={safeVariants(reduce, fadeUp)}>
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <a href={`tel:+91${KIPL_PHONE}`} className="text-ivory hover:text-accent font-semibold transition-colors">{CLIENT_FACTS.contactPhoneDisplay}</a>
                </motion.li>
                <motion.li className="flex items-center gap-3" variants={safeVariants(reduce, fadeUp)}>
                  <MessageCircle className="h-4 w-4 text-accent shrink-0" />
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-ivory hover:text-accent font-semibold transition-colors">WhatsApp KIPL</a>
                </motion.li>
                <motion.li className="flex items-center gap-3 text-muted-2" variants={safeVariants(reduce, fadeUp)}>
                  <Clock className="h-4 w-4 text-accent shrink-0" />
                  Mon–Sat · 10:00–19:00 IST
                </motion.li>
              </motion.ul>
            </Reveal>

            {/* Hiring panel */}
            <Reveal>
              <motion.div
                className="premium-panel p-8"
                whileHover={reduce ? undefined : cardHover}
                whileTap={reduce ? undefined : cardHoverReset}
              >
                <div className="label-amber flex items-center gap-2"><Briefcase className="h-3.5 w-3.5" /> We're Hiring</div>
                <h3 className="mt-4 h-card text-ivory text-[18px]">Join the KIPL team.</h3>
                <p className="mt-3 text-body-sm leading-relaxed text-muted-2">{CLIENT_FACTS.hiring}</p>
              </motion.div>
            </Reveal>

            {/* WhatsApp QR */}
            <Reveal>
              <motion.div
                whileHover={reduce ? undefined : cardHover}
                whileTap={reduce ? undefined : cardHoverReset}
              >
                <WhatsAppQR />
              </motion.div>
            </Reveal>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <Reveal className="premium-panel p-8 sm:p-10">
              <div className="label-amber">Send a message</div>
              <h2 className="mt-5 h-section text-ivory text-[28px] sm:text-[34px] leading-tight">For partnerships, media plans, and government engagements.</h2>
              <p className="mt-4 text-body-sm text-muted-2">Share your details and the KIPL team will respond within one business day.</p>

              <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="name" className="label-sm">Name</Label><Input id="name" name="name" required autoComplete="name" /></div>
                <div className="space-y-2"><Label htmlFor="company" className="label-sm">Company</Label><Input id="company" name="company" required autoComplete="organization" /></div>
                <div className="space-y-2"><Label htmlFor="email" className="label-sm">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" /></div>
                <div className="space-y-2"><Label htmlFor="phone" className="label-sm">Phone</Label><Input id="phone" name="phone" type="tel" required autoComplete="tel" /></div>
                <div className="sm:col-span-2 space-y-2"><Label htmlFor="message" className="label-sm">Message</Label><Textarea id="message" name="message" rows={5} required placeholder="Tell us about your campaign, partnership, or query." /></div>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
                  <motion.div whileHover={reduce ? undefined : buttonHover}>
                    <Button type="submit" size="lg" disabled={submitting} className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
                      {submitting ? "Sending…" : (<>Send Message <Send className="h-4 w-4" /></>)}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={reduce ? undefined : buttonHover}>
                    <Button asChild size="lg" variant="outline" className="rounded-sm border-stroke-strong bg-transparent text-ivory hover:bg-surface-2 hover:text-ivory">
                      <Link to="/get-media-plan">Get Media Plan <ArrowRight className="h-4 w-4" /></Link>
                    </Button>
                  </motion.div>
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
