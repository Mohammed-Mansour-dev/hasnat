"use client";

import { Mail, MessageCircle, Phone, Send, Sparkles } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { contact, copy } from "@/data/site";
import { toWhatsAppNumber } from "@/lib/phone";
import { Container } from "@/components/ui/Container";
import { type ElementType, type FormEvent, type ReactNode, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { fadeUp, prefersReducedMotion, registerGsap } from "@/lib/animations";
import { cn } from "@/lib/utils";

function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.style.opacity = "1";
        return;
      }
      fadeUp(el, {
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    },
    { dependencies: [delay] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-4 text-[13px] font-medium tracking-[0.28em] text-gold-deep">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl leading-snug sm:text-4xl md:text-[2.6rem] text-ink">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed sm:text-lg text-muted">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

const quickChannels = [
  {
    label: "واتساب",
    value: contact.whatsapp,
    href: `https://wa.me/${toWhatsAppNumber(contact.whatsapp)}`,
    icon: MessageCircle,
    external: true,
    hint: "رد فوري",
  },
  {
    label: "الهاتف",
    value: contact.phone,
    href: `tel:${contact.phone}`,
    icon: Phone,
    external: false,
    hint: "اتصال مباشر",
  },
  {
    label: "البريد",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: Mail,
    external: false,
    hint: "رسائل رسمية",
  },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPhoneError(null);

    // Validate Phone Number
    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError("يرجى إدخال رقم هاتف صحيح مع المفتاح الدولي.");
      return;
    }

    setStatus("sending");

    // Replace with real endpoint submission or server action
    await new Promise((r) => setTimeout(r, 1200));

    setStatus("sent");
    setPhone(undefined);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id={copy.contact.id} className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow={copy.contact.eyebrow}
          title={copy.contact.title}
          subtitle={copy.contact.subtitle}
        />

        <Reveal className="mt-16">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-ink/8 bg-paper shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="grid lg:grid-cols-[1fr_1.15fr]">
              {/* Left Channel List */}
              <div className="relative border-b border-ink/6 p-8 sm:p-10 lg:border-b-0 lg:border-e lg:border-ink/6">
                <div className="mb-8 flex items-center gap-2">
                  <Sparkles className="size-4 text-gold-deep" strokeWidth={1.75} />
                  <span className="text-sm font-medium tracking-wide text-ink">
                    تواصل سريع
                  </span>
                </div>

                <div className="space-y-3">
                  {quickChannels.map((ch) => {
                    const Icon = ch.icon;
                    return (
                      <a
                        key={ch.label}
                        href={ch.href}
                        target={ch.external ? "_blank" : undefined}
                        rel={ch.external ? "noreferrer" : undefined}
                        className="group flex items-center gap-4 rounded-2xl border border-transparent bg-ivory/60 px-4 py-4 transition-all duration-300 hover:border-gold/40 hover:bg-ivory hover:shadow-sm"
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-deep transition-colors group-hover:bg-gold/25">
                          <Icon className="size-5" strokeWidth={1.6} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm text-muted">
                            {ch.label}
                            <span className="ms-2 text-[11px] text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">
                              · {ch.hint}
                            </span>
                          </span>
                          <span
                            className="mt-0.5 block truncate text-[15px] font-medium text-ink"
                            dir="ltr"
                          >
                            {ch.value}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>

                <p className="mt-10 text-sm leading-relaxed text-muted">
                  نرد خلال ساعات العمل. للاقتراحات والملاحظات نفضل النموذج
                  المجاور — كل رسالة تُقرأ بعناية.
                </p>
              </div>

              {/* Right Messaging Form */}
              <div className="p-8 sm:p-10">
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-ink">
                    أرسل رسالة أو اقتراح
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    أخبرنا بما يدور في بالك. سنعود إليك في أقرب وقت.
                  </p>
                </div>

                {status === "sent" ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-gold/30 bg-gold/5 px-6 py-16 text-center">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gold/20 text-gold-deep">
                      <Send className="size-6" strokeWidth={1.6} />
                    </div>
                    <p className="text-lg font-medium text-ink">تم الإرسال بنجاح</p>
                    <p className="mt-2 max-w-xs text-sm text-muted">
                      شكراً لتواصلك. سنراجع رسالتك ونرد عليك قريباً.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm font-medium text-gold-deep underline-offset-4 hover:underline"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm text-muted">
                          الاسم
                        </span>
                        <input
                          required
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="اسمك الكامل"
                          className="w-full rounded-xl border border-ink/10 bg-ivory/50 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-gold/60 focus:bg-paper focus:ring-2 focus:ring-gold/20"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-1.5 block text-sm text-muted">
                          البريد الإلكتروني
                        </span>
                        <input
                          required
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          dir="ltr"
                          className="w-full rounded-xl border border-ink/10 bg-ivory/50 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-gold/60 focus:bg-paper focus:ring-2 focus:ring-gold/20"
                        />
                      </label>
                    </div>

                    {/* International Phone Input with Country Code */}
                    <div className="block">
                      <span className="mb-1.5 block text-sm text-muted">
                        رقم الهاتف <span className="text-red-500">*</span>
                      </span>
                      <div className="phone-input-wrapper" dir="ltr">
                        <PhoneInput
                          defaultCountry="SA"
                          international
                          withCountryCallingCode
                          value={phone}
                          onChange={(val) => {
                            setPhone(val);
                            if (phoneError) setPhoneError(null);
                          }}
                          className={cn(
                            "flex w-full items-center rounded-xl border bg-ivory/50 px-4 py-3 text-[15px] text-ink transition focus-within:border-gold/60 focus-within:bg-paper focus-within:ring-2 focus-within:ring-gold/20",
                            phoneError ? "border-red-500" : "border-ink/10"
                          )}
                        />
                      </div>
                      {phoneError ? (
                        <p className="mt-1.5 text-xs text-red-500">{phoneError}</p>
                      ) : null}
                    </div>

                    <label className="block">
                      <span className="mb-1.5 block text-sm text-muted">
                        نوع الرسالة
                      </span>
                      <select
                        name="type"
                        className="w-full appearance-none rounded-xl border border-ink/10 bg-ivory/50 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-gold/60 focus:bg-paper focus:ring-2 focus:ring-gold/20"
                        defaultValue="message"
                      >
                        <option value="message">رسالة عامة</option>
                        <option value="suggestion">اقتراح أو فكرة</option>
                        <option value="feedback">ملاحظات</option>
                        <option value="collaboration">تعاون</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm text-muted">
                        الرسالة
                      </span>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        placeholder="اكتب رسالتك أو اقتراحك هنا..."
                        className="w-full resize-none rounded-xl border border-ink/10 bg-ivory/50 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-gold/60 focus:bg-paper focus:ring-2 focus:ring-gold/20"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-ink px-6 py-3.5 text-[15px] font-medium text-ivory transition hover:bg-ink/90 disabled:opacity-70"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      {status === "sending" ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="size-4" strokeWidth={1.75} />
                          إرسال الرسالة
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}