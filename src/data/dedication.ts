import type { DedicationOption } from "./types";

export const dedicationOptions: DedicationOption[] = [
  {
    id: "self",
    label: "لنفسـي",
    description: "إهداء تنوي به الأجر لنفسك، نسأل الله القبول.",
    requiresRecipient: false,
  },
  {
    id: "parents",
    label: "لوالديّ",
    description: "برّ يصل إلى من ربّاك، في حياتهما أو بعد رحيليهما.",
    requiresRecipient: false,
  },
  {
    id: "loved",
    label: "لشخص أحبه",
    description: "هدية يبلغ أثرها من تحب مع كل تلاوة.",
    requiresRecipient: true,
    recipientLabel: "اسم المُهدى إليه",
    recipientPlaceholder: "اكتب اسم من تهدي إليه",
  },
  {
    id: "deceased",
    label: "عن روح متوفى",
    description: "صدقة تصل بإذن الله إلى من فقدت.",
    requiresRecipient: true,
    recipientLabel: "اسم المتوفى",
    recipientPlaceholder: "اكتب اسم المتوفى",
  },
  {
    id: "sadaqah",
    label: "صدقة جارية",
    description: "نية عامة نسأل الله أن يجعلها صدقة جارية.",
    requiresRecipient: false,
  },
  {
    id: "anonymous",
    label: "بدون اسم",
    description: "إهداء دون ذكر اسم، والأجر عند الله.",
    requiresRecipient: false,
  },
];

export function getDedicationById(id: string): DedicationOption | undefined {
  return dedicationOptions.find((item) => item.id === id);
}
