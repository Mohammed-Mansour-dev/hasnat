import { contact } from "@/data/site";
import type { Order, SubmittedOrder } from "@/data/types";
import { formatPrice } from "./format";
import { toWhatsAppNumber } from "./phone";

export function buildWhatsAppMessage(order: Order | SubmittedOrder): string {
  const lines = [
    "السلام عليكم،",
    "أرغب في طلب مصاحف من متجر حسنات.",
    `عدد المصاحف: ${order.packageQuantity}`,
    `الإجمالي: ${formatPrice(order.totalPrice)}`,
    `نوع الإهداء: ${order.dedicationLabel}`,
  ];

  if (order.recipientName) {
    lines.push(`اسم المُهدى إليه: ${order.recipientName}`);
  }

  lines.push(`الاسم: ${order.customerName}`);
  lines.push(`رقم التواصل: ${order.phone}`);

  if (order.notes) {
    lines.push(`ملاحظات: ${order.notes}`);
  }

  if ("orderNumber" in order && order.orderNumber) {
    lines.push(`رقم الطلب: ${order.orderNumber}`);
  }

  lines.push("أرغب في استكمال الطلب والتفاصيل.");
  lines.push("جزاكم الله خيرًا.");

  return lines.join("\n");
}

export function buildWhatsAppUrl(
  order: Order | SubmittedOrder,
  whatsappNumber: string = contact.whatsapp,
): string {
  const text = encodeURIComponent(buildWhatsAppMessage(order));
  return `https://wa.me/${toWhatsAppNumber(whatsappNumber)}?text=${text}`;
}

export function buildPlainWhatsAppUrl(
  message: string,
  whatsappNumber: string = contact.whatsapp,
): string {
  return `https://wa.me/${toWhatsAppNumber(whatsappNumber)}?text=${encodeURIComponent(message)}`;
}
