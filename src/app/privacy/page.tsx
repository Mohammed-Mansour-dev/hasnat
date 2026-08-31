import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { brand, contact } from "@/data/site";


export default function PrivacyPage() {
  return (
    <SiteShell>
      <section className="bg-ivory pt-32 pb-24 sm:pt-36">
        <Container className="max-w-2xl">
          <p className="mb-4 text-[13px] tracking-[0.28em] text-gold-deep">{brand.name}</p>
          <h1 className="text-3xl sm:text-4xl">سياسة الخصوصية</h1>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft">
            <p>
              نحرص في {brand.name} على التعامل مع بياناتكم بوضوح واحترام. تُستخدم المعلومات التي
              تزودوننا بها — مثل الاسم ورقم الجوال — لغرض تأكيد الطلب، وتنفيذ إهداء المصاحف،
              وإرسال توثيق التوزيع عبر واتساب.
            </p>
            <p>
              لا نبيع بياناتكم، ولا نستخدمها لأغراض تسويقية خارج نطاق الخدمة. إذا رغبتم بحذف
              بيانات طلب معيّن أو الاستفسار عن استخدامها، تواصلوا معنا عبر{" "}
              <a className="text-ink underline decoration-gold/70" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              .
            </p>
            <p className="text-muted">
              هذه صفحة تعريفية مختصرة، وسيُنشر النص التفصيلي للسياسة عند اعتماده.
            </p>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
