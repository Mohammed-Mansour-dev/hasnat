import type { Order, SubmittedOrder } from "@/data/types";

const STORAGE_KEY = "hasanat:lastOrder";

function generateOrderNumber(): string {
  const n = 1000 + Math.floor(Math.random() * 9000);
  return `HAS-${n}`;
}

export async function submitOrder(order: Order): Promise<SubmittedOrder> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const submitted: SubmittedOrder = {
    ...order,
    orderNumber: generateOrderNumber(),
    createdAt: new Date().toISOString(),
  };

  persistLastOrder(submitted);
  return submitted;
}

export function persistLastOrder(order: SubmittedOrder): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function getLastOrder(): SubmittedOrder | null {
  if (typeof sessionStorage === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SubmittedOrder;
  } catch {
    return null;
  }
}
