import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, MessageCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import Reveal from "@/components/Reveal";
import { CLIENT_FACTS, MEDIA_INVENTORY } from "@/lib/clientFacts";
import { cn } from "@/lib/utils";

const goals = ["Brand Awareness", "Product Launch", "Local Promotion", "Statewide Campaign"] as const;
const budgets = ["Under 1L", "1L–5L", "5L–20L", "20L+"] as const;
const mediaOptions = [
  "Bus Stand Branding",
  "Digital Hoardings",
  "Grab Handles",
  "Hoardings",
  "Screens",
  "Social Media",
  "Not Sure / Need Recommendation",
] as const;

const schema = z.object({
  goal: z.enum(goals, { errorMap: () => ({ message: "Select a campaign goal." }) }),
  budget: z.enum(budgets, { errorMap: () => ({ message: "Select a budget range." }) }),
  media: z.enum(mediaOptions, { errorMap: () => ({ message: "Select a media preference." }) }),
  name: z.string().trim().min(2, "Enter your name.").max(80),
  company: z.string().trim().min(2, "Enter your company name.").max(120),
  email: z.string().trim().email("Enter a valid email.").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(20),
  district: z.string().trim().min(2, "Enter target city/district.").max(120),
  timeline: z.string().trim().min(2, "Enter campaign timeline.").max(120),
  message: z.string().trim().max(800).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const steps = ["Campaign Goal", "Budget", "Media Preference", "Campaign Details", "Review + Submit"] as const;

const stepFields: Record<number, (keyof FormValues)[]> = {
  1: ["goal"],
  2: ["budget"],
  3: ["media"],
  4: ["name", "company", "email", "phone", "district", "timeline"],
  5: [],
};

const spring = { duration: 0.24, ease: [0.2, 0.7, 0.2, 1] } as const;

const GetMediaPlan = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [routing, setRouting] = useState<{ mailto: string; whatsapp: string } | null>(null);
  const [searchParams] = useSearchParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      goal: undefined as unknown as FormValues["goal"],
      budget: undefined as unknown as FormValues["budget"],
      media: undefined as unknown as FormValues["media"],
      name: "",
      company: "",
      email: "",
      phone: "",
      district: "",
      timeline: "",
      message: "",
    },
  });

  useEffect(() => {
    const slug = searchParams.get("media");
    const matched = MEDIA_INVENTORY.find((item) => item.slug === slug);
    if (!matched) return;
    const mapped = mediaOptions.find((option) => matched.name.toLowerCase().includes(option.toLowerCase().split(" ")[0]));
    form.setValue("media", (mapped ?? "Not Sure / Need Recommendation") as FormValues["media"], { shouldValidate: true });
  }, [form, searchParams]);

  const goal = form.watch("goal");
  const budget = form.watch("budget");
  const media = form.watch("media");
  const progress = (step / steps.length) * 100;

  const leadSummary = useMemo(() => {
    if (step !== 5) return "";
    const data = form.getValues();
    const lines = [
      "Media Plan Requirement",
      "MSRTC Media Network",
      "",
      `Goal: ${data.goal || "-"}`,
      `Budget: ${data.budget || "-"}`,
      `Media Preference: ${data.media || "-"}`,
      `Name: ${data.name || "-"}`,
      `Company: ${data.company || "-"}`,
      `Email: ${data.email || "-"}`,
      `Phone: ${data.phone || "-"}`,
      `Target city/district: ${data.district || "-"}`,
      `Campaign timeline: ${data.timeline || "-"}`,
      data.message ? `Message: ${data.message}` : "Message: -",
    ];
    return lines.join("\n");
  }, [step, form]);

  const next = async () => {
    const ok = await form.trigger(stepFields[step]);
    if (ok) setStep((current) => Math.min(steps.length, current + 1));
  };

  const submit = form.handleSubmit(async (data) => {
    setSubmitting(true);
    const lines = [
      "Media Plan Requirement",
      "MSRTC Media Network",
      "",
      `Goal: ${data.goal}`,
      `Budget: ${data.budget}`,
      `Media Preference: ${data.media}`,
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Target city/district: ${data.district}`,
      `Campaign timeline: ${data.timeline}`,
      data.message ? `Message: ${data.message}` : null,
    ].filter(Boolean).join("\n");
    
    const subject = `Media Plan Requirement - ${data.company}`;
    
    const payload = {
      ...data,
      _subject: "New KIPL Media Plan Request",
      _template: "table",
      _captcha: "false"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/contactus@kiploutdoormedia.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setRouting({
          mailto: `mailto:${CLIENT_FACTS.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`,
          whatsapp: `https://wa.me/${CLIENT_FACTS.whatsappNumber}?text=${encodeURIComponent(lines)}`,
        });
        setSubmitted(true);
      } else {
        toast.error("Submission failed", { description: "Please use the WhatsApp or Email buttons below to send directly." });
      }
    } catch (err) {
      // Fallback in case of network issues so user doesn't lose their data
      setRouting({
        mailto: `mailto:${CLIENT_FACTS.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`,
        whatsapp: `https://wa.me/${CLIENT_FACTS.whatsappNumber}?text=${encodeURIComponent(lines)}`,
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  });

  if (submitted) {
    return (
      <section className="section-y">
        <div className="container-page max-w-3xl text-center">
          <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-status-live/15 text-status-live ring-1 ring-status-live/30">
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          <h1 className="mt-7 h-section">Your media plan request has been submitted successfully.</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-2">
            Thank you for reaching out. We have received your campaign requirements. If you would like to initiate discussion immediately, you can also forward a copy directly via Email or WhatsApp using the options below.
          </p>
          {routing && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
                <a href={routing.mailto}><Mail className="h-4 w-4" /> Send via Email</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-sm border-stroke-strong bg-transparent text-ivory hover:bg-surface-2 hover:text-ivory">
                <a href={routing.whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> Send via WhatsApp</a>
              </Button>
            </div>
          )}
          <p className="mt-5 text-xs text-faint">{CLIENT_FACTS.contactEmail} · {CLIENT_FACTS.contactPhoneDisplay}</p>
          <Button variant="ghost" size="lg" className="mt-6 text-ivory hover:bg-surface-2 hover:text-ivory" onClick={() => { setSubmitted(false); setRouting(null); setStep(1); form.reset(); }}>
            Submit another request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="label-amber">Get My Media Plan</div>
            <h1 className="mt-5 h-section">Build a sharper Maharashtra transit media brief.</h1>
            <p className="mt-5 lede">Five focused steps. Smooth validation. No browser alerts. No random redirect.</p>
            <div className="mt-8 rounded-md border border-stroke bg-surface-1 p-5 text-[13px] leading-relaxed text-muted-2">
              Your submission will be securely routed directly to our operations team. Direct forwarding options are also provided upon completion.
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="premium-panel p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-2">
                <span>Step {step} of {steps.length}</span>
                <span className="text-accent">{steps[step - 1]}</span>
              </div>
              <Progress value={progress} className="mt-3 h-1.5" />
              <div className="mt-5 grid grid-cols-5 gap-1.5 sm:gap-2">
                {steps.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={async () => {
                      if (i + 1 <= step) setStep(i + 1);
                    }}
                    className={cn(
                      "rounded-sm border py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-center",
                      step === i + 1 ? "border-accent bg-accent/10 text-ivory" : i + 1 < step ? "border-status-live/30 text-status-live" : "border-stroke text-faint",
                    )}
                  >
                    <span className="sm:hidden">{i + 1}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="mt-6 premium-panel p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {step === 1 && <ChoiceStep key="goal" title="What is the campaign goal?" value={goal} options={goals} onSelect={(v) => form.setValue("goal", v as FormValues["goal"], { shouldValidate: true })} error={form.formState.errors.goal?.message} />}
                {step === 2 && <ChoiceStep key="budget" title="What budget range should we plan around?" value={budget} options={budgets} onSelect={(v) => form.setValue("budget", v as FormValues["budget"], { shouldValidate: true })} error={form.formState.errors.budget?.message} />}
                {step === 3 && <ChoiceStep key="media" title="Which media should we prioritize?" value={media} options={mediaOptions} onSelect={(v) => form.setValue("media", v as FormValues["media"], { shouldValidate: true })} error={form.formState.errors.media?.message} />}
                {step === 4 && (
                  <motion.div key="details" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={spring}>
                    <h2 className="h-card text-[22px] text-ivory">Campaign details</h2>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Name" error={form.formState.errors.name?.message}><Input id="name" {...form.register("name")} autoComplete="name" /></Field>
                      <Field id="company" label="Company" error={form.formState.errors.company?.message}><Input id="company" {...form.register("company")} autoComplete="organization" /></Field>
                      <Field id="email" label="Email" error={form.formState.errors.email?.message}><Input id="email" type="email" {...form.register("email")} autoComplete="email" /></Field>
                      <Field id="phone" label="Phone" error={form.formState.errors.phone?.message}><Input id="phone" type="tel" {...form.register("phone")} autoComplete="tel" /></Field>
                      <Field id="district" label="Target city/district" error={form.formState.errors.district?.message}><Input id="district" {...form.register("district")} /></Field>
                      <Field id="timeline" label="Campaign timeline" error={form.formState.errors.timeline?.message}><Input id="timeline" {...form.register("timeline")} placeholder="e.g. June 2026" /></Field>
                      <Field id="message" label="Message" className="sm:col-span-2"><Textarea id="message" rows={4} {...form.register("message")} placeholder="Share audience, city, campaign, or creative notes." /></Field>
                    </div>
                  </motion.div>
                )}
                {step === 5 && (
                  <motion.div key="review" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={spring}>
                    <h2 className="h-card text-[22px] text-ivory">Review your requirement</h2>
                    <pre className="mt-6 max-h-[360px] overflow-auto whitespace-pre-wrap rounded-sm border border-stroke bg-surface-1 p-5 text-left text-[13px] leading-relaxed text-muted-2">{leadSummary}</pre>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button type="button" variant="outline" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))} className="rounded-sm border-stroke-strong bg-transparent text-ivory hover:bg-surface-2 hover:text-ivory">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                {step < steps.length ? (
                  <Button type="button" onClick={next} className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={submitting} className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
                    {submitting ? "Sending…" : (<>Prepare Email + WhatsApp <Send className="h-4 w-4" /></>)}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChoiceStep = ({
  title,
  options,
  value,
  onSelect,
  error,
}: {
  title: string;
  options: readonly string[];
  value?: string;
  onSelect: (value: string) => void;
  error?: string;
}) => (
  <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={spring}>
    <h2 className="h-card text-[22px] text-ivory">{title}</h2>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={cn(
            "min-h-20 rounded-sm border p-4 text-left text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            value === option ? "border-accent bg-accent/10 text-ivory" : "border-stroke bg-surface-1 text-muted-2 hover:border-accent/45 hover:text-ivory",
          )}
        >
          {option}
        </button>
      ))}
    </div>
    {error && <p className="mt-4 text-[13px] font-semibold text-destructive">{error}</p>}
  </motion.div>
);

const Field = ({ id, label, error, children, className = "" }: { id: string; label: string; error?: string; children: React.ReactNode; className?: string }) => (
  <div className={className}>
    <Label htmlFor={id} className="label-sm">{label}</Label>
    <div className="mt-2">{children}</div>
    {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
  </div>
);

export default GetMediaPlan;
