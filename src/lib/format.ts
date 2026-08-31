export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("ar-SA", {
    numberingSystem: "latn",
  }).format(amount);
  return `${formatted} ريال`;
}

export function formatQuantity(quantity: number): string {
  const formatted = new Intl.NumberFormat("ar-SA", {
    numberingSystem: "latn",
  }).format(quantity);
  if (quantity === 1) return "مصحف واحد";
  if (quantity === 2) return "مصحفان";
  return `${formatted} مصاحف`;
}

export function toWesternDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
}
