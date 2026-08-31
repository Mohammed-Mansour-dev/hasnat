import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getDedicationById } from "@/data/dedication";
import { getPackageByQuantity, UNIT_PRICE_SAR } from "@/data/packages";

export type OrderDraft = {
  packageQuantity: number | null;
  dedicationType: string | null;
  recipientName: string;
  customerName: string;
  phone: string;
  notes: string;
};

type OrderStore = OrderDraft & {
  setPackage: (quantity: number) => void;
  setDedication: (id: string) => void;
  setRecipientName: (value: string) => void;
  setCustomerName: (value: string) => void;
  setPhone: (value: string) => void;
  setNotes: (value: string) => void;
  reset: () => void;
};

const initialDraft: OrderDraft = {
  packageQuantity: 10,
  dedicationType: null,
  recipientName: "",
  customerName: "",
  phone: "",
  notes: "",
};

function getSessionStorage() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    };
  }
  return sessionStorage;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      ...initialDraft,
      setPackage: (quantity) => set({ packageQuantity: quantity }),
      setDedication: (id) =>
        set((state) => {
          const option = getDedicationById(id);
          return {
            dedicationType: id,
            recipientName: option?.requiresRecipient ? state.recipientName : "",
          };
        }),
      setRecipientName: (recipientName) => set({ recipientName }),
      setCustomerName: (customerName) => set({ customerName }),
      setPhone: (phone) => set({ phone }),
      setNotes: (notes) => set({ notes }),
      reset: () => set(initialDraft),
    }),
    {
      name: "hasanat:order-draft",
      storage: createJSONStorage(() => getSessionStorage()),
      skipHydration: true,
      partialize: (state) => ({
        packageQuantity: state.packageQuantity,
        dedicationType: state.dedicationType,
        recipientName: state.recipientName,
        customerName: state.customerName,
        phone: state.phone,
        notes: state.notes,
      }),
    },
  ),
);

export function selectTotalPrice(quantity: number | null): number {
  if (!quantity) return 0;
  const pack = getPackageByQuantity(quantity);
  return pack?.price ?? quantity * UNIT_PRICE_SAR;
}
