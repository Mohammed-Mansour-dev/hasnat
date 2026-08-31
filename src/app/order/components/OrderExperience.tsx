"use client"
import { useMemo, useState, type FormEvent } from "react";
import { dedicationOptions, getDedicationById } from "@/data/dedication";
import { copy } from "@/data/site";
import { formatPrice, formatQuantity } from "@/lib/format";
import { submitOrder } from "@/lib/order";
import { OrderDraft, selectTotalPrice, useOrderStore } from "@/lib/order-store";
import { normalizeSaudiPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { packages, UNIT_PRICE_SAR } from "@/data";
import { Check } from "lucide-react";
import { OrderForm } from "./OrderForm";
import { useRouter } from "next/navigation";
 function DedicationSelector({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      role="listbox"
      aria-label={copy.dedication.title}
    >
      {dedicationOptions.map((option) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(option.id)}
            className={cn(
              "flex min-h-33] flex-col rounded-[22px] border p-5 text-start transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[--ease-out-soft]",
              isSelected
                ? "border-gold bg-[#FBF6EA] shadow-[--shadow-lift]"
                : "border-ink/8 bg-paper hover:-translate-y-0.5 hover:border-gold/60",
            )}
          >
            <span className="text-lg font-medium text-ink">{option.label}</span>
            <span className="mt-2 text-sm leading-relaxed text-muted">
              {option.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}




function PackageSelector({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (quantity: number) => void;
}) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4"
      role="listbox"
      aria-label={copy.packages.title}
    >
      {packages.map((item) => {
        const isSelected = selected === item.quantity;
        return (
          <button
            key={item.quantity}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(item.quantity)}
            className={cn(
              "group relative flex min-h-33 flex-col items-start rounded-[22px] border bg-paper p-4 text-start transition-[transform,border-color,background-color,box-shadow] duration-300 ease-[--ease-out-soft] sm:p-5",
              isSelected
                ? "border-gold bg-[#FBF6EA] shadow-[--shadow-lift]"
                : "border-ink/8 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[--shadow-soft]",
            )}
          >
            <span
              className={cn(
                "absolute top-3 left-3 flex size-5 items-center justify-center rounded-full border transition-colors",
                isSelected
                  ? "border-gold bg-gold text-ink"
                  : "border-ink/15 text-transparent",
              )}
              aria-hidden="true"
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span className="text-3xl font-semibold tabular-nums text-ink">
              {item.quantity}
            </span>
            <span className="mt-1 text-sm text-muted">
              {item.quantity === 1 ? "مصحف" : "مصاحف"}
            </span>
            <span className="mt-auto pt-3 text-[15px] font-medium tabular-nums text-ink">
              {formatPrice(item.price)}
            </span>
            <span className="mt-1 text-[11px] text-muted">
              {UNIT_PRICE_SAR} {copy.packages.unitLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}

type FieldErrors = Partial<
  Record<"package" | "dedication" | "recipientName" | "customerName" | "phone", string>
>;



 function OrderSummary({
  draft,
  className,
}: {
  draft: OrderDraft;
  className?: string;
}) {
  const dedication = draft.dedicationType
    ? getDedicationById(draft.dedicationType)
    : undefined;
  const total = selectTotalPrice(draft.packageQuantity);

  const rows: Array<{ label: string; value: string }> = [
    {
      label: "عدد المصاحف",
      value: draft.packageQuantity ? formatQuantity(draft.packageQuantity) : "—",
    },
    {
      label: "الإجمالي",
      value: draft.packageQuantity ? formatPrice(total) : "—",
    },
    {
      label: "الإهداء",
      value: dedication?.label ?? "—",
    },
  ];

  if (dedication?.requiresRecipient) {
    rows.push({
      label: dedication.recipientLabel ?? "الاسم",
      value: draft.recipientName || "—",
    });
  }

  if (draft.customerName) {
    rows.push({ label: "الاسم", value: draft.customerName });
  }
  if (draft.phone) {
    rows.push({ label: "رقم التواصل", value: draft.phone });
  }

  return (
    <aside className={className}>
      <h3 className="text-lg font-medium text-ink">{copy.order.summaryTitle}</h3>
      <dl className="mt-5 divide-y divide-ink/8 border-y border-ink/8">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="text-sm font-medium text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}




export function OrderExperience({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const store = useOrderStore();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const draft = useMemo(
    () => ({
      packageQuantity: store.packageQuantity,
      dedicationType: store.dedicationType,
      recipientName: store.recipientName,
      customerName: store.customerName,
      phone: store.phone,
      notes: store.notes,
    }),
    [
      store.packageQuantity,
      store.dedicationType,
      store.recipientName,
      store.customerName,
      store.phone,
      store.notes,
    ],
  );

  const total = selectTotalPrice(draft.packageQuantity);
  const dedication = draft.dedicationType
    ? getDedicationById(draft.dedicationType)
    : undefined;

  function validateStep(current: number): FieldErrors {
    const next: FieldErrors = {};
    if (current === 0 && !draft.packageQuantity) {
      next.package = "فضلاً اختر عدد المصاحف";
    }
    if (current === 1 && !draft.dedicationType) {
      next.dedication = "فضلاً اختر نوع الإهداء";
    }
    if (current === 2) {
      if (!draft.packageQuantity) next.package = "فضلاً اختر عدد المصاحف";
      if (!draft.dedicationType) next.dedication = "فضلاً اختر نوع الإهداء";
      if (dedication?.requiresRecipient && !draft.recipientName.trim()) {
        next.recipientName = "فضلاً أدخل الاسم";
      }
      if (!draft.customerName.trim()) next.customerName = "فضلاً أدخل الاسم";
      if (!draft.phone.trim()) next.phone = "فضلاً أدخل رقم الجوال";
      else if (!normalizeSaudiPhone(draft.phone)) {
        next.phone = "فضلاً أدخل رقم جوال سعودي صحيح";
      }
    }
    return next;
  }

  function goNext() {
    const nextErrors = validateStep(step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep((s) => Math.min(2, s + 1));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validateStep(2);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.package) setStep(0);
      else if (nextErrors.dedication || nextErrors.recipientName) setStep(1);
      return;
    }
    if (!draft.packageQuantity || !draft.dedicationType || !dedication) return;

    const phone = normalizeSaudiPhone(draft.phone);
    if (!phone) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const submitted = await submitOrder({
        packageQuantity: draft.packageQuantity,
        totalPrice: total,
        dedicationType: draft.dedicationType,
        dedicationLabel: dedication.label,
        recipientName: dedication.requiresRecipient
          ? draft.recipientName.trim()
          : undefined,
        customerName: draft.customerName.trim(),
        phone,
        notes: draft.notes.trim() || undefined,
      });
    router.push(`/success?order=${encodeURIComponent(submitted.orderNumber)}`);
    } catch {
      setSubmitError("تعذّر إرسال الطلب الآن. حاول مرة أخرى أو تواصل معنا عبر واتساب.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn(!compact && "mx-auto max-w-4xl")}>
      <ol className="mb-10 flex items-center justify-center gap-2 sm:gap-4" aria-label="خطوات الطلب">
        {copy.order.steps.map((label, index) => {
          const active = index === step;
          const done = index < step;
          return (
            <li key={label} className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setStep(index)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors",
                  active ? "bg-ink text-ivory" : done ? "text-gold-deep" : "text-muted",
                )}
                aria-current={active ? "step" : undefined}
              >
                <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {index < copy.order.steps.length - 1 ? (
                <span className="hidden h-px w-8 bg-border sm:block" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>

      {step === 0 ? (
        <div>
          <PackageSelector selected={draft.packageQuantity} onSelect={store.setPackage} />
          {errors.package ? <p className="mt-4 text-sm text-red-800">{errors.package}</p> : null}
          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-muted">
              {draft.packageQuantity
                ? `${formatQuantity(draft.packageQuantity)} · ${formatPrice(total)}`
                : "اختر العدد للمتابعة"}
            </p>
            <Button type="button" variant="ink" arrow onClick={goNext}>
              التالي
            </Button>
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div>
          <DedicationSelector selected={draft.dedicationType} onSelect={store.setDedication} />
          {errors.dedication ? (
            <p className="mt-4 text-sm text-red-800">{errors.dedication}</p>
          ) : null}
          {dedication?.requiresRecipient ? (
            <div className="mx-auto mt-8 max-w-md">
              <label htmlFor="step-recipient" className="mb-2 block text-sm font-medium text-ink">
                {dedication.recipientLabel}
              </label>
              <input
                id="step-recipient"
                value={draft.recipientName}
                onChange={(event) => store.setRecipientName(event.target.value)}
                placeholder={dedication.recipientPlaceholder}
                aria-invalid={Boolean(errors.recipientName)}
                className="h-12 w-full rounded-full border border-border bg-paper px-4 outline-none transition-colors focus:border-gold"
              />
              {errors.recipientName ? (
                <p className="mt-2 text-sm text-red-800">{errors.recipientName}</p>
              ) : null}
            </div>
          ) : null}
          <div className="mt-8 flex items-center justify-between gap-4">
            <Button type="button" variant="outlineDark" onClick={() => setStep(0)}>
              السابق
            </Button>
            <Button type="button" variant="ink" arrow onClick={goNext}>
              التالي
            </Button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <OrderForm
              draft={draft}
              errors={errors}
              onChange={{
                recipientName: store.setRecipientName,
                customerName: store.setCustomerName,
                phone: store.setPhone,
                notes: store.setNotes,
              }}
            />
            {submitError ? <p className="mt-4 text-sm text-red-800">{submitError}</p> : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="gold" arrow disabled={submitting} className="sm:min-w-44">
                {submitting ? "جارٍ الإرسال..." : copy.order.submit}
              </Button>
              <Button type="button" variant="outlineDark" onClick={() => setStep(0)}>
                {copy.order.edit}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-ink/8 bg-paper p-6 sm:p-8">
              <OrderSummary draft={draft} />
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
