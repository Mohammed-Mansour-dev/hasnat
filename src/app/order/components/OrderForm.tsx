import type { HTMLAttributes } from "react";
import { getDedicationById } from "@/data/dedication";
import { copy } from "@/data/site";
import type { OrderDraft } from "@/lib/order-store";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<
  Record<"package" | "dedication" | "recipientName" | "customerName" | "phone", string>
>;

export function OrderForm({
  draft,
  errors,
  onChange,
}: {
  draft: OrderDraft;
  errors: FieldErrors;
  onChange: {
    recipientName: (value: string) => void;
    customerName: (value: string) => void;
    phone: (value: string) => void;
    notes: (value: string) => void;
  };
}) {
  const dedication = draft.dedicationType
    ? getDedicationById(draft.dedicationType)
    : undefined;

  return (
    <div className="space-y-5">
      {dedication?.requiresRecipient ? (
        <Field
          id="recipientName"
          label={dedication.recipientLabel ?? "الاسم"}
          placeholder={dedication.recipientPlaceholder}
          value={draft.recipientName}
          onChange={onChange.recipientName}
          error={errors.recipientName}
        />
      ) : null}

      <Field
        id="customerName"
        label={copy.order.nameLabel}
        placeholder={copy.order.namePlaceholder}
        value={draft.customerName}
        onChange={onChange.customerName}
        error={errors.customerName}
        autoComplete="name"
      />

      <Field
        id="phone"
        label={copy.order.phoneLabel}
        placeholder={copy.order.phonePlaceholder}
        value={draft.phone}
        onChange={onChange.phone}
        error={errors.phone}
        autoComplete="tel"
        inputMode="tel"
        dir="ltr"
      />

      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium text-ink">
          {copy.order.notesLabel}
        </label>
        <textarea
          id="notes"
          rows={4}
          value={draft.notes}
          onChange={(event) => onChange.notes(event.target.value)}
          placeholder={copy.order.notesPlaceholder}
          className="w-full resize-none rounded-[18px] border border-ink/10 bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/80 focus:border-gold"
        />
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  inputMode,
  dir,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        dir={dir}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-full border bg-paper px-4 text-ink outline-none transition-colors placeholder:text-muted/80",
          error ? "border-red-700/50" : "border-ink/10 focus:border-gold",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
