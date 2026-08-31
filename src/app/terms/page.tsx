import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { brand, contact } from "@/data/site";



export default function TermsPage() {
  return (
    <SiteShell>
      <section className="bg-ivory pt-32 pb-24 sm:pt-36">
        <Container className="max-w-2xl">
          <p className="mb-4 text-[13px] tracking-[0.28em] text-gold-deep">{brand.name}</p>
          <h1 className="text-3xl sm:text-4xl">الشروط والأحكام</h1>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft">
            <p>
              طلب إهداء المصحف عبر {brand.name} هو طلب تنفيذ خدمة توزيع، ويُؤكَّد بعد تواصلنا معكم
              عبر واتساب. الأسعار المعروضة بالريال السعودي، وقد يختلف موعد التنفيذ بحسب توفر
              المصاحف وتنظيم التوزيع في الحرم.
            </p>
            <p>
              نسعى لتنفيذ الطلب كما اتُفق عليه، وإرسال توثيق التوزيع بعد إتمامه. أي تفصيل إضافي —
              مثل كتابة اسم — يُؤكَّد معكم قبل التنفيذ إن كان متاحًا.
            </p>
            <p>
              للاستفسار:{" "}
              <a className="text-ink underline decoration-gold/70" href={`tel:${contact.phone}`}>
                {contact.phone}
              </a>
            </p>
            <p className="text-muted">
              هذه صفحة تعريفية مختصرة، وسيُنشر النص التفصيلي للشروط عند اعتماده.
            </p>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
