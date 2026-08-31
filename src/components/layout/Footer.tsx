import { legalItems, navItems } from "@/data/navigation";
import { brand, contact, copy } from "@/data/site";
import { toWhatsAppNumber } from "@/lib/phone";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Container } from "@/components/ui/Container";
import { IslamicPattern } from "@/components/ui/IslamicPattern";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/8 bg-sand">
      <IslamicPattern opacity={0.045} />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo withEnglish />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              {copy.footer.description}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="mb-4 text-[13px] font-medium tracking-[0.22em] text-gold-deep">
              تنقّل
            </p>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <AnchorLink
                    href={item.href}
                    className="text-[15px] text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="mb-4 text-[13px] font-medium tracking-[0.22em] text-gold-deep">
              تواصل
            </p>
            <ul className="space-y-2.5 text-[15px] text-ink-soft">
              <li>
                <a href={`tel:${contact.phone}`} className="hover:text-ink">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-ink" dir="ltr">
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${toWhatsAppNumber(contact.whatsapp)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink"
                >
                  واتساب {contact.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink/8 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name} · {brand.englishName}
          </p>
          <div className="flex gap-5">
            {legalItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
