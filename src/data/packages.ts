import type { Package } from "./types";

export const UNIT_PRICE_SAR = 49;

export const PACKAGE_QUANTITIES = [1, 2, 5, 10, 20, 50, 100, 200] as const;

export const packages: Package[] = PACKAGE_QUANTITIES.map((quantity) => ({
  quantity,
  price: quantity * UNIT_PRICE_SAR,
}));

export function getPackageByQuantity(quantity: number): Package | undefined {
  return packages.find((item) => item.quantity === quantity);
}
