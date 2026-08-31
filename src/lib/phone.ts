import { toWesternDigits } from "./format";

export function normalizeSaudiPhone(input: string): string | null {
  const trimmed = toWesternDigits(input).trim();
  const digits = trimmed.replace(/[^\d]/g, "");

  if (digits.startsWith("966") && digits.length === 12 && digits[3] === "5") {
    return `+${digits}`;
  }
  if (digits.startsWith("05") && digits.length === 10) {
    return `+966${digits.slice(1)}`;
  }
  if (digits.startsWith("5") && digits.length === 9) {
    return `+966${digits}`;
  }
  return null;
}

export function isValidSaudiPhone(input: string): boolean {
  return normalizeSaudiPhone(input) !== null;
}

export function toWhatsAppNumber(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export function formatPhoneDisplay(phone: string): string {
  return phone.replace(/^\+/, "+");
}
